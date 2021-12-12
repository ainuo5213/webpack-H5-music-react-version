import React, {useCallback, useContext} from "react"
import styles from "./index.module.less"
import commonStyles from "@/index.module.less"
import classNames from "classnames";
import {PAUSE_SONG, PLAY_SONG, CANCEL_LIKE, LIKE, PREV_SONG, NEXT_SONG, SHOW_LIST} from "@/store/constants"
import likePng from "@/assets/images/icon-like.png"
import likingPng from "@/assets/images/icon-like-solid.png"
import prevPng from "@/assets/images/icon-prev.png"
import playPng from "@/assets/images/icon-play.png"
import pausePng from "@/assets/images/icon-pause.png"
import nextPng from "@/assets/images/icon-next.png"
import listPng from "@/assets/images/icon-playlist.png"
import {musicContext} from "@/store";
import audioPlayer from "@/core/audio";

const ControlMenuItem = function (props) {
    return (
        <li onClick={props.onClick} className={classNames(styles.control_li, commonStyles.center)}>
            <img className={styles.control_icon} src={props.data.src} alt="图片"/>
        </li>
    )
}

export default function () {
    const {state, dispatch} = useContext(musicContext)
    const onPlayBtnClick = useCallback(() => {
        dispatch({type: PLAY_SONG})
    }, [])

    const onPauseBtnClick = useCallback(() => {
        dispatch({type: PAUSE_SONG})
    }, [])

    const onLikingBtnClick = useCallback(() => {
        dispatch({type: CANCEL_LIKE});
    }, []);

    const onLikeBtnClick = useCallback(() => {
        dispatch({type: LIKE});
    }, []);

    const onPrevBtnClick = useCallback(() => {
        dispatch({type: PREV_SONG});
    }, []);

    const onNextBtnClick = useCallback(() => {
        dispatch({type: NEXT_SONG});
    }, []);

    const onSongListBtnClick = useCallback(() => {
        dispatch({type: SHOW_LIST});
    }, []);

    return (
        <div className={styles.control_con}>
            <ul className={styles.control_ul}>
                {
                    state.playingSong.isLike
                        ?
                        <ControlMenuItem data={{src: likingPng}} onClick={onLikingBtnClick}/>
                        :
                        <ControlMenuItem data={{src: likePng}} onClick={onLikeBtnClick}/>
                }
                <ControlMenuItem data={{src: prevPng}} onClick={onPrevBtnClick}/>
                {
                    !audioPlayer.isPlaying
                        ?
                        <ControlMenuItem data={{src: playPng}} onClick={onPlayBtnClick}/>
                        :
                        <ControlMenuItem data={{src: pausePng}} onClick={onPauseBtnClick}/>
                }

                <ControlMenuItem data={{src: nextPng}} onClick={onNextBtnClick}/>
                <ControlMenuItem data={{src: listPng}} onClick={onSongListBtnClick}/>
            </ul>
        </div>
    )
}