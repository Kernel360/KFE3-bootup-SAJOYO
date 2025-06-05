export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  width?: 'auto' | 'full';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  className?: string;
}

// 로딩 스피너 컴포넌트
const Spinner: React.FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size }) => {
  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <svg
      className={`animate-spin ${sizeClass}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  width = 'auto',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
  ariaLabel,
  className = '',
  ...props
}) => {
  // 기본 스타일
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-150
    border border-transparent
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${width === 'full' ? 'w-full' : 'w-auto'}
  `;

  // 크기별 스타일
  const sizeStyles = {
    sm: `
      h-9 px-3 gap-1
      text-xs rounded-md
      focus:ring-1 focus:ring-offset-1
    `,
    md: `
      h-11 px-4 gap-2
      text-sm rounded-lg
      focus:ring-2 focus:ring-offset-2
    `,
    lg: `
      h-12 px-6 gap-2
      text-base rounded-lg
      focus:ring-2 focus:ring-offset-2
    `,
  };

  // 변형별 스타일 (CSS 변수 활용)
  const variantStyles = {
    primary: `
      bg-[var(--color-main)] text-white
      hover:bg-[var(--color-main-text)] 
      focus:ring-[var(--color-main)]
      active:bg-[var(--color-main-text)]
    `,
    secondary: `
      bg-[var(--color-background)] text-[var(--color-body)]
      border-[var(--color-line)]
      hover:bg-[var(--color-line)] 
      focus:ring-[var(--color-main)]
      active:bg-[var(--color-disabled)]
    `,
    ghost: `
      bg-transparent text-[var(--color-main)]
      hover:bg-[var(--color-main-lightest)]
      focus:ring-[var(--color-main)]
      active:bg-[var(--color-main-lighter)]
    `,
    outline: `
      bg-transparent text-[var(--color-main)] 
      border-[var(--color-main)]
      hover:bg-[var(--color-main)] hover:text-white
      focus:ring-[var(--color-main)]
      active:bg-[var(--color-main-text)] active:text-white
    `,
    danger: `
      bg-[var(--color-danger)] text-white
      hover:bg-[var(--color-danger-light)]
      focus:ring-[var(--color-danger)]
      active:bg-[var(--color-danger-light)]
    `,
  };

  // 최종 클래스명 조합
  const buttonClass = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  // 클릭 핸들러
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      {/* 왼쪽 아이콘 또는 로딩 스피너 */}
      {loading ? (
        <Spinner size={size} />
      ) : (
        leftIcon && <span className='flex-shrink-0'>{leftIcon}</span>
      )}

      {/* 버튼 텍스트 */}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>

      {/* 오른쪽 아이콘 (로딩 중이 아닐 때만) */}
      {!loading && rightIcon && <span className='flex-shrink-0'>{rightIcon}</span>}
    </button>
  );
};

export default Button;
