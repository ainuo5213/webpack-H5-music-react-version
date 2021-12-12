import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import styles from "./index.module.less"
import {musicContext} from "@/store";
import {formatTime} from "@/util/time";
import {toFix} from "@/util/math";
import {CURRENTTIME_CHANGED, NEXT_SONG} from "../../store/constants";
import classNames from "classnames";


export default function () {
    const {state: { currentTime, playingSong }, dispatch} = useContext(musicContext)
    const [isTouching, setIsTouching] = useState(false);
    const [deltaX, setDeltaX] = useState(0);
    const barRef = useRef(null);
    const lineRef = useRef(null);
    const dotRef = useRef(null);
    useEffect(() => {
        let percent = 100 - toFix(currentTime, playingSong.duration, 2) * 100;
        if (percent <= 0) {
            dispatch({ type: NEXT_SONG });
            return
        }
        barRef.current.style.transform = `translateX(-${percent}%)`
    }, [currentTime])
    const onProgressBarClick = e => {
        let lineConOffsetLeft = lineRef.current.offsetLeft;
        let lineConWidth = lineRef.current.scrollWidth;
        let currentClientX = e.clientX;
        let deltaX = currentClientX - lineConOffsetLeft;
        let percent = toFix(deltaX, lineConWidth, 2) * 100;
        dispatch({ type: CURRENTTIME_CHANGED, data: percent });
    }

    const onTouchStart = e => {
        e.stopPropagation();
        setIsTouching(true);
        if (e.touches.length && e.touches[0]) {
            let touchX = e.touches[0].clientX;
            let lineConOffsetLeft = lineRef.current.offsetLeft;
            let deltaX = touchX - lineConOffsetLeft;
            setDeltaX(deltaX);
        }
    }

    const onTouchMove = e => {
        e.stopPropagation();
        if (!isTouching) return;
        if (e.touches.length && e.touches[0]) {
            let touchX = e.touches[0].clientX;
            let lineConOffsetLeft = lineRef.current.offsetLeft;
            let deltaX = touchX - lineConOffsetLeft;
            let percent = 100 - toFix(currentTime, playingSong.duration, 2) * 100;
            console.log(percent)
            barRef.current.style.transform = `translateX(-${percent}%)`
            setDeltaX(deltaX);
        }
    }

    const onTouchEnd = e => {
        e.stopPropagation();
        let lineConWidth = lineRef.current.scrollWidth;
        let percent = toFix(deltaX, lineConWidth, 2) * 100;
        dispatch({ type: CURRENTTIME_CHANGED, data: percent });
    }

    return (
        <div className={styles.progress_con}>
            <div className={styles.current_time}>{formatTime(currentTime)}</div>
            <div className={styles.progress_line} ref={lineRef} onClick={onProgressBarClick}>
                <div className={styles.current_progress_line_con} ref={barRef}>
                    <div ref={dotRef} className={classNames(styles.dot)}
                         onTouchStart={onTouchStart}
                         onTouchMove={onTouchMove}
                         onTouchEnd={onTouchEnd}
                    />
                    <div className={styles.current_progress_line}/>
                </div>
                <div className={styles.total_progress_line}/>
            </div>
            <div className={styles.total_time}>{formatTime(playingSong.duration)}</div>
        </div>
    )
}