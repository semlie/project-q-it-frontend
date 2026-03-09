interface AuthSubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export default function AuthSubmitButton({ label, disabled }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-4 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {label}
    </button>
  );
}
