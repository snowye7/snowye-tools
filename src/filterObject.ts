/**
 * 过滤对象中的null、undefined
 * @param props Object
 * @returns Object
 */
export function filterObject<T extends Record<string, any>>(props: T): Partial<T> {
    return Object.keys(props).reduce((prev, item) => {
        if (typeof props[item] === "undefined" || props[item] === null) {
            return { ...prev }
        }
        return { ...prev, [item]: props[item] }
    }, {})
}
