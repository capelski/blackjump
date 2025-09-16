import { AudioPlayer } from 'expo-audio';
import { Dictionary } from './types';

export const cartesianProduct = <T, U, R>(
  firstArray: T[],
  secondArray: U[],
  elementBuilder: (t: T, u: U) => R,
): R[] => {
  return firstArray.reduce<R[]>((product, x) => {
    return product.concat(secondArray.map((y) => elementBuilder(x, y)));
  }, []);
};

export const getAbsoluteMax = (numbers: number[]) =>
  Math.ceil(numbers.reduce((reduced, next) => Math.max(reduced, Math.abs(next)), Number.MIN_VALUE));

export const getObjectKeys = <T extends string | number | symbol>(object: { [key in T]: any }) =>
  Object.keys(object) as T[];

export const getPrimeFactors = (number: number) => {
  const factors: number[] = [];
  let divisor = 2;

  while (number >= 2) {
    if (number % divisor == 0) {
      factors.push(divisor);
      number = number / divisor;
    } else {
      divisor++;
    }
  }
  return factors.reverse();
};

export const getRandomItem = <T>(items: T[]) =>
  items[Math.round(Math.random() * (items.length - 1))];

export const playSound = (audio: AudioPlayer) => {
  audio.seekTo(0);
  audio.play();
};

export const removeDuplicates = (numbers: number[]): number[] => {
  const numbersDictionary = numbers.reduce<Dictionary<number>>(
    (dictionary, next) => ({ ...dictionary, [next]: next }),
    {},
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
