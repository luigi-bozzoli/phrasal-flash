import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { VerbLetterFilter } from "../components/VerbLetterFilter";
import type { PhrasalVerb } from "@/model/PhrasalVerb";
import { FlashCard } from "../components/FlashCard";
import { ShuffleButton } from "../components/ShuffleButton";


interface FlashcardViewProps {
    dataBasePath?: string;
}

export function FlashcardView({ dataBasePath = `${import.meta.env.BASE_URL}/phrasal_verbs` }: FlashcardViewProps) {

    const [activeLetter, setActiveLetter] = useState<string>("A");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [deck, setDeck] = useState<PhrasalVerb[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Load JSON whenever the letter changes
    useEffect(() => {
        if (!activeLetter) return;

        let cancelled = false;
        setLoading(true);
        setError(null);
        setDeck([]);

        fetch(`${dataBasePath}/${activeLetter.toLowerCase()}.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`No data found for letter ${activeLetter}`);
                return res.json() as Promise<PhrasalVerb[]>;
            })
            .then((data) => {
                if (!cancelled) setDeck(data);
            })
            .catch(() => setDeck([]))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [activeLetter, dataBasePath]);

    const handleShuffle = useCallback(() => {
        setDeck((prev) => {
            const arr = [...prev];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        });
        setCurrentIndex(0);
        setIsFlipped(false);
    }, []);

    // Reset to first card and unflip whenever deck changes
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [activeLetter]);

    // Unflip when navigating
    function goTo(index: number) {
        setIsFlipped(false);
        // Small delay so the unflip doesn't clash with the new content appearing
        setTimeout(() => setCurrentIndex(index), 150);
    }

    function handlePrev() {
        goTo(currentIndex === 0 ? deck.length - 1 : currentIndex - 1);
    }

    function handleNext() {
        goTo(currentIndex === deck.length - 1 ? 0 : currentIndex + 1);
    }

    function handleLetterSelect(letter: string) {
        setActiveLetter(letter);
    }

    const current = deck[currentIndex];


    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
            <VerbLetterFilter
                activeLetter={activeLetter}
                onSelect={handleLetterSelect}
            />

            {!loading && deck.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        No verbs found for&nbsp;
                        <span className="text-brand">{activeLetter}</span>
                    </p>
                </div>
            )}

            {deck.length > 0 && current && (
                <>
                    <FlashCard
                        verb={current}
                        isFlipped={isFlipped}
                        onFlip={() => setIsFlipped((f) => !f)}
                    />

                    {/* Navigation */}
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5">

                        {/* Controls group */}
                        <div className="flex items-center gap-3 sm:gap-5">

                            <button
                                onClick={handlePrev}
                                aria-label="Previous card"
                                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground active:scale-95"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <span className="min-w-14 sm:min-w-16 text-center text-xs sm:text-sm tabular-nums text-muted-foreground">
                                {currentIndex + 1}
                                <span className="mx-1 text-muted-foreground/40">/</span>
                                {deck.length}
                            </span>

                            <button
                                onClick={handleNext}
                                aria-label="Next card"
                                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground active:scale-95"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>

                        {/* Divider (hidden on mobile to reduce clutter) */}
                        <div className="hidden sm:block h-5 w-px bg-border" />

                        {/* Shuffle action */}
                        <div className="w-full sm:w-auto flex justify-center">
                            <ShuffleButton onShuffle={handleShuffle} />
                        </div>
                    </div>
                </>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Loading verbs…</span>
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="py-12 text-center text-sm text-muted-foreground">
                    {error}
                </div>
            )}

        </div>
    );
}