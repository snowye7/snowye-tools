import * as equal from "fast-deep-equal"

/**
 * 移除对象数组中的key value相同的重复项目
 * @param props 数组
 * @param compare 对象数组中比较的key 或 比较函数
 * @returns 去重后的数组
 */

export type CompareFunction<T> = (data: T) => unknown

export function removeDuplicate<T extends Record<string, any>, K extends keyof T>(props: T[], compare?: K | CompareFunction<T>): T[] {
    const result: T[] = []
    function getCompareResult(item: T) {
        return compare ? (typeof compare === "function" ? compare(item) : item[compare]) : item
    }
    props.forEach(item => {
        if (!result.some(r => equal(getCompareResult(item), getCompareResult(r)))) {
            result.push(item)
        }
    })
    return result
}
