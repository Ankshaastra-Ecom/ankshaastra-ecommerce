import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, Circle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import ReferralProgram from '@/components/account/ReferralProgram';

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  confirmed: <CheckCircle className="w-4 h-4" />,
  processing: <Package className="w-4 h-4" />,
  shipped: <Truck className="w-4 h-4" />,
  delivered: <CheckCircle className="w-4 h-4 text-sage" />,
  cancelled: <XCircle className="w-4 h-4 text-destructive" />,
};

const MyOrders: React.FC = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const statusFlow = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>
          <ReferralProgram />

          {isLoading ? (
            <p className="text-muted-foreground">Loading orders...</p>
          ) : !orders?.length ? (
            <div className="text-center py-16 card-spiritual p-8">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
              <Link to="/shop" className="btn-gold px-6 py-3 rounded-lg inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const currentIndex = statusFlow.indexOf(order.status);

                return (
                  <div key={order.id} className="card-spiritual p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-medium text-lg">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="flex items-center gap-1 capitalize">
                          {statusIcons[order.status]} {order.status}
                        </Badge>
                        <span className="font-bold text-primary">₹{Number(order.total).toLocaleString()}</span>
                      </div>
                    </div>

                    {order.status !== 'cancelled' && order.status !== 'refunded' && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <p className="text-sm font-medium mb-3">Shipment Tracking</p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {statusFlow.map((step, idx) => {
                            const reached = idx <= currentIndex;
                            return (
                              <div key={step} className="flex items-center gap-2">
                                {reached ? (
                                  <CheckCircle className="w-4 h-4 text-sage" />
                                ) : (
                                  <Circle className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className={`text-xs capitalize ${reached ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
