import type { PhrasalVerb } from "@/model/PhrasalVerb";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { HighlightedExample } from "./HighlightedExample";

export function VerbRow({ verb }: { verb: PhrasalVerb }) {
    const [expanded, setExpanded] = useState(false);

    const hasMore =
        verb.descriptions.length > 1 ||
        (verb.highlighted_examples?.length ?? 0) > 1 ||
        (verb.synonyms?.length ?? 0) > 1;

    return (
        <div className="border-b border-border/50 last:border-none">
            <button
                disabled={!hasMore}
                onClick={() => setExpanded((e) => !e)}
                className="flex w-full flex-col gap-2 rounded-md px-2 py-3 text-left transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:gap-3"
            >
                <div className="flex w-full items-start justify-between gap-2 sm:w-auto sm:min-w-32.5">
                    <span className="font-medium text-sm text-foreground">
                        {verb.verb}
                    </span>

                    {/* Icon only on mobile (kept aligned right) */}
                    {hasMore && (
                        <span className="shrink-0 text-muted-foreground/60 sm:hidden">
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                    )}
                </div>

                {/* Description */}
                <span className="flex-1 text-sm leading-relaxed text-muted-foreground sm:line-clamp-2">
                    {verb.descriptions[0]}
                </span>

                {/* Icon for sm+ */}
                {hasMore && (
                    <span className="hidden shrink-0 text-muted-foreground/60 sm:block">
                        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                )}
            </button>

            {/* Collapsed preview: one example + one synonym */}
            {!expanded && (
                <div className="mb-3 ml-1 space-y-1.5 px-1">
                    {verb.highlighted_examples?.[0] && (
                        <p className="text-xs italic text-muted-foreground leading-relaxed">
                            <HighlightedExample text={verb.highlighted_examples[0]} />
                        </p>
                    )}
                    {verb.synonyms?.[0] && (
                        <div className="flex flex-wrap gap-1">
                            <span className="rounded-full border border-brand/30 bg-brand-muted/20 px-2 py-0.5 text-[11px] font-medium text-brand-text dark:text-brand">
                                {verb.synonyms[0]}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Expanded: all descriptions, examples, synonyms */}
            {expanded && (
                <div className="mb-3 ml-1 space-y-3 px-1 pb-1">
                    {/* All descriptions */}
                    {verb.descriptions.length > 0 && (
                        <div className="space-y-1">
                            {verb.descriptions.map((d, i) => (
                                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                                    {verb.descriptions.length > 1 && (
                                        <span className="mr-1.5 font-medium text-brand text-xs">
                                            {i + 1}.
                                        </span>
                                    )}
                                    {d}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* All examples */}
                    {(verb.highlighted_examples?.length ?? 0) > 0 && (
                        <div className="space-y-1.5 border-l-2 border-brand/30 pl-3">
                            {verb.highlighted_examples!.map((ex, i) => (
                                <p key={i} className="text-xs italic text-muted-foreground leading-relaxed">
                                    <HighlightedExample text={ex} />
                                </p>
                            ))}
                        </div>
                    )}

                    {/* All synonyms */}
                    {(verb.synonyms?.length ?? 0) > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-1">
                            {verb.synonyms!.map((s) => (
                                <span
                                    key={s}
                                    className="rounded-full border border-brand/30 bg-brand-muted/20 px-2 py-0.5 text-[11px] font-medium text-brand-text dark:text-brand"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
