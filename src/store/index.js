import {createContext} from "react";
import {
    CANCEL_LIKE,
    INIT_SONG_LIST,
    LIKE,
    PAUSE_SONG,
    PLAY_SONG,
    TIME_UPDATED,
    PREV_SONG,
    NEXT_SONG,
    CURRENTTIME_CHANGED,
    SHOW_LIST,
    HIDE_LIST,
    CHANGE_SONG
} from "./constants";
import audioPlayer from "@/core/audio"

export const defaultState = {
    songs: [],
    playingSong: null,
    currentTime: 0,
    showList: false
};

export const musicContext = createContext(defaultState);

function getPrevIndex(currentIndex, length) {
    return currentIndex <= 0 ? length - 1 : currentIndex - 1;
}

function getNextIndex(currentIndex, length) {
    return currentIndex > length - 1 ? 0 : (currentIndex + 1) % length;
}

export const reducer = (state, payload) => {
    switch (payload.type) {
        case INIT_SONG_LIST:
            state.songs.push(...payload.data);
            state.playingSong = payload.data[0];
            audioPlayer.setupAudio(payload.data[0])
            return {
                ...state
            };
        case PAUSE_SONG:
            audioPlayer.pause();
            return {
                ...state
            }
        case PLAY_SONG:
            audioPlayer.play();
            return {
                ...state
            }
        case TIME_UPDATED:
            state.currentTime = audioPlayer.currentTime;
            return {
                ...state
            }
        case LIKE:
            state.playingSong.isLike = true;
            return {
                ...state
            }
        case CANCEL_LIKE:
            state.playingSong.isLike = false;
            return {
                ...state
            }
        case PREV_SONG:
            {
                state.currentTime = 0;
                state.playingSong = state.songs[getPrevIndex(state.songs.findIndex(r => r.id === state.playingSong.id), state.songs.length)];
                const isPlaying = audioPlayer.isPlaying;
                audioPlayer.setupAudio(state.playingSong);
                if (isPlaying) {
                    audioPlayer.play();
                }
                return {
                    ...state
                }
            }
        case CHANGE_SONG:
        {
            state.currentTime = 0;
            let idx = state.songs.findIndex(r => r.id === payload.data);
            state.playingSong = state.songs[idx];
            const isPlaying = audioPlayer.isPlaying;
            audioPlayer.setupAudio(state.playingSong);
            if (isPlaying) {
                audioPlayer.play();
            }
            return {
                ...state
            }
        }
        case NEXT_SONG:
        {
            state.currentTime = 0;
            state.playingSong = state.songs[getNextIndex(state.songs.findIndex(r => r.id === state.playingSong.id), state.songs.length)];
            const isPlaying = audioPlayer.isPlaying;
            audioPlayer.setupAudio(state.playingSong);
            if (isPlaying) {
                audioPlayer.play();
            }
            return {
                ...state
            }
        }
        case CURRENTTIME_CHANGED:
            state.currentTime = Math.floor(state.playingSong.duration * (payload.data / 100));
            audioPlayer.currentTime = state.currentTime;
            return {
                ...state
            }
        case SHOW_LIST:
            state.showList = true;
            return {
                ...state
            }
        case HIDE_LIST:
            state.showList = false;
            return {
                ...state
            }
        default:
            return state;
    }
}