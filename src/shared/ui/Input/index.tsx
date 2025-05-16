import classNames from 'classnames';
import Image from 'next/image';
import visibleIcon from '@/shared/assets/images/visibility_on.svg';
import inVisibleIcon from '@/shared/assets/images/visibility_off.svg';
import { useState } from 'react';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
}

const Input = ({
  placeholder,
  type = 'text',
  className,
  disabled,
  errorMessage,
  ...rest
}: InputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          className={classNames(
            'rounded-[12px] bg-background-secondary outline-none w-full border',
            'py-[13.5px] px-[18px] text-md-r',
            'md:py-[14.5px] md:px-4 md:text-lg-r',
            {
              'border-danger': errorMessage,
              'hover:border hover:border-interaction-hover':
                !errorMessage && !disabled,
              'focus:border focus:border-interaction-focus': !errorMessage,
            },
            className,
            disabled
              ? 'bg-background-tertiary text-text-disabled'
              : 'bg-background-secondary text-text-primary border-[#F8FAFC1A]'
          )}
          disabled={disabled}
          placeholder={placeholder}
          type={type === 'password' && visible ? 'text' : type}
          {...rest}
        />

        {type === 'password' && (
          <Image
            src={visible ? visibleIcon : inVisibleIcon}
            width={24}
            height={24}
            alt="보기 아이콘"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          />
        )}
      </div>
      {errorMessage && (
        <p className="mt-1 text-sm text-danger">{errorMessage}</p>
      )}
    </>
  );
};

export default Input;
