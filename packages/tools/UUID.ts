export function uuid (sep: string = '-') {
    const baseTime = new Date()
    const token = baseTime.getDay() + baseTime.getHours()
        + baseTime.getMinutes() + baseTime.getSeconds() + baseTime.getMilliseconds() + Math.round(Math.random() * 10000)
    function randomString () {
        // noinspection TsLint
        return (((1 + Math.random()) * 0x10700) | 0).toString(16).substring(1)
    }
    return `${token}${sep}${randomString()}${sep}${randomString()}${sep}${randomString()}`
}
