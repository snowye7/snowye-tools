import { ClassValue, clsx as _clsx } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

/**
 * 过滤对象中的null、undefined
 */
export function filterObject<T extends Record<string, any>>(props: T): Partial<T> {
    return Object.keys(props).reduce((prev, item) => {
        if (typeof props[item] === "undefined" || props[item] === null) {
            return { ...prev }
        }
        return { ...prev, [item]: props[item] }
    }, {})
}

export async function requestAll<T = any>(fn: (pageNo: number, pageSize: number) => Promise<{ total: number; list: T[] }>, pageSize: number = 1000) {
    let resultList: T[] = []
    const result = await fn(1, pageSize)
    if (!result) {
        return []
    }
    resultList = [...(result.list ?? [])]
    const pages = Math.ceil(result.total / pageSize)
    if (pages === 1) {
        return resultList
    }
    for (let i = 2; i <= pages; i++) {
        const result = await fn(i, pageSize)
        if (!result) {
            return []
        }
        resultList = [...resultList, ...(result.list ?? [])]
    }
    return resultList
}

/**
 * 获取当天的最后时间
 * @param time 时间戳
 */
export function lastTimeOfDay(time: number) {
    return dayjs(dayjs(time).format("YYYY-MM-DD")).valueOf() + 24 * 60 * 60 * 1000 - 1
}

/**
 * 类名的合并
 */
export function clsx(...inputs: ClassValue[]) {
    return twMerge(_clsx(...inputs))
}
