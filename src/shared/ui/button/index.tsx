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
    'bg-white text-brand-primary border border-brand-primary hover:text-interaction-hover active:text-interaction-pressed',
  danger: 'bg-danger text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  small: 'py-[13px] text-lg-sb',
  large: 'py-[14.5px] text-md-sb',
};

const Button = ({
  children,
  variant = 'solid',
  size = 'large',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const base = 'w-full rounded-[12px] cursor-pointer';

  return (
    <>
      <button
        className={classNames(
          base,
          sizeStyles[size],
          disabled
            ? variant === 'outlined'
              ? 'bg-white text-interaction-inactive border-interaction-inactive disabled:cursor-not-allowed disabled:pointer-events-none'
              : 'bg-interaction-inactive text-white border-interaction-inactive disabled:cursor-not-allowed disabled:pointer-events-none'
            : variantStyles[variant],
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
