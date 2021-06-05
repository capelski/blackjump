export type Dictionary<TValue, TKey extends string | number | symbol = string> = {
    [key in TKey]: TValue;
};
