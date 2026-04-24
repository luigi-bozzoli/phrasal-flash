const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface VerbLetterFilterProps {
    activeLetter: string | null;
    onSelect: (letter: string) => void;
}

export function VerbLetterFilter({
    activeLetter,
    onSelect,
}: VerbLetterFilterProps) {
    return (
        <div className="w-full space-y-2">
            {/* Label */}
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Filter by letter
            </p>
            {/* Letter grid */}
            <div className="flex flex-wrap gap-1.5">
                {ALPHABET.map((letter) => {
                    const active = activeLetter === letter;

                    return (
                        <button
                            key={letter}
                            onClick={() => onSelect(letter)}
                            aria-pressed={active}
                            className={`h-7 w-7 rounded-md border text-xs font-medium transition-all duration-150
                              ${active
                                    ? "border-brand bg-brand text-white"
                                    : "border-border bg-muted text-muted-foreground hover:border-brand/50 hover:text-foreground"
                                }`}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}