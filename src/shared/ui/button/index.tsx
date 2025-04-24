import classNames from 'classnames';

type ButtonVariant = 'solid' | 'outlined' | 'danger';
type ButtonSize = 'small' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    'bg-brand-primary text-white hover:bg-interaction-hover active:bg-interaction-pressed',
  outlined:
    'text-brand-primary border border-brand-primary hover:text-interaction-hover hover:border-interaction-hover active:text-interaction-pressed active:border-interaction-pressed',
  danger: 'bg-danger text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  small: 'py-[7px] px-[12.5px] text-lg-sb',
  large: 'py-[14.5px] text-md-sb w-full',
};

const Button = ({
  children,
  variant = 'solid',
  size = 'large',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const base = 'rounded-[12px] cursor-pointer';
  const isOutlinedLarge = variant === 'outlined' && size === 'large';
  const isOutlinedSmall = variant === 'outlined' && size === 'small';

  return (
    <button
      className={classNames(
        base,
        sizeStyles[size],
        isOutlinedLarge && 'bg-white',
        isOutlinedSmall && 'bg-transparent',
        disabled
          ? variant === 'outlined'
            ? 'text-interaction-inactive border border-interaction-inactive disabled:cursor-not-allowed disabled:pointer-events-none'
            : 'bg-interaction-inactive text-white border-interaction-inactive disabled:cursor-not-allowed disabled:pointer-events-none'
          : variantStyles[variant],
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
