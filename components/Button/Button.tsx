interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({ primary = false, size = 'medium', label, ...props }: ButtonProps) => {
  const mode = primary
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50';

  const sizeClass = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  }[size];

  return (
    <button
      type='button'
      className={`rounded-md font-medium transition-colors duration-200 ${mode} ${sizeClass}`}
      {...props}
    >
      {label}
    </button>
  );
};
