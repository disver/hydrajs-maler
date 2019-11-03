/**
 * global number sort
 * @author 4everlynn
 * @create October 30, 2019
 */
import Layout from '../core/src/layout/base/Layout'
import View from '../core/src/view/View'

export const sort = (left: number, right: number, order: string = 'asc'): 0 | 1 | -1 => {
    if (order === 'desc') {
        return left > right ? -1 : left === right ? 0 : 1
    } else if (order === 'asc') {
        return left > right ? 1 : left === right ? 0 : -1
    }
    return 0
}

export const merge = (left: object | undefined, right: object | undefined) => {
    const result = {}
    if (left !== undefined) {
        Object.assign(result, left)
    }
    if (right !== undefined) {
        Object.assign(result, right)
    }
    return result
}

export const sortView = (left: View, right: View) => {
    if (left instanceof Layout && !(right instanceof Layout)) {
        return -1
    }
    if (right instanceof Layout && !(left instanceof Layout)) {
        return 1
    }
    return sort(left.style.zIndex, right.style.zIndex)
}
