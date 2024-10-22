/**
 * 关于数字字符串的添加逗号
 * @param number 数字
 * @param commaPosition 从个位开始，每commaPosition位加一个逗号
 * @returns 添加完逗号的数字字符串
 */
export function addComma(number: number, commaPosition: number) {
    if (commaPosition <= 0) {
        return number.toString()
    }
    let result = ""
    const numberString = number.toString()
    let len = numberString.length
    while (len > 0) {
        if (len > commaPosition) {
            result = "," + numberString.slice(len - commaPosition, len) + result
        } else {
            result = numberString.slice(0, len) + result
        }
        len -= commaPosition
    }
    return result
}
