import { Dictionary } from './types';

export const cartesianProduct = <T, U, R>(
    firstArray: T[],
    secondArray: U[],
    elementBuilder: (t: T, u: U) => R
): R[] => {
    return firstArray.reduce((product, x) => {
        return product.concat(secondArray.map((y) => elementBuilder(x, y)));
    }, [] as R[]);
};

export const removeDuplicates = (numbers: number[]): number[] => {
    const numbersDictionary = numbers.reduce<Dictionary<number>>(
        (dictionary, next) => ({ ...dictionary, [next]: next }),
        {}
    );
    return Object.keys(numbersDictionary).map((x) => numbersDictionary[x]);
};

export const shuffleArray = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};
