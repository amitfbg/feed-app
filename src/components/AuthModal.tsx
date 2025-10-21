import { useEffect } from "react";
import SignInPage from "../pages/SignInPage";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className={`
        fixed inset-0 z-20 flex items-center justify-center
        animate-[fadeIn_200ms_ease-out]
      `}
    >
      <div
        className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm
          animate-[fadeIn_300ms_ease-out]
        `}
        onClick={onClose}
      />
      <div
        className={`
          relative
          animate-[slideIn_300ms_ease-out]
        `}
        style={{
          animationFillMode: "forwards",
        }}
      >
        <SignInPage onClose={onClose} />
      </div>
    </div>
  );
}
