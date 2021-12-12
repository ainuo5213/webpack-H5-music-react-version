function parseLyricLine(line) {
    const tiArAlByExp = /^\[(ti|ar|al|by|offset):(.*)\]$/
    const lyricExp = /^\[(\d{2}):(\d{2}).(\d{2})\](.*)/
    let result
    if ((result = line.match(tiArAlByExp)) !== null) {
        return {
            type: result[1],
            data: result[2]
        }
    } else if ((result = line.match(lyricExp)) !== null) {
        let time = +((Number(result[1]) * 60 + Number(result[2])) + "." + (Math.floor(result[3] * 1000) / 1000));
        return {
            type: 'lyric',
            data: {
                time,
                text: result[4].trim()
            }
        }
    }
}

export function parseLyric(lyric) {
    const lrcObj = {
        ti: '',
        ar: '',
        al: '',
        by: '',
        offset: '0',
        lrc: []
    };

    /*
        [ar:艺人名]
        [ti:曲名]
        [al:专辑名]
        [by:编者（指编辑LRC歌词的人）]
        [offset] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。
    */

    // 1.通过回车去分割歌词每一行,遍历数组，去除空行空格
    lyric.split("\n")
        .filter(value => value.trim() !== '')
        .forEach(value => {
            let text = value.trim();
            const line = parseLyricLine(text.trim())

            if (line.type === 'lyric') {
                lrcObj.lrc.push(line.data)
            } else {
                lrcObj[line.type] = line.data
            }
        })

    return lrcObj;
}

