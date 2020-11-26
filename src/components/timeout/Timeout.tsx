import { useState } from "react";

export function useTimeout() {
    const [isTimerStarted, setTimerStarted] = useState<Boolean>(false);
    return (ms: number, action: Function) => {
        if (!isTimerStarted) {
            setTimerStarted(true);
            setTimeout(() => {
                action();
                setTimerStarted(false);
            }, ms);
        }
    }
}