import { ClassValue, clsx as _clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 基于tailwind-merge的类名合并
 * @param inputs ClassValue[]
 * @returns 类名字符串
 */
export function clsx(...inputs: ClassValue[]) {
    return twMerge(_clsx(...inputs))
}
