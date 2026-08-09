import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

interface InventoryTabProps {
  products: Product[] | undefined;
}

const InventoryTab: React.FC<InventoryTabProps> = ({ products }) => {
  const queryClient = useQueryClient();
  const [stockUpdates, setStockUpdates] = useState<Record<string, number>>({});

  const updateStock = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const { error } = await supabase.from('products').update({ stock_quantity: quantity }).eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'Stock updated' });
    },
  });

  const bulkUpdateStock = useMutation({
    mutationFn: async (updates: Record<string, number>) => {
      const promises = Object.entries(updates).map(([productId, quantity]) =>
        supabase.from('products').update({ stock_quantity: quantity }).eq('id', productId)
      );
      const results = await Promise.all(promises);
      const errors = results.filter(r => r.error);
      if (errors.length > 0) throw new Error(`${errors.length} updates failed`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setStockUpdates({});
      toast({ title: 'Bulk stock update complete' });
    },
  });

  const outOfStock = products?.filter(p => p.stock_quantity === 0) || [];
  const lowStock = products?.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold) || [];
  const healthyStock = products?.filter(p => p.stock_quantity > p.low_stock_threshold) || [];

  const handleStockChange = (productId: string, value: number) => {
    setStockUpdates(prev => ({ ...prev, [productId]: value }));
  };

  const applyBulkUpdate = () => {
    if (Object.keys(stockUpdates).length > 0) {
      bulkUpdateStock.mutate(stockUpdates);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-spiritual p-6 border-l-4 border-l-destructive">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-destructive">{outOfStock.length}</p>
            </div>
          </div>
        </div>
        <div className="card-spiritual p-6 border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStock.length}</p>
            </div>
          </div>
        </div>
        <div className="card-spiritual p-6 border-l-4 border-l-green-500">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Healthy Stock</p>
              <p className="text-2xl font-bold text-green-600">{healthyStock.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Update Button */}
      {Object.keys(stockUpdates).length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <span className="text-sm">{Object.keys(stockUpdates).length} products pending update</span>
          <Button onClick={applyBulkUpdate} disabled={bulkUpdateStock.isPending}>
            {bulkUpdateStock.isPending ? 'Updating...' : 'Apply All Changes'}
          </Button>
        </div>
      )}

      {/* Out of Stock Section */}
      {outOfStock.length > 0 && (
        <div>
          <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Out of Stock ({outOfStock.length})
          </h3>
          <div className="card-spiritual overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-destructive/10">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">New Stock</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {outOfStock.map(product => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">
                      <Input
                        type="number"
                        min={0}
                        className="w-24"
                        value={stockUpdates[product.id] ?? ''}
                        onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        disabled={!stockUpdates[product.id] || updateStock.isPending}
                        onClick={() => {
                          if (stockUpdates[product.id]) {
                            updateStock.mutate({ productId: product.id, quantity: stockUpdates[product.id] });
                            setStockUpdates(prev => { const n = { ...prev }; delete n[product.id]; return n; });
                          }
                        }}
                      >
                        Restock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Low Stock Section */}
      {lowStock.length > 0 && (
        <div>
          <h3 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" /> Low Stock ({lowStock.length})
          </h3>
          <div className="card-spiritual overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-yellow-500/10">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Current</th>
                  <th className="text-left p-3">Threshold</th>
                  <th className="text-left p-3">New Stock</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map(product => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">{product.stock_quantity}</Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{product.low_stock_threshold}</td>
                    <td className="p-3">
                      <Input
                        type="number"
                        min={0}
                        className="w-24"
                        value={stockUpdates[product.id] ?? ''}
                        onChange={(e) => handleStockChange(product.id, parseInt(e.target.value) || 0)}
                        placeholder={String(product.stock_quantity)}
                      />
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!stockUpdates[product.id] || updateStock.isPending}
                        onClick={() => {
                          if (stockUpdates[product.id]) {
                            updateStock.mutate({ productId: product.id, quantity: stockUpdates[product.id] });
                            setStockUpdates(prev => { const n = { ...prev }; delete n[product.id]; return n; });
                          }
                        }}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Products Inventory */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Package className="w-5 h-5" /> All Products Inventory
        </h3>
        <div className="card-spiritual overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Stock</th>
                  <th className="text-left p-3">Threshold</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Update</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="p-3 font-medium max-w-[200px] truncate">{product.name}</td>
                    <td className="p-3 capitalize">{product.category}</td>
                    <td className="p-3">₹{Number(product.price).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={product.stock_quantity <= product.low_stock_threshold ? 'text-destructive font-bold' : ''}>
                        {product.stock_quantity}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{product.low_stock_threshold}</td>
                    <td className="p-3">
                      <Badge variant={product.stock_quantity === 0 ? 'destructive' : product.stock_quantity <= product.low_stock_threshold ? 'secondary' : 'default'}>
                        {product.stock_quantity === 0 ? 'Out' : product.stock_quantity <= product.low_stock_threshold ? 'Low' : 'OK'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        defaultValue={product.stock_quantity}
                        className="w-20"
                        min={0}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val !== product.stock_quantity) {
                            updateStock.mutate({ productId: product.id, quantity: val });
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
                {!products?.length && (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No products in database yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
