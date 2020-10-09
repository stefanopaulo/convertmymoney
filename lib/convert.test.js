const convert = require('./convert')

test('converts cotacao 4 and quantidade 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('toDolar converts float', () => {
    expect(convert.toDolar('2')).toBe('$2.00')
})
