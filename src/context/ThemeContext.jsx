import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Default: dark unless user explicitly chose light before
    const [dark, setDark] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "light") return false;
        return true; // dark by default
    });

    const [easterEgg, setEasterEgg] = useState(false);
    const toggleEasterEgg = () => setEasterEgg((e) => !e);

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, setDark, easterEgg, toggleEasterEgg }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
