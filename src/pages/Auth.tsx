import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Icons } from '@/components/tradevision/Icons';
import { z } from 'zod';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateInputs = () => {
    try {
      emailSchema.parse(email);
    } catch {
      setError('Please enter a valid email address');
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateInputs()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(error.message);
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              display_name: displayName || email.split('@')[0],
            },
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            setError(error.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fd] dark:bg-[#131722] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#2962ff] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            <Icons.TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-xl leading-none text-[#131722] dark:text-[#e0e3eb]">TradeVision</span>
            <span className="text-[10px] font-medium text-[#787b86] uppercase tracking-wider">Terminal</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-2 text-center">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-[#787b86] text-sm text-center mb-6">
            {isLogin ? 'Sign in to access your account' : 'Sign up to get started'}
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#131722] dark:text-[#d1d4dc] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#f0f3fa] dark:bg-[#131722] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg px-4 py-2.5 text-[#131722] dark:text-[#d1d4dc] focus:outline-none focus:border-[#2962ff] transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#131722] dark:text-[#d1d4dc] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#f0f3fa] dark:bg-[#131722] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg px-4 py-2.5 text-[#131722] dark:text-[#d1d4dc] focus:outline-none focus:border-[#2962ff] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#131722] dark:text-[#d1d4dc] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#f0f3fa] dark:bg-[#131722] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg px-4 py-2.5 text-[#131722] dark:text-[#d1d4dc] focus:outline-none focus:border-[#2962ff] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2962ff] text-white font-semibold py-3 rounded-lg hover:bg-[#1e53e5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-sm text-[#2962ff] hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
