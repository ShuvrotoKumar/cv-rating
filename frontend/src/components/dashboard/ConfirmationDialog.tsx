import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{description}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl">
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="flex-1 rounded-xl">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
