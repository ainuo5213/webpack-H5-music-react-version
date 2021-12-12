class AudioPlayer {
    static _instance = new AudioPlayer();

    static getInstance() {
        return AudioPlayer._instance;
    }
    constructor() {
        this.audio = new Audio();
    }

    setupAudio(song) {
        this.song = song;
        this.audio.src = song.songUrl;
    }

    pause() {
        this.audio.pause()
    }

    play() {
        this.audio.play()
    }

    onTimeUpdated(cb) {
        this.audio.addEventListener("timeupdate", cb);
    }

    offTimeUpdated(cb) {
        this.audio.removeEventListener("timeupdate", cb);
    }

    get isPlaying() {
        return !this.audio.paused;
    }

    get currentTime() {
        return this.audio.currentTime;
    }

    set currentTime(value) {
        this.audio.currentTime = value;
    }
}

const audioPlayer = AudioPlayer.getInstance();

export default audioPlayer;