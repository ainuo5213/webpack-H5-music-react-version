
export function formatTime(duration) {
    const minute = ("0" + Math.floor(duration / 60)).slice(-2);
    const second = ("0" + (Math.floor(duration % 60))).slice(-2);
    return minute + ":" + second;
}

export function getMinute(duration) {
    return Math.floor(duration / 60);
}

export function getSecond(duration) {
    return Math.floor(duration % 60);
}

export function getMillionSecond(duration) {
    let seconds = (duration % 60) + '';
    let zeroIndex = seconds.indexOf(".");
    if (zeroIndex < 0) return 0;
    let floatSeconds = +('0' + seconds.slice(zeroIndex));
    return Math.floor(floatSeconds * 100)
}
