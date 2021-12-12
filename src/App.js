import React, {useContext, useEffect} from "react"
import MusicImage from "./components/MusicImage"
import MusicInfo from "./components/MusicInfo"
import MusicLrc from "./components/MusicLrc"
import ProgressBar from "./components/ProgressBar"
import SongList from "./components/SongList"
import ControlMenu from "./components/ControlMenu"
import {musicContext} from "./store";
import {get} from "./util/http";
import {INIT_SONG_LIST, TIME_UPDATED} from "./store/constants";
import {withWrapPromise} from "./util/promise";
import audioPlayer from "./core/audio";


const wrapPromise = withWrapPromise();
export default function () {
    const {state, dispatch} = useContext(musicContext);
    wrapPromise(get("/static/data/index.json")
        .then(data => {
            if (!state.songs.length) {
                dispatch({type: INIT_SONG_LIST, data: data})
            }
        }));
    useEffect(() => {
        const onTimeUpdated = event => {
            dispatch({type: TIME_UPDATED});
        };
        audioPlayer.onTimeUpdated(onTimeUpdated)
        return () => {
            audioPlayer.offTimeUpdated(onTimeUpdated)
        }
    }, [state.playingSong.id])
    return (
        <React.Fragment>
            <MusicImage/>
            <MusicInfo/>
            <MusicLrc/>
            <ProgressBar/>
            <ControlMenu/>
            <SongList/>
        </React.Fragment>
    )
}