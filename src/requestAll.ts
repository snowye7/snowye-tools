/**
 * @function requestAll 请求所有数据
 * @param fn (pageNo: number, pageSize: number) => Promise<T>
 * @param pageSize 每页数据量 默认1000
 * @returns 数据数组
 */

export async function requestAll<T>(fn: (pageNo: number, pageSize: number) => Promise<{ total: number; list: T[] }>, pageSize: number = 1000) {
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
