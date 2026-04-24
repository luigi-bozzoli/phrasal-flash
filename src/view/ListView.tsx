import { useState, useEffect, useMemo } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { VerbLetterFilter } from "../components/VerbLetterFilter";
import type { PhrasalVerb } from "@/model/PhrasalVerb";
import { VerbRow } from "../components/VerbRow";


interface ListViewProps {
    dataBasePath?: string;
}

export function ListView({ dataBasePath = "/phrasal_verbs" }: ListViewProps) {
    const [activeLetter, setActiveLetter] = useState<string | null>("A");
    const [verbs, setVerbs] = useState<PhrasalVerb[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    // Load JSON whenever the letter changes
    useEffect(() => {
        if (!activeLetter) return;

        let cancelled = false;
        setLoading(true);
        setError(null);
        setVerbs([]);

        fetch(`${dataBasePath}/${activeLetter.toLowerCase()}.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`No data found for letter ${activeLetter}`);
                return res.json() as Promise<PhrasalVerb[]>;
            })
            .then((data) => {
                if (!cancelled) setVerbs(data);
            })
            .catch(() => setVerbs([]))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [activeLetter, dataBasePath]);

    // Client-side search filter within the loaded letter
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return verbs;
        return verbs.filter(
            (v) =>
                v.verb.toLowerCase().includes(q) ||
                v.descriptions.some((d) => d.toLowerCase().includes(q)) ||
                v.synonyms?.some((s) => s.toLowerCase().includes(q))
        );
    }, [verbs, search]);

    const handleLetterSelect = (letter: string | null) => {
        setSearch("");
        setActiveLetter(letter);
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-4 px-4 py-6">

            <VerbLetterFilter
                activeLetter={activeLetter}
                onSelect={handleLetterSelect}
            />

            {/* Search bar */}
            <div className="relative">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={
                        activeLetter
                            ? `Search in "${activeLetter}" verbs…`
                            : "Select a letter first"
                    }
                    disabled={!activeLetter || loading}
                    className="w-full rounded-lg border border-border bg-muted py-2 pl-8 pr-9 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-40"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X size={13} />
                    </button>
                )}
            </div>

            {/* Results area */}
            <div className="rounded-xl border border-border bg-card">

                {/* Section header */}
                {activeLetter && !loading && !error && (
                    <div className="flex items-baseline justify-between border-b border-border/60 px-4 py-3">
                        <span className="font-serif text-2xl text-brand">{activeLetter}</span>
                        <span className="text-xs text-muted-foreground">
                            {filtered.length} {filtered.length === 1 ? "verb" : "verbs"}
                        </span>
                    </div>
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

                {/* Empty state — no results for search */}
                {!loading && !error && filtered.length === 0 && search && (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        No verbs matching{" "}
                        <span className="font-medium text-foreground">"{search}"</span>
                    </div>
                )}

                {/* Empty state — no letter selected */}
                {!activeLetter && !loading && (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Select a letter above to browse verbs
                    </div>
                )}

                {/* Verb list */}
                {!loading && !error && filtered.length > 0 && (
                    <div className="divide-y-0 px-4">
                        {filtered.map((v) => (
                            <VerbRow key={v.verb} verb={v} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}