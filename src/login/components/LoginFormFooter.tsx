import { Paths } from '../../routes/paths';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import AuthProviderDivider from '../../components/auth/AuthProviderDivider';
import AuthSwitchPrompt from '../../components/auth/AuthSwitchPrompt';

interface LoginFormFooterProps {
  onSwitch?: () => void;
  onNavigateRegister: (path: string) => void;
}

export default function LoginFormFooter({ onSwitch, onNavigateRegister }: LoginFormFooterProps) {
  return (
    <>
      <AuthProviderDivider text="או התחברו באמצעות" />

      <GoogleAuthButton />

      <AuthSwitchPrompt
        prefix="אין לך חשבון?"
        actionText="הרשם כאן"
        onAction={() => (onSwitch ? onSwitch() : onNavigateRegister(`/${Paths.register}`))}
      />
    </>
  );
}
