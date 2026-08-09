import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, AlertTriangle, BarChart3, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';
import ProductsTab from '@/components/admin/ProductsTab';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import InventoryTab from '@/components/admin/InventoryTab';

type OrderStatus = Database['public']['Enums']['order_status'];

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const { data: orders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const { data: alerts } = useQuery({
    queryKey: ['admin-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('stock_alerts').select('*').eq('is_read', false).order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Order updated' });
    },
  });

  const markAlertRead = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase.from('stock_alerts').update({ is_read: true }).eq('id', alertId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-alerts'] }),
  });

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const lowStockCount = products?.filter(p => p.stock_quantity <= p.low_stock_threshold).length || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-display font-bold mb-8">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="text-2xl font-bold">{orders?.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{pendingOrders}</p>
                </div>
              </div>
            </div>
            <div className="card-spiritual p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="orders">
            <TabsList className="mb-6 flex-wrap h-auto">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="alerts">
                Alerts {alerts?.length ? <Badge variant="destructive" className="ml-1">{alerts.length}</Badge> : null}
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="card-spiritual overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4">Order #</th>
                        <th className="text-left p-4">Customer</th>
                        <th className="text-left p-4">Total</th>
                        <th className="text-left p-4">Payment</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order.id} className="border-t border-border">
                          <td className="p-4 font-medium">{order.order_number}</td>
                          <td className="p-4">{order.shipping_first_name} {order.shipping_last_name}</td>
                          <td className="p-4 font-medium">₹{Number(order.total).toLocaleString()}</td>
                          <td className="p-4">
                            <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'} className="capitalize">
                              {order.payment_status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">{order.status}</Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-IN')}
                          </td>
                          <td className="p-4">
                            <Select
                              value={order.status}
                              onValueChange={(val) => updateOrderStatus.mutate({ orderId: order.id, status: val as OrderStatus })}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                      {!orders?.length && (
                        <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No orders yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <ProductsTab products={products} />
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <InventoryTab products={products} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsTab orders={orders} products={products} />
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts">
              <div className="space-y-3">
                {alerts?.map((alert) => (
                  <div key={alert.id} className="card-spiritual p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="font-medium capitalize">{alert.alert_type.replace('_', ' ')}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{new Date(alert.created_at).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => markAlertRead.mutate(alert.id)}>
                      Dismiss
                    </Button>
                  </div>
                ))}
                {!alerts?.length && (
                  <div className="card-spiritual p-8 text-center text-muted-foreground">
                    No unread alerts
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
