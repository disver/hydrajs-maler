/**
 * global number sort
 * @author 4everlynn
 * @create October 30, 2019
 */
export const sort = (left: number, right: number, order: string = 'asc'): 0 | 1 | -1 => {
    if (order === 'desc') {
        return left > right ? -1 : left === right ? 0 : 1
    } else if (order === 'asc') {
        return left > right ? 1 : left === right ? 0 : -1
    }
    return 0
}
