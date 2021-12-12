import React, {useCallback, useContext, useEffect, useRef} from "react"
import styles from "./index.module.less"
import classNames from "classnames";
import {musicContext} from "@/store";
import {HIDE_LIST, CHANGE_SONG} from "@/store/constants";
import commonStyles from "@/index.module.less";
import { filterImage, createImage } from "@/util/image";

const SongItem = function (props) {
    const {dispatch} = useContext(musicContext)
    const onSongItemClick = () => {
        dispatch({ type: CHANGE_SONG, data: props.data.id });
    }
    return (
        <li onClick={onSongItemClick} className={classNames({
            [styles.song_li]: true,
            [styles.active]: props.data.isPlaying
        })}>{props.data.name}</li>
    )
}

export default function () {
    const listConRef = useRef(null);
    const {state, dispatch} = useContext(musicContext);

    useEffect(() => {
        if (state.showList) {
            listConRef.current.classList.add(styles.showing);
        }
        else {
            listConRef.current.classList.remove(styles.showing);
        }
    }, [state.showList])

    const onCloseBtnClick = useCallback(() => {
        dispatch({ type: HIDE_LIST });
    }, []);

    return (
        <>
            { state.showList && <div className={styles.mask} onClick={onCloseBtnClick}/>}
            <div className={classNames(styles.song_con)} ref={listConRef}>
                <div className={styles.song_title}>播放列表</div>
                <ul className={styles.song_ul}>
                    {
                        state.songs.map(r => <SongItem key={r.id} data={{ ...r, isPlaying: r.id === state.playingSong.id }}/>)
                    }
                </ul>
                <div className={styles.close} onClick={onCloseBtnClick}>关闭</div>
            </div>
        </>
    )
}