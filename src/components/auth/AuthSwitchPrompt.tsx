interface AuthSwitchPromptProps {
  prefix: string;
  actionText: string;
  onAction: () => void;
}

export default function AuthSwitchPrompt({ prefix, actionText, onAction }: AuthSwitchPromptProps) {
  return (
    <div className="text-center pt-4">
      <p className="text-gray-500 font-medium">
        {prefix}{' '}
        <button type="button" onClick={onAction} className="text-cyan-600 font-bold hover:underline">
          {actionText}
        </button>
      </p>
    </div>
  );
}
