import React, {useContext} from "react"
import styles from "./index.module.less"
import {musicContext} from "../../store";

export default function () {
    const {state: { playingSong }} = useContext(musicContext)

    return (
        <div className={styles.song_info}>
            <p className={styles.name}>{playingSong.name}</p>
            <p className={styles.singer}>{playingSong.singer}</p>
            <p className={styles.album}>{playingSong.album}</p>
        </div>
    )
}