import dayjs from "dayjs"

export function filterObject<T extends Record<string, any>>(props: T): Partial<T> {
    return Object.keys(props).reduce((prev, item) => {
        if (props[item]) {
            return { ...prev, [item]: props[item] }
        }
        return { ...prev }
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

export function lastTimeOfDay(time: number) {
    return dayjs(dayjs(time).format("YYYY-MM-DD")).valueOf() + 24 * 60 * 60 * 1000 - 1
}
