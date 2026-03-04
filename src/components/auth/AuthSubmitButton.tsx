interface AuthSubmitButtonProps {
  label: string;
}

export default function AuthSubmitButton({ label }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full py-4 px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all"
    >
      {label}
    </button>
  );
}
