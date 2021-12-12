import React, {useContext, useEffect, useRef, useState} from "react"
import styles from "./index.module.less"
import {musicContext} from "../../store";
import {parseLyric} from "../../util/string";


export default function () {
    const {state: {playingSong, currentTime}} = useContext(musicContext)
    const [playingIndex, setPlayingIndex] = useState(0);
    const lrcRef = useRef(null);
    const [lrcObj, setLrcObj] = useState({
        ti: '',
        ar: '',
        al: '',
        by: '',
        offset: '0',
        lrc: [],
    });
    useEffect(() => {
        fetch(playingSong.lyrics)
            .then(res => res.text())
            .then(text => {
                const lrcObj = parseLyric(text);
                setLrcObj(lrcObj);
            })
    }, [playingSong.id]);

    const getCurrentLrc = currentTime => {
        currentTime = Math.floor(currentTime * 1000) / 1000
        const index = lrcObj.lrc.findIndex(r => {
            const {time} = r;
            return currentTime >= time - 0.1 && currentTime <= time + 0.1
        });
        if (index < 0) {
            return null;
        }
        return {
            index: index,
            currentLrcObj: lrcObj.lrc[index]
        }
    }
    useEffect(() => {
        let obj = getCurrentLrc(currentTime);
        if (obj === null) return;
        if (playingIndex === obj.index) return;
        setPlayingIndex(obj.index);
    }, [currentTime]);
    useEffect(() => {
        const vwUnit = 5;
        const offsetY = playingIndex * vwUnit;
        lrcRef.current.style.transform = `translate3d(0, -${offsetY}vw, 0)`
    }, [playingIndex]);
    return (
        <div className={styles.lrc_con}>
            <div className={styles.lrc_text_con} ref={lrcRef}>
                {
                    lrcObj.lrc.map(({time, text}) => <p key={time} className={styles.lrc_line}>{text}</p>)
                }
            </div>
        </div>
    )
}