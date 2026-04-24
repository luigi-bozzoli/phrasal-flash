import { useState, useEffect } from "react";
import { CreditCard, Sun, Moon, List } from "lucide-react";
import type { View } from "@/model/View";

interface HeaderProps {
    activeView: View;
    onViewChange: (view: View) => void;
}

export function Header({ activeView, onViewChange }: HeaderProps) {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const activeClasses = "bg-card text-foreground shadow-sm border border-border";
    const deactiveClasses = "text-muted-foreground hover:text-foreground";

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            setDark(saved === "dark");
        }
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
            <div className="px-4   sm:px-10 w-full flex h-14 items-center justify-between">

                {/* Logo */}
                <div>
                    <span className="font-serif text-xl tracking-tight text-foreground">
                        Phrasal<span className="text-brand">Flash</span>
                    </span>
                </div>

                {/* Tab switcher */}
                <nav className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                    <button
                        onClick={() => onViewChange("flashcard")}
                        aria-pressed={activeView === "flashcard"}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150
              ${activeView === "flashcard"
                                ? activeClasses
                                : deactiveClasses
                            }`}
                    >
                        <CreditCard
                            size={13}
                            className={activeView === "flashcard" ? "text-brand" : ""}
                        />
                        <span className="hidden sm:inline">Flashcards</span>
                    </button>

                    <button
                        onClick={() => onViewChange("listview")}
                        aria-pressed={activeView === "listview"}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150
              ${activeView === "listview"
                                ? activeClasses
                                : deactiveClasses
                            }`}
                    >
                        <List
                            size={13}
                            className={activeView === "listview" ? "text-brand" : ""}
                        />
                        <span className="hidden sm:inline">List view</span>
                    </button>
                </nav>

                {/* Theme toggle */}
                <button
                    onClick={() => setDark((d) => !d)}
                    aria-label="Toggle theme"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                >
                    {dark ? <Sun size={14} /> : <Moon size={14} />}
                </button>

            </div>
        </header>
    );
}