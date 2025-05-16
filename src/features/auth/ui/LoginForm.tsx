import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/button';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch {
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleEmailInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setEmailErrorMessage('이메일을 입력해주세요.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailErrorMessage('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailErrorMessage('');
    }
  };

  const handlePasswordInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setPasswordErrorMessage('비밀번호를 입력해 주세요.');
    } else {
      setPasswordErrorMessage('');
    }
  };

  const isFormValid =
    email !== '' &&
    password !== '' &&
    !emailErrorMessage &&
    !passwordErrorMessage;

  return (
    <form onSubmit={handleSubmit} className="mt-15 w-full">
      <h2 className="text-text-primary text-2xl-m text-center mb-6 lg:text-4xl-m lg:mb-20">
        로그인
      </h2>

      <div className="mb-10">
        <div className="mb-6">
          <label
            htmlFor="emailInput"
            className="block text-text-primary text-lg-m mb-3"
          >
            이메일
          </label>
          <Input
            type="email"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요."
            onBlur={handleEmailInputBlur}
            errorMessage={emailErrorMessage}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="emailInput"
            className="block text-text-primary text-lg-m mb-3"
          >
            비밀번호
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            onBlur={handlePasswordInputBlur}
            errorMessage={passwordErrorMessage}
          />
        </div>

        <p className="text-icon-brand underline text-right text-md-m md:text-lg-m">
          비밀번호를 잊으셨나요?
        </p>
      </div>

      <Button className="mb-6" disabled={!isFormValid}>
        로그인
      </Button>
      <p className="text-center text-md-m md:text-lg-m text-text-primary">
        아직 계정이 없으신가요?{'  '}
        <Link href={'/signup'} className="text-icon-brand underline">
          가입하기
        </Link>
      </p>
    </form>
  );
}
