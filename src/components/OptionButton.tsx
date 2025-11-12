interface OptionButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export default function OptionButton({
  text,
  variant,
  isSelected,
  onClick,
  disabled,
}: OptionButtonProps) {
  const baseClasses =
    'flex-1 flex items-center justify-center px-6 py-8 rounded-2xl text-center font-semibold text-lg md:text-xl transition-all duration-100 min-h-[44px] cursor-pointer';

  const variantClasses = isSelected
    ? variant === 'primary'
      ? 'bg-primary text-white shadow-lg scale-[0.98] border-2 border-primary'
      : 'bg-secondary text-white shadow-lg scale-[0.98] border-2 border-secondary'
    : 'bg-surface-light dark:bg-surface-dark-card text-text-dark dark:text-text-light border-2 border-neutral/30 dark:border-neutral/20 hover:scale-[1.02] hover:border-neutral/50 active:scale-[0.98]';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${
        disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <span className="leading-snug max-w-full break-words">{text}</span>
    </button>
  );
}
