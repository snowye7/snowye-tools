declare global {
    interface Array<T> {
        with(this: T[], index: number, value: T): T[]
        toReversed(this: T[]): T[]
        toShifted(this: T[]): T[]
        toPopped(this: T[]): T[]
        toSorted(this: T[], compareFn?: (a: T, b: T) => number): T[]
        toDeduplicated(this: T[], compareFn?: (a: T, b: T) => boolean): T[]
        toSpliced(this: T[], start: number, deleteCount?: number, ...items: T[]): T[]
        toPushed(this: T[], ...items: T[]): T[]
        toUnshifted(this: T[], ...items: T[]): T[]
        toExchange(this: T[], a: number, b: number): T[]
        at(this: T[], index: number): T | undefined
    }
}

export function extendArrayPureFunction() {
    if (!Array.prototype.hasOwnProperty("with")) {
        class A {
            static with<T>(this: T[], index: number, value: T): T[] {
                if (!Number.isInteger(index) || index >= this.length || index < this.length * -1) {
                    throw new RangeError(`Invalid index : ${index}`)
                }
                const $ = [...this]
                $[index >= 0 ? index : this.length + index] = value
                return $
            }
        }
        Array.prototype.with = A.with
    }
    if (!Array.prototype.hasOwnProperty("toReversed")) {
        const toReversed = function <T>(this: T[]): T[] {
            const $ = [...this]
            $.reverse()
            return $
        }
        Array.prototype.toReversed = toReversed
    }
    if (!Array.prototype.hasOwnProperty("toShifted")) {
        const toShifted = function <T>(this: T[]): T[] {
            const $ = [...this]
            $.shift()
            return $
        }
        Array.prototype.toShifted = toShifted
    }
    if (!Array.prototype.hasOwnProperty("toPopped")) {
        const toPopped = function <T>(this: T[]): T[] {
            const $ = [...this]
            $.pop()
            return $
        }
        Array.prototype.toPopped = toPopped
    }
    if (!Array.prototype.hasOwnProperty("toSorted")) {
        const toSorted = function <T>(this: T[], compareFn?: (a: T, b: T) => number): T[] {
            const $ = [...this]
            $.sort(compareFn)
            return $
        }
        Array.prototype.toSorted = toSorted
    }
    if (!Array.prototype.hasOwnProperty("toDeduplicated")) {
        const toDeduplicated = function <T>(this: T[], compareFn?: (a: T, b: T) => boolean): T[] {
            if (!compareFn) return Array.from(new Set(this))
            const $: T[] = []
            this.forEach(item => {
                if ($.some(it => compareFn(item, it))) return
                $.push(item)
            })
            return $
        }
        Array.prototype.toDeduplicated = toDeduplicated
    }
    if (!Array.prototype.hasOwnProperty("toSpliced")) {
        const toSpliced = function <T>(this: T[], start: number, deleteCount?: number, ...items: T[]): T[] {
            const $ = [...this]
            if (deleteCount === undefined) {
                $.splice(start)
            } else {
                $.splice(start, deleteCount, ...items)
            }
            return $
        }
        Array.prototype.toSpliced = toSpliced
    }
    if (!Array.prototype.hasOwnProperty("toPushed")) {
        const toPushed = function <T>(this: T[], ...items: T[]): T[] {
            const $ = [...this]
            $.push(...items)
            return $
        }
        Array.prototype.toPushed = toPushed
    }
    if (!Array.prototype.hasOwnProperty("toUnshifted")) {
        const toUnshifted = function <T>(this: T[], ...items: T[]): T[] {
            const $ = [...this]
            $.unshift(...items)
            return $
        }
        Array.prototype.toUnshifted = toUnshifted
    }
    if (!Array.prototype.hasOwnProperty("toExchange")) {
        const toExchange = function <T>(this: T[], a: number, b: number): T[] {
            return this.with(a, this[b]).with(b, this[a])
        }
        Array.prototype.toExchange = toExchange
    }
    if (!Array.prototype.hasOwnProperty("at")) {
        const at = function <T>(this: T[], index: number): T | undefined {
            if (!Number.isInteger(index)) {
                throw new RangeError(`Invalid index : ${index}`)
            }
            return this[index >= 0 ? index : this.length + index]
        }
        Array.prototype.at = at
    }
}
