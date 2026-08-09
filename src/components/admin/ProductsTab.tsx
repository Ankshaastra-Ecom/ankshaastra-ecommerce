import React, { useState } from 'react';
import { Plus, Edit, Trash2, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'];

const emptyProduct = {
  name: '',
  category: 'crystals',
  price: 0,
  original_price: 0,
  description: '',
  stock_quantity: 0,
  low_stock_threshold: 5,
  is_active: true,
  slug: '',
  images: [] as string[],
  metadata: {},
};

interface ProductsTabProps {
  products: Product[] | undefined;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ products }) => {
  const queryClient = useQueryClient();
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [imageInput, setImageInput] = useState('');

  const saveProduct = useMutation({
    mutationFn: async (data: typeof emptyProduct & { id?: string }) => {
      const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const payload = {
        name: data.name,
        category: data.category,
        slug,
        price: Number(data.price),
        original_price: Number(data.original_price) || null,
        stock_quantity: Number(data.stock_quantity),
        low_stock_threshold: Number(data.low_stock_threshold),
        is_active: data.is_active,
        description: data.description,
        images: data.images,
        metadata: data.metadata,
      };
      if (data.id) {
        const { error } = await supabase.from('products').update(payload).eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setProductDialogOpen(false);
      setProductForm(emptyProduct);
      setEditingProduct(null);
      toast({ title: 'Product saved!' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'Product deleted' });
    },
  });

  const openEditDialog = (product: Product) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      price: Number(product.price),
      original_price: Number(product.original_price) || 0,
      description: product.description || '',
      stock_quantity: product.stock_quantity,
      low_stock_threshold: product.low_stock_threshold,
      is_active: product.is_active,
      slug: product.slug,
      images: product.images || [],
      metadata: (product.metadata as Record<string, unknown>) || {},
    });
    setProductDialogOpen(true);
  };

  const addImageUrl = () => {
    if (imageInput.trim()) {
      setProductForm(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setProductForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products ({products?.length || 0})</h2>
        <Dialog open={productDialogOpen} onOpenChange={(open) => {
          setProductDialogOpen(open);
          if (!open) {
            setProductForm(emptyProduct);
            setEditingProduct(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveProduct.mutate({ ...productForm, id: editingProduct || undefined }); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Product Name *</Label>
                  <Input value={productForm.name} onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select value={productForm.category} onValueChange={(v) => setProductForm(p => ({ ...p, category: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crystals">Crystals</SelectItem>
                      <SelectItem value="rudraksha">Rudraksha</SelectItem>
                      <SelectItem value="mala">Mala</SelectItem>
                      <SelectItem value="yantra">Yantra</SelectItem>
                      <SelectItem value="gemstones">Gemstones</SelectItem>
                      <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={productForm.slug} onChange={(e) => setProductForm(p => ({ ...p, slug: e.target.value }))} placeholder="auto-generated if empty" />
                </div>
                <div>
                  <Label>Price (₹) *</Label>
                  <Input type="number" value={productForm.price} onChange={(e) => setProductForm(p => ({ ...p, price: Number(e.target.value) }))} min={0} required />
                </div>
                <div>
                  <Label>Original Price (₹)</Label>
                  <Input type="number" value={productForm.original_price || ''} onChange={(e) => setProductForm(p => ({ ...p, original_price: Number(e.target.value) }))} min={0} />
                </div>
                <div>
                  <Label>Stock Quantity</Label>
                  <Input type="number" value={productForm.stock_quantity} onChange={(e) => setProductForm(p => ({ ...p, stock_quantity: Number(e.target.value) }))} min={0} />
                </div>
                <div>
                  <Label>Low Stock Threshold</Label>
                  <Input type="number" value={productForm.low_stock_threshold} onChange={(e) => setProductForm(p => ({ ...p, low_stock_threshold: Number(e.target.value) }))} min={0} />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea value={productForm.description} onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))} rows={3} />
                </div>
                <div className="col-span-2">
                  <Label>Images (URLs)</Label>
                  <div className="flex gap-2 mb-2">
                    <Input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="https://example.com/image.jpg" />
                    <Button type="button" variant="outline" onClick={addImageUrl}><ImagePlus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productForm.images.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="w-16 h-16 object-cover rounded border" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <Switch checked={productForm.is_active} onCheckedChange={(v) => setProductForm(p => ({ ...p, is_active: v }))} />
                  <Label>Active (visible in shop)</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setProductDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={saveProduct.isPending}>
                  {saveProduct.isPending ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="card-spiritual overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="p-4">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">No img</div>
                    )}
                  </td>
                  <td className="p-4 font-medium max-w-[200px] truncate">{product.name}</td>
                  <td className="p-4 capitalize">{product.category}</td>
                  <td className="p-4">
                    <span className="font-medium">₹{Number(product.price).toLocaleString()}</span>
                    {product.original_price && (
                      <span className="text-muted-foreground line-through ml-2 text-xs">₹{Number(product.original_price).toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={product.stock_quantity <= product.low_stock_threshold ? 'text-destructive font-bold' : ''}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Active' : 'Hidden'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                        if (confirm('Delete this product permanently?')) deleteProduct.mutate(product.id);
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!products?.length && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No products yet. Add your first product above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;
