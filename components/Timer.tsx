import { useEffect, useState } from "react";

type Params = {
    date: Date,
    onlySeconds: boolean,
    setTimeIsOver: () => {}
};

export default ({ date, onlySeconds, setTimeIsOver }: Params) => {
    const [finishTime] = useState(date.getTime());
    const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
    const [tick, setTick] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [timerId, setTimerID] = useState(0);

    useEffect(() => {
        const diff = (finishTime - new Date()) / 1000;
        if (diff < 0) {
            setIsTimeout(true);
            return;
        }
        setDiff([
        Math.floor(diff / 86400), // дни
        Math.floor((diff / 3600) % 24),
        Math.floor((diff / 60) % 60),
        Math.floor(diff % 60)
        ]);
    }, [tick, finishTime]);

    useEffect(() => {
        if (isTimeout) {
            clearInterval(timerId);
            setTimeIsOver(true);
        };
    }, [isTimeout, timerId]);

    useEffect(() => {
        const timerID = setInterval(() => {
        setTick( !tick );
        }, 1000);
        setTimerID( timerID );
        return () => clearInterval( timerID );
    }, [ tick ]);

    if ( onlySeconds ) {
        return (
            <> 
                {`${
                    diffM.toString().padStart(2, "0")
                }:${
                    diffS.toString().padStart(2, "0")
                }`}
            </>
        );
    } else {
        return (
            <>
                {`${
                    diffDays
                } дней ${
                    diffH.toString().padStart(2, "0")
                }:${
                    diffM.toString().padStart(2, "0")
                }:${
                    diffS.toString().padStart(2, "0")
                }`}
            </>
        );
    }
}