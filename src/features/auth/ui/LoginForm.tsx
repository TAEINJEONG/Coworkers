import { useState } from 'react';
// import { useRouter } from 'next/router';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import Input from '@/shared/ui/Input';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setErrorMessage('값을 입력해주세요.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrorMessage('올바른 이메일 형식이 아닙니다.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-[280px] w-full"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요."
        onBlur={handleBlur}
        errorMessage={errorMessage}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요."
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
