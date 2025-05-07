import LoginForm from '@/features/auth/ui/LoginForm';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    // if (user) router.replace('/');
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
