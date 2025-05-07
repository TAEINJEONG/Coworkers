import { useState } from 'react';
// import { useRouter } from 'next/router';
import { useAuthStore } from '@/features/auth/model/useAuthStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((s) => s.login);
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // router.push('/');
    } catch {
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        로그인
      </button>
    </form>
  );
}
