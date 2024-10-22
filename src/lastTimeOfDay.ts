import dayjs from "dayjs"

/**
 * 获取当天的最后时间
 * @param time 时间戳
 * @returns 最后一秒的时间戳
 */
export function lastTimeOfDay(time: number) {
    return dayjs(dayjs(time).format("YYYY-MM-DD")).valueOf() + 24 * 60 * 60 * 1000 - 1
}
