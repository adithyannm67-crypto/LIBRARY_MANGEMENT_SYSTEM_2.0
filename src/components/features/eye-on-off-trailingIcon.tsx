import { Eye, EyeOff } from "lucide-react";

interface EyeOnOffTrailingIconProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const EyeOnOffTrailingIcon = ({
  showPassword,
  setShowPassword,
}: EyeOnOffTrailingIconProps) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--muted-foreground)",
        display: "flex",
        padding: 0,
      }}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );
};

export default EyeOnOffTrailingIcon;
