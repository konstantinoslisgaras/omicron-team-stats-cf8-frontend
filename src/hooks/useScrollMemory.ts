import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function useScrollMemory() {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if (navType !== "POP") {
            window.scrollTo(0, 0);
            return;
        }

        const saved = sessionStorage.getItem("scroll:" + location.key);
        if (!saved) return;

        const { x, y } = JSON.parse(saved);

        let tries = 0;
        const maxTries = 50;

        const restore = () => {
            if (document.body.scrollHeight >= y || tries >= maxTries) {
                window.scrollTo(x, y);
                return;
            }
            tries++;
            setTimeout(restore, 50);
        };

        restore();
    }, [location, navType]);

    useEffect(() => {
        const save = () => {
            sessionStorage.setItem(
                "scroll:" + location.key,
                JSON.stringify({ x: window.scrollX, y: window.scrollY })
            );
        };
        window.addEventListener("scroll", save, { passive: true });
        return () => window.removeEventListener("scroll", save);
    }, [location]);
}
