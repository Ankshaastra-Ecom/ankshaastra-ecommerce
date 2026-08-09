import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!isLoading && user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: 'Error', description: 'Please enter email and password', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
      return;
    }

    // Auth state change will trigger isAdmin check
    // The useEffect above will redirect to /admin if admin
    toast({ title: 'Verifying admin access...', description: 'Please wait' });
    
    // Wait for admin check
    setTimeout(() => {
      // Will be handled by useEffect when isAdmin updates
    }, 1000);
  };

  // After login, check if admin
  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      toast({ title: 'Access Denied', description: 'This account does not have admin privileges.', variant: 'destructive' });
    }
  }, [user, isAdmin, isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-mandala opacity-20" />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(270 35% 15% / 0.95) 0%, hsl(270 40% 10% / 0.9) 50%, hsl(38 70% 25% / 0.85) 100%)'
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Access the Ankshaastra admin panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ankshaastra.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-gold py-6"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In to Admin'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Authorized personnel only. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
