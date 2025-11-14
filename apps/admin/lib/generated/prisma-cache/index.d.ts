
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model GamePixGameCache
 * 
 */
export type GamePixGameCache = $Result.DefaultSelection<Prisma.$GamePixGameCachePayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>
/**
 * Model AiChatHistory
 * 
 */
export type AiChatHistory = $Result.DefaultSelection<Prisma.$AiChatHistoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more GamePixGameCaches
 * const gamePixGameCaches = await prisma.gamePixGameCache.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more GamePixGameCaches
   * const gamePixGameCaches = await prisma.gamePixGameCache.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.gamePixGameCache`: Exposes CRUD operations for the **GamePixGameCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GamePixGameCaches
    * const gamePixGameCaches = await prisma.gamePixGameCache.findMany()
    * ```
    */
  get gamePixGameCache(): Prisma.GamePixGameCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiChatHistory`: Exposes CRUD operations for the **AiChatHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiChatHistories
    * const aiChatHistories = await prisma.aiChatHistory.findMany()
    * ```
    */
  get aiChatHistory(): Prisma.AiChatHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    GamePixGameCache: 'GamePixGameCache',
    SyncLog: 'SyncLog',
    AiChatHistory: 'AiChatHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "gamePixGameCache" | "syncLog" | "aiChatHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      GamePixGameCache: {
        payload: Prisma.$GamePixGameCachePayload<ExtArgs>
        fields: Prisma.GamePixGameCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamePixGameCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamePixGameCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          findFirst: {
            args: Prisma.GamePixGameCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamePixGameCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          findMany: {
            args: Prisma.GamePixGameCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>[]
          }
          create: {
            args: Prisma.GamePixGameCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          createMany: {
            args: Prisma.GamePixGameCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GamePixGameCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>[]
          }
          delete: {
            args: Prisma.GamePixGameCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          update: {
            args: Prisma.GamePixGameCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          deleteMany: {
            args: Prisma.GamePixGameCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GamePixGameCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GamePixGameCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>[]
          }
          upsert: {
            args: Prisma.GamePixGameCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePixGameCachePayload>
          }
          aggregate: {
            args: Prisma.GamePixGameCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGamePixGameCache>
          }
          groupBy: {
            args: Prisma.GamePixGameCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<GamePixGameCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamePixGameCacheCountArgs<ExtArgs>
            result: $Utils.Optional<GamePixGameCacheCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
      AiChatHistory: {
        payload: Prisma.$AiChatHistoryPayload<ExtArgs>
        fields: Prisma.AiChatHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiChatHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiChatHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          findFirst: {
            args: Prisma.AiChatHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiChatHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          findMany: {
            args: Prisma.AiChatHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          create: {
            args: Prisma.AiChatHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          createMany: {
            args: Prisma.AiChatHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiChatHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          delete: {
            args: Prisma.AiChatHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          update: {
            args: Prisma.AiChatHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          deleteMany: {
            args: Prisma.AiChatHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiChatHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiChatHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          upsert: {
            args: Prisma.AiChatHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          aggregate: {
            args: Prisma.AiChatHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiChatHistory>
          }
          groupBy: {
            args: Prisma.AiChatHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiChatHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiChatHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<AiChatHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    gamePixGameCache?: GamePixGameCacheOmit
    syncLog?: SyncLogOmit
    aiChatHistory?: AiChatHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model GamePixGameCache
   */

  export type AggregateGamePixGameCache = {
    _count: GamePixGameCacheCountAggregateOutputType | null
    _avg: GamePixGameCacheAvgAggregateOutputType | null
    _sum: GamePixGameCacheSumAggregateOutputType | null
    _min: GamePixGameCacheMinAggregateOutputType | null
    _max: GamePixGameCacheMaxAggregateOutputType | null
  }

  export type GamePixGameCacheAvgAggregateOutputType = {
    quality_score: number | null
    width: number | null
    height: number | null
    importCount: number | null
    priority: number | null
  }

  export type GamePixGameCacheSumAggregateOutputType = {
    quality_score: number | null
    width: number | null
    height: number | null
    importCount: number | null
    priority: number | null
  }

  export type GamePixGameCacheMinAggregateOutputType = {
    id: string | null
    namespace: string | null
    title: string | null
    description: string | null
    category: string | null
    quality_score: number | null
    banner_image: string | null
    image: string | null
    url: string | null
    width: number | null
    height: number | null
    orientation: string | null
    date_published: Date | null
    date_modified: Date | null
    isImported: boolean | null
    importCount: number | null
    lastImportedAt: Date | null
    notes: string | null
    priority: number | null
    isHidden: boolean | null
    extractedMarkdown: string | null
    extractedAt: Date | null
    lastSyncAt: Date | null
    syncSource: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePixGameCacheMaxAggregateOutputType = {
    id: string | null
    namespace: string | null
    title: string | null
    description: string | null
    category: string | null
    quality_score: number | null
    banner_image: string | null
    image: string | null
    url: string | null
    width: number | null
    height: number | null
    orientation: string | null
    date_published: Date | null
    date_modified: Date | null
    isImported: boolean | null
    importCount: number | null
    lastImportedAt: Date | null
    notes: string | null
    priority: number | null
    isHidden: boolean | null
    extractedMarkdown: string | null
    extractedAt: Date | null
    lastSyncAt: Date | null
    syncSource: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GamePixGameCacheCountAggregateOutputType = {
    id: number
    namespace: number
    title: number
    description: number
    category: number
    quality_score: number
    banner_image: number
    image: number
    url: number
    width: number
    height: number
    orientation: number
    date_published: number
    date_modified: number
    isImported: number
    importCount: number
    lastImportedAt: number
    customTags: number
    notes: number
    priority: number
    isHidden: number
    extractedTags: number
    extractedMarkdown: number
    extractedVideos: number
    extractedScreenshots: number
    extractedAt: number
    lastSyncAt: number
    syncSource: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GamePixGameCacheAvgAggregateInputType = {
    quality_score?: true
    width?: true
    height?: true
    importCount?: true
    priority?: true
  }

  export type GamePixGameCacheSumAggregateInputType = {
    quality_score?: true
    width?: true
    height?: true
    importCount?: true
    priority?: true
  }

  export type GamePixGameCacheMinAggregateInputType = {
    id?: true
    namespace?: true
    title?: true
    description?: true
    category?: true
    quality_score?: true
    banner_image?: true
    image?: true
    url?: true
    width?: true
    height?: true
    orientation?: true
    date_published?: true
    date_modified?: true
    isImported?: true
    importCount?: true
    lastImportedAt?: true
    notes?: true
    priority?: true
    isHidden?: true
    extractedMarkdown?: true
    extractedAt?: true
    lastSyncAt?: true
    syncSource?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePixGameCacheMaxAggregateInputType = {
    id?: true
    namespace?: true
    title?: true
    description?: true
    category?: true
    quality_score?: true
    banner_image?: true
    image?: true
    url?: true
    width?: true
    height?: true
    orientation?: true
    date_published?: true
    date_modified?: true
    isImported?: true
    importCount?: true
    lastImportedAt?: true
    notes?: true
    priority?: true
    isHidden?: true
    extractedMarkdown?: true
    extractedAt?: true
    lastSyncAt?: true
    syncSource?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GamePixGameCacheCountAggregateInputType = {
    id?: true
    namespace?: true
    title?: true
    description?: true
    category?: true
    quality_score?: true
    banner_image?: true
    image?: true
    url?: true
    width?: true
    height?: true
    orientation?: true
    date_published?: true
    date_modified?: true
    isImported?: true
    importCount?: true
    lastImportedAt?: true
    customTags?: true
    notes?: true
    priority?: true
    isHidden?: true
    extractedTags?: true
    extractedMarkdown?: true
    extractedVideos?: true
    extractedScreenshots?: true
    extractedAt?: true
    lastSyncAt?: true
    syncSource?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GamePixGameCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePixGameCache to aggregate.
     */
    where?: GamePixGameCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePixGameCaches to fetch.
     */
    orderBy?: GamePixGameCacheOrderByWithRelationInput | GamePixGameCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GamePixGameCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePixGameCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePixGameCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GamePixGameCaches
    **/
    _count?: true | GamePixGameCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GamePixGameCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GamePixGameCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GamePixGameCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GamePixGameCacheMaxAggregateInputType
  }

  export type GetGamePixGameCacheAggregateType<T extends GamePixGameCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateGamePixGameCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamePixGameCache[P]>
      : GetScalarType<T[P], AggregateGamePixGameCache[P]>
  }




  export type GamePixGameCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GamePixGameCacheWhereInput
    orderBy?: GamePixGameCacheOrderByWithAggregationInput | GamePixGameCacheOrderByWithAggregationInput[]
    by: GamePixGameCacheScalarFieldEnum[] | GamePixGameCacheScalarFieldEnum
    having?: GamePixGameCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamePixGameCacheCountAggregateInputType | true
    _avg?: GamePixGameCacheAvgAggregateInputType
    _sum?: GamePixGameCacheSumAggregateInputType
    _min?: GamePixGameCacheMinAggregateInputType
    _max?: GamePixGameCacheMaxAggregateInputType
  }

  export type GamePixGameCacheGroupByOutputType = {
    id: string
    namespace: string
    title: string
    description: string
    category: string
    quality_score: number
    banner_image: string
    image: string
    url: string
    width: number
    height: number
    orientation: string
    date_published: Date
    date_modified: Date
    isImported: boolean
    importCount: number
    lastImportedAt: Date | null
    customTags: string[]
    notes: string | null
    priority: number
    isHidden: boolean
    extractedTags: string[]
    extractedMarkdown: string | null
    extractedVideos: string[]
    extractedScreenshots: string[]
    extractedAt: Date | null
    lastSyncAt: Date
    syncSource: string
    createdAt: Date
    updatedAt: Date
    _count: GamePixGameCacheCountAggregateOutputType | null
    _avg: GamePixGameCacheAvgAggregateOutputType | null
    _sum: GamePixGameCacheSumAggregateOutputType | null
    _min: GamePixGameCacheMinAggregateOutputType | null
    _max: GamePixGameCacheMaxAggregateOutputType | null
  }

  type GetGamePixGameCacheGroupByPayload<T extends GamePixGameCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamePixGameCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GamePixGameCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GamePixGameCacheGroupByOutputType[P]>
            : GetScalarType<T[P], GamePixGameCacheGroupByOutputType[P]>
        }
      >
    >


  export type GamePixGameCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namespace?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    quality_score?: boolean
    banner_image?: boolean
    image?: boolean
    url?: boolean
    width?: boolean
    height?: boolean
    orientation?: boolean
    date_published?: boolean
    date_modified?: boolean
    isImported?: boolean
    importCount?: boolean
    lastImportedAt?: boolean
    customTags?: boolean
    notes?: boolean
    priority?: boolean
    isHidden?: boolean
    extractedTags?: boolean
    extractedMarkdown?: boolean
    extractedVideos?: boolean
    extractedScreenshots?: boolean
    extractedAt?: boolean
    lastSyncAt?: boolean
    syncSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gamePixGameCache"]>

  export type GamePixGameCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namespace?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    quality_score?: boolean
    banner_image?: boolean
    image?: boolean
    url?: boolean
    width?: boolean
    height?: boolean
    orientation?: boolean
    date_published?: boolean
    date_modified?: boolean
    isImported?: boolean
    importCount?: boolean
    lastImportedAt?: boolean
    customTags?: boolean
    notes?: boolean
    priority?: boolean
    isHidden?: boolean
    extractedTags?: boolean
    extractedMarkdown?: boolean
    extractedVideos?: boolean
    extractedScreenshots?: boolean
    extractedAt?: boolean
    lastSyncAt?: boolean
    syncSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gamePixGameCache"]>

  export type GamePixGameCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namespace?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    quality_score?: boolean
    banner_image?: boolean
    image?: boolean
    url?: boolean
    width?: boolean
    height?: boolean
    orientation?: boolean
    date_published?: boolean
    date_modified?: boolean
    isImported?: boolean
    importCount?: boolean
    lastImportedAt?: boolean
    customTags?: boolean
    notes?: boolean
    priority?: boolean
    isHidden?: boolean
    extractedTags?: boolean
    extractedMarkdown?: boolean
    extractedVideos?: boolean
    extractedScreenshots?: boolean
    extractedAt?: boolean
    lastSyncAt?: boolean
    syncSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gamePixGameCache"]>

  export type GamePixGameCacheSelectScalar = {
    id?: boolean
    namespace?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    quality_score?: boolean
    banner_image?: boolean
    image?: boolean
    url?: boolean
    width?: boolean
    height?: boolean
    orientation?: boolean
    date_published?: boolean
    date_modified?: boolean
    isImported?: boolean
    importCount?: boolean
    lastImportedAt?: boolean
    customTags?: boolean
    notes?: boolean
    priority?: boolean
    isHidden?: boolean
    extractedTags?: boolean
    extractedMarkdown?: boolean
    extractedVideos?: boolean
    extractedScreenshots?: boolean
    extractedAt?: boolean
    lastSyncAt?: boolean
    syncSource?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GamePixGameCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "namespace" | "title" | "description" | "category" | "quality_score" | "banner_image" | "image" | "url" | "width" | "height" | "orientation" | "date_published" | "date_modified" | "isImported" | "importCount" | "lastImportedAt" | "customTags" | "notes" | "priority" | "isHidden" | "extractedTags" | "extractedMarkdown" | "extractedVideos" | "extractedScreenshots" | "extractedAt" | "lastSyncAt" | "syncSource" | "createdAt" | "updatedAt", ExtArgs["result"]["gamePixGameCache"]>

  export type $GamePixGameCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GamePixGameCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      namespace: string
      title: string
      description: string
      category: string
      quality_score: number
      banner_image: string
      image: string
      url: string
      width: number
      height: number
      orientation: string
      date_published: Date
      date_modified: Date
      isImported: boolean
      importCount: number
      lastImportedAt: Date | null
      customTags: string[]
      notes: string | null
      priority: number
      isHidden: boolean
      extractedTags: string[]
      extractedMarkdown: string | null
      extractedVideos: string[]
      extractedScreenshots: string[]
      extractedAt: Date | null
      lastSyncAt: Date
      syncSource: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gamePixGameCache"]>
    composites: {}
  }

  type GamePixGameCacheGetPayload<S extends boolean | null | undefined | GamePixGameCacheDefaultArgs> = $Result.GetResult<Prisma.$GamePixGameCachePayload, S>

  type GamePixGameCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GamePixGameCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GamePixGameCacheCountAggregateInputType | true
    }

  export interface GamePixGameCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GamePixGameCache'], meta: { name: 'GamePixGameCache' } }
    /**
     * Find zero or one GamePixGameCache that matches the filter.
     * @param {GamePixGameCacheFindUniqueArgs} args - Arguments to find a GamePixGameCache
     * @example
     * // Get one GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GamePixGameCacheFindUniqueArgs>(args: SelectSubset<T, GamePixGameCacheFindUniqueArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GamePixGameCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GamePixGameCacheFindUniqueOrThrowArgs} args - Arguments to find a GamePixGameCache
     * @example
     * // Get one GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GamePixGameCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, GamePixGameCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePixGameCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheFindFirstArgs} args - Arguments to find a GamePixGameCache
     * @example
     * // Get one GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GamePixGameCacheFindFirstArgs>(args?: SelectSubset<T, GamePixGameCacheFindFirstArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePixGameCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheFindFirstOrThrowArgs} args - Arguments to find a GamePixGameCache
     * @example
     * // Get one GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GamePixGameCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, GamePixGameCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GamePixGameCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamePixGameCaches
     * const gamePixGameCaches = await prisma.gamePixGameCache.findMany()
     * 
     * // Get first 10 GamePixGameCaches
     * const gamePixGameCaches = await prisma.gamePixGameCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gamePixGameCacheWithIdOnly = await prisma.gamePixGameCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GamePixGameCacheFindManyArgs>(args?: SelectSubset<T, GamePixGameCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GamePixGameCache.
     * @param {GamePixGameCacheCreateArgs} args - Arguments to create a GamePixGameCache.
     * @example
     * // Create one GamePixGameCache
     * const GamePixGameCache = await prisma.gamePixGameCache.create({
     *   data: {
     *     // ... data to create a GamePixGameCache
     *   }
     * })
     * 
     */
    create<T extends GamePixGameCacheCreateArgs>(args: SelectSubset<T, GamePixGameCacheCreateArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GamePixGameCaches.
     * @param {GamePixGameCacheCreateManyArgs} args - Arguments to create many GamePixGameCaches.
     * @example
     * // Create many GamePixGameCaches
     * const gamePixGameCache = await prisma.gamePixGameCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GamePixGameCacheCreateManyArgs>(args?: SelectSubset<T, GamePixGameCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GamePixGameCaches and returns the data saved in the database.
     * @param {GamePixGameCacheCreateManyAndReturnArgs} args - Arguments to create many GamePixGameCaches.
     * @example
     * // Create many GamePixGameCaches
     * const gamePixGameCache = await prisma.gamePixGameCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GamePixGameCaches and only return the `id`
     * const gamePixGameCacheWithIdOnly = await prisma.gamePixGameCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GamePixGameCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, GamePixGameCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GamePixGameCache.
     * @param {GamePixGameCacheDeleteArgs} args - Arguments to delete one GamePixGameCache.
     * @example
     * // Delete one GamePixGameCache
     * const GamePixGameCache = await prisma.gamePixGameCache.delete({
     *   where: {
     *     // ... filter to delete one GamePixGameCache
     *   }
     * })
     * 
     */
    delete<T extends GamePixGameCacheDeleteArgs>(args: SelectSubset<T, GamePixGameCacheDeleteArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GamePixGameCache.
     * @param {GamePixGameCacheUpdateArgs} args - Arguments to update one GamePixGameCache.
     * @example
     * // Update one GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GamePixGameCacheUpdateArgs>(args: SelectSubset<T, GamePixGameCacheUpdateArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GamePixGameCaches.
     * @param {GamePixGameCacheDeleteManyArgs} args - Arguments to filter GamePixGameCaches to delete.
     * @example
     * // Delete a few GamePixGameCaches
     * const { count } = await prisma.gamePixGameCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GamePixGameCacheDeleteManyArgs>(args?: SelectSubset<T, GamePixGameCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePixGameCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamePixGameCaches
     * const gamePixGameCache = await prisma.gamePixGameCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GamePixGameCacheUpdateManyArgs>(args: SelectSubset<T, GamePixGameCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePixGameCaches and returns the data updated in the database.
     * @param {GamePixGameCacheUpdateManyAndReturnArgs} args - Arguments to update many GamePixGameCaches.
     * @example
     * // Update many GamePixGameCaches
     * const gamePixGameCache = await prisma.gamePixGameCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GamePixGameCaches and only return the `id`
     * const gamePixGameCacheWithIdOnly = await prisma.gamePixGameCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GamePixGameCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, GamePixGameCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GamePixGameCache.
     * @param {GamePixGameCacheUpsertArgs} args - Arguments to update or create a GamePixGameCache.
     * @example
     * // Update or create a GamePixGameCache
     * const gamePixGameCache = await prisma.gamePixGameCache.upsert({
     *   create: {
     *     // ... data to create a GamePixGameCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamePixGameCache we want to update
     *   }
     * })
     */
    upsert<T extends GamePixGameCacheUpsertArgs>(args: SelectSubset<T, GamePixGameCacheUpsertArgs<ExtArgs>>): Prisma__GamePixGameCacheClient<$Result.GetResult<Prisma.$GamePixGameCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GamePixGameCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheCountArgs} args - Arguments to filter GamePixGameCaches to count.
     * @example
     * // Count the number of GamePixGameCaches
     * const count = await prisma.gamePixGameCache.count({
     *   where: {
     *     // ... the filter for the GamePixGameCaches we want to count
     *   }
     * })
    **/
    count<T extends GamePixGameCacheCountArgs>(
      args?: Subset<T, GamePixGameCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamePixGameCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamePixGameCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GamePixGameCacheAggregateArgs>(args: Subset<T, GamePixGameCacheAggregateArgs>): Prisma.PrismaPromise<GetGamePixGameCacheAggregateType<T>>

    /**
     * Group by GamePixGameCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePixGameCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GamePixGameCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamePixGameCacheGroupByArgs['orderBy'] }
        : { orderBy?: GamePixGameCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GamePixGameCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGamePixGameCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GamePixGameCache model
   */
  readonly fields: GamePixGameCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamePixGameCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamePixGameCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GamePixGameCache model
   */
  interface GamePixGameCacheFieldRefs {
    readonly id: FieldRef<"GamePixGameCache", 'String'>
    readonly namespace: FieldRef<"GamePixGameCache", 'String'>
    readonly title: FieldRef<"GamePixGameCache", 'String'>
    readonly description: FieldRef<"GamePixGameCache", 'String'>
    readonly category: FieldRef<"GamePixGameCache", 'String'>
    readonly quality_score: FieldRef<"GamePixGameCache", 'Float'>
    readonly banner_image: FieldRef<"GamePixGameCache", 'String'>
    readonly image: FieldRef<"GamePixGameCache", 'String'>
    readonly url: FieldRef<"GamePixGameCache", 'String'>
    readonly width: FieldRef<"GamePixGameCache", 'Int'>
    readonly height: FieldRef<"GamePixGameCache", 'Int'>
    readonly orientation: FieldRef<"GamePixGameCache", 'String'>
    readonly date_published: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly date_modified: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly isImported: FieldRef<"GamePixGameCache", 'Boolean'>
    readonly importCount: FieldRef<"GamePixGameCache", 'Int'>
    readonly lastImportedAt: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly customTags: FieldRef<"GamePixGameCache", 'String[]'>
    readonly notes: FieldRef<"GamePixGameCache", 'String'>
    readonly priority: FieldRef<"GamePixGameCache", 'Int'>
    readonly isHidden: FieldRef<"GamePixGameCache", 'Boolean'>
    readonly extractedTags: FieldRef<"GamePixGameCache", 'String[]'>
    readonly extractedMarkdown: FieldRef<"GamePixGameCache", 'String'>
    readonly extractedVideos: FieldRef<"GamePixGameCache", 'String[]'>
    readonly extractedScreenshots: FieldRef<"GamePixGameCache", 'String[]'>
    readonly extractedAt: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly lastSyncAt: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly syncSource: FieldRef<"GamePixGameCache", 'String'>
    readonly createdAt: FieldRef<"GamePixGameCache", 'DateTime'>
    readonly updatedAt: FieldRef<"GamePixGameCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GamePixGameCache findUnique
   */
  export type GamePixGameCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter, which GamePixGameCache to fetch.
     */
    where: GamePixGameCacheWhereUniqueInput
  }

  /**
   * GamePixGameCache findUniqueOrThrow
   */
  export type GamePixGameCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter, which GamePixGameCache to fetch.
     */
    where: GamePixGameCacheWhereUniqueInput
  }

  /**
   * GamePixGameCache findFirst
   */
  export type GamePixGameCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter, which GamePixGameCache to fetch.
     */
    where?: GamePixGameCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePixGameCaches to fetch.
     */
    orderBy?: GamePixGameCacheOrderByWithRelationInput | GamePixGameCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePixGameCaches.
     */
    cursor?: GamePixGameCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePixGameCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePixGameCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePixGameCaches.
     */
    distinct?: GamePixGameCacheScalarFieldEnum | GamePixGameCacheScalarFieldEnum[]
  }

  /**
   * GamePixGameCache findFirstOrThrow
   */
  export type GamePixGameCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter, which GamePixGameCache to fetch.
     */
    where?: GamePixGameCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePixGameCaches to fetch.
     */
    orderBy?: GamePixGameCacheOrderByWithRelationInput | GamePixGameCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePixGameCaches.
     */
    cursor?: GamePixGameCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePixGameCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePixGameCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePixGameCaches.
     */
    distinct?: GamePixGameCacheScalarFieldEnum | GamePixGameCacheScalarFieldEnum[]
  }

  /**
   * GamePixGameCache findMany
   */
  export type GamePixGameCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter, which GamePixGameCaches to fetch.
     */
    where?: GamePixGameCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePixGameCaches to fetch.
     */
    orderBy?: GamePixGameCacheOrderByWithRelationInput | GamePixGameCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GamePixGameCaches.
     */
    cursor?: GamePixGameCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePixGameCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePixGameCaches.
     */
    skip?: number
    distinct?: GamePixGameCacheScalarFieldEnum | GamePixGameCacheScalarFieldEnum[]
  }

  /**
   * GamePixGameCache create
   */
  export type GamePixGameCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a GamePixGameCache.
     */
    data: XOR<GamePixGameCacheCreateInput, GamePixGameCacheUncheckedCreateInput>
  }

  /**
   * GamePixGameCache createMany
   */
  export type GamePixGameCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GamePixGameCaches.
     */
    data: GamePixGameCacheCreateManyInput | GamePixGameCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePixGameCache createManyAndReturn
   */
  export type GamePixGameCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * The data used to create many GamePixGameCaches.
     */
    data: GamePixGameCacheCreateManyInput | GamePixGameCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePixGameCache update
   */
  export type GamePixGameCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a GamePixGameCache.
     */
    data: XOR<GamePixGameCacheUpdateInput, GamePixGameCacheUncheckedUpdateInput>
    /**
     * Choose, which GamePixGameCache to update.
     */
    where: GamePixGameCacheWhereUniqueInput
  }

  /**
   * GamePixGameCache updateMany
   */
  export type GamePixGameCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GamePixGameCaches.
     */
    data: XOR<GamePixGameCacheUpdateManyMutationInput, GamePixGameCacheUncheckedUpdateManyInput>
    /**
     * Filter which GamePixGameCaches to update
     */
    where?: GamePixGameCacheWhereInput
    /**
     * Limit how many GamePixGameCaches to update.
     */
    limit?: number
  }

  /**
   * GamePixGameCache updateManyAndReturn
   */
  export type GamePixGameCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * The data used to update GamePixGameCaches.
     */
    data: XOR<GamePixGameCacheUpdateManyMutationInput, GamePixGameCacheUncheckedUpdateManyInput>
    /**
     * Filter which GamePixGameCaches to update
     */
    where?: GamePixGameCacheWhereInput
    /**
     * Limit how many GamePixGameCaches to update.
     */
    limit?: number
  }

  /**
   * GamePixGameCache upsert
   */
  export type GamePixGameCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the GamePixGameCache to update in case it exists.
     */
    where: GamePixGameCacheWhereUniqueInput
    /**
     * In case the GamePixGameCache found by the `where` argument doesn't exist, create a new GamePixGameCache with this data.
     */
    create: XOR<GamePixGameCacheCreateInput, GamePixGameCacheUncheckedCreateInput>
    /**
     * In case the GamePixGameCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamePixGameCacheUpdateInput, GamePixGameCacheUncheckedUpdateInput>
  }

  /**
   * GamePixGameCache delete
   */
  export type GamePixGameCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
    /**
     * Filter which GamePixGameCache to delete.
     */
    where: GamePixGameCacheWhereUniqueInput
  }

  /**
   * GamePixGameCache deleteMany
   */
  export type GamePixGameCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GamePixGameCaches to delete
     */
    where?: GamePixGameCacheWhereInput
    /**
     * Limit how many GamePixGameCaches to delete.
     */
    limit?: number
  }

  /**
   * GamePixGameCache without action
   */
  export type GamePixGameCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePixGameCache
     */
    select?: GamePixGameCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePixGameCache
     */
    omit?: GamePixGameCacheOmit<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    totalGames: number | null
    newGames: number | null
    updatedGames: number | null
    deletedGames: number | null
    syncDuration: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    totalGames: number | null
    newGames: number | null
    updatedGames: number | null
    deletedGames: number | null
    syncDuration: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: string | null
    totalGames: number | null
    newGames: number | null
    updatedGames: number | null
    deletedGames: number | null
    status: string | null
    errorMessage: string | null
    syncDuration: number | null
    syncedAt: Date | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: string | null
    totalGames: number | null
    newGames: number | null
    updatedGames: number | null
    deletedGames: number | null
    status: string | null
    errorMessage: string | null
    syncDuration: number | null
    syncedAt: Date | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    totalGames: number
    newGames: number
    updatedGames: number
    deletedGames: number
    status: number
    errorMessage: number
    syncDuration: number
    apiParams: number
    syncedAt: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    totalGames?: true
    newGames?: true
    updatedGames?: true
    deletedGames?: true
    syncDuration?: true
  }

  export type SyncLogSumAggregateInputType = {
    totalGames?: true
    newGames?: true
    updatedGames?: true
    deletedGames?: true
    syncDuration?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    totalGames?: true
    newGames?: true
    updatedGames?: true
    deletedGames?: true
    status?: true
    errorMessage?: true
    syncDuration?: true
    syncedAt?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    totalGames?: true
    newGames?: true
    updatedGames?: true
    deletedGames?: true
    status?: true
    errorMessage?: true
    syncDuration?: true
    syncedAt?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    totalGames?: true
    newGames?: true
    updatedGames?: true
    deletedGames?: true
    status?: true
    errorMessage?: true
    syncDuration?: true
    apiParams?: true
    syncedAt?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: string
    totalGames: number
    newGames: number
    updatedGames: number
    deletedGames: number
    status: string
    errorMessage: string | null
    syncDuration: number | null
    apiParams: JsonValue | null
    syncedAt: Date
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalGames?: boolean
    newGames?: boolean
    updatedGames?: boolean
    deletedGames?: boolean
    status?: boolean
    errorMessage?: boolean
    syncDuration?: boolean
    apiParams?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalGames?: boolean
    newGames?: boolean
    updatedGames?: boolean
    deletedGames?: boolean
    status?: boolean
    errorMessage?: boolean
    syncDuration?: boolean
    apiParams?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalGames?: boolean
    newGames?: boolean
    updatedGames?: boolean
    deletedGames?: boolean
    status?: boolean
    errorMessage?: boolean
    syncDuration?: boolean
    apiParams?: boolean
    syncedAt?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    totalGames?: boolean
    newGames?: boolean
    updatedGames?: boolean
    deletedGames?: boolean
    status?: boolean
    errorMessage?: boolean
    syncDuration?: boolean
    apiParams?: boolean
    syncedAt?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "totalGames" | "newGames" | "updatedGames" | "deletedGames" | "status" | "errorMessage" | "syncDuration" | "apiParams" | "syncedAt", ExtArgs["result"]["syncLog"]>

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      totalGames: number
      newGames: number
      updatedGames: number
      deletedGames: number
      status: string
      errorMessage: string | null
      syncDuration: number | null
      apiParams: Prisma.JsonValue | null
      syncedAt: Date
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'String'>
    readonly totalGames: FieldRef<"SyncLog", 'Int'>
    readonly newGames: FieldRef<"SyncLog", 'Int'>
    readonly updatedGames: FieldRef<"SyncLog", 'Int'>
    readonly deletedGames: FieldRef<"SyncLog", 'Int'>
    readonly status: FieldRef<"SyncLog", 'String'>
    readonly errorMessage: FieldRef<"SyncLog", 'String'>
    readonly syncDuration: FieldRef<"SyncLog", 'Int'>
    readonly apiParams: FieldRef<"SyncLog", 'Json'>
    readonly syncedAt: FieldRef<"SyncLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
  }


  /**
   * Model AiChatHistory
   */

  export type AggregateAiChatHistory = {
    _count: AiChatHistoryCountAggregateOutputType | null
    _avg: AiChatHistoryAvgAggregateOutputType | null
    _sum: AiChatHistorySumAggregateOutputType | null
    _min: AiChatHistoryMinAggregateOutputType | null
    _max: AiChatHistoryMaxAggregateOutputType | null
  }

  export type AiChatHistoryAvgAggregateOutputType = {
    messageCount: number | null
    totalTokens: number | null
  }

  export type AiChatHistorySumAggregateOutputType = {
    messageCount: number | null
    totalTokens: number | null
  }

  export type AiChatHistoryMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    locale: string | null
    adminId: string | null
    templateId: string | null
    messageCount: number | null
    totalTokens: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
    expiresAt: Date | null
  }

  export type AiChatHistoryMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    locale: string | null
    adminId: string | null
    templateId: string | null
    messageCount: number | null
    totalTokens: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUsedAt: Date | null
    expiresAt: Date | null
  }

  export type AiChatHistoryCountAggregateOutputType = {
    id: number
    gameId: number
    locale: number
    adminId: number
    messages: number
    templateId: number
    context: number
    messageCount: number
    totalTokens: number
    createdAt: number
    updatedAt: number
    lastUsedAt: number
    expiresAt: number
    _all: number
  }


  export type AiChatHistoryAvgAggregateInputType = {
    messageCount?: true
    totalTokens?: true
  }

  export type AiChatHistorySumAggregateInputType = {
    messageCount?: true
    totalTokens?: true
  }

  export type AiChatHistoryMinAggregateInputType = {
    id?: true
    gameId?: true
    locale?: true
    adminId?: true
    templateId?: true
    messageCount?: true
    totalTokens?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    expiresAt?: true
  }

  export type AiChatHistoryMaxAggregateInputType = {
    id?: true
    gameId?: true
    locale?: true
    adminId?: true
    templateId?: true
    messageCount?: true
    totalTokens?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    expiresAt?: true
  }

  export type AiChatHistoryCountAggregateInputType = {
    id?: true
    gameId?: true
    locale?: true
    adminId?: true
    messages?: true
    templateId?: true
    context?: true
    messageCount?: true
    totalTokens?: true
    createdAt?: true
    updatedAt?: true
    lastUsedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type AiChatHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatHistory to aggregate.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiChatHistories
    **/
    _count?: true | AiChatHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiChatHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiChatHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiChatHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiChatHistoryMaxAggregateInputType
  }

  export type GetAiChatHistoryAggregateType<T extends AiChatHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAiChatHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiChatHistory[P]>
      : GetScalarType<T[P], AggregateAiChatHistory[P]>
  }




  export type AiChatHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatHistoryWhereInput
    orderBy?: AiChatHistoryOrderByWithAggregationInput | AiChatHistoryOrderByWithAggregationInput[]
    by: AiChatHistoryScalarFieldEnum[] | AiChatHistoryScalarFieldEnum
    having?: AiChatHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiChatHistoryCountAggregateInputType | true
    _avg?: AiChatHistoryAvgAggregateInputType
    _sum?: AiChatHistorySumAggregateInputType
    _min?: AiChatHistoryMinAggregateInputType
    _max?: AiChatHistoryMaxAggregateInputType
  }

  export type AiChatHistoryGroupByOutputType = {
    id: string
    gameId: string
    locale: string
    adminId: string | null
    messages: JsonValue
    templateId: string | null
    context: JsonValue | null
    messageCount: number
    totalTokens: number
    createdAt: Date
    updatedAt: Date
    lastUsedAt: Date
    expiresAt: Date
    _count: AiChatHistoryCountAggregateOutputType | null
    _avg: AiChatHistoryAvgAggregateOutputType | null
    _sum: AiChatHistorySumAggregateOutputType | null
    _min: AiChatHistoryMinAggregateOutputType | null
    _max: AiChatHistoryMaxAggregateOutputType | null
  }

  type GetAiChatHistoryGroupByPayload<T extends AiChatHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiChatHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiChatHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiChatHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], AiChatHistoryGroupByOutputType[P]>
        }
      >
    >


  export type AiChatHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    locale?: boolean
    adminId?: boolean
    messages?: boolean
    templateId?: boolean
    context?: boolean
    messageCount?: boolean
    totalTokens?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    locale?: boolean
    adminId?: boolean
    messages?: boolean
    templateId?: boolean
    context?: boolean
    messageCount?: boolean
    totalTokens?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    locale?: boolean
    adminId?: boolean
    messages?: boolean
    templateId?: boolean
    context?: boolean
    messageCount?: boolean
    totalTokens?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectScalar = {
    id?: boolean
    gameId?: boolean
    locale?: boolean
    adminId?: boolean
    messages?: boolean
    templateId?: boolean
    context?: boolean
    messageCount?: boolean
    totalTokens?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
  }

  export type AiChatHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameId" | "locale" | "adminId" | "messages" | "templateId" | "context" | "messageCount" | "totalTokens" | "createdAt" | "updatedAt" | "lastUsedAt" | "expiresAt", ExtArgs["result"]["aiChatHistory"]>

  export type $AiChatHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiChatHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      locale: string
      adminId: string | null
      messages: Prisma.JsonValue
      templateId: string | null
      context: Prisma.JsonValue | null
      messageCount: number
      totalTokens: number
      createdAt: Date
      updatedAt: Date
      lastUsedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["aiChatHistory"]>
    composites: {}
  }

  type AiChatHistoryGetPayload<S extends boolean | null | undefined | AiChatHistoryDefaultArgs> = $Result.GetResult<Prisma.$AiChatHistoryPayload, S>

  type AiChatHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiChatHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiChatHistoryCountAggregateInputType | true
    }

  export interface AiChatHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiChatHistory'], meta: { name: 'AiChatHistory' } }
    /**
     * Find zero or one AiChatHistory that matches the filter.
     * @param {AiChatHistoryFindUniqueArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiChatHistoryFindUniqueArgs>(args: SelectSubset<T, AiChatHistoryFindUniqueArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiChatHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiChatHistoryFindUniqueOrThrowArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiChatHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AiChatHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindFirstArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiChatHistoryFindFirstArgs>(args?: SelectSubset<T, AiChatHistoryFindFirstArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindFirstOrThrowArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiChatHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AiChatHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiChatHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiChatHistories
     * const aiChatHistories = await prisma.aiChatHistory.findMany()
     * 
     * // Get first 10 AiChatHistories
     * const aiChatHistories = await prisma.aiChatHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiChatHistoryFindManyArgs>(args?: SelectSubset<T, AiChatHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiChatHistory.
     * @param {AiChatHistoryCreateArgs} args - Arguments to create a AiChatHistory.
     * @example
     * // Create one AiChatHistory
     * const AiChatHistory = await prisma.aiChatHistory.create({
     *   data: {
     *     // ... data to create a AiChatHistory
     *   }
     * })
     * 
     */
    create<T extends AiChatHistoryCreateArgs>(args: SelectSubset<T, AiChatHistoryCreateArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiChatHistories.
     * @param {AiChatHistoryCreateManyArgs} args - Arguments to create many AiChatHistories.
     * @example
     * // Create many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiChatHistoryCreateManyArgs>(args?: SelectSubset<T, AiChatHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiChatHistories and returns the data saved in the database.
     * @param {AiChatHistoryCreateManyAndReturnArgs} args - Arguments to create many AiChatHistories.
     * @example
     * // Create many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiChatHistories and only return the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiChatHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AiChatHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiChatHistory.
     * @param {AiChatHistoryDeleteArgs} args - Arguments to delete one AiChatHistory.
     * @example
     * // Delete one AiChatHistory
     * const AiChatHistory = await prisma.aiChatHistory.delete({
     *   where: {
     *     // ... filter to delete one AiChatHistory
     *   }
     * })
     * 
     */
    delete<T extends AiChatHistoryDeleteArgs>(args: SelectSubset<T, AiChatHistoryDeleteArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiChatHistory.
     * @param {AiChatHistoryUpdateArgs} args - Arguments to update one AiChatHistory.
     * @example
     * // Update one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiChatHistoryUpdateArgs>(args: SelectSubset<T, AiChatHistoryUpdateArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiChatHistories.
     * @param {AiChatHistoryDeleteManyArgs} args - Arguments to filter AiChatHistories to delete.
     * @example
     * // Delete a few AiChatHistories
     * const { count } = await prisma.aiChatHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiChatHistoryDeleteManyArgs>(args?: SelectSubset<T, AiChatHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiChatHistoryUpdateManyArgs>(args: SelectSubset<T, AiChatHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatHistories and returns the data updated in the database.
     * @param {AiChatHistoryUpdateManyAndReturnArgs} args - Arguments to update many AiChatHistories.
     * @example
     * // Update many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiChatHistories and only return the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiChatHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AiChatHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiChatHistory.
     * @param {AiChatHistoryUpsertArgs} args - Arguments to update or create a AiChatHistory.
     * @example
     * // Update or create a AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.upsert({
     *   create: {
     *     // ... data to create a AiChatHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiChatHistory we want to update
     *   }
     * })
     */
    upsert<T extends AiChatHistoryUpsertArgs>(args: SelectSubset<T, AiChatHistoryUpsertArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryCountArgs} args - Arguments to filter AiChatHistories to count.
     * @example
     * // Count the number of AiChatHistories
     * const count = await prisma.aiChatHistory.count({
     *   where: {
     *     // ... the filter for the AiChatHistories we want to count
     *   }
     * })
    **/
    count<T extends AiChatHistoryCountArgs>(
      args?: Subset<T, AiChatHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiChatHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiChatHistoryAggregateArgs>(args: Subset<T, AiChatHistoryAggregateArgs>): Prisma.PrismaPromise<GetAiChatHistoryAggregateType<T>>

    /**
     * Group by AiChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiChatHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiChatHistoryGroupByArgs['orderBy'] }
        : { orderBy?: AiChatHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiChatHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiChatHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiChatHistory model
   */
  readonly fields: AiChatHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiChatHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiChatHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiChatHistory model
   */
  interface AiChatHistoryFieldRefs {
    readonly id: FieldRef<"AiChatHistory", 'String'>
    readonly gameId: FieldRef<"AiChatHistory", 'String'>
    readonly locale: FieldRef<"AiChatHistory", 'String'>
    readonly adminId: FieldRef<"AiChatHistory", 'String'>
    readonly messages: FieldRef<"AiChatHistory", 'Json'>
    readonly templateId: FieldRef<"AiChatHistory", 'String'>
    readonly context: FieldRef<"AiChatHistory", 'Json'>
    readonly messageCount: FieldRef<"AiChatHistory", 'Int'>
    readonly totalTokens: FieldRef<"AiChatHistory", 'Int'>
    readonly createdAt: FieldRef<"AiChatHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"AiChatHistory", 'DateTime'>
    readonly lastUsedAt: FieldRef<"AiChatHistory", 'DateTime'>
    readonly expiresAt: FieldRef<"AiChatHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiChatHistory findUnique
   */
  export type AiChatHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory findUniqueOrThrow
   */
  export type AiChatHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory findFirst
   */
  export type AiChatHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatHistories.
     */
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory findFirstOrThrow
   */
  export type AiChatHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatHistories.
     */
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory findMany
   */
  export type AiChatHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter, which AiChatHistories to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory create
   */
  export type AiChatHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a AiChatHistory.
     */
    data: XOR<AiChatHistoryCreateInput, AiChatHistoryUncheckedCreateInput>
  }

  /**
   * AiChatHistory createMany
   */
  export type AiChatHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiChatHistories.
     */
    data: AiChatHistoryCreateManyInput | AiChatHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiChatHistory createManyAndReturn
   */
  export type AiChatHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many AiChatHistories.
     */
    data: AiChatHistoryCreateManyInput | AiChatHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiChatHistory update
   */
  export type AiChatHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a AiChatHistory.
     */
    data: XOR<AiChatHistoryUpdateInput, AiChatHistoryUncheckedUpdateInput>
    /**
     * Choose, which AiChatHistory to update.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory updateMany
   */
  export type AiChatHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiChatHistories.
     */
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AiChatHistories to update
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to update.
     */
    limit?: number
  }

  /**
   * AiChatHistory updateManyAndReturn
   */
  export type AiChatHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data used to update AiChatHistories.
     */
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AiChatHistories to update
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to update.
     */
    limit?: number
  }

  /**
   * AiChatHistory upsert
   */
  export type AiChatHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the AiChatHistory to update in case it exists.
     */
    where: AiChatHistoryWhereUniqueInput
    /**
     * In case the AiChatHistory found by the `where` argument doesn't exist, create a new AiChatHistory with this data.
     */
    create: XOR<AiChatHistoryCreateInput, AiChatHistoryUncheckedCreateInput>
    /**
     * In case the AiChatHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiChatHistoryUpdateInput, AiChatHistoryUncheckedUpdateInput>
  }

  /**
   * AiChatHistory delete
   */
  export type AiChatHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Filter which AiChatHistory to delete.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory deleteMany
   */
  export type AiChatHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatHistories to delete
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to delete.
     */
    limit?: number
  }

  /**
   * AiChatHistory without action
   */
  export type AiChatHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const GamePixGameCacheScalarFieldEnum: {
    id: 'id',
    namespace: 'namespace',
    title: 'title',
    description: 'description',
    category: 'category',
    quality_score: 'quality_score',
    banner_image: 'banner_image',
    image: 'image',
    url: 'url',
    width: 'width',
    height: 'height',
    orientation: 'orientation',
    date_published: 'date_published',
    date_modified: 'date_modified',
    isImported: 'isImported',
    importCount: 'importCount',
    lastImportedAt: 'lastImportedAt',
    customTags: 'customTags',
    notes: 'notes',
    priority: 'priority',
    isHidden: 'isHidden',
    extractedTags: 'extractedTags',
    extractedMarkdown: 'extractedMarkdown',
    extractedVideos: 'extractedVideos',
    extractedScreenshots: 'extractedScreenshots',
    extractedAt: 'extractedAt',
    lastSyncAt: 'lastSyncAt',
    syncSource: 'syncSource',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GamePixGameCacheScalarFieldEnum = (typeof GamePixGameCacheScalarFieldEnum)[keyof typeof GamePixGameCacheScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    totalGames: 'totalGames',
    newGames: 'newGames',
    updatedGames: 'updatedGames',
    deletedGames: 'deletedGames',
    status: 'status',
    errorMessage: 'errorMessage',
    syncDuration: 'syncDuration',
    apiParams: 'apiParams',
    syncedAt: 'syncedAt'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const AiChatHistoryScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    locale: 'locale',
    adminId: 'adminId',
    messages: 'messages',
    templateId: 'templateId',
    context: 'context',
    messageCount: 'messageCount',
    totalTokens: 'totalTokens',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt'
  };

  export type AiChatHistoryScalarFieldEnum = (typeof AiChatHistoryScalarFieldEnum)[keyof typeof AiChatHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type GamePixGameCacheWhereInput = {
    AND?: GamePixGameCacheWhereInput | GamePixGameCacheWhereInput[]
    OR?: GamePixGameCacheWhereInput[]
    NOT?: GamePixGameCacheWhereInput | GamePixGameCacheWhereInput[]
    id?: StringFilter<"GamePixGameCache"> | string
    namespace?: StringFilter<"GamePixGameCache"> | string
    title?: StringFilter<"GamePixGameCache"> | string
    description?: StringFilter<"GamePixGameCache"> | string
    category?: StringFilter<"GamePixGameCache"> | string
    quality_score?: FloatFilter<"GamePixGameCache"> | number
    banner_image?: StringFilter<"GamePixGameCache"> | string
    image?: StringFilter<"GamePixGameCache"> | string
    url?: StringFilter<"GamePixGameCache"> | string
    width?: IntFilter<"GamePixGameCache"> | number
    height?: IntFilter<"GamePixGameCache"> | number
    orientation?: StringFilter<"GamePixGameCache"> | string
    date_published?: DateTimeFilter<"GamePixGameCache"> | Date | string
    date_modified?: DateTimeFilter<"GamePixGameCache"> | Date | string
    isImported?: BoolFilter<"GamePixGameCache"> | boolean
    importCount?: IntFilter<"GamePixGameCache"> | number
    lastImportedAt?: DateTimeNullableFilter<"GamePixGameCache"> | Date | string | null
    customTags?: StringNullableListFilter<"GamePixGameCache">
    notes?: StringNullableFilter<"GamePixGameCache"> | string | null
    priority?: IntFilter<"GamePixGameCache"> | number
    isHidden?: BoolFilter<"GamePixGameCache"> | boolean
    extractedTags?: StringNullableListFilter<"GamePixGameCache">
    extractedMarkdown?: StringNullableFilter<"GamePixGameCache"> | string | null
    extractedVideos?: StringNullableListFilter<"GamePixGameCache">
    extractedScreenshots?: StringNullableListFilter<"GamePixGameCache">
    extractedAt?: DateTimeNullableFilter<"GamePixGameCache"> | Date | string | null
    lastSyncAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
    syncSource?: StringFilter<"GamePixGameCache"> | string
    createdAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
    updatedAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
  }

  export type GamePixGameCacheOrderByWithRelationInput = {
    id?: SortOrder
    namespace?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    quality_score?: SortOrder
    banner_image?: SortOrder
    image?: SortOrder
    url?: SortOrder
    width?: SortOrder
    height?: SortOrder
    orientation?: SortOrder
    date_published?: SortOrder
    date_modified?: SortOrder
    isImported?: SortOrder
    importCount?: SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    customTags?: SortOrder
    notes?: SortOrderInput | SortOrder
    priority?: SortOrder
    isHidden?: SortOrder
    extractedTags?: SortOrder
    extractedMarkdown?: SortOrderInput | SortOrder
    extractedVideos?: SortOrder
    extractedScreenshots?: SortOrder
    extractedAt?: SortOrderInput | SortOrder
    lastSyncAt?: SortOrder
    syncSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePixGameCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    namespace?: string
    AND?: GamePixGameCacheWhereInput | GamePixGameCacheWhereInput[]
    OR?: GamePixGameCacheWhereInput[]
    NOT?: GamePixGameCacheWhereInput | GamePixGameCacheWhereInput[]
    title?: StringFilter<"GamePixGameCache"> | string
    description?: StringFilter<"GamePixGameCache"> | string
    category?: StringFilter<"GamePixGameCache"> | string
    quality_score?: FloatFilter<"GamePixGameCache"> | number
    banner_image?: StringFilter<"GamePixGameCache"> | string
    image?: StringFilter<"GamePixGameCache"> | string
    url?: StringFilter<"GamePixGameCache"> | string
    width?: IntFilter<"GamePixGameCache"> | number
    height?: IntFilter<"GamePixGameCache"> | number
    orientation?: StringFilter<"GamePixGameCache"> | string
    date_published?: DateTimeFilter<"GamePixGameCache"> | Date | string
    date_modified?: DateTimeFilter<"GamePixGameCache"> | Date | string
    isImported?: BoolFilter<"GamePixGameCache"> | boolean
    importCount?: IntFilter<"GamePixGameCache"> | number
    lastImportedAt?: DateTimeNullableFilter<"GamePixGameCache"> | Date | string | null
    customTags?: StringNullableListFilter<"GamePixGameCache">
    notes?: StringNullableFilter<"GamePixGameCache"> | string | null
    priority?: IntFilter<"GamePixGameCache"> | number
    isHidden?: BoolFilter<"GamePixGameCache"> | boolean
    extractedTags?: StringNullableListFilter<"GamePixGameCache">
    extractedMarkdown?: StringNullableFilter<"GamePixGameCache"> | string | null
    extractedVideos?: StringNullableListFilter<"GamePixGameCache">
    extractedScreenshots?: StringNullableListFilter<"GamePixGameCache">
    extractedAt?: DateTimeNullableFilter<"GamePixGameCache"> | Date | string | null
    lastSyncAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
    syncSource?: StringFilter<"GamePixGameCache"> | string
    createdAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
    updatedAt?: DateTimeFilter<"GamePixGameCache"> | Date | string
  }, "id" | "namespace">

  export type GamePixGameCacheOrderByWithAggregationInput = {
    id?: SortOrder
    namespace?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    quality_score?: SortOrder
    banner_image?: SortOrder
    image?: SortOrder
    url?: SortOrder
    width?: SortOrder
    height?: SortOrder
    orientation?: SortOrder
    date_published?: SortOrder
    date_modified?: SortOrder
    isImported?: SortOrder
    importCount?: SortOrder
    lastImportedAt?: SortOrderInput | SortOrder
    customTags?: SortOrder
    notes?: SortOrderInput | SortOrder
    priority?: SortOrder
    isHidden?: SortOrder
    extractedTags?: SortOrder
    extractedMarkdown?: SortOrderInput | SortOrder
    extractedVideos?: SortOrder
    extractedScreenshots?: SortOrder
    extractedAt?: SortOrderInput | SortOrder
    lastSyncAt?: SortOrder
    syncSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GamePixGameCacheCountOrderByAggregateInput
    _avg?: GamePixGameCacheAvgOrderByAggregateInput
    _max?: GamePixGameCacheMaxOrderByAggregateInput
    _min?: GamePixGameCacheMinOrderByAggregateInput
    _sum?: GamePixGameCacheSumOrderByAggregateInput
  }

  export type GamePixGameCacheScalarWhereWithAggregatesInput = {
    AND?: GamePixGameCacheScalarWhereWithAggregatesInput | GamePixGameCacheScalarWhereWithAggregatesInput[]
    OR?: GamePixGameCacheScalarWhereWithAggregatesInput[]
    NOT?: GamePixGameCacheScalarWhereWithAggregatesInput | GamePixGameCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    namespace?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    title?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    description?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    category?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    quality_score?: FloatWithAggregatesFilter<"GamePixGameCache"> | number
    banner_image?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    image?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    url?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    width?: IntWithAggregatesFilter<"GamePixGameCache"> | number
    height?: IntWithAggregatesFilter<"GamePixGameCache"> | number
    orientation?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    date_published?: DateTimeWithAggregatesFilter<"GamePixGameCache"> | Date | string
    date_modified?: DateTimeWithAggregatesFilter<"GamePixGameCache"> | Date | string
    isImported?: BoolWithAggregatesFilter<"GamePixGameCache"> | boolean
    importCount?: IntWithAggregatesFilter<"GamePixGameCache"> | number
    lastImportedAt?: DateTimeNullableWithAggregatesFilter<"GamePixGameCache"> | Date | string | null
    customTags?: StringNullableListFilter<"GamePixGameCache">
    notes?: StringNullableWithAggregatesFilter<"GamePixGameCache"> | string | null
    priority?: IntWithAggregatesFilter<"GamePixGameCache"> | number
    isHidden?: BoolWithAggregatesFilter<"GamePixGameCache"> | boolean
    extractedTags?: StringNullableListFilter<"GamePixGameCache">
    extractedMarkdown?: StringNullableWithAggregatesFilter<"GamePixGameCache"> | string | null
    extractedVideos?: StringNullableListFilter<"GamePixGameCache">
    extractedScreenshots?: StringNullableListFilter<"GamePixGameCache">
    extractedAt?: DateTimeNullableWithAggregatesFilter<"GamePixGameCache"> | Date | string | null
    lastSyncAt?: DateTimeWithAggregatesFilter<"GamePixGameCache"> | Date | string
    syncSource?: StringWithAggregatesFilter<"GamePixGameCache"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GamePixGameCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GamePixGameCache"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: StringFilter<"SyncLog"> | string
    totalGames?: IntFilter<"SyncLog"> | number
    newGames?: IntFilter<"SyncLog"> | number
    updatedGames?: IntFilter<"SyncLog"> | number
    deletedGames?: IntFilter<"SyncLog"> | number
    status?: StringFilter<"SyncLog"> | string
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    syncDuration?: IntNullableFilter<"SyncLog"> | number | null
    apiParams?: JsonNullableFilter<"SyncLog">
    syncedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    syncDuration?: SortOrderInput | SortOrder
    apiParams?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    totalGames?: IntFilter<"SyncLog"> | number
    newGames?: IntFilter<"SyncLog"> | number
    updatedGames?: IntFilter<"SyncLog"> | number
    deletedGames?: IntFilter<"SyncLog"> | number
    status?: StringFilter<"SyncLog"> | string
    errorMessage?: StringNullableFilter<"SyncLog"> | string | null
    syncDuration?: IntNullableFilter<"SyncLog"> | number | null
    apiParams?: JsonNullableFilter<"SyncLog">
    syncedAt?: DateTimeFilter<"SyncLog"> | Date | string
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    syncDuration?: SortOrderInput | SortOrder
    apiParams?: SortOrderInput | SortOrder
    syncedAt?: SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SyncLog"> | string
    totalGames?: IntWithAggregatesFilter<"SyncLog"> | number
    newGames?: IntWithAggregatesFilter<"SyncLog"> | number
    updatedGames?: IntWithAggregatesFilter<"SyncLog"> | number
    deletedGames?: IntWithAggregatesFilter<"SyncLog"> | number
    status?: StringWithAggregatesFilter<"SyncLog"> | string
    errorMessage?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    syncDuration?: IntNullableWithAggregatesFilter<"SyncLog"> | number | null
    apiParams?: JsonNullableWithAggregatesFilter<"SyncLog">
    syncedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
  }

  export type AiChatHistoryWhereInput = {
    AND?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    OR?: AiChatHistoryWhereInput[]
    NOT?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    id?: StringFilter<"AiChatHistory"> | string
    gameId?: StringFilter<"AiChatHistory"> | string
    locale?: StringFilter<"AiChatHistory"> | string
    adminId?: StringNullableFilter<"AiChatHistory"> | string | null
    messages?: JsonFilter<"AiChatHistory">
    templateId?: StringNullableFilter<"AiChatHistory"> | string | null
    context?: JsonNullableFilter<"AiChatHistory">
    messageCount?: IntFilter<"AiChatHistory"> | number
    totalTokens?: IntFilter<"AiChatHistory"> | number
    createdAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    updatedAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    lastUsedAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    expiresAt?: DateTimeFilter<"AiChatHistory"> | Date | string
  }

  export type AiChatHistoryOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    locale?: SortOrder
    adminId?: SortOrderInput | SortOrder
    messages?: SortOrder
    templateId?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    messageCount?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type AiChatHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gameId_locale?: AiChatHistoryGameIdLocaleCompoundUniqueInput
    AND?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    OR?: AiChatHistoryWhereInput[]
    NOT?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    gameId?: StringFilter<"AiChatHistory"> | string
    locale?: StringFilter<"AiChatHistory"> | string
    adminId?: StringNullableFilter<"AiChatHistory"> | string | null
    messages?: JsonFilter<"AiChatHistory">
    templateId?: StringNullableFilter<"AiChatHistory"> | string | null
    context?: JsonNullableFilter<"AiChatHistory">
    messageCount?: IntFilter<"AiChatHistory"> | number
    totalTokens?: IntFilter<"AiChatHistory"> | number
    createdAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    updatedAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    lastUsedAt?: DateTimeFilter<"AiChatHistory"> | Date | string
    expiresAt?: DateTimeFilter<"AiChatHistory"> | Date | string
  }, "id" | "gameId_locale">

  export type AiChatHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    locale?: SortOrder
    adminId?: SortOrderInput | SortOrder
    messages?: SortOrder
    templateId?: SortOrderInput | SortOrder
    context?: SortOrderInput | SortOrder
    messageCount?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: AiChatHistoryCountOrderByAggregateInput
    _avg?: AiChatHistoryAvgOrderByAggregateInput
    _max?: AiChatHistoryMaxOrderByAggregateInput
    _min?: AiChatHistoryMinOrderByAggregateInput
    _sum?: AiChatHistorySumOrderByAggregateInput
  }

  export type AiChatHistoryScalarWhereWithAggregatesInput = {
    AND?: AiChatHistoryScalarWhereWithAggregatesInput | AiChatHistoryScalarWhereWithAggregatesInput[]
    OR?: AiChatHistoryScalarWhereWithAggregatesInput[]
    NOT?: AiChatHistoryScalarWhereWithAggregatesInput | AiChatHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiChatHistory"> | string
    gameId?: StringWithAggregatesFilter<"AiChatHistory"> | string
    locale?: StringWithAggregatesFilter<"AiChatHistory"> | string
    adminId?: StringNullableWithAggregatesFilter<"AiChatHistory"> | string | null
    messages?: JsonWithAggregatesFilter<"AiChatHistory">
    templateId?: StringNullableWithAggregatesFilter<"AiChatHistory"> | string | null
    context?: JsonNullableWithAggregatesFilter<"AiChatHistory">
    messageCount?: IntWithAggregatesFilter<"AiChatHistory"> | number
    totalTokens?: IntWithAggregatesFilter<"AiChatHistory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AiChatHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiChatHistory"> | Date | string
    lastUsedAt?: DateTimeWithAggregatesFilter<"AiChatHistory"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"AiChatHistory"> | Date | string
  }

  export type GamePixGameCacheCreateInput = {
    id: string
    namespace: string
    title: string
    description: string
    category: string
    quality_score: number
    banner_image: string
    image: string
    url: string
    width: number
    height: number
    orientation: string
    date_published: Date | string
    date_modified: Date | string
    isImported?: boolean
    importCount?: number
    lastImportedAt?: Date | string | null
    customTags?: GamePixGameCacheCreatecustomTagsInput | string[]
    notes?: string | null
    priority?: number
    isHidden?: boolean
    extractedTags?: GamePixGameCacheCreateextractedTagsInput | string[]
    extractedMarkdown?: string | null
    extractedVideos?: GamePixGameCacheCreateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheCreateextractedScreenshotsInput | string[]
    extractedAt?: Date | string | null
    lastSyncAt?: Date | string
    syncSource?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePixGameCacheUncheckedCreateInput = {
    id: string
    namespace: string
    title: string
    description: string
    category: string
    quality_score: number
    banner_image: string
    image: string
    url: string
    width: number
    height: number
    orientation: string
    date_published: Date | string
    date_modified: Date | string
    isImported?: boolean
    importCount?: number
    lastImportedAt?: Date | string | null
    customTags?: GamePixGameCacheCreatecustomTagsInput | string[]
    notes?: string | null
    priority?: number
    isHidden?: boolean
    extractedTags?: GamePixGameCacheCreateextractedTagsInput | string[]
    extractedMarkdown?: string | null
    extractedVideos?: GamePixGameCacheCreateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheCreateextractedScreenshotsInput | string[]
    extractedAt?: Date | string | null
    lastSyncAt?: Date | string
    syncSource?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePixGameCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    quality_score?: FloatFieldUpdateOperationsInput | number
    banner_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    orientation?: StringFieldUpdateOperationsInput | string
    date_published?: DateTimeFieldUpdateOperationsInput | Date | string
    date_modified?: DateTimeFieldUpdateOperationsInput | Date | string
    isImported?: BoolFieldUpdateOperationsInput | boolean
    importCount?: IntFieldUpdateOperationsInput | number
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customTags?: GamePixGameCacheUpdatecustomTagsInput | string[]
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    extractedTags?: GamePixGameCacheUpdateextractedTagsInput | string[]
    extractedMarkdown?: NullableStringFieldUpdateOperationsInput | string | null
    extractedVideos?: GamePixGameCacheUpdateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheUpdateextractedScreenshotsInput | string[]
    extractedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncSource?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePixGameCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    quality_score?: FloatFieldUpdateOperationsInput | number
    banner_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    orientation?: StringFieldUpdateOperationsInput | string
    date_published?: DateTimeFieldUpdateOperationsInput | Date | string
    date_modified?: DateTimeFieldUpdateOperationsInput | Date | string
    isImported?: BoolFieldUpdateOperationsInput | boolean
    importCount?: IntFieldUpdateOperationsInput | number
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customTags?: GamePixGameCacheUpdatecustomTagsInput | string[]
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    extractedTags?: GamePixGameCacheUpdateextractedTagsInput | string[]
    extractedMarkdown?: NullableStringFieldUpdateOperationsInput | string | null
    extractedVideos?: GamePixGameCacheUpdateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheUpdateextractedScreenshotsInput | string[]
    extractedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncSource?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePixGameCacheCreateManyInput = {
    id: string
    namespace: string
    title: string
    description: string
    category: string
    quality_score: number
    banner_image: string
    image: string
    url: string
    width: number
    height: number
    orientation: string
    date_published: Date | string
    date_modified: Date | string
    isImported?: boolean
    importCount?: number
    lastImportedAt?: Date | string | null
    customTags?: GamePixGameCacheCreatecustomTagsInput | string[]
    notes?: string | null
    priority?: number
    isHidden?: boolean
    extractedTags?: GamePixGameCacheCreateextractedTagsInput | string[]
    extractedMarkdown?: string | null
    extractedVideos?: GamePixGameCacheCreateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheCreateextractedScreenshotsInput | string[]
    extractedAt?: Date | string | null
    lastSyncAt?: Date | string
    syncSource?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GamePixGameCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    quality_score?: FloatFieldUpdateOperationsInput | number
    banner_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    orientation?: StringFieldUpdateOperationsInput | string
    date_published?: DateTimeFieldUpdateOperationsInput | Date | string
    date_modified?: DateTimeFieldUpdateOperationsInput | Date | string
    isImported?: BoolFieldUpdateOperationsInput | boolean
    importCount?: IntFieldUpdateOperationsInput | number
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customTags?: GamePixGameCacheUpdatecustomTagsInput | string[]
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    extractedTags?: GamePixGameCacheUpdateextractedTagsInput | string[]
    extractedMarkdown?: NullableStringFieldUpdateOperationsInput | string | null
    extractedVideos?: GamePixGameCacheUpdateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheUpdateextractedScreenshotsInput | string[]
    extractedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncSource?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GamePixGameCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namespace?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    quality_score?: FloatFieldUpdateOperationsInput | number
    banner_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    orientation?: StringFieldUpdateOperationsInput | string
    date_published?: DateTimeFieldUpdateOperationsInput | Date | string
    date_modified?: DateTimeFieldUpdateOperationsInput | Date | string
    isImported?: BoolFieldUpdateOperationsInput | boolean
    importCount?: IntFieldUpdateOperationsInput | number
    lastImportedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customTags?: GamePixGameCacheUpdatecustomTagsInput | string[]
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    priority?: IntFieldUpdateOperationsInput | number
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    extractedTags?: GamePixGameCacheUpdateextractedTagsInput | string[]
    extractedMarkdown?: NullableStringFieldUpdateOperationsInput | string | null
    extractedVideos?: GamePixGameCacheUpdateextractedVideosInput | string[]
    extractedScreenshots?: GamePixGameCacheUpdateextractedScreenshotsInput | string[]
    extractedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSyncAt?: DateTimeFieldUpdateOperationsInput | Date | string
    syncSource?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    id?: string
    totalGames: number
    newGames: number
    updatedGames: number
    deletedGames?: number
    status: string
    errorMessage?: string | null
    syncDuration?: number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string
  }

  export type SyncLogUncheckedCreateInput = {
    id?: string
    totalGames: number
    newGames: number
    updatedGames: number
    deletedGames?: number
    status: string
    errorMessage?: string | null
    syncDuration?: number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string
  }

  export type SyncLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalGames?: IntFieldUpdateOperationsInput | number
    newGames?: IntFieldUpdateOperationsInput | number
    updatedGames?: IntFieldUpdateOperationsInput | number
    deletedGames?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    syncDuration?: NullableIntFieldUpdateOperationsInput | number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalGames?: IntFieldUpdateOperationsInput | number
    newGames?: IntFieldUpdateOperationsInput | number
    updatedGames?: IntFieldUpdateOperationsInput | number
    deletedGames?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    syncDuration?: NullableIntFieldUpdateOperationsInput | number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateManyInput = {
    id?: string
    totalGames: number
    newGames: number
    updatedGames: number
    deletedGames?: number
    status: string
    errorMessage?: string | null
    syncDuration?: number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string
  }

  export type SyncLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalGames?: IntFieldUpdateOperationsInput | number
    newGames?: IntFieldUpdateOperationsInput | number
    updatedGames?: IntFieldUpdateOperationsInput | number
    deletedGames?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    syncDuration?: NullableIntFieldUpdateOperationsInput | number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalGames?: IntFieldUpdateOperationsInput | number
    newGames?: IntFieldUpdateOperationsInput | number
    updatedGames?: IntFieldUpdateOperationsInput | number
    deletedGames?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    syncDuration?: NullableIntFieldUpdateOperationsInput | number | null
    apiParams?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryCreateInput = {
    id?: string
    gameId: string
    locale: string
    adminId?: string | null
    messages: JsonNullValueInput | InputJsonValue
    templateId?: string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: number
    totalTokens?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string
    expiresAt: Date | string
  }

  export type AiChatHistoryUncheckedCreateInput = {
    id?: string
    gameId: string
    locale: string
    adminId?: string | null
    messages: JsonNullValueInput | InputJsonValue
    templateId?: string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: number
    totalTokens?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string
    expiresAt: Date | string
  }

  export type AiChatHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: JsonNullValueInput | InputJsonValue
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: JsonNullValueInput | InputJsonValue
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryCreateManyInput = {
    id?: string
    gameId: string
    locale: string
    adminId?: string | null
    messages: JsonNullValueInput | InputJsonValue
    templateId?: string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: number
    totalTokens?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUsedAt?: Date | string
    expiresAt: Date | string
  }

  export type AiChatHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: JsonNullValueInput | InputJsonValue
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: JsonNullValueInput | InputJsonValue
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    context?: NullableJsonNullValueInput | InputJsonValue
    messageCount?: IntFieldUpdateOperationsInput | number
    totalTokens?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GamePixGameCacheCountOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    quality_score?: SortOrder
    banner_image?: SortOrder
    image?: SortOrder
    url?: SortOrder
    width?: SortOrder
    height?: SortOrder
    orientation?: SortOrder
    date_published?: SortOrder
    date_modified?: SortOrder
    isImported?: SortOrder
    importCount?: SortOrder
    lastImportedAt?: SortOrder
    customTags?: SortOrder
    notes?: SortOrder
    priority?: SortOrder
    isHidden?: SortOrder
    extractedTags?: SortOrder
    extractedMarkdown?: SortOrder
    extractedVideos?: SortOrder
    extractedScreenshots?: SortOrder
    extractedAt?: SortOrder
    lastSyncAt?: SortOrder
    syncSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePixGameCacheAvgOrderByAggregateInput = {
    quality_score?: SortOrder
    width?: SortOrder
    height?: SortOrder
    importCount?: SortOrder
    priority?: SortOrder
  }

  export type GamePixGameCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    quality_score?: SortOrder
    banner_image?: SortOrder
    image?: SortOrder
    url?: SortOrder
    width?: SortOrder
    height?: SortOrder
    orientation?: SortOrder
    date_published?: SortOrder
    date_modified?: SortOrder
    isImported?: SortOrder
    importCount?: SortOrder
    lastImportedAt?: SortOrder
    notes?: SortOrder
    priority?: SortOrder
    isHidden?: SortOrder
    extractedMarkdown?: SortOrder
    extractedAt?: SortOrder
    lastSyncAt?: SortOrder
    syncSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePixGameCacheMinOrderByAggregateInput = {
    id?: SortOrder
    namespace?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    quality_score?: SortOrder
    banner_image?: SortOrder
    image?: SortOrder
    url?: SortOrder
    width?: SortOrder
    height?: SortOrder
    orientation?: SortOrder
    date_published?: SortOrder
    date_modified?: SortOrder
    isImported?: SortOrder
    importCount?: SortOrder
    lastImportedAt?: SortOrder
    notes?: SortOrder
    priority?: SortOrder
    isHidden?: SortOrder
    extractedMarkdown?: SortOrder
    extractedAt?: SortOrder
    lastSyncAt?: SortOrder
    syncSource?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GamePixGameCacheSumOrderByAggregateInput = {
    quality_score?: SortOrder
    width?: SortOrder
    height?: SortOrder
    importCount?: SortOrder
    priority?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    syncDuration?: SortOrder
    apiParams?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    syncDuration?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    syncDuration?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    syncDuration?: SortOrder
    syncedAt?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    totalGames?: SortOrder
    newGames?: SortOrder
    updatedGames?: SortOrder
    deletedGames?: SortOrder
    syncDuration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AiChatHistoryGameIdLocaleCompoundUniqueInput = {
    gameId: string
    locale: string
  }

  export type AiChatHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    locale?: SortOrder
    adminId?: SortOrder
    messages?: SortOrder
    templateId?: SortOrder
    context?: SortOrder
    messageCount?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type AiChatHistoryAvgOrderByAggregateInput = {
    messageCount?: SortOrder
    totalTokens?: SortOrder
  }

  export type AiChatHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    locale?: SortOrder
    adminId?: SortOrder
    templateId?: SortOrder
    messageCount?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type AiChatHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    locale?: SortOrder
    adminId?: SortOrder
    templateId?: SortOrder
    messageCount?: SortOrder
    totalTokens?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type AiChatHistorySumOrderByAggregateInput = {
    messageCount?: SortOrder
    totalTokens?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type GamePixGameCacheCreatecustomTagsInput = {
    set: string[]
  }

  export type GamePixGameCacheCreateextractedTagsInput = {
    set: string[]
  }

  export type GamePixGameCacheCreateextractedVideosInput = {
    set: string[]
  }

  export type GamePixGameCacheCreateextractedScreenshotsInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GamePixGameCacheUpdatecustomTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GamePixGameCacheUpdateextractedTagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GamePixGameCacheUpdateextractedVideosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GamePixGameCacheUpdateextractedScreenshotsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}