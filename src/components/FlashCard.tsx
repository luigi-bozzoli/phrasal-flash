import { Card } from "@/components/ui/card";
import type { PhrasalVerb } from "@/model/PhrasalVerb";
import { HighlightedExample } from "./HighlightedExample";

interface FlashcardProps {
    verb: PhrasalVerb;
    isFlipped: boolean;
    onFlip: () => void;
}

export function FlashCard({ verb, isFlipped, onFlip }: FlashcardProps) {
    return (
        <div
            className="mx-auto w-full cursor-pointer"
            style={{ perspective: "1200px" }}
            onClick={onFlip}
            role="button"
            aria-label={isFlipped ? "Show verb" : "Reveal meaning"}
        >
            <div
                className="relative h-56 w-full transition-transform duration-500 sm:h-64"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front — verb */}
                <Card
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        phrasal verb
                    </span>
                    <span className="font-serif text-center text-4xl text-foreground sm:text-5xl">
                        {verb.verb}
                    </span>
                    <span className="text-xs text-muted-foreground/60">
                        tap to reveal meaning
                    </span>
                </Card>

                {/* Back — meaning + example */}
                <Card
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 border-brand/30 px-6"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <span className="text-xs font-medium uppercase tracking-widest text-brand">
                        meaning
                    </span>
                    <p className="text-center text-base font-medium leading-snug text-foreground sm:text-lg">
                        {verb.descriptions.length
                            ? verb.descriptions[0]
                            : null}
                    </p>
                    <p className="w-full rounded-lg bg-muted px-4 py-2.5 text-center text-sm italic leading-relaxed text-muted-foreground">
                        {verb.examples.length
                            ? <HighlightedExample text={verb.highlighted_examples[0]}></HighlightedExample>
                            : null}
                    </p>
                </Card>
            </div>
        </div>
    );
}