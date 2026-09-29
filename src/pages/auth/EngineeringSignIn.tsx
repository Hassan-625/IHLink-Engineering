import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { platformUrl } from '@/lib/platformUrls';

export function EngineeringSignIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const routeMode = location.pathname === '/register' ? 'register' : location.pathname === '/reset-password' ? 'reset' : location.pathname === '/auth/update-password' ? 'update' : 'signin';
  const [mode, setMode] = useState<'signin' | 'reset'>(routeMode === 'reset' ? 'reset' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  useEffect(() => setMode(routeMode === 'reset' ? 'reset' : 'signin'), [routeMode]);
  const destination = params.get('next');
  const next = destination?.startsWith('/') && !destination.startsWith('//') ? destination : '/engineering/dashboard';

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (routeMode === 'update') {
      if (!supabase) return setNote('Authentication is unavailable.');
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setNote(error.message); else navigate('/engineering/dashboard');
      return;
    }
    if (mode === 'reset') {
      setNote((await auth.resetPassword(email)) || 'If this email has an IHLink account, a reset link has been sent.');
      return;
    }
    const error = await auth.signIn(email, password);
    if (error) setNote(error); else navigate(next);
  }

  const registrationUrl = platformUrl('corporate', '/register?service=engineering');
  return <>
    <Header product="engineering" />
    <main className="min-h-[70vh] bg-amber-50/40 px-6 py-16">
      <Card className="mx-auto max-w-md">
        <p className="font-bold text-amber-700">IHLink Engineering</p>
        <h1 className="mt-2 text-3xl font-black">{routeMode === 'register' ? 'Create an IHLink account' : routeMode === 'update' ? 'Choose a new password' : mode === 'reset' ? 'Reset password' : 'Sign in'}</h1>
        {routeMode === 'register' ? <>
          <p className="mt-5 text-sm text-slate-600">Create your shared IHLink account, then return to Engineering with the same identity.</p>
          <a href={registrationUrl} className="mt-6 block"><Button fullWidth>Create account</Button></a>
          <Link to="/signin" className="mt-4 block text-center text-sm font-bold text-amber-700">Already have an account? Sign in</Link>
        </> : <form onSubmit={submit} className="mt-6 space-y-4">
          {routeMode !== 'update' && <input className="w-full rounded-xl border p-3" type="email" required placeholder="Email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />}
          {mode === 'signin' && <input className="w-full rounded-xl border p-3" type="password" minLength={8} required placeholder={routeMode === 'update' ? 'New password' : 'Password'} autoComplete={routeMode === 'update' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} />}
          {note && <p role="status" className="text-sm">{note}</p>}
          <Button fullWidth>{routeMode === 'update' ? 'Save password' : mode === 'reset' ? 'Send reset email' : 'Sign in'}</Button>
          {routeMode === 'signin' && mode === 'signin' && <Button type="button" variant="secondary" fullWidth onClick={async () => setNote((await auth.signInWithGoogle()) || '')}>Continue with Google</Button>}
          {routeMode !== 'update' && <button type="button" className="w-full text-sm text-amber-700" onClick={() => { setMode(mode === 'signin' ? 'reset' : 'signin'); setNote(''); }}>{mode === 'signin' ? 'Forgot password?' : 'Back to sign in'}</button>}
        </form>}
      </Card>
    </main>
    <Footer product="engineering" />
  </>;
}
