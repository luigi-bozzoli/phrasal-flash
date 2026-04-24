import { Shuffle } from "lucide-react";

interface ShuffleButtonProps {
    onShuffle: () => void;
}

export function ShuffleButton({ onShuffle }: ShuffleButtonProps) {
    return (
        <button
            onClick={onShuffle}
            aria-label="Shuffle verbs"
            className="flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground transition-all duration-150 hover:border-brand/50 hover:text-foreground active:scale-95"
        >
            <Shuffle size={12} />
            <span>Shuffle</span>
        </button>
    );
}