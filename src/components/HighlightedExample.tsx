

export function HighlightedExample({ text }: { text: string }) {
    const parts = text.split(/(\[[^\]]+\])/g);
    return (
        <span>
            {parts.map((part, i) =>
                part.startsWith("[") && part.endsWith("]") ? (
                    <span key={i} className="font-medium text-brand">
                        {part.slice(1, -1)}
                    </span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
}