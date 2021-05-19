const { celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/random');

test('test celsiusToFahrenheit function', () => {
    const f = celsiusToFahrenheit(0)
    expect(f).toBe(32)
})

test('test fahrenheitToCelsius function', () => {
    const c = fahrenheitToCelsius(32)
    expect(c).toBe(0)
})

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000);
})

test('should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})