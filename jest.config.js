// noinspection JSUnresolvedVariable
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFiles: ['jest-canvas-mock'],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
