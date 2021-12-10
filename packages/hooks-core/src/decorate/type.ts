import type { Merge } from 'type-fest'
import { AsyncFunction } from '../'

export type ArrayToObject<T, R = {}> = T extends [infer First, ...infer Rest]
  ? First extends PromiseLike<infer PromiseValue>
    ? PromiseValue
    : First extends object
    ? Merge<First, ArrayToObject<Rest, R>>
    : ArrayToObject<Rest, R>
  : R

export type DecorateHandler<
  Input extends object | void,
  Handler extends AsyncFunction
> = (
  ...args: Input extends void
    ? Parameters<Handler>
    : [input: Input, ...args: Parameters<Handler>]
) => ReturnType<Handler>

export enum OperatorType {
  Trigger = 'Trigger',
  Middleware = 'Middleware',
}

export type DefineHelper = {
  setMetadata: (key: any, value: any) => void
  getMetadata: <T = any>(key: any) => T
}

export type ExecuteHelper = {
  next?: () => Promise<void>
  getInputArguments?: () => any[]
}

export type Operator<Input> = {
  name: string
  type?: Input
  input?: boolean
  metadata?: (helper: DefineHelper) => void
  execute?: (helper: ExecuteHelper) => Promise<void>
}

export type ExtractInputType<T> = {
  [key in keyof T]: T[key] extends Operator<any> ? T[key]['type'] : void
}
