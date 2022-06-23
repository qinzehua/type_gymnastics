export {};

type tuple = [1, 2, 3, 4];
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushRes = Push<tuple, 1>; // [1, 2, 3, 4, 1]

type tuple1 = ["A", "B", 9];
type Zip<One extends unknown[], Tow extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRes
]
  ? Tow extends [infer TowFirst, ...infer TowRes]
    ? [[OneFirst, TowFirst], ...Zip<OneRes, TowRes>]
    : []
  : [];
type zip = Zip<tuple, tuple1>; // [[1, "A"], [2, "B"], [3, "C"]]

type CapitalizeStr<Str extends string> =
  Str extends `${infer Prefix}${infer Res}`
    ? `${Uppercase<Prefix>}${Res}`
    : Str;
type upper = CapitalizeStr<"qzh">;

type UpperFirst<T extends string> = T extends `${infer First}${infer Res}`
  ? `${Uppercase<First>}${Res}`
  : never;
type CamelCase<T extends string> =
  T extends `${infer Left}_${infer Right}${infer Res}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Res>}`
    : T;
type cs = CamelCase<UpperFirst<"xyzabc_def_ghi_uvw">>; // "XyzabcDefGhiUvw"

type DropSubStr<
  Str extends string,
  Sub extends string
> = Str extends `${infer Prefix}${Sub}${infer Res}`
  ? DropSubStr<`${Prefix}${Res}`, Sub>
  : Str;

type ds = DropSubStr<"hello!!~~~~", "!">; // hello~~~~

type AppendArgument<Func extends Function, Arg extends number> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...as: [...Args, Arg]) => ReturnType
  : never;

type nf = AppendArgument<(name: string) => string, number>; // (as_0: string, as_1: number) => string

type obj = {
  name: string;
  age: number;
  gender: boolean;
};

type Mapping<T> = {
  [K in keyof T]: [T[K], T[K]];
};

type ks = Mapping<obj>; /*{
                        name: [string, string];
                        age: [number, number];
                        gender: [boolean, boolean];
                      } */

type UpperKey<T extends object> = {
  [Key in keyof T as UpperFirst<Key & string>]: T[Key];
};

type uks = UpperKey<obj>; /*{
                            Name: string;
                            Age: number;
                            Gender: boolean;
                          }*/

type Record<K extends number, T> = { [x in K]: T };
type oo = Record<number, number>;

type FilterByValue<Obj extends object, ValuType> = {
  [Key in keyof Obj as Obj[Key] extends ValuType ? Key : never]: Obj[Key];
};

type FilterRes = FilterByValue<obj, number>; /* {
                                                age: number;
                                              }*/
