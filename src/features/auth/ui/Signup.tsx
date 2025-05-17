import SignupForm from '@/features/auth/ui/SignupForm';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  return (
    <div className="h-full max-w-[460px] mx-auto flex items-start md:items-center justify-center">
      <SignupForm />
    </div>
  );
}
