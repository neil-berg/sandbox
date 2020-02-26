const obj1 = {
    name: 'Neil',
    age: 32
}
const obj2 = {
    name: 'Neil',
    age: 32
}

describe('ToBe vs ToEqual', () => {
    test('the have the same properties', () => {
        expect(obj1).toEqual(obj2);
    })
    test('they are not the same objects', () => {
        expect(obj1).not.toBe(obj2);
    })
})