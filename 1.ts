// Promise
type P = Promise<'QZH'>
type GetPromiseValueType<T> = T extends Promise<infer Value> ? Value : never
type ValueType = GetPromiseValueType<P> // 'QZH'

// 数组
type arr = [string,2,number]

type GetFirt<T> = T extends [infer First, ...infer Res] ? First : never
type GetShift<T> = T extends [infer First, ...infer Res] ? Res : never
type GetLast<T> = T extends [...infer Res, infer Last] ? Last : never
type GetPop<T> = T extends [...infer Res, infer Last] ? Res : never
type First = GetShift<arr> // [2, number]


// 字符串
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type s = StartWith<'hello world', 'hello'> //true

type ReplaceStr<Str extends string, From extends string, To extends string> =
 Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : never
type ns = ReplaceStr<'hello world !', 'world', 'nature'> //"hello nature !"

type TrimRight<Str extends string> = Str extends `${infer Prefix}${' ' | '\t' | '\n'}` ? TrimRight<Prefix> : Str
type TrimLeft<Str extends string> = Str extends `${' ' | '\t' | '\n'}${infer Suffix}` ? TrimLeft<Suffix> : Str
type Trim<Str extends string> = TrimLeft<TrimRight<Str>>
type trimStr = Trim<'   hello world !!   '> // hello world !!


// 函数
type GetParameters<T extends Function> = T extends (...args: infer Args) => infer R ? [Args, R] : ''
type params = GetParameters<(name: string, age: number) => number> // [[name: string, age: number], number]

//构造器
interface Person {
    name: string
}

interface PersonConstructor {
    new(...args: [string, number]): Person
}

type GetConstructorType<T extends new(...args: any[]) => any> = T extends new(...args: infer Args) => infer C? [C, Args]: never
type cc = GetConstructorType<PersonConstructor> // [Person, [string, number]]

// 索引
type GetRefProps<T> = 'ref' extends keyof T ?
                       T extends {ref?: infer Ref} ? Ref : never
                      :
                      never
type ref = GetRefProps<{ref: [string, Person]}> // [string, Person]

export {}