export function toFix(number, totalNumber, precision) {
    return Math.floor((number / totalNumber) * (10 ** precision)) / (10 ** precision)
}