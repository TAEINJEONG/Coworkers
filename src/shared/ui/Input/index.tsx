import classNames from 'classnames';
import Image from 'next/image';
import visibleIcon from '@/shared/assets/images/visibility_on.svg';
import inVisibleIcon from '@/shared/assets/images/visibility_off.svg';
import { useState } from 'react';

type InputSize = 'small' | 'large';

const sizeStyle: Record<InputSize, string> = {
  small: 'py-[13.5px] px-[18px] text-md-r',
  large: 'py-[14.5px] px-4 text-lg-r',
};

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: InputSize;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
}

const Input = ({
  size = 'large',
  placeholder,
  type = 'text',
  className,
  disabled,
  errorMessage,
  ...rest
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const base =
    'rounded-[12px] bg-background-secondary outline-none w-full border';

  return (
    <div className="relative">
      <input
        className={classNames(
          base,
          sizeStyle[size],
          {
            'border-danger': errorMessage,
            'hover:border hover:border-interaction-hover':
              !errorMessage && !disabled,
            'focus:border focus:border-interaction-focus': !errorMessage,
          },
          className,
          disabled
            ? 'bg-background-tertiary text-text-disabled'
            : 'bg-background-secondary text-text-primary'
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
      {errorMessage && (
        <p className="mt-1 text-sm text-danger">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
