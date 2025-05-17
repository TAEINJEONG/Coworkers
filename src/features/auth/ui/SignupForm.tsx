import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/button';

export default function SignupForm() {
  const signUp = useAuthStore((s) => s.signUp);
  const errorMessage = useAuthStore((s) => s.errorDetails);

  const [nickname, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const [nicknameErrorMessage, setNickNameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (errorMessage?.message === '이미 사용중인 이메일입니다.') {
      setEmailErrorMessage(errorMessage?.message);
    } else {
      setEmailErrorMessage('');
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, nickname, password, passwordConfirmation);
      router.push('/');
    } catch {
      const latestDetails = useAuthStore.getState().errorDetails;
      console.log(latestDetails);
    }
  };

  const handleNickNameInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setNickNameErrorMessage('이름을 입력해주세요.');
    } else if (value.length > 20) {
      setNickNameErrorMessage('이름은 최대 20자까지 가능합니다.');
    } else {
      setNickNameErrorMessage('');
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
    } else if (value.length < 8) {
      setPasswordErrorMessage('8자 이상 입력해주세요.');
    } else if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(value)) {
      setPasswordErrorMessage(
        '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'
      );
    } else if (!/[!@#$%^&*]/.test(value)) {
      setPasswordErrorMessage(
        '비밀번호에 특수문자(!@#$%^&*)를 최소 하나 포함해야 합니다.'
      );
    } else {
      setPasswordErrorMessage('');
    }
  };

  const handlePasswordConfirmationInputBlur = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!value) {
      setPasswordConfirmationErrorMessage('비밀번호 확인을 해주세요.');
    } else if (value.length < 8) {
      setPasswordConfirmationErrorMessage('8자 이상 입력해주세요.');
    } else if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(value)) {
      setPasswordErrorMessage(
        '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'
      );
    } else if (!/[!@#$%^&*]/.test(value)) {
      setPasswordErrorMessage(
        '비밀번호에 특수문자(!@#$%^&*)를 최소 하나 포함해야 합니다.'
      );
    } else if (password !== passwordConfirmation) {
      setPasswordConfirmationErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmationErrorMessage('');
    }
  };

  const isFormValid =
    nickname !== '' &&
    email !== '' &&
    password !== '' &&
    passwordConfirmation !== '' &&
    !nicknameErrorMessage &&
    !emailErrorMessage &&
    !passwordErrorMessage &&
    !passwordConfirmationErrorMessage;

  return (
    <form onSubmit={handleSubmit} className="mt-15 w-full">
      <h2 className="text-text-primary text-2xl-m text-center mb-6 lg:text-4xl-m lg:mb-20">
        회원가입
      </h2>

      <div className="mb-10">
        <div className="mb-6">
          <label
            htmlFor="nickNameInput"
            className="block text-text-primary text-lg-m mb-3"
          >
            이름
          </label>
          <Input
            type="text"
            id="nickNameInput"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="이름을 입력하세요."
            onBlur={handleNickNameInputBlur}
            errorMessage={nicknameErrorMessage}
          />
        </div>

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

        <div className="mb-6">
          <label
            htmlFor="passwordInput"
            className="block text-text-primary text-lg-m mb-3"
          >
            비밀번호
          </label>
          <Input
            type="password"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            onBlur={handlePasswordInputBlur}
            errorMessage={passwordErrorMessage}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="passwordConfirmationInput"
            className="block text-text-primary text-lg-m mb-3"
          >
            비밀번호 확인
          </label>
          <Input
            type="password"
            id="passwordConfirmationInput"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="비밀번호를 다시 한 번 확인해주세요."
            onBlur={handlePasswordConfirmationInputBlur}
            errorMessage={passwordConfirmationErrorMessage}
          />
        </div>
      </div>

      <Button className="mb-6" disabled={!isFormValid}>
        회원가입
      </Button>
    </form>
  );
}
