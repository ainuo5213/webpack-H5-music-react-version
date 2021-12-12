import React, {useContext, useEffect, useRef} from "react"
import styles from "./index.module.less"
import classNames from "classnames";
import commonStyles from "@/index.module.less"
import {musicContext} from "@/store";
import {filterImage, createImage} from "@/util/image";
import audioPlayer from "@/core/audio";

export default function () {
    const { state } = useContext(musicContext);
    const imageRef = useRef(null);
    useEffect(() => {
        createImage(state.playingSong.albumImage)
            .then(image => {
                image.width = 200;
                image.height = 400;
                let filteredImageBase64 = filterImage(image)
                document.body.classList.add(commonStyles.blur)
                document.body.style.backgroundImage = `url(${filteredImageBase64})`;
            })
    }, [state.playingSong.id]);
    useEffect(() => {
        if (audioPlayer.isPlaying) {
            imageRef.current.classList.remove(styles.stop);
            imageRef.current.classList.add(styles.playing);
        } else {
            imageRef.current.classList.remove(styles.playing);
            imageRef.current.classList.add(styles.stop);
        }
    }, [audioPlayer.isPlaying]);
    return (
        <div ref={imageRef} className={classNames(styles.song_img_con, commonStyles.center, styles.animation, styles.stop)}>
            <img className={styles.song_img} src={state.playingSong.albumImage} alt=""/>
        </div>
    )
}