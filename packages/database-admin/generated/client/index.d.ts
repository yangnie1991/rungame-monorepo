
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model ImportPlatform
 * 
 */
export type ImportPlatform = $Result.DefaultSelection<Prisma.$ImportPlatformPayload>
/**
 * Model AiConfig
 * 
 */
export type AiConfig = $Result.DefaultSelection<Prisma.$AiConfigPayload>
/**
 * Model ExternalApiConfig
 * 
 */
export type ExternalApiConfig = $Result.DefaultSelection<Prisma.$ExternalApiConfigPayload>
/**
 * Model SearchEngineConfig
 * 
 */
export type SearchEngineConfig = $Result.DefaultSelection<Prisma.$SearchEngineConfigPayload>
/**
 * Model UrlSubmission
 * 
 */
export type UrlSubmission = $Result.DefaultSelection<Prisma.$UrlSubmissionPayload>
/**
 * Model SubmissionBatch
 * 
 */
export type SubmissionBatch = $Result.DefaultSelection<Prisma.$SubmissionBatchPayload>
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
 * Enums
 */
export namespace $Enums {
  export const SubmissionStatus: {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING'
};

export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus]


export const BatchStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type BatchStatus = (typeof BatchStatus)[keyof typeof BatchStatus]

}

export type SubmissionStatus = $Enums.SubmissionStatus

export const SubmissionStatus: typeof $Enums.SubmissionStatus

export type BatchStatus = $Enums.BatchStatus

export const BatchStatus: typeof $Enums.BatchStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importPlatform`: Exposes CRUD operations for the **ImportPlatform** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportPlatforms
    * const importPlatforms = await prisma.importPlatform.findMany()
    * ```
    */
  get importPlatform(): Prisma.ImportPlatformDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiConfig`: Exposes CRUD operations for the **AiConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiConfigs
    * const aiConfigs = await prisma.aiConfig.findMany()
    * ```
    */
  get aiConfig(): Prisma.AiConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.externalApiConfig`: Exposes CRUD operations for the **ExternalApiConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExternalApiConfigs
    * const externalApiConfigs = await prisma.externalApiConfig.findMany()
    * ```
    */
  get externalApiConfig(): Prisma.ExternalApiConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchEngineConfig`: Exposes CRUD operations for the **SearchEngineConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchEngineConfigs
    * const searchEngineConfigs = await prisma.searchEngineConfig.findMany()
    * ```
    */
  get searchEngineConfig(): Prisma.SearchEngineConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.urlSubmission`: Exposes CRUD operations for the **UrlSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UrlSubmissions
    * const urlSubmissions = await prisma.urlSubmission.findMany()
    * ```
    */
  get urlSubmission(): Prisma.UrlSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submissionBatch`: Exposes CRUD operations for the **SubmissionBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubmissionBatches
    * const submissionBatches = await prisma.submissionBatch.findMany()
    * ```
    */
  get submissionBatch(): Prisma.SubmissionBatchDelegate<ExtArgs, ClientOptions>;

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    ImportPlatform: 'ImportPlatform',
    AiConfig: 'AiConfig',
    ExternalApiConfig: 'ExternalApiConfig',
    SearchEngineConfig: 'SearchEngineConfig',
    UrlSubmission: 'UrlSubmission',
    SubmissionBatch: 'SubmissionBatch',
    GamePixGameCache: 'GamePixGameCache',
    SyncLog: 'SyncLog',
    AiChatHistory: 'AiChatHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "importPlatform" | "aiConfig" | "externalApiConfig" | "searchEngineConfig" | "urlSubmission" | "submissionBatch" | "gamePixGameCache" | "syncLog" | "aiChatHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      ImportPlatform: {
        payload: Prisma.$ImportPlatformPayload<ExtArgs>
        fields: Prisma.ImportPlatformFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportPlatformFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportPlatformFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          findFirst: {
            args: Prisma.ImportPlatformFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportPlatformFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          findMany: {
            args: Prisma.ImportPlatformFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>[]
          }
          create: {
            args: Prisma.ImportPlatformCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          createMany: {
            args: Prisma.ImportPlatformCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportPlatformCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>[]
          }
          delete: {
            args: Prisma.ImportPlatformDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          update: {
            args: Prisma.ImportPlatformUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          deleteMany: {
            args: Prisma.ImportPlatformDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportPlatformUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportPlatformUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>[]
          }
          upsert: {
            args: Prisma.ImportPlatformUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportPlatformPayload>
          }
          aggregate: {
            args: Prisma.ImportPlatformAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportPlatform>
          }
          groupBy: {
            args: Prisma.ImportPlatformGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportPlatformGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportPlatformCountArgs<ExtArgs>
            result: $Utils.Optional<ImportPlatformCountAggregateOutputType> | number
          }
        }
      }
      AiConfig: {
        payload: Prisma.$AiConfigPayload<ExtArgs>
        fields: Prisma.AiConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          findFirst: {
            args: Prisma.AiConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          findMany: {
            args: Prisma.AiConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          create: {
            args: Prisma.AiConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          createMany: {
            args: Prisma.AiConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          delete: {
            args: Prisma.AiConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          update: {
            args: Prisma.AiConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          deleteMany: {
            args: Prisma.AiConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>[]
          }
          upsert: {
            args: Prisma.AiConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConfigPayload>
          }
          aggregate: {
            args: Prisma.AiConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiConfig>
          }
          groupBy: {
            args: Prisma.AiConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AiConfigCountAggregateOutputType> | number
          }
        }
      }
      ExternalApiConfig: {
        payload: Prisma.$ExternalApiConfigPayload<ExtArgs>
        fields: Prisma.ExternalApiConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExternalApiConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExternalApiConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          findFirst: {
            args: Prisma.ExternalApiConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExternalApiConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          findMany: {
            args: Prisma.ExternalApiConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>[]
          }
          create: {
            args: Prisma.ExternalApiConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          createMany: {
            args: Prisma.ExternalApiConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExternalApiConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>[]
          }
          delete: {
            args: Prisma.ExternalApiConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          update: {
            args: Prisma.ExternalApiConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          deleteMany: {
            args: Prisma.ExternalApiConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExternalApiConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExternalApiConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>[]
          }
          upsert: {
            args: Prisma.ExternalApiConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExternalApiConfigPayload>
          }
          aggregate: {
            args: Prisma.ExternalApiConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExternalApiConfig>
          }
          groupBy: {
            args: Prisma.ExternalApiConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExternalApiConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExternalApiConfigCountArgs<ExtArgs>
            result: $Utils.Optional<ExternalApiConfigCountAggregateOutputType> | number
          }
        }
      }
      SearchEngineConfig: {
        payload: Prisma.$SearchEngineConfigPayload<ExtArgs>
        fields: Prisma.SearchEngineConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchEngineConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchEngineConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          findFirst: {
            args: Prisma.SearchEngineConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchEngineConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          findMany: {
            args: Prisma.SearchEngineConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>[]
          }
          create: {
            args: Prisma.SearchEngineConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          createMany: {
            args: Prisma.SearchEngineConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SearchEngineConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>[]
          }
          delete: {
            args: Prisma.SearchEngineConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          update: {
            args: Prisma.SearchEngineConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          deleteMany: {
            args: Prisma.SearchEngineConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchEngineConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchEngineConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>[]
          }
          upsert: {
            args: Prisma.SearchEngineConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEngineConfigPayload>
          }
          aggregate: {
            args: Prisma.SearchEngineConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchEngineConfig>
          }
          groupBy: {
            args: Prisma.SearchEngineConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchEngineConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchEngineConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SearchEngineConfigCountAggregateOutputType> | number
          }
        }
      }
      UrlSubmission: {
        payload: Prisma.$UrlSubmissionPayload<ExtArgs>
        fields: Prisma.UrlSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UrlSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UrlSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          findFirst: {
            args: Prisma.UrlSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UrlSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          findMany: {
            args: Prisma.UrlSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>[]
          }
          create: {
            args: Prisma.UrlSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          createMany: {
            args: Prisma.UrlSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UrlSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>[]
          }
          delete: {
            args: Prisma.UrlSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          update: {
            args: Prisma.UrlSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.UrlSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UrlSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UrlSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.UrlSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UrlSubmissionPayload>
          }
          aggregate: {
            args: Prisma.UrlSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUrlSubmission>
          }
          groupBy: {
            args: Prisma.UrlSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UrlSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UrlSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<UrlSubmissionCountAggregateOutputType> | number
          }
        }
      }
      SubmissionBatch: {
        payload: Prisma.$SubmissionBatchPayload<ExtArgs>
        fields: Prisma.SubmissionBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          findFirst: {
            args: Prisma.SubmissionBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          findMany: {
            args: Prisma.SubmissionBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>[]
          }
          create: {
            args: Prisma.SubmissionBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          createMany: {
            args: Prisma.SubmissionBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionBatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>[]
          }
          delete: {
            args: Prisma.SubmissionBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          update: {
            args: Prisma.SubmissionBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionBatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionBatchPayload>
          }
          aggregate: {
            args: Prisma.SubmissionBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmissionBatch>
          }
          groupBy: {
            args: Prisma.SubmissionBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionBatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionBatchCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionBatchCountAggregateOutputType> | number
          }
        }
      }
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    importPlatform?: ImportPlatformOmit
    aiConfig?: AiConfigOmit
    externalApiConfig?: ExternalApiConfigOmit
    searchEngineConfig?: SearchEngineConfigOmit
    urlSubmission?: UrlSubmissionOmit
    submissionBatch?: SubmissionBatchOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    role: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    role: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    password: number
    role: number
    isActive: number
    lastLoginAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    role?: true
    isActive?: true
    lastLoginAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    password: string | null
    role: string
    isActive: boolean
    lastLoginAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "password" | "role" | "isActive" | "lastLoginAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      emailVerified: boolean | null
      image: string | null
      createdAt: Date
      updatedAt: Date
      password: string | null
      role: string
      isActive: boolean
      lastLoginAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model ImportPlatform
   */

  export type AggregateImportPlatform = {
    _count: ImportPlatformCountAggregateOutputType | null
    _avg: ImportPlatformAvgAggregateOutputType | null
    _sum: ImportPlatformSumAggregateOutputType | null
    _min: ImportPlatformMinAggregateOutputType | null
    _max: ImportPlatformMaxAggregateOutputType | null
  }

  export type ImportPlatformAvgAggregateOutputType = {
    sortOrder: number | null
    totalImported: number | null
  }

  export type ImportPlatformSumAggregateOutputType = {
    sortOrder: number | null
    totalImported: number | null
  }

  export type ImportPlatformMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    icon: string | null
    isEnabled: boolean | null
    sortOrder: number | null
    totalImported: number | null
    lastImportAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImportPlatformMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    icon: string | null
    isEnabled: boolean | null
    sortOrder: number | null
    totalImported: number | null
    lastImportAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ImportPlatformCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    type: number
    icon: number
    apiConfig: number
    defaultConfig: number
    isEnabled: number
    sortOrder: number
    totalImported: number
    lastImportAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ImportPlatformAvgAggregateInputType = {
    sortOrder?: true
    totalImported?: true
  }

  export type ImportPlatformSumAggregateInputType = {
    sortOrder?: true
    totalImported?: true
  }

  export type ImportPlatformMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    isEnabled?: true
    sortOrder?: true
    totalImported?: true
    lastImportAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImportPlatformMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    isEnabled?: true
    sortOrder?: true
    totalImported?: true
    lastImportAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ImportPlatformCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    apiConfig?: true
    defaultConfig?: true
    isEnabled?: true
    sortOrder?: true
    totalImported?: true
    lastImportAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ImportPlatformAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportPlatform to aggregate.
     */
    where?: ImportPlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportPlatforms to fetch.
     */
    orderBy?: ImportPlatformOrderByWithRelationInput | ImportPlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportPlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportPlatforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportPlatforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportPlatforms
    **/
    _count?: true | ImportPlatformCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ImportPlatformAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ImportPlatformSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportPlatformMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportPlatformMaxAggregateInputType
  }

  export type GetImportPlatformAggregateType<T extends ImportPlatformAggregateArgs> = {
        [P in keyof T & keyof AggregateImportPlatform]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportPlatform[P]>
      : GetScalarType<T[P], AggregateImportPlatform[P]>
  }




  export type ImportPlatformGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportPlatformWhereInput
    orderBy?: ImportPlatformOrderByWithAggregationInput | ImportPlatformOrderByWithAggregationInput[]
    by: ImportPlatformScalarFieldEnum[] | ImportPlatformScalarFieldEnum
    having?: ImportPlatformScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportPlatformCountAggregateInputType | true
    _avg?: ImportPlatformAvgAggregateInputType
    _sum?: ImportPlatformSumAggregateInputType
    _min?: ImportPlatformMinAggregateInputType
    _max?: ImportPlatformMaxAggregateInputType
  }

  export type ImportPlatformGroupByOutputType = {
    id: string
    name: string
    slug: string
    type: string
    icon: string | null
    apiConfig: JsonValue
    defaultConfig: JsonValue | null
    isEnabled: boolean
    sortOrder: number
    totalImported: number
    lastImportAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ImportPlatformCountAggregateOutputType | null
    _avg: ImportPlatformAvgAggregateOutputType | null
    _sum: ImportPlatformSumAggregateOutputType | null
    _min: ImportPlatformMinAggregateOutputType | null
    _max: ImportPlatformMaxAggregateOutputType | null
  }

  type GetImportPlatformGroupByPayload<T extends ImportPlatformGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportPlatformGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportPlatformGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportPlatformGroupByOutputType[P]>
            : GetScalarType<T[P], ImportPlatformGroupByOutputType[P]>
        }
      >
    >


  export type ImportPlatformSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    apiConfig?: boolean
    defaultConfig?: boolean
    isEnabled?: boolean
    sortOrder?: boolean
    totalImported?: boolean
    lastImportAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["importPlatform"]>

  export type ImportPlatformSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    apiConfig?: boolean
    defaultConfig?: boolean
    isEnabled?: boolean
    sortOrder?: boolean
    totalImported?: boolean
    lastImportAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["importPlatform"]>

  export type ImportPlatformSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    apiConfig?: boolean
    defaultConfig?: boolean
    isEnabled?: boolean
    sortOrder?: boolean
    totalImported?: boolean
    lastImportAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["importPlatform"]>

  export type ImportPlatformSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    apiConfig?: boolean
    defaultConfig?: boolean
    isEnabled?: boolean
    sortOrder?: boolean
    totalImported?: boolean
    lastImportAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ImportPlatformOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "type" | "icon" | "apiConfig" | "defaultConfig" | "isEnabled" | "sortOrder" | "totalImported" | "lastImportAt" | "createdAt" | "updatedAt", ExtArgs["result"]["importPlatform"]>

  export type $ImportPlatformPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportPlatform"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      type: string
      icon: string | null
      apiConfig: Prisma.JsonValue
      defaultConfig: Prisma.JsonValue | null
      isEnabled: boolean
      sortOrder: number
      totalImported: number
      lastImportAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["importPlatform"]>
    composites: {}
  }

  type ImportPlatformGetPayload<S extends boolean | null | undefined | ImportPlatformDefaultArgs> = $Result.GetResult<Prisma.$ImportPlatformPayload, S>

  type ImportPlatformCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportPlatformFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportPlatformCountAggregateInputType | true
    }

  export interface ImportPlatformDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportPlatform'], meta: { name: 'ImportPlatform' } }
    /**
     * Find zero or one ImportPlatform that matches the filter.
     * @param {ImportPlatformFindUniqueArgs} args - Arguments to find a ImportPlatform
     * @example
     * // Get one ImportPlatform
     * const importPlatform = await prisma.importPlatform.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportPlatformFindUniqueArgs>(args: SelectSubset<T, ImportPlatformFindUniqueArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportPlatform that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportPlatformFindUniqueOrThrowArgs} args - Arguments to find a ImportPlatform
     * @example
     * // Get one ImportPlatform
     * const importPlatform = await prisma.importPlatform.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportPlatformFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportPlatformFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportPlatform that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformFindFirstArgs} args - Arguments to find a ImportPlatform
     * @example
     * // Get one ImportPlatform
     * const importPlatform = await prisma.importPlatform.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportPlatformFindFirstArgs>(args?: SelectSubset<T, ImportPlatformFindFirstArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportPlatform that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformFindFirstOrThrowArgs} args - Arguments to find a ImportPlatform
     * @example
     * // Get one ImportPlatform
     * const importPlatform = await prisma.importPlatform.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportPlatformFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportPlatformFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportPlatforms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportPlatforms
     * const importPlatforms = await prisma.importPlatform.findMany()
     * 
     * // Get first 10 ImportPlatforms
     * const importPlatforms = await prisma.importPlatform.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const importPlatformWithIdOnly = await prisma.importPlatform.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ImportPlatformFindManyArgs>(args?: SelectSubset<T, ImportPlatformFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportPlatform.
     * @param {ImportPlatformCreateArgs} args - Arguments to create a ImportPlatform.
     * @example
     * // Create one ImportPlatform
     * const ImportPlatform = await prisma.importPlatform.create({
     *   data: {
     *     // ... data to create a ImportPlatform
     *   }
     * })
     * 
     */
    create<T extends ImportPlatformCreateArgs>(args: SelectSubset<T, ImportPlatformCreateArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportPlatforms.
     * @param {ImportPlatformCreateManyArgs} args - Arguments to create many ImportPlatforms.
     * @example
     * // Create many ImportPlatforms
     * const importPlatform = await prisma.importPlatform.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportPlatformCreateManyArgs>(args?: SelectSubset<T, ImportPlatformCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImportPlatforms and returns the data saved in the database.
     * @param {ImportPlatformCreateManyAndReturnArgs} args - Arguments to create many ImportPlatforms.
     * @example
     * // Create many ImportPlatforms
     * const importPlatform = await prisma.importPlatform.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImportPlatforms and only return the `id`
     * const importPlatformWithIdOnly = await prisma.importPlatform.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportPlatformCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportPlatformCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImportPlatform.
     * @param {ImportPlatformDeleteArgs} args - Arguments to delete one ImportPlatform.
     * @example
     * // Delete one ImportPlatform
     * const ImportPlatform = await prisma.importPlatform.delete({
     *   where: {
     *     // ... filter to delete one ImportPlatform
     *   }
     * })
     * 
     */
    delete<T extends ImportPlatformDeleteArgs>(args: SelectSubset<T, ImportPlatformDeleteArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportPlatform.
     * @param {ImportPlatformUpdateArgs} args - Arguments to update one ImportPlatform.
     * @example
     * // Update one ImportPlatform
     * const importPlatform = await prisma.importPlatform.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportPlatformUpdateArgs>(args: SelectSubset<T, ImportPlatformUpdateArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportPlatforms.
     * @param {ImportPlatformDeleteManyArgs} args - Arguments to filter ImportPlatforms to delete.
     * @example
     * // Delete a few ImportPlatforms
     * const { count } = await prisma.importPlatform.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportPlatformDeleteManyArgs>(args?: SelectSubset<T, ImportPlatformDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportPlatforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportPlatforms
     * const importPlatform = await prisma.importPlatform.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportPlatformUpdateManyArgs>(args: SelectSubset<T, ImportPlatformUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportPlatforms and returns the data updated in the database.
     * @param {ImportPlatformUpdateManyAndReturnArgs} args - Arguments to update many ImportPlatforms.
     * @example
     * // Update many ImportPlatforms
     * const importPlatform = await prisma.importPlatform.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImportPlatforms and only return the `id`
     * const importPlatformWithIdOnly = await prisma.importPlatform.updateManyAndReturn({
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
    updateManyAndReturn<T extends ImportPlatformUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportPlatformUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImportPlatform.
     * @param {ImportPlatformUpsertArgs} args - Arguments to update or create a ImportPlatform.
     * @example
     * // Update or create a ImportPlatform
     * const importPlatform = await prisma.importPlatform.upsert({
     *   create: {
     *     // ... data to create a ImportPlatform
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportPlatform we want to update
     *   }
     * })
     */
    upsert<T extends ImportPlatformUpsertArgs>(args: SelectSubset<T, ImportPlatformUpsertArgs<ExtArgs>>): Prisma__ImportPlatformClient<$Result.GetResult<Prisma.$ImportPlatformPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImportPlatforms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformCountArgs} args - Arguments to filter ImportPlatforms to count.
     * @example
     * // Count the number of ImportPlatforms
     * const count = await prisma.importPlatform.count({
     *   where: {
     *     // ... the filter for the ImportPlatforms we want to count
     *   }
     * })
    **/
    count<T extends ImportPlatformCountArgs>(
      args?: Subset<T, ImportPlatformCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportPlatformCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportPlatform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ImportPlatformAggregateArgs>(args: Subset<T, ImportPlatformAggregateArgs>): Prisma.PrismaPromise<GetImportPlatformAggregateType<T>>

    /**
     * Group by ImportPlatform.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportPlatformGroupByArgs} args - Group by arguments.
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
      T extends ImportPlatformGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportPlatformGroupByArgs['orderBy'] }
        : { orderBy?: ImportPlatformGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ImportPlatformGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportPlatformGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportPlatform model
   */
  readonly fields: ImportPlatformFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportPlatform.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportPlatformClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ImportPlatform model
   */
  interface ImportPlatformFieldRefs {
    readonly id: FieldRef<"ImportPlatform", 'String'>
    readonly name: FieldRef<"ImportPlatform", 'String'>
    readonly slug: FieldRef<"ImportPlatform", 'String'>
    readonly type: FieldRef<"ImportPlatform", 'String'>
    readonly icon: FieldRef<"ImportPlatform", 'String'>
    readonly apiConfig: FieldRef<"ImportPlatform", 'Json'>
    readonly defaultConfig: FieldRef<"ImportPlatform", 'Json'>
    readonly isEnabled: FieldRef<"ImportPlatform", 'Boolean'>
    readonly sortOrder: FieldRef<"ImportPlatform", 'Int'>
    readonly totalImported: FieldRef<"ImportPlatform", 'Int'>
    readonly lastImportAt: FieldRef<"ImportPlatform", 'DateTime'>
    readonly createdAt: FieldRef<"ImportPlatform", 'DateTime'>
    readonly updatedAt: FieldRef<"ImportPlatform", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ImportPlatform findUnique
   */
  export type ImportPlatformFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter, which ImportPlatform to fetch.
     */
    where: ImportPlatformWhereUniqueInput
  }

  /**
   * ImportPlatform findUniqueOrThrow
   */
  export type ImportPlatformFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter, which ImportPlatform to fetch.
     */
    where: ImportPlatformWhereUniqueInput
  }

  /**
   * ImportPlatform findFirst
   */
  export type ImportPlatformFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter, which ImportPlatform to fetch.
     */
    where?: ImportPlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportPlatforms to fetch.
     */
    orderBy?: ImportPlatformOrderByWithRelationInput | ImportPlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportPlatforms.
     */
    cursor?: ImportPlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportPlatforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportPlatforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportPlatforms.
     */
    distinct?: ImportPlatformScalarFieldEnum | ImportPlatformScalarFieldEnum[]
  }

  /**
   * ImportPlatform findFirstOrThrow
   */
  export type ImportPlatformFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter, which ImportPlatform to fetch.
     */
    where?: ImportPlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportPlatforms to fetch.
     */
    orderBy?: ImportPlatformOrderByWithRelationInput | ImportPlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportPlatforms.
     */
    cursor?: ImportPlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportPlatforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportPlatforms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportPlatforms.
     */
    distinct?: ImportPlatformScalarFieldEnum | ImportPlatformScalarFieldEnum[]
  }

  /**
   * ImportPlatform findMany
   */
  export type ImportPlatformFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter, which ImportPlatforms to fetch.
     */
    where?: ImportPlatformWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportPlatforms to fetch.
     */
    orderBy?: ImportPlatformOrderByWithRelationInput | ImportPlatformOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportPlatforms.
     */
    cursor?: ImportPlatformWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportPlatforms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportPlatforms.
     */
    skip?: number
    distinct?: ImportPlatformScalarFieldEnum | ImportPlatformScalarFieldEnum[]
  }

  /**
   * ImportPlatform create
   */
  export type ImportPlatformCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * The data needed to create a ImportPlatform.
     */
    data: XOR<ImportPlatformCreateInput, ImportPlatformUncheckedCreateInput>
  }

  /**
   * ImportPlatform createMany
   */
  export type ImportPlatformCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportPlatforms.
     */
    data: ImportPlatformCreateManyInput | ImportPlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImportPlatform createManyAndReturn
   */
  export type ImportPlatformCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * The data used to create many ImportPlatforms.
     */
    data: ImportPlatformCreateManyInput | ImportPlatformCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ImportPlatform update
   */
  export type ImportPlatformUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * The data needed to update a ImportPlatform.
     */
    data: XOR<ImportPlatformUpdateInput, ImportPlatformUncheckedUpdateInput>
    /**
     * Choose, which ImportPlatform to update.
     */
    where: ImportPlatformWhereUniqueInput
  }

  /**
   * ImportPlatform updateMany
   */
  export type ImportPlatformUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportPlatforms.
     */
    data: XOR<ImportPlatformUpdateManyMutationInput, ImportPlatformUncheckedUpdateManyInput>
    /**
     * Filter which ImportPlatforms to update
     */
    where?: ImportPlatformWhereInput
    /**
     * Limit how many ImportPlatforms to update.
     */
    limit?: number
  }

  /**
   * ImportPlatform updateManyAndReturn
   */
  export type ImportPlatformUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * The data used to update ImportPlatforms.
     */
    data: XOR<ImportPlatformUpdateManyMutationInput, ImportPlatformUncheckedUpdateManyInput>
    /**
     * Filter which ImportPlatforms to update
     */
    where?: ImportPlatformWhereInput
    /**
     * Limit how many ImportPlatforms to update.
     */
    limit?: number
  }

  /**
   * ImportPlatform upsert
   */
  export type ImportPlatformUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * The filter to search for the ImportPlatform to update in case it exists.
     */
    where: ImportPlatformWhereUniqueInput
    /**
     * In case the ImportPlatform found by the `where` argument doesn't exist, create a new ImportPlatform with this data.
     */
    create: XOR<ImportPlatformCreateInput, ImportPlatformUncheckedCreateInput>
    /**
     * In case the ImportPlatform was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportPlatformUpdateInput, ImportPlatformUncheckedUpdateInput>
  }

  /**
   * ImportPlatform delete
   */
  export type ImportPlatformDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
    /**
     * Filter which ImportPlatform to delete.
     */
    where: ImportPlatformWhereUniqueInput
  }

  /**
   * ImportPlatform deleteMany
   */
  export type ImportPlatformDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportPlatforms to delete
     */
    where?: ImportPlatformWhereInput
    /**
     * Limit how many ImportPlatforms to delete.
     */
    limit?: number
  }

  /**
   * ImportPlatform without action
   */
  export type ImportPlatformDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportPlatform
     */
    select?: ImportPlatformSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportPlatform
     */
    omit?: ImportPlatformOmit<ExtArgs> | null
  }


  /**
   * Model AiConfig
   */

  export type AggregateAiConfig = {
    _count: AiConfigCountAggregateOutputType | null
    _min: AiConfigMinAggregateOutputType | null
    _max: AiConfigMaxAggregateOutputType | null
  }

  export type AiConfigMinAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    apiKey: string | null
    baseUrl: string | null
    isActive: boolean | null
    isEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConfigMaxAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    apiKey: string | null
    baseUrl: string | null
    isActive: boolean | null
    isEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConfigCountAggregateOutputType = {
    id: number
    name: number
    provider: number
    apiKey: number
    baseUrl: number
    modelConfig: number
    isActive: number
    isEnabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiConfigMinAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    apiKey?: true
    baseUrl?: true
    isActive?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConfigMaxAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    apiKey?: true
    baseUrl?: true
    isActive?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConfigCountAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    apiKey?: true
    baseUrl?: true
    modelConfig?: true
    isActive?: true
    isEnabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConfig to aggregate.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiConfigs
    **/
    _count?: true | AiConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiConfigMaxAggregateInputType
  }

  export type GetAiConfigAggregateType<T extends AiConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAiConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiConfig[P]>
      : GetScalarType<T[P], AggregateAiConfig[P]>
  }




  export type AiConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiConfigWhereInput
    orderBy?: AiConfigOrderByWithAggregationInput | AiConfigOrderByWithAggregationInput[]
    by: AiConfigScalarFieldEnum[] | AiConfigScalarFieldEnum
    having?: AiConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiConfigCountAggregateInputType | true
    _min?: AiConfigMinAggregateInputType
    _max?: AiConfigMaxAggregateInputType
  }

  export type AiConfigGroupByOutputType = {
    id: string
    name: string
    provider: string
    apiKey: string
    baseUrl: string
    modelConfig: JsonValue
    isActive: boolean
    isEnabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: AiConfigCountAggregateOutputType | null
    _min: AiConfigMinAggregateOutputType | null
    _max: AiConfigMaxAggregateOutputType | null
  }

  type GetAiConfigGroupByPayload<T extends AiConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AiConfigGroupByOutputType[P]>
        }
      >
    >


  export type AiConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    modelConfig?: boolean
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    modelConfig?: boolean
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    modelConfig?: boolean
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiConfig"]>

  export type AiConfigSelectScalar = {
    id?: boolean
    name?: boolean
    provider?: boolean
    apiKey?: boolean
    baseUrl?: boolean
    modelConfig?: boolean
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "provider" | "apiKey" | "baseUrl" | "modelConfig" | "isActive" | "isEnabled" | "createdAt" | "updatedAt", ExtArgs["result"]["aiConfig"]>

  export type $AiConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      provider: string
      apiKey: string
      baseUrl: string
      modelConfig: Prisma.JsonValue
      isActive: boolean
      isEnabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiConfig"]>
    composites: {}
  }

  type AiConfigGetPayload<S extends boolean | null | undefined | AiConfigDefaultArgs> = $Result.GetResult<Prisma.$AiConfigPayload, S>

  type AiConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiConfigCountAggregateInputType | true
    }

  export interface AiConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiConfig'], meta: { name: 'AiConfig' } }
    /**
     * Find zero or one AiConfig that matches the filter.
     * @param {AiConfigFindUniqueArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiConfigFindUniqueArgs>(args: SelectSubset<T, AiConfigFindUniqueArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiConfigFindUniqueOrThrowArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AiConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindFirstArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiConfigFindFirstArgs>(args?: SelectSubset<T, AiConfigFindFirstArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindFirstOrThrowArgs} args - Arguments to find a AiConfig
     * @example
     * // Get one AiConfig
     * const aiConfig = await prisma.aiConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AiConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiConfigs
     * const aiConfigs = await prisma.aiConfig.findMany()
     * 
     * // Get first 10 AiConfigs
     * const aiConfigs = await prisma.aiConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiConfigFindManyArgs>(args?: SelectSubset<T, AiConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiConfig.
     * @param {AiConfigCreateArgs} args - Arguments to create a AiConfig.
     * @example
     * // Create one AiConfig
     * const AiConfig = await prisma.aiConfig.create({
     *   data: {
     *     // ... data to create a AiConfig
     *   }
     * })
     * 
     */
    create<T extends AiConfigCreateArgs>(args: SelectSubset<T, AiConfigCreateArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiConfigs.
     * @param {AiConfigCreateManyArgs} args - Arguments to create many AiConfigs.
     * @example
     * // Create many AiConfigs
     * const aiConfig = await prisma.aiConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiConfigCreateManyArgs>(args?: SelectSubset<T, AiConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiConfigs and returns the data saved in the database.
     * @param {AiConfigCreateManyAndReturnArgs} args - Arguments to create many AiConfigs.
     * @example
     * // Create many AiConfigs
     * const aiConfig = await prisma.aiConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiConfigs and only return the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AiConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiConfig.
     * @param {AiConfigDeleteArgs} args - Arguments to delete one AiConfig.
     * @example
     * // Delete one AiConfig
     * const AiConfig = await prisma.aiConfig.delete({
     *   where: {
     *     // ... filter to delete one AiConfig
     *   }
     * })
     * 
     */
    delete<T extends AiConfigDeleteArgs>(args: SelectSubset<T, AiConfigDeleteArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiConfig.
     * @param {AiConfigUpdateArgs} args - Arguments to update one AiConfig.
     * @example
     * // Update one AiConfig
     * const aiConfig = await prisma.aiConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiConfigUpdateArgs>(args: SelectSubset<T, AiConfigUpdateArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiConfigs.
     * @param {AiConfigDeleteManyArgs} args - Arguments to filter AiConfigs to delete.
     * @example
     * // Delete a few AiConfigs
     * const { count } = await prisma.aiConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiConfigDeleteManyArgs>(args?: SelectSubset<T, AiConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiConfigs
     * const aiConfig = await prisma.aiConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiConfigUpdateManyArgs>(args: SelectSubset<T, AiConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConfigs and returns the data updated in the database.
     * @param {AiConfigUpdateManyAndReturnArgs} args - Arguments to update many AiConfigs.
     * @example
     * // Update many AiConfigs
     * const aiConfig = await prisma.aiConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiConfigs and only return the `id`
     * const aiConfigWithIdOnly = await prisma.aiConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends AiConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AiConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiConfig.
     * @param {AiConfigUpsertArgs} args - Arguments to update or create a AiConfig.
     * @example
     * // Update or create a AiConfig
     * const aiConfig = await prisma.aiConfig.upsert({
     *   create: {
     *     // ... data to create a AiConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiConfig we want to update
     *   }
     * })
     */
    upsert<T extends AiConfigUpsertArgs>(args: SelectSubset<T, AiConfigUpsertArgs<ExtArgs>>): Prisma__AiConfigClient<$Result.GetResult<Prisma.$AiConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigCountArgs} args - Arguments to filter AiConfigs to count.
     * @example
     * // Count the number of AiConfigs
     * const count = await prisma.aiConfig.count({
     *   where: {
     *     // ... the filter for the AiConfigs we want to count
     *   }
     * })
    **/
    count<T extends AiConfigCountArgs>(
      args?: Subset<T, AiConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiConfigAggregateArgs>(args: Subset<T, AiConfigAggregateArgs>): Prisma.PrismaPromise<GetAiConfigAggregateType<T>>

    /**
     * Group by AiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConfigGroupByArgs} args - Group by arguments.
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
      T extends AiConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiConfigGroupByArgs['orderBy'] }
        : { orderBy?: AiConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AiConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiConfig model
   */
  readonly fields: AiConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AiConfig model
   */
  interface AiConfigFieldRefs {
    readonly id: FieldRef<"AiConfig", 'String'>
    readonly name: FieldRef<"AiConfig", 'String'>
    readonly provider: FieldRef<"AiConfig", 'String'>
    readonly apiKey: FieldRef<"AiConfig", 'String'>
    readonly baseUrl: FieldRef<"AiConfig", 'String'>
    readonly modelConfig: FieldRef<"AiConfig", 'Json'>
    readonly isActive: FieldRef<"AiConfig", 'Boolean'>
    readonly isEnabled: FieldRef<"AiConfig", 'Boolean'>
    readonly createdAt: FieldRef<"AiConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"AiConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiConfig findUnique
   */
  export type AiConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig findUniqueOrThrow
   */
  export type AiConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig findFirst
   */
  export type AiConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConfigs.
     */
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig findFirstOrThrow
   */
  export type AiConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfig to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConfigs.
     */
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig findMany
   */
  export type AiConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter, which AiConfigs to fetch.
     */
    where?: AiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConfigs to fetch.
     */
    orderBy?: AiConfigOrderByWithRelationInput | AiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiConfigs.
     */
    cursor?: AiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConfigs.
     */
    skip?: number
    distinct?: AiConfigScalarFieldEnum | AiConfigScalarFieldEnum[]
  }

  /**
   * AiConfig create
   */
  export type AiConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AiConfig.
     */
    data: XOR<AiConfigCreateInput, AiConfigUncheckedCreateInput>
  }

  /**
   * AiConfig createMany
   */
  export type AiConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiConfigs.
     */
    data: AiConfigCreateManyInput | AiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiConfig createManyAndReturn
   */
  export type AiConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AiConfigs.
     */
    data: AiConfigCreateManyInput | AiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiConfig update
   */
  export type AiConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AiConfig.
     */
    data: XOR<AiConfigUpdateInput, AiConfigUncheckedUpdateInput>
    /**
     * Choose, which AiConfig to update.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig updateMany
   */
  export type AiConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiConfigs.
     */
    data: XOR<AiConfigUpdateManyMutationInput, AiConfigUncheckedUpdateManyInput>
    /**
     * Filter which AiConfigs to update
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to update.
     */
    limit?: number
  }

  /**
   * AiConfig updateManyAndReturn
   */
  export type AiConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The data used to update AiConfigs.
     */
    data: XOR<AiConfigUpdateManyMutationInput, AiConfigUncheckedUpdateManyInput>
    /**
     * Filter which AiConfigs to update
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to update.
     */
    limit?: number
  }

  /**
   * AiConfig upsert
   */
  export type AiConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AiConfig to update in case it exists.
     */
    where: AiConfigWhereUniqueInput
    /**
     * In case the AiConfig found by the `where` argument doesn't exist, create a new AiConfig with this data.
     */
    create: XOR<AiConfigCreateInput, AiConfigUncheckedCreateInput>
    /**
     * In case the AiConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiConfigUpdateInput, AiConfigUncheckedUpdateInput>
  }

  /**
   * AiConfig delete
   */
  export type AiConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
    /**
     * Filter which AiConfig to delete.
     */
    where: AiConfigWhereUniqueInput
  }

  /**
   * AiConfig deleteMany
   */
  export type AiConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConfigs to delete
     */
    where?: AiConfigWhereInput
    /**
     * Limit how many AiConfigs to delete.
     */
    limit?: number
  }

  /**
   * AiConfig without action
   */
  export type AiConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConfig
     */
    select?: AiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConfig
     */
    omit?: AiConfigOmit<ExtArgs> | null
  }


  /**
   * Model ExternalApiConfig
   */

  export type AggregateExternalApiConfig = {
    _count: ExternalApiConfigCountAggregateOutputType | null
    _avg: ExternalApiConfigAvgAggregateOutputType | null
    _sum: ExternalApiConfigSumAggregateOutputType | null
    _min: ExternalApiConfigMinAggregateOutputType | null
    _max: ExternalApiConfigMaxAggregateOutputType | null
  }

  export type ExternalApiConfigAvgAggregateOutputType = {
    totalCalls: number | null
    successCalls: number | null
    failedCalls: number | null
  }

  export type ExternalApiConfigSumAggregateOutputType = {
    totalCalls: number | null
    successCalls: number | null
    failedCalls: number | null
  }

  export type ExternalApiConfigMinAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    description: string | null
    provider: string | null
    isEncrypted: boolean | null
    isEnabled: boolean | null
    isActive: boolean | null
    totalCalls: number | null
    successCalls: number | null
    failedCalls: number | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExternalApiConfigMaxAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    description: string | null
    provider: string | null
    isEncrypted: boolean | null
    isEnabled: boolean | null
    isActive: boolean | null
    totalCalls: number | null
    successCalls: number | null
    failedCalls: number | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExternalApiConfigCountAggregateOutputType = {
    id: number
    name: number
    displayName: number
    description: number
    provider: number
    apiConfig: number
    isEncrypted: number
    isEnabled: number
    isActive: number
    totalCalls: number
    successCalls: number
    failedCalls: number
    lastUsedAt: number
    quotaConfig: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExternalApiConfigAvgAggregateInputType = {
    totalCalls?: true
    successCalls?: true
    failedCalls?: true
  }

  export type ExternalApiConfigSumAggregateInputType = {
    totalCalls?: true
    successCalls?: true
    failedCalls?: true
  }

  export type ExternalApiConfigMinAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    description?: true
    provider?: true
    isEncrypted?: true
    isEnabled?: true
    isActive?: true
    totalCalls?: true
    successCalls?: true
    failedCalls?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExternalApiConfigMaxAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    description?: true
    provider?: true
    isEncrypted?: true
    isEnabled?: true
    isActive?: true
    totalCalls?: true
    successCalls?: true
    failedCalls?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExternalApiConfigCountAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    description?: true
    provider?: true
    apiConfig?: true
    isEncrypted?: true
    isEnabled?: true
    isActive?: true
    totalCalls?: true
    successCalls?: true
    failedCalls?: true
    lastUsedAt?: true
    quotaConfig?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExternalApiConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalApiConfig to aggregate.
     */
    where?: ExternalApiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalApiConfigs to fetch.
     */
    orderBy?: ExternalApiConfigOrderByWithRelationInput | ExternalApiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExternalApiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalApiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalApiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExternalApiConfigs
    **/
    _count?: true | ExternalApiConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExternalApiConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExternalApiConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExternalApiConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExternalApiConfigMaxAggregateInputType
  }

  export type GetExternalApiConfigAggregateType<T extends ExternalApiConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateExternalApiConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExternalApiConfig[P]>
      : GetScalarType<T[P], AggregateExternalApiConfig[P]>
  }




  export type ExternalApiConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExternalApiConfigWhereInput
    orderBy?: ExternalApiConfigOrderByWithAggregationInput | ExternalApiConfigOrderByWithAggregationInput[]
    by: ExternalApiConfigScalarFieldEnum[] | ExternalApiConfigScalarFieldEnum
    having?: ExternalApiConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExternalApiConfigCountAggregateInputType | true
    _avg?: ExternalApiConfigAvgAggregateInputType
    _sum?: ExternalApiConfigSumAggregateInputType
    _min?: ExternalApiConfigMinAggregateInputType
    _max?: ExternalApiConfigMaxAggregateInputType
  }

  export type ExternalApiConfigGroupByOutputType = {
    id: string
    name: string
    displayName: string
    description: string | null
    provider: string
    apiConfig: JsonValue
    isEncrypted: boolean
    isEnabled: boolean
    isActive: boolean
    totalCalls: number
    successCalls: number
    failedCalls: number
    lastUsedAt: Date | null
    quotaConfig: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ExternalApiConfigCountAggregateOutputType | null
    _avg: ExternalApiConfigAvgAggregateOutputType | null
    _sum: ExternalApiConfigSumAggregateOutputType | null
    _min: ExternalApiConfigMinAggregateOutputType | null
    _max: ExternalApiConfigMaxAggregateOutputType | null
  }

  type GetExternalApiConfigGroupByPayload<T extends ExternalApiConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExternalApiConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExternalApiConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExternalApiConfigGroupByOutputType[P]>
            : GetScalarType<T[P], ExternalApiConfigGroupByOutputType[P]>
        }
      >
    >


  export type ExternalApiConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    description?: boolean
    provider?: boolean
    apiConfig?: boolean
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: boolean
    successCalls?: boolean
    failedCalls?: boolean
    lastUsedAt?: boolean
    quotaConfig?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalApiConfig"]>

  export type ExternalApiConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    description?: boolean
    provider?: boolean
    apiConfig?: boolean
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: boolean
    successCalls?: boolean
    failedCalls?: boolean
    lastUsedAt?: boolean
    quotaConfig?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalApiConfig"]>

  export type ExternalApiConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    description?: boolean
    provider?: boolean
    apiConfig?: boolean
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: boolean
    successCalls?: boolean
    failedCalls?: boolean
    lastUsedAt?: boolean
    quotaConfig?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["externalApiConfig"]>

  export type ExternalApiConfigSelectScalar = {
    id?: boolean
    name?: boolean
    displayName?: boolean
    description?: boolean
    provider?: boolean
    apiConfig?: boolean
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: boolean
    successCalls?: boolean
    failedCalls?: boolean
    lastUsedAt?: boolean
    quotaConfig?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExternalApiConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "displayName" | "description" | "provider" | "apiConfig" | "isEncrypted" | "isEnabled" | "isActive" | "totalCalls" | "successCalls" | "failedCalls" | "lastUsedAt" | "quotaConfig" | "createdAt" | "updatedAt", ExtArgs["result"]["externalApiConfig"]>

  export type $ExternalApiConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExternalApiConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      displayName: string
      description: string | null
      provider: string
      apiConfig: Prisma.JsonValue
      isEncrypted: boolean
      isEnabled: boolean
      isActive: boolean
      totalCalls: number
      successCalls: number
      failedCalls: number
      lastUsedAt: Date | null
      quotaConfig: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["externalApiConfig"]>
    composites: {}
  }

  type ExternalApiConfigGetPayload<S extends boolean | null | undefined | ExternalApiConfigDefaultArgs> = $Result.GetResult<Prisma.$ExternalApiConfigPayload, S>

  type ExternalApiConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExternalApiConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExternalApiConfigCountAggregateInputType | true
    }

  export interface ExternalApiConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExternalApiConfig'], meta: { name: 'ExternalApiConfig' } }
    /**
     * Find zero or one ExternalApiConfig that matches the filter.
     * @param {ExternalApiConfigFindUniqueArgs} args - Arguments to find a ExternalApiConfig
     * @example
     * // Get one ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExternalApiConfigFindUniqueArgs>(args: SelectSubset<T, ExternalApiConfigFindUniqueArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExternalApiConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExternalApiConfigFindUniqueOrThrowArgs} args - Arguments to find a ExternalApiConfig
     * @example
     * // Get one ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExternalApiConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, ExternalApiConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalApiConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigFindFirstArgs} args - Arguments to find a ExternalApiConfig
     * @example
     * // Get one ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExternalApiConfigFindFirstArgs>(args?: SelectSubset<T, ExternalApiConfigFindFirstArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExternalApiConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigFindFirstOrThrowArgs} args - Arguments to find a ExternalApiConfig
     * @example
     * // Get one ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExternalApiConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, ExternalApiConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExternalApiConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExternalApiConfigs
     * const externalApiConfigs = await prisma.externalApiConfig.findMany()
     * 
     * // Get first 10 ExternalApiConfigs
     * const externalApiConfigs = await prisma.externalApiConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const externalApiConfigWithIdOnly = await prisma.externalApiConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExternalApiConfigFindManyArgs>(args?: SelectSubset<T, ExternalApiConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExternalApiConfig.
     * @param {ExternalApiConfigCreateArgs} args - Arguments to create a ExternalApiConfig.
     * @example
     * // Create one ExternalApiConfig
     * const ExternalApiConfig = await prisma.externalApiConfig.create({
     *   data: {
     *     // ... data to create a ExternalApiConfig
     *   }
     * })
     * 
     */
    create<T extends ExternalApiConfigCreateArgs>(args: SelectSubset<T, ExternalApiConfigCreateArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExternalApiConfigs.
     * @param {ExternalApiConfigCreateManyArgs} args - Arguments to create many ExternalApiConfigs.
     * @example
     * // Create many ExternalApiConfigs
     * const externalApiConfig = await prisma.externalApiConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExternalApiConfigCreateManyArgs>(args?: SelectSubset<T, ExternalApiConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExternalApiConfigs and returns the data saved in the database.
     * @param {ExternalApiConfigCreateManyAndReturnArgs} args - Arguments to create many ExternalApiConfigs.
     * @example
     * // Create many ExternalApiConfigs
     * const externalApiConfig = await prisma.externalApiConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExternalApiConfigs and only return the `id`
     * const externalApiConfigWithIdOnly = await prisma.externalApiConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExternalApiConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, ExternalApiConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExternalApiConfig.
     * @param {ExternalApiConfigDeleteArgs} args - Arguments to delete one ExternalApiConfig.
     * @example
     * // Delete one ExternalApiConfig
     * const ExternalApiConfig = await prisma.externalApiConfig.delete({
     *   where: {
     *     // ... filter to delete one ExternalApiConfig
     *   }
     * })
     * 
     */
    delete<T extends ExternalApiConfigDeleteArgs>(args: SelectSubset<T, ExternalApiConfigDeleteArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExternalApiConfig.
     * @param {ExternalApiConfigUpdateArgs} args - Arguments to update one ExternalApiConfig.
     * @example
     * // Update one ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExternalApiConfigUpdateArgs>(args: SelectSubset<T, ExternalApiConfigUpdateArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExternalApiConfigs.
     * @param {ExternalApiConfigDeleteManyArgs} args - Arguments to filter ExternalApiConfigs to delete.
     * @example
     * // Delete a few ExternalApiConfigs
     * const { count } = await prisma.externalApiConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExternalApiConfigDeleteManyArgs>(args?: SelectSubset<T, ExternalApiConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalApiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExternalApiConfigs
     * const externalApiConfig = await prisma.externalApiConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExternalApiConfigUpdateManyArgs>(args: SelectSubset<T, ExternalApiConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExternalApiConfigs and returns the data updated in the database.
     * @param {ExternalApiConfigUpdateManyAndReturnArgs} args - Arguments to update many ExternalApiConfigs.
     * @example
     * // Update many ExternalApiConfigs
     * const externalApiConfig = await prisma.externalApiConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExternalApiConfigs and only return the `id`
     * const externalApiConfigWithIdOnly = await prisma.externalApiConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExternalApiConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, ExternalApiConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExternalApiConfig.
     * @param {ExternalApiConfigUpsertArgs} args - Arguments to update or create a ExternalApiConfig.
     * @example
     * // Update or create a ExternalApiConfig
     * const externalApiConfig = await prisma.externalApiConfig.upsert({
     *   create: {
     *     // ... data to create a ExternalApiConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExternalApiConfig we want to update
     *   }
     * })
     */
    upsert<T extends ExternalApiConfigUpsertArgs>(args: SelectSubset<T, ExternalApiConfigUpsertArgs<ExtArgs>>): Prisma__ExternalApiConfigClient<$Result.GetResult<Prisma.$ExternalApiConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExternalApiConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigCountArgs} args - Arguments to filter ExternalApiConfigs to count.
     * @example
     * // Count the number of ExternalApiConfigs
     * const count = await prisma.externalApiConfig.count({
     *   where: {
     *     // ... the filter for the ExternalApiConfigs we want to count
     *   }
     * })
    **/
    count<T extends ExternalApiConfigCountArgs>(
      args?: Subset<T, ExternalApiConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExternalApiConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExternalApiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExternalApiConfigAggregateArgs>(args: Subset<T, ExternalApiConfigAggregateArgs>): Prisma.PrismaPromise<GetExternalApiConfigAggregateType<T>>

    /**
     * Group by ExternalApiConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExternalApiConfigGroupByArgs} args - Group by arguments.
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
      T extends ExternalApiConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExternalApiConfigGroupByArgs['orderBy'] }
        : { orderBy?: ExternalApiConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExternalApiConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExternalApiConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExternalApiConfig model
   */
  readonly fields: ExternalApiConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExternalApiConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExternalApiConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ExternalApiConfig model
   */
  interface ExternalApiConfigFieldRefs {
    readonly id: FieldRef<"ExternalApiConfig", 'String'>
    readonly name: FieldRef<"ExternalApiConfig", 'String'>
    readonly displayName: FieldRef<"ExternalApiConfig", 'String'>
    readonly description: FieldRef<"ExternalApiConfig", 'String'>
    readonly provider: FieldRef<"ExternalApiConfig", 'String'>
    readonly apiConfig: FieldRef<"ExternalApiConfig", 'Json'>
    readonly isEncrypted: FieldRef<"ExternalApiConfig", 'Boolean'>
    readonly isEnabled: FieldRef<"ExternalApiConfig", 'Boolean'>
    readonly isActive: FieldRef<"ExternalApiConfig", 'Boolean'>
    readonly totalCalls: FieldRef<"ExternalApiConfig", 'Int'>
    readonly successCalls: FieldRef<"ExternalApiConfig", 'Int'>
    readonly failedCalls: FieldRef<"ExternalApiConfig", 'Int'>
    readonly lastUsedAt: FieldRef<"ExternalApiConfig", 'DateTime'>
    readonly quotaConfig: FieldRef<"ExternalApiConfig", 'Json'>
    readonly createdAt: FieldRef<"ExternalApiConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"ExternalApiConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExternalApiConfig findUnique
   */
  export type ExternalApiConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter, which ExternalApiConfig to fetch.
     */
    where: ExternalApiConfigWhereUniqueInput
  }

  /**
   * ExternalApiConfig findUniqueOrThrow
   */
  export type ExternalApiConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter, which ExternalApiConfig to fetch.
     */
    where: ExternalApiConfigWhereUniqueInput
  }

  /**
   * ExternalApiConfig findFirst
   */
  export type ExternalApiConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter, which ExternalApiConfig to fetch.
     */
    where?: ExternalApiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalApiConfigs to fetch.
     */
    orderBy?: ExternalApiConfigOrderByWithRelationInput | ExternalApiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalApiConfigs.
     */
    cursor?: ExternalApiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalApiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalApiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalApiConfigs.
     */
    distinct?: ExternalApiConfigScalarFieldEnum | ExternalApiConfigScalarFieldEnum[]
  }

  /**
   * ExternalApiConfig findFirstOrThrow
   */
  export type ExternalApiConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter, which ExternalApiConfig to fetch.
     */
    where?: ExternalApiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalApiConfigs to fetch.
     */
    orderBy?: ExternalApiConfigOrderByWithRelationInput | ExternalApiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExternalApiConfigs.
     */
    cursor?: ExternalApiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalApiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalApiConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExternalApiConfigs.
     */
    distinct?: ExternalApiConfigScalarFieldEnum | ExternalApiConfigScalarFieldEnum[]
  }

  /**
   * ExternalApiConfig findMany
   */
  export type ExternalApiConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter, which ExternalApiConfigs to fetch.
     */
    where?: ExternalApiConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExternalApiConfigs to fetch.
     */
    orderBy?: ExternalApiConfigOrderByWithRelationInput | ExternalApiConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExternalApiConfigs.
     */
    cursor?: ExternalApiConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExternalApiConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExternalApiConfigs.
     */
    skip?: number
    distinct?: ExternalApiConfigScalarFieldEnum | ExternalApiConfigScalarFieldEnum[]
  }

  /**
   * ExternalApiConfig create
   */
  export type ExternalApiConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a ExternalApiConfig.
     */
    data: XOR<ExternalApiConfigCreateInput, ExternalApiConfigUncheckedCreateInput>
  }

  /**
   * ExternalApiConfig createMany
   */
  export type ExternalApiConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExternalApiConfigs.
     */
    data: ExternalApiConfigCreateManyInput | ExternalApiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalApiConfig createManyAndReturn
   */
  export type ExternalApiConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * The data used to create many ExternalApiConfigs.
     */
    data: ExternalApiConfigCreateManyInput | ExternalApiConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExternalApiConfig update
   */
  export type ExternalApiConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a ExternalApiConfig.
     */
    data: XOR<ExternalApiConfigUpdateInput, ExternalApiConfigUncheckedUpdateInput>
    /**
     * Choose, which ExternalApiConfig to update.
     */
    where: ExternalApiConfigWhereUniqueInput
  }

  /**
   * ExternalApiConfig updateMany
   */
  export type ExternalApiConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExternalApiConfigs.
     */
    data: XOR<ExternalApiConfigUpdateManyMutationInput, ExternalApiConfigUncheckedUpdateManyInput>
    /**
     * Filter which ExternalApiConfigs to update
     */
    where?: ExternalApiConfigWhereInput
    /**
     * Limit how many ExternalApiConfigs to update.
     */
    limit?: number
  }

  /**
   * ExternalApiConfig updateManyAndReturn
   */
  export type ExternalApiConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * The data used to update ExternalApiConfigs.
     */
    data: XOR<ExternalApiConfigUpdateManyMutationInput, ExternalApiConfigUncheckedUpdateManyInput>
    /**
     * Filter which ExternalApiConfigs to update
     */
    where?: ExternalApiConfigWhereInput
    /**
     * Limit how many ExternalApiConfigs to update.
     */
    limit?: number
  }

  /**
   * ExternalApiConfig upsert
   */
  export type ExternalApiConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the ExternalApiConfig to update in case it exists.
     */
    where: ExternalApiConfigWhereUniqueInput
    /**
     * In case the ExternalApiConfig found by the `where` argument doesn't exist, create a new ExternalApiConfig with this data.
     */
    create: XOR<ExternalApiConfigCreateInput, ExternalApiConfigUncheckedCreateInput>
    /**
     * In case the ExternalApiConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExternalApiConfigUpdateInput, ExternalApiConfigUncheckedUpdateInput>
  }

  /**
   * ExternalApiConfig delete
   */
  export type ExternalApiConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
    /**
     * Filter which ExternalApiConfig to delete.
     */
    where: ExternalApiConfigWhereUniqueInput
  }

  /**
   * ExternalApiConfig deleteMany
   */
  export type ExternalApiConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExternalApiConfigs to delete
     */
    where?: ExternalApiConfigWhereInput
    /**
     * Limit how many ExternalApiConfigs to delete.
     */
    limit?: number
  }

  /**
   * ExternalApiConfig without action
   */
  export type ExternalApiConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExternalApiConfig
     */
    select?: ExternalApiConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExternalApiConfig
     */
    omit?: ExternalApiConfigOmit<ExtArgs> | null
  }


  /**
   * Model SearchEngineConfig
   */

  export type AggregateSearchEngineConfig = {
    _count: SearchEngineConfigCountAggregateOutputType | null
    _avg: SearchEngineConfigAvgAggregateOutputType | null
    _sum: SearchEngineConfigSumAggregateOutputType | null
    _min: SearchEngineConfigMinAggregateOutputType | null
    _max: SearchEngineConfigMaxAggregateOutputType | null
  }

  export type SearchEngineConfigAvgAggregateOutputType = {
    sortOrder: number | null
    totalSubmitted: number | null
    totalSuccess: number | null
    totalFailed: number | null
  }

  export type SearchEngineConfigSumAggregateOutputType = {
    sortOrder: number | null
    totalSubmitted: number | null
    totalSuccess: number | null
    totalFailed: number | null
  }

  export type SearchEngineConfigMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    icon: string | null
    description: string | null
    apiEndpoint: string | null
    apiKey: string | null
    apiToken: string | null
    siteUrl: string | null
    isEnabled: boolean | null
    autoSubmit: boolean | null
    sortOrder: number | null
    totalSubmitted: number | null
    totalSuccess: number | null
    totalFailed: number | null
    lastSubmitAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchEngineConfigMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
    icon: string | null
    description: string | null
    apiEndpoint: string | null
    apiKey: string | null
    apiToken: string | null
    siteUrl: string | null
    isEnabled: boolean | null
    autoSubmit: boolean | null
    sortOrder: number | null
    totalSubmitted: number | null
    totalSuccess: number | null
    totalFailed: number | null
    lastSubmitAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SearchEngineConfigCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    type: number
    icon: number
    description: number
    apiEndpoint: number
    apiKey: number
    apiToken: number
    siteUrl: number
    extraConfig: number
    isEnabled: number
    autoSubmit: number
    sortOrder: number
    totalSubmitted: number
    totalSuccess: number
    totalFailed: number
    lastSubmitAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SearchEngineConfigAvgAggregateInputType = {
    sortOrder?: true
    totalSubmitted?: true
    totalSuccess?: true
    totalFailed?: true
  }

  export type SearchEngineConfigSumAggregateInputType = {
    sortOrder?: true
    totalSubmitted?: true
    totalSuccess?: true
    totalFailed?: true
  }

  export type SearchEngineConfigMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    description?: true
    apiEndpoint?: true
    apiKey?: true
    apiToken?: true
    siteUrl?: true
    isEnabled?: true
    autoSubmit?: true
    sortOrder?: true
    totalSubmitted?: true
    totalSuccess?: true
    totalFailed?: true
    lastSubmitAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchEngineConfigMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    description?: true
    apiEndpoint?: true
    apiKey?: true
    apiToken?: true
    siteUrl?: true
    isEnabled?: true
    autoSubmit?: true
    sortOrder?: true
    totalSubmitted?: true
    totalSuccess?: true
    totalFailed?: true
    lastSubmitAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SearchEngineConfigCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    icon?: true
    description?: true
    apiEndpoint?: true
    apiKey?: true
    apiToken?: true
    siteUrl?: true
    extraConfig?: true
    isEnabled?: true
    autoSubmit?: true
    sortOrder?: true
    totalSubmitted?: true
    totalSuccess?: true
    totalFailed?: true
    lastSubmitAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SearchEngineConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchEngineConfig to aggregate.
     */
    where?: SearchEngineConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEngineConfigs to fetch.
     */
    orderBy?: SearchEngineConfigOrderByWithRelationInput | SearchEngineConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchEngineConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEngineConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEngineConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchEngineConfigs
    **/
    _count?: true | SearchEngineConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchEngineConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchEngineConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchEngineConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchEngineConfigMaxAggregateInputType
  }

  export type GetSearchEngineConfigAggregateType<T extends SearchEngineConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchEngineConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchEngineConfig[P]>
      : GetScalarType<T[P], AggregateSearchEngineConfig[P]>
  }




  export type SearchEngineConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchEngineConfigWhereInput
    orderBy?: SearchEngineConfigOrderByWithAggregationInput | SearchEngineConfigOrderByWithAggregationInput[]
    by: SearchEngineConfigScalarFieldEnum[] | SearchEngineConfigScalarFieldEnum
    having?: SearchEngineConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchEngineConfigCountAggregateInputType | true
    _avg?: SearchEngineConfigAvgAggregateInputType
    _sum?: SearchEngineConfigSumAggregateInputType
    _min?: SearchEngineConfigMinAggregateInputType
    _max?: SearchEngineConfigMaxAggregateInputType
  }

  export type SearchEngineConfigGroupByOutputType = {
    id: string
    name: string
    slug: string
    type: string
    icon: string | null
    description: string | null
    apiEndpoint: string
    apiKey: string | null
    apiToken: string | null
    siteUrl: string | null
    extraConfig: JsonValue | null
    isEnabled: boolean
    autoSubmit: boolean
    sortOrder: number
    totalSubmitted: number
    totalSuccess: number
    totalFailed: number
    lastSubmitAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SearchEngineConfigCountAggregateOutputType | null
    _avg: SearchEngineConfigAvgAggregateOutputType | null
    _sum: SearchEngineConfigSumAggregateOutputType | null
    _min: SearchEngineConfigMinAggregateOutputType | null
    _max: SearchEngineConfigMaxAggregateOutputType | null
  }

  type GetSearchEngineConfigGroupByPayload<T extends SearchEngineConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchEngineConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchEngineConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchEngineConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SearchEngineConfigGroupByOutputType[P]>
        }
      >
    >


  export type SearchEngineConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    description?: boolean
    apiEndpoint?: boolean
    apiKey?: boolean
    apiToken?: boolean
    siteUrl?: boolean
    extraConfig?: boolean
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: boolean
    totalSubmitted?: boolean
    totalSuccess?: boolean
    totalFailed?: boolean
    lastSubmitAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchEngineConfig"]>

  export type SearchEngineConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    description?: boolean
    apiEndpoint?: boolean
    apiKey?: boolean
    apiToken?: boolean
    siteUrl?: boolean
    extraConfig?: boolean
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: boolean
    totalSubmitted?: boolean
    totalSuccess?: boolean
    totalFailed?: boolean
    lastSubmitAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchEngineConfig"]>

  export type SearchEngineConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    description?: boolean
    apiEndpoint?: boolean
    apiKey?: boolean
    apiToken?: boolean
    siteUrl?: boolean
    extraConfig?: boolean
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: boolean
    totalSubmitted?: boolean
    totalSuccess?: boolean
    totalFailed?: boolean
    lastSubmitAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["searchEngineConfig"]>

  export type SearchEngineConfigSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    icon?: boolean
    description?: boolean
    apiEndpoint?: boolean
    apiKey?: boolean
    apiToken?: boolean
    siteUrl?: boolean
    extraConfig?: boolean
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: boolean
    totalSubmitted?: boolean
    totalSuccess?: boolean
    totalFailed?: boolean
    lastSubmitAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SearchEngineConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "type" | "icon" | "description" | "apiEndpoint" | "apiKey" | "apiToken" | "siteUrl" | "extraConfig" | "isEnabled" | "autoSubmit" | "sortOrder" | "totalSubmitted" | "totalSuccess" | "totalFailed" | "lastSubmitAt" | "createdAt" | "updatedAt", ExtArgs["result"]["searchEngineConfig"]>

  export type $SearchEngineConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchEngineConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      type: string
      icon: string | null
      description: string | null
      apiEndpoint: string
      apiKey: string | null
      apiToken: string | null
      siteUrl: string | null
      extraConfig: Prisma.JsonValue | null
      isEnabled: boolean
      autoSubmit: boolean
      sortOrder: number
      totalSubmitted: number
      totalSuccess: number
      totalFailed: number
      lastSubmitAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["searchEngineConfig"]>
    composites: {}
  }

  type SearchEngineConfigGetPayload<S extends boolean | null | undefined | SearchEngineConfigDefaultArgs> = $Result.GetResult<Prisma.$SearchEngineConfigPayload, S>

  type SearchEngineConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchEngineConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchEngineConfigCountAggregateInputType | true
    }

  export interface SearchEngineConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchEngineConfig'], meta: { name: 'SearchEngineConfig' } }
    /**
     * Find zero or one SearchEngineConfig that matches the filter.
     * @param {SearchEngineConfigFindUniqueArgs} args - Arguments to find a SearchEngineConfig
     * @example
     * // Get one SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchEngineConfigFindUniqueArgs>(args: SelectSubset<T, SearchEngineConfigFindUniqueArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchEngineConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchEngineConfigFindUniqueOrThrowArgs} args - Arguments to find a SearchEngineConfig
     * @example
     * // Get one SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchEngineConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchEngineConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchEngineConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigFindFirstArgs} args - Arguments to find a SearchEngineConfig
     * @example
     * // Get one SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchEngineConfigFindFirstArgs>(args?: SelectSubset<T, SearchEngineConfigFindFirstArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchEngineConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigFindFirstOrThrowArgs} args - Arguments to find a SearchEngineConfig
     * @example
     * // Get one SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchEngineConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchEngineConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchEngineConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchEngineConfigs
     * const searchEngineConfigs = await prisma.searchEngineConfig.findMany()
     * 
     * // Get first 10 SearchEngineConfigs
     * const searchEngineConfigs = await prisma.searchEngineConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchEngineConfigWithIdOnly = await prisma.searchEngineConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchEngineConfigFindManyArgs>(args?: SelectSubset<T, SearchEngineConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SearchEngineConfig.
     * @param {SearchEngineConfigCreateArgs} args - Arguments to create a SearchEngineConfig.
     * @example
     * // Create one SearchEngineConfig
     * const SearchEngineConfig = await prisma.searchEngineConfig.create({
     *   data: {
     *     // ... data to create a SearchEngineConfig
     *   }
     * })
     * 
     */
    create<T extends SearchEngineConfigCreateArgs>(args: SelectSubset<T, SearchEngineConfigCreateArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SearchEngineConfigs.
     * @param {SearchEngineConfigCreateManyArgs} args - Arguments to create many SearchEngineConfigs.
     * @example
     * // Create many SearchEngineConfigs
     * const searchEngineConfig = await prisma.searchEngineConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SearchEngineConfigCreateManyArgs>(args?: SelectSubset<T, SearchEngineConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SearchEngineConfigs and returns the data saved in the database.
     * @param {SearchEngineConfigCreateManyAndReturnArgs} args - Arguments to create many SearchEngineConfigs.
     * @example
     * // Create many SearchEngineConfigs
     * const searchEngineConfig = await prisma.searchEngineConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SearchEngineConfigs and only return the `id`
     * const searchEngineConfigWithIdOnly = await prisma.searchEngineConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SearchEngineConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SearchEngineConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SearchEngineConfig.
     * @param {SearchEngineConfigDeleteArgs} args - Arguments to delete one SearchEngineConfig.
     * @example
     * // Delete one SearchEngineConfig
     * const SearchEngineConfig = await prisma.searchEngineConfig.delete({
     *   where: {
     *     // ... filter to delete one SearchEngineConfig
     *   }
     * })
     * 
     */
    delete<T extends SearchEngineConfigDeleteArgs>(args: SelectSubset<T, SearchEngineConfigDeleteArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchEngineConfig.
     * @param {SearchEngineConfigUpdateArgs} args - Arguments to update one SearchEngineConfig.
     * @example
     * // Update one SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchEngineConfigUpdateArgs>(args: SelectSubset<T, SearchEngineConfigUpdateArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchEngineConfigs.
     * @param {SearchEngineConfigDeleteManyArgs} args - Arguments to filter SearchEngineConfigs to delete.
     * @example
     * // Delete a few SearchEngineConfigs
     * const { count } = await prisma.searchEngineConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchEngineConfigDeleteManyArgs>(args?: SelectSubset<T, SearchEngineConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchEngineConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchEngineConfigs
     * const searchEngineConfig = await prisma.searchEngineConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchEngineConfigUpdateManyArgs>(args: SelectSubset<T, SearchEngineConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchEngineConfigs and returns the data updated in the database.
     * @param {SearchEngineConfigUpdateManyAndReturnArgs} args - Arguments to update many SearchEngineConfigs.
     * @example
     * // Update many SearchEngineConfigs
     * const searchEngineConfig = await prisma.searchEngineConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchEngineConfigs and only return the `id`
     * const searchEngineConfigWithIdOnly = await prisma.searchEngineConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends SearchEngineConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchEngineConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SearchEngineConfig.
     * @param {SearchEngineConfigUpsertArgs} args - Arguments to update or create a SearchEngineConfig.
     * @example
     * // Update or create a SearchEngineConfig
     * const searchEngineConfig = await prisma.searchEngineConfig.upsert({
     *   create: {
     *     // ... data to create a SearchEngineConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SearchEngineConfig we want to update
     *   }
     * })
     */
    upsert<T extends SearchEngineConfigUpsertArgs>(args: SelectSubset<T, SearchEngineConfigUpsertArgs<ExtArgs>>): Prisma__SearchEngineConfigClient<$Result.GetResult<Prisma.$SearchEngineConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SearchEngineConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigCountArgs} args - Arguments to filter SearchEngineConfigs to count.
     * @example
     * // Count the number of SearchEngineConfigs
     * const count = await prisma.searchEngineConfig.count({
     *   where: {
     *     // ... the filter for the SearchEngineConfigs we want to count
     *   }
     * })
    **/
    count<T extends SearchEngineConfigCountArgs>(
      args?: Subset<T, SearchEngineConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchEngineConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchEngineConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SearchEngineConfigAggregateArgs>(args: Subset<T, SearchEngineConfigAggregateArgs>): Prisma.PrismaPromise<GetSearchEngineConfigAggregateType<T>>

    /**
     * Group by SearchEngineConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEngineConfigGroupByArgs} args - Group by arguments.
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
      T extends SearchEngineConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchEngineConfigGroupByArgs['orderBy'] }
        : { orderBy?: SearchEngineConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SearchEngineConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchEngineConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchEngineConfig model
   */
  readonly fields: SearchEngineConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchEngineConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchEngineConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SearchEngineConfig model
   */
  interface SearchEngineConfigFieldRefs {
    readonly id: FieldRef<"SearchEngineConfig", 'String'>
    readonly name: FieldRef<"SearchEngineConfig", 'String'>
    readonly slug: FieldRef<"SearchEngineConfig", 'String'>
    readonly type: FieldRef<"SearchEngineConfig", 'String'>
    readonly icon: FieldRef<"SearchEngineConfig", 'String'>
    readonly description: FieldRef<"SearchEngineConfig", 'String'>
    readonly apiEndpoint: FieldRef<"SearchEngineConfig", 'String'>
    readonly apiKey: FieldRef<"SearchEngineConfig", 'String'>
    readonly apiToken: FieldRef<"SearchEngineConfig", 'String'>
    readonly siteUrl: FieldRef<"SearchEngineConfig", 'String'>
    readonly extraConfig: FieldRef<"SearchEngineConfig", 'Json'>
    readonly isEnabled: FieldRef<"SearchEngineConfig", 'Boolean'>
    readonly autoSubmit: FieldRef<"SearchEngineConfig", 'Boolean'>
    readonly sortOrder: FieldRef<"SearchEngineConfig", 'Int'>
    readonly totalSubmitted: FieldRef<"SearchEngineConfig", 'Int'>
    readonly totalSuccess: FieldRef<"SearchEngineConfig", 'Int'>
    readonly totalFailed: FieldRef<"SearchEngineConfig", 'Int'>
    readonly lastSubmitAt: FieldRef<"SearchEngineConfig", 'DateTime'>
    readonly createdAt: FieldRef<"SearchEngineConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SearchEngineConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchEngineConfig findUnique
   */
  export type SearchEngineConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchEngineConfig to fetch.
     */
    where: SearchEngineConfigWhereUniqueInput
  }

  /**
   * SearchEngineConfig findUniqueOrThrow
   */
  export type SearchEngineConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchEngineConfig to fetch.
     */
    where: SearchEngineConfigWhereUniqueInput
  }

  /**
   * SearchEngineConfig findFirst
   */
  export type SearchEngineConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchEngineConfig to fetch.
     */
    where?: SearchEngineConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEngineConfigs to fetch.
     */
    orderBy?: SearchEngineConfigOrderByWithRelationInput | SearchEngineConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchEngineConfigs.
     */
    cursor?: SearchEngineConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEngineConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEngineConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchEngineConfigs.
     */
    distinct?: SearchEngineConfigScalarFieldEnum | SearchEngineConfigScalarFieldEnum[]
  }

  /**
   * SearchEngineConfig findFirstOrThrow
   */
  export type SearchEngineConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchEngineConfig to fetch.
     */
    where?: SearchEngineConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEngineConfigs to fetch.
     */
    orderBy?: SearchEngineConfigOrderByWithRelationInput | SearchEngineConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchEngineConfigs.
     */
    cursor?: SearchEngineConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEngineConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEngineConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchEngineConfigs.
     */
    distinct?: SearchEngineConfigScalarFieldEnum | SearchEngineConfigScalarFieldEnum[]
  }

  /**
   * SearchEngineConfig findMany
   */
  export type SearchEngineConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter, which SearchEngineConfigs to fetch.
     */
    where?: SearchEngineConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEngineConfigs to fetch.
     */
    orderBy?: SearchEngineConfigOrderByWithRelationInput | SearchEngineConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchEngineConfigs.
     */
    cursor?: SearchEngineConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEngineConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEngineConfigs.
     */
    skip?: number
    distinct?: SearchEngineConfigScalarFieldEnum | SearchEngineConfigScalarFieldEnum[]
  }

  /**
   * SearchEngineConfig create
   */
  export type SearchEngineConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SearchEngineConfig.
     */
    data: XOR<SearchEngineConfigCreateInput, SearchEngineConfigUncheckedCreateInput>
  }

  /**
   * SearchEngineConfig createMany
   */
  export type SearchEngineConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SearchEngineConfigs.
     */
    data: SearchEngineConfigCreateManyInput | SearchEngineConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchEngineConfig createManyAndReturn
   */
  export type SearchEngineConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SearchEngineConfigs.
     */
    data: SearchEngineConfigCreateManyInput | SearchEngineConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SearchEngineConfig update
   */
  export type SearchEngineConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SearchEngineConfig.
     */
    data: XOR<SearchEngineConfigUpdateInput, SearchEngineConfigUncheckedUpdateInput>
    /**
     * Choose, which SearchEngineConfig to update.
     */
    where: SearchEngineConfigWhereUniqueInput
  }

  /**
   * SearchEngineConfig updateMany
   */
  export type SearchEngineConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchEngineConfigs.
     */
    data: XOR<SearchEngineConfigUpdateManyMutationInput, SearchEngineConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchEngineConfigs to update
     */
    where?: SearchEngineConfigWhereInput
    /**
     * Limit how many SearchEngineConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchEngineConfig updateManyAndReturn
   */
  export type SearchEngineConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * The data used to update SearchEngineConfigs.
     */
    data: XOR<SearchEngineConfigUpdateManyMutationInput, SearchEngineConfigUncheckedUpdateManyInput>
    /**
     * Filter which SearchEngineConfigs to update
     */
    where?: SearchEngineConfigWhereInput
    /**
     * Limit how many SearchEngineConfigs to update.
     */
    limit?: number
  }

  /**
   * SearchEngineConfig upsert
   */
  export type SearchEngineConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SearchEngineConfig to update in case it exists.
     */
    where: SearchEngineConfigWhereUniqueInput
    /**
     * In case the SearchEngineConfig found by the `where` argument doesn't exist, create a new SearchEngineConfig with this data.
     */
    create: XOR<SearchEngineConfigCreateInput, SearchEngineConfigUncheckedCreateInput>
    /**
     * In case the SearchEngineConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SearchEngineConfigUpdateInput, SearchEngineConfigUncheckedUpdateInput>
  }

  /**
   * SearchEngineConfig delete
   */
  export type SearchEngineConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
    /**
     * Filter which SearchEngineConfig to delete.
     */
    where: SearchEngineConfigWhereUniqueInput
  }

  /**
   * SearchEngineConfig deleteMany
   */
  export type SearchEngineConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchEngineConfigs to delete
     */
    where?: SearchEngineConfigWhereInput
    /**
     * Limit how many SearchEngineConfigs to delete.
     */
    limit?: number
  }

  /**
   * SearchEngineConfig without action
   */
  export type SearchEngineConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEngineConfig
     */
    select?: SearchEngineConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEngineConfig
     */
    omit?: SearchEngineConfigOmit<ExtArgs> | null
  }


  /**
   * Model UrlSubmission
   */

  export type AggregateUrlSubmission = {
    _count: UrlSubmissionCountAggregateOutputType | null
    _avg: UrlSubmissionAvgAggregateOutputType | null
    _sum: UrlSubmissionSumAggregateOutputType | null
    _min: UrlSubmissionMinAggregateOutputType | null
    _max: UrlSubmissionMaxAggregateOutputType | null
  }

  export type UrlSubmissionAvgAggregateOutputType = {
    googleSubmitHttpStatus: number | null
    googleSubmitResponseTime: number | null
    bingSubmitHttpStatus: number | null
    bingSubmitResponseTime: number | null
  }

  export type UrlSubmissionSumAggregateOutputType = {
    googleSubmitHttpStatus: number | null
    googleSubmitResponseTime: number | null
    bingSubmitHttpStatus: number | null
    bingSubmitResponseTime: number | null
  }

  export type UrlSubmissionMinAggregateOutputType = {
    id: string | null
    url: string | null
    urlType: string | null
    entityId: string | null
    locale: string | null
    googleSubmitStatus: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage: string | null
    googleSubmitHttpStatus: number | null
    googleSubmitResponseBody: string | null
    googleSubmitResponseTime: number | null
    googleSubmittedAt: Date | null
    bingSubmitStatus: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage: string | null
    bingSubmitHttpStatus: number | null
    bingSubmitResponseBody: string | null
    bingSubmitResponseTime: number | null
    bingSubmittedAt: Date | null
    indexedByGoogle: boolean | null
    googleIndexedAt: Date | null
    googleLastCheckAt: Date | null
    googleCheckMessage: string | null
    indexedByBing: boolean | null
    bingIndexedAt: Date | null
    bingLastCheckAt: Date | null
    bingCheckMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrlSubmissionMaxAggregateOutputType = {
    id: string | null
    url: string | null
    urlType: string | null
    entityId: string | null
    locale: string | null
    googleSubmitStatus: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage: string | null
    googleSubmitHttpStatus: number | null
    googleSubmitResponseBody: string | null
    googleSubmitResponseTime: number | null
    googleSubmittedAt: Date | null
    bingSubmitStatus: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage: string | null
    bingSubmitHttpStatus: number | null
    bingSubmitResponseBody: string | null
    bingSubmitResponseTime: number | null
    bingSubmittedAt: Date | null
    indexedByGoogle: boolean | null
    googleIndexedAt: Date | null
    googleLastCheckAt: Date | null
    googleCheckMessage: string | null
    indexedByBing: boolean | null
    bingIndexedAt: Date | null
    bingLastCheckAt: Date | null
    bingCheckMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UrlSubmissionCountAggregateOutputType = {
    id: number
    url: number
    urlType: number
    entityId: number
    locale: number
    googleSubmitStatus: number
    googleSubmitStatusMessage: number
    googleSubmitHttpStatus: number
    googleSubmitResponseBody: number
    googleSubmitResponseTime: number
    googleSubmittedAt: number
    bingSubmitStatus: number
    bingSubmitStatusMessage: number
    bingSubmitHttpStatus: number
    bingSubmitResponseBody: number
    bingSubmitResponseTime: number
    bingSubmittedAt: number
    indexedByGoogle: number
    googleIndexedAt: number
    googleLastCheckAt: number
    googleCheckMessage: number
    googleIndexStatusRaw: number
    indexedByBing: number
    bingIndexedAt: number
    bingLastCheckAt: number
    bingCheckMessage: number
    bingIndexStatusRaw: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UrlSubmissionAvgAggregateInputType = {
    googleSubmitHttpStatus?: true
    googleSubmitResponseTime?: true
    bingSubmitHttpStatus?: true
    bingSubmitResponseTime?: true
  }

  export type UrlSubmissionSumAggregateInputType = {
    googleSubmitHttpStatus?: true
    googleSubmitResponseTime?: true
    bingSubmitHttpStatus?: true
    bingSubmitResponseTime?: true
  }

  export type UrlSubmissionMinAggregateInputType = {
    id?: true
    url?: true
    urlType?: true
    entityId?: true
    locale?: true
    googleSubmitStatus?: true
    googleSubmitStatusMessage?: true
    googleSubmitHttpStatus?: true
    googleSubmitResponseBody?: true
    googleSubmitResponseTime?: true
    googleSubmittedAt?: true
    bingSubmitStatus?: true
    bingSubmitStatusMessage?: true
    bingSubmitHttpStatus?: true
    bingSubmitResponseBody?: true
    bingSubmitResponseTime?: true
    bingSubmittedAt?: true
    indexedByGoogle?: true
    googleIndexedAt?: true
    googleLastCheckAt?: true
    googleCheckMessage?: true
    indexedByBing?: true
    bingIndexedAt?: true
    bingLastCheckAt?: true
    bingCheckMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrlSubmissionMaxAggregateInputType = {
    id?: true
    url?: true
    urlType?: true
    entityId?: true
    locale?: true
    googleSubmitStatus?: true
    googleSubmitStatusMessage?: true
    googleSubmitHttpStatus?: true
    googleSubmitResponseBody?: true
    googleSubmitResponseTime?: true
    googleSubmittedAt?: true
    bingSubmitStatus?: true
    bingSubmitStatusMessage?: true
    bingSubmitHttpStatus?: true
    bingSubmitResponseBody?: true
    bingSubmitResponseTime?: true
    bingSubmittedAt?: true
    indexedByGoogle?: true
    googleIndexedAt?: true
    googleLastCheckAt?: true
    googleCheckMessage?: true
    indexedByBing?: true
    bingIndexedAt?: true
    bingLastCheckAt?: true
    bingCheckMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UrlSubmissionCountAggregateInputType = {
    id?: true
    url?: true
    urlType?: true
    entityId?: true
    locale?: true
    googleSubmitStatus?: true
    googleSubmitStatusMessage?: true
    googleSubmitHttpStatus?: true
    googleSubmitResponseBody?: true
    googleSubmitResponseTime?: true
    googleSubmittedAt?: true
    bingSubmitStatus?: true
    bingSubmitStatusMessage?: true
    bingSubmitHttpStatus?: true
    bingSubmitResponseBody?: true
    bingSubmitResponseTime?: true
    bingSubmittedAt?: true
    indexedByGoogle?: true
    googleIndexedAt?: true
    googleLastCheckAt?: true
    googleCheckMessage?: true
    googleIndexStatusRaw?: true
    indexedByBing?: true
    bingIndexedAt?: true
    bingLastCheckAt?: true
    bingCheckMessage?: true
    bingIndexStatusRaw?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UrlSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UrlSubmission to aggregate.
     */
    where?: UrlSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrlSubmissions to fetch.
     */
    orderBy?: UrlSubmissionOrderByWithRelationInput | UrlSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UrlSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrlSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrlSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UrlSubmissions
    **/
    _count?: true | UrlSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UrlSubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UrlSubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UrlSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UrlSubmissionMaxAggregateInputType
  }

  export type GetUrlSubmissionAggregateType<T extends UrlSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateUrlSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUrlSubmission[P]>
      : GetScalarType<T[P], AggregateUrlSubmission[P]>
  }




  export type UrlSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UrlSubmissionWhereInput
    orderBy?: UrlSubmissionOrderByWithAggregationInput | UrlSubmissionOrderByWithAggregationInput[]
    by: UrlSubmissionScalarFieldEnum[] | UrlSubmissionScalarFieldEnum
    having?: UrlSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UrlSubmissionCountAggregateInputType | true
    _avg?: UrlSubmissionAvgAggregateInputType
    _sum?: UrlSubmissionSumAggregateInputType
    _min?: UrlSubmissionMinAggregateInputType
    _max?: UrlSubmissionMaxAggregateInputType
  }

  export type UrlSubmissionGroupByOutputType = {
    id: string
    url: string
    urlType: string
    entityId: string | null
    locale: string | null
    googleSubmitStatus: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage: string | null
    googleSubmitHttpStatus: number | null
    googleSubmitResponseBody: string | null
    googleSubmitResponseTime: number | null
    googleSubmittedAt: Date | null
    bingSubmitStatus: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage: string | null
    bingSubmitHttpStatus: number | null
    bingSubmitResponseBody: string | null
    bingSubmitResponseTime: number | null
    bingSubmittedAt: Date | null
    indexedByGoogle: boolean | null
    googleIndexedAt: Date | null
    googleLastCheckAt: Date | null
    googleCheckMessage: string | null
    googleIndexStatusRaw: JsonValue | null
    indexedByBing: boolean | null
    bingIndexedAt: Date | null
    bingLastCheckAt: Date | null
    bingCheckMessage: string | null
    bingIndexStatusRaw: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UrlSubmissionCountAggregateOutputType | null
    _avg: UrlSubmissionAvgAggregateOutputType | null
    _sum: UrlSubmissionSumAggregateOutputType | null
    _min: UrlSubmissionMinAggregateOutputType | null
    _max: UrlSubmissionMaxAggregateOutputType | null
  }

  type GetUrlSubmissionGroupByPayload<T extends UrlSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UrlSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UrlSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UrlSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], UrlSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type UrlSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    urlType?: boolean
    entityId?: boolean
    locale?: boolean
    googleSubmitStatus?: boolean
    googleSubmitStatusMessage?: boolean
    googleSubmitHttpStatus?: boolean
    googleSubmitResponseBody?: boolean
    googleSubmitResponseTime?: boolean
    googleSubmittedAt?: boolean
    bingSubmitStatus?: boolean
    bingSubmitStatusMessage?: boolean
    bingSubmitHttpStatus?: boolean
    bingSubmitResponseBody?: boolean
    bingSubmitResponseTime?: boolean
    bingSubmittedAt?: boolean
    indexedByGoogle?: boolean
    googleIndexedAt?: boolean
    googleLastCheckAt?: boolean
    googleCheckMessage?: boolean
    googleIndexStatusRaw?: boolean
    indexedByBing?: boolean
    bingIndexedAt?: boolean
    bingLastCheckAt?: boolean
    bingCheckMessage?: boolean
    bingIndexStatusRaw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urlSubmission"]>

  export type UrlSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    urlType?: boolean
    entityId?: boolean
    locale?: boolean
    googleSubmitStatus?: boolean
    googleSubmitStatusMessage?: boolean
    googleSubmitHttpStatus?: boolean
    googleSubmitResponseBody?: boolean
    googleSubmitResponseTime?: boolean
    googleSubmittedAt?: boolean
    bingSubmitStatus?: boolean
    bingSubmitStatusMessage?: boolean
    bingSubmitHttpStatus?: boolean
    bingSubmitResponseBody?: boolean
    bingSubmitResponseTime?: boolean
    bingSubmittedAt?: boolean
    indexedByGoogle?: boolean
    googleIndexedAt?: boolean
    googleLastCheckAt?: boolean
    googleCheckMessage?: boolean
    googleIndexStatusRaw?: boolean
    indexedByBing?: boolean
    bingIndexedAt?: boolean
    bingLastCheckAt?: boolean
    bingCheckMessage?: boolean
    bingIndexStatusRaw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urlSubmission"]>

  export type UrlSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    urlType?: boolean
    entityId?: boolean
    locale?: boolean
    googleSubmitStatus?: boolean
    googleSubmitStatusMessage?: boolean
    googleSubmitHttpStatus?: boolean
    googleSubmitResponseBody?: boolean
    googleSubmitResponseTime?: boolean
    googleSubmittedAt?: boolean
    bingSubmitStatus?: boolean
    bingSubmitStatusMessage?: boolean
    bingSubmitHttpStatus?: boolean
    bingSubmitResponseBody?: boolean
    bingSubmitResponseTime?: boolean
    bingSubmittedAt?: boolean
    indexedByGoogle?: boolean
    googleIndexedAt?: boolean
    googleLastCheckAt?: boolean
    googleCheckMessage?: boolean
    googleIndexStatusRaw?: boolean
    indexedByBing?: boolean
    bingIndexedAt?: boolean
    bingLastCheckAt?: boolean
    bingCheckMessage?: boolean
    bingIndexStatusRaw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["urlSubmission"]>

  export type UrlSubmissionSelectScalar = {
    id?: boolean
    url?: boolean
    urlType?: boolean
    entityId?: boolean
    locale?: boolean
    googleSubmitStatus?: boolean
    googleSubmitStatusMessage?: boolean
    googleSubmitHttpStatus?: boolean
    googleSubmitResponseBody?: boolean
    googleSubmitResponseTime?: boolean
    googleSubmittedAt?: boolean
    bingSubmitStatus?: boolean
    bingSubmitStatusMessage?: boolean
    bingSubmitHttpStatus?: boolean
    bingSubmitResponseBody?: boolean
    bingSubmitResponseTime?: boolean
    bingSubmittedAt?: boolean
    indexedByGoogle?: boolean
    googleIndexedAt?: boolean
    googleLastCheckAt?: boolean
    googleCheckMessage?: boolean
    googleIndexStatusRaw?: boolean
    indexedByBing?: boolean
    bingIndexedAt?: boolean
    bingLastCheckAt?: boolean
    bingCheckMessage?: boolean
    bingIndexStatusRaw?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UrlSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "urlType" | "entityId" | "locale" | "googleSubmitStatus" | "googleSubmitStatusMessage" | "googleSubmitHttpStatus" | "googleSubmitResponseBody" | "googleSubmitResponseTime" | "googleSubmittedAt" | "bingSubmitStatus" | "bingSubmitStatusMessage" | "bingSubmitHttpStatus" | "bingSubmitResponseBody" | "bingSubmitResponseTime" | "bingSubmittedAt" | "indexedByGoogle" | "googleIndexedAt" | "googleLastCheckAt" | "googleCheckMessage" | "googleIndexStatusRaw" | "indexedByBing" | "bingIndexedAt" | "bingLastCheckAt" | "bingCheckMessage" | "bingIndexStatusRaw" | "createdAt" | "updatedAt", ExtArgs["result"]["urlSubmission"]>

  export type $UrlSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UrlSubmission"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      urlType: string
      entityId: string | null
      locale: string | null
      googleSubmitStatus: $Enums.SubmissionStatus | null
      googleSubmitStatusMessage: string | null
      googleSubmitHttpStatus: number | null
      googleSubmitResponseBody: string | null
      googleSubmitResponseTime: number | null
      googleSubmittedAt: Date | null
      bingSubmitStatus: $Enums.SubmissionStatus | null
      bingSubmitStatusMessage: string | null
      bingSubmitHttpStatus: number | null
      bingSubmitResponseBody: string | null
      bingSubmitResponseTime: number | null
      bingSubmittedAt: Date | null
      indexedByGoogle: boolean | null
      googleIndexedAt: Date | null
      googleLastCheckAt: Date | null
      googleCheckMessage: string | null
      googleIndexStatusRaw: Prisma.JsonValue | null
      indexedByBing: boolean | null
      bingIndexedAt: Date | null
      bingLastCheckAt: Date | null
      bingCheckMessage: string | null
      bingIndexStatusRaw: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["urlSubmission"]>
    composites: {}
  }

  type UrlSubmissionGetPayload<S extends boolean | null | undefined | UrlSubmissionDefaultArgs> = $Result.GetResult<Prisma.$UrlSubmissionPayload, S>

  type UrlSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UrlSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UrlSubmissionCountAggregateInputType | true
    }

  export interface UrlSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UrlSubmission'], meta: { name: 'UrlSubmission' } }
    /**
     * Find zero or one UrlSubmission that matches the filter.
     * @param {UrlSubmissionFindUniqueArgs} args - Arguments to find a UrlSubmission
     * @example
     * // Get one UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UrlSubmissionFindUniqueArgs>(args: SelectSubset<T, UrlSubmissionFindUniqueArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UrlSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UrlSubmissionFindUniqueOrThrowArgs} args - Arguments to find a UrlSubmission
     * @example
     * // Get one UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UrlSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, UrlSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UrlSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionFindFirstArgs} args - Arguments to find a UrlSubmission
     * @example
     * // Get one UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UrlSubmissionFindFirstArgs>(args?: SelectSubset<T, UrlSubmissionFindFirstArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UrlSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionFindFirstOrThrowArgs} args - Arguments to find a UrlSubmission
     * @example
     * // Get one UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UrlSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, UrlSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UrlSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UrlSubmissions
     * const urlSubmissions = await prisma.urlSubmission.findMany()
     * 
     * // Get first 10 UrlSubmissions
     * const urlSubmissions = await prisma.urlSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const urlSubmissionWithIdOnly = await prisma.urlSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UrlSubmissionFindManyArgs>(args?: SelectSubset<T, UrlSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UrlSubmission.
     * @param {UrlSubmissionCreateArgs} args - Arguments to create a UrlSubmission.
     * @example
     * // Create one UrlSubmission
     * const UrlSubmission = await prisma.urlSubmission.create({
     *   data: {
     *     // ... data to create a UrlSubmission
     *   }
     * })
     * 
     */
    create<T extends UrlSubmissionCreateArgs>(args: SelectSubset<T, UrlSubmissionCreateArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UrlSubmissions.
     * @param {UrlSubmissionCreateManyArgs} args - Arguments to create many UrlSubmissions.
     * @example
     * // Create many UrlSubmissions
     * const urlSubmission = await prisma.urlSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UrlSubmissionCreateManyArgs>(args?: SelectSubset<T, UrlSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UrlSubmissions and returns the data saved in the database.
     * @param {UrlSubmissionCreateManyAndReturnArgs} args - Arguments to create many UrlSubmissions.
     * @example
     * // Create many UrlSubmissions
     * const urlSubmission = await prisma.urlSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UrlSubmissions and only return the `id`
     * const urlSubmissionWithIdOnly = await prisma.urlSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UrlSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, UrlSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UrlSubmission.
     * @param {UrlSubmissionDeleteArgs} args - Arguments to delete one UrlSubmission.
     * @example
     * // Delete one UrlSubmission
     * const UrlSubmission = await prisma.urlSubmission.delete({
     *   where: {
     *     // ... filter to delete one UrlSubmission
     *   }
     * })
     * 
     */
    delete<T extends UrlSubmissionDeleteArgs>(args: SelectSubset<T, UrlSubmissionDeleteArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UrlSubmission.
     * @param {UrlSubmissionUpdateArgs} args - Arguments to update one UrlSubmission.
     * @example
     * // Update one UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UrlSubmissionUpdateArgs>(args: SelectSubset<T, UrlSubmissionUpdateArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UrlSubmissions.
     * @param {UrlSubmissionDeleteManyArgs} args - Arguments to filter UrlSubmissions to delete.
     * @example
     * // Delete a few UrlSubmissions
     * const { count } = await prisma.urlSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UrlSubmissionDeleteManyArgs>(args?: SelectSubset<T, UrlSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UrlSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UrlSubmissions
     * const urlSubmission = await prisma.urlSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UrlSubmissionUpdateManyArgs>(args: SelectSubset<T, UrlSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UrlSubmissions and returns the data updated in the database.
     * @param {UrlSubmissionUpdateManyAndReturnArgs} args - Arguments to update many UrlSubmissions.
     * @example
     * // Update many UrlSubmissions
     * const urlSubmission = await prisma.urlSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UrlSubmissions and only return the `id`
     * const urlSubmissionWithIdOnly = await prisma.urlSubmission.updateManyAndReturn({
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
    updateManyAndReturn<T extends UrlSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, UrlSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UrlSubmission.
     * @param {UrlSubmissionUpsertArgs} args - Arguments to update or create a UrlSubmission.
     * @example
     * // Update or create a UrlSubmission
     * const urlSubmission = await prisma.urlSubmission.upsert({
     *   create: {
     *     // ... data to create a UrlSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UrlSubmission we want to update
     *   }
     * })
     */
    upsert<T extends UrlSubmissionUpsertArgs>(args: SelectSubset<T, UrlSubmissionUpsertArgs<ExtArgs>>): Prisma__UrlSubmissionClient<$Result.GetResult<Prisma.$UrlSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UrlSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionCountArgs} args - Arguments to filter UrlSubmissions to count.
     * @example
     * // Count the number of UrlSubmissions
     * const count = await prisma.urlSubmission.count({
     *   where: {
     *     // ... the filter for the UrlSubmissions we want to count
     *   }
     * })
    **/
    count<T extends UrlSubmissionCountArgs>(
      args?: Subset<T, UrlSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UrlSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UrlSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UrlSubmissionAggregateArgs>(args: Subset<T, UrlSubmissionAggregateArgs>): Prisma.PrismaPromise<GetUrlSubmissionAggregateType<T>>

    /**
     * Group by UrlSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UrlSubmissionGroupByArgs} args - Group by arguments.
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
      T extends UrlSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UrlSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: UrlSubmissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UrlSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUrlSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UrlSubmission model
   */
  readonly fields: UrlSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UrlSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UrlSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UrlSubmission model
   */
  interface UrlSubmissionFieldRefs {
    readonly id: FieldRef<"UrlSubmission", 'String'>
    readonly url: FieldRef<"UrlSubmission", 'String'>
    readonly urlType: FieldRef<"UrlSubmission", 'String'>
    readonly entityId: FieldRef<"UrlSubmission", 'String'>
    readonly locale: FieldRef<"UrlSubmission", 'String'>
    readonly googleSubmitStatus: FieldRef<"UrlSubmission", 'SubmissionStatus'>
    readonly googleSubmitStatusMessage: FieldRef<"UrlSubmission", 'String'>
    readonly googleSubmitHttpStatus: FieldRef<"UrlSubmission", 'Int'>
    readonly googleSubmitResponseBody: FieldRef<"UrlSubmission", 'String'>
    readonly googleSubmitResponseTime: FieldRef<"UrlSubmission", 'Int'>
    readonly googleSubmittedAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly bingSubmitStatus: FieldRef<"UrlSubmission", 'SubmissionStatus'>
    readonly bingSubmitStatusMessage: FieldRef<"UrlSubmission", 'String'>
    readonly bingSubmitHttpStatus: FieldRef<"UrlSubmission", 'Int'>
    readonly bingSubmitResponseBody: FieldRef<"UrlSubmission", 'String'>
    readonly bingSubmitResponseTime: FieldRef<"UrlSubmission", 'Int'>
    readonly bingSubmittedAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly indexedByGoogle: FieldRef<"UrlSubmission", 'Boolean'>
    readonly googleIndexedAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly googleLastCheckAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly googleCheckMessage: FieldRef<"UrlSubmission", 'String'>
    readonly googleIndexStatusRaw: FieldRef<"UrlSubmission", 'Json'>
    readonly indexedByBing: FieldRef<"UrlSubmission", 'Boolean'>
    readonly bingIndexedAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly bingLastCheckAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly bingCheckMessage: FieldRef<"UrlSubmission", 'String'>
    readonly bingIndexStatusRaw: FieldRef<"UrlSubmission", 'Json'>
    readonly createdAt: FieldRef<"UrlSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"UrlSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UrlSubmission findUnique
   */
  export type UrlSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which UrlSubmission to fetch.
     */
    where: UrlSubmissionWhereUniqueInput
  }

  /**
   * UrlSubmission findUniqueOrThrow
   */
  export type UrlSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which UrlSubmission to fetch.
     */
    where: UrlSubmissionWhereUniqueInput
  }

  /**
   * UrlSubmission findFirst
   */
  export type UrlSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which UrlSubmission to fetch.
     */
    where?: UrlSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrlSubmissions to fetch.
     */
    orderBy?: UrlSubmissionOrderByWithRelationInput | UrlSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UrlSubmissions.
     */
    cursor?: UrlSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrlSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrlSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UrlSubmissions.
     */
    distinct?: UrlSubmissionScalarFieldEnum | UrlSubmissionScalarFieldEnum[]
  }

  /**
   * UrlSubmission findFirstOrThrow
   */
  export type UrlSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which UrlSubmission to fetch.
     */
    where?: UrlSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrlSubmissions to fetch.
     */
    orderBy?: UrlSubmissionOrderByWithRelationInput | UrlSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UrlSubmissions.
     */
    cursor?: UrlSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrlSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrlSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UrlSubmissions.
     */
    distinct?: UrlSubmissionScalarFieldEnum | UrlSubmissionScalarFieldEnum[]
  }

  /**
   * UrlSubmission findMany
   */
  export type UrlSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter, which UrlSubmissions to fetch.
     */
    where?: UrlSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UrlSubmissions to fetch.
     */
    orderBy?: UrlSubmissionOrderByWithRelationInput | UrlSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UrlSubmissions.
     */
    cursor?: UrlSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UrlSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UrlSubmissions.
     */
    skip?: number
    distinct?: UrlSubmissionScalarFieldEnum | UrlSubmissionScalarFieldEnum[]
  }

  /**
   * UrlSubmission create
   */
  export type UrlSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to create a UrlSubmission.
     */
    data: XOR<UrlSubmissionCreateInput, UrlSubmissionUncheckedCreateInput>
  }

  /**
   * UrlSubmission createMany
   */
  export type UrlSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UrlSubmissions.
     */
    data: UrlSubmissionCreateManyInput | UrlSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UrlSubmission createManyAndReturn
   */
  export type UrlSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many UrlSubmissions.
     */
    data: UrlSubmissionCreateManyInput | UrlSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UrlSubmission update
   */
  export type UrlSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * The data needed to update a UrlSubmission.
     */
    data: XOR<UrlSubmissionUpdateInput, UrlSubmissionUncheckedUpdateInput>
    /**
     * Choose, which UrlSubmission to update.
     */
    where: UrlSubmissionWhereUniqueInput
  }

  /**
   * UrlSubmission updateMany
   */
  export type UrlSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UrlSubmissions.
     */
    data: XOR<UrlSubmissionUpdateManyMutationInput, UrlSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which UrlSubmissions to update
     */
    where?: UrlSubmissionWhereInput
    /**
     * Limit how many UrlSubmissions to update.
     */
    limit?: number
  }

  /**
   * UrlSubmission updateManyAndReturn
   */
  export type UrlSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update UrlSubmissions.
     */
    data: XOR<UrlSubmissionUpdateManyMutationInput, UrlSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which UrlSubmissions to update
     */
    where?: UrlSubmissionWhereInput
    /**
     * Limit how many UrlSubmissions to update.
     */
    limit?: number
  }

  /**
   * UrlSubmission upsert
   */
  export type UrlSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * The filter to search for the UrlSubmission to update in case it exists.
     */
    where: UrlSubmissionWhereUniqueInput
    /**
     * In case the UrlSubmission found by the `where` argument doesn't exist, create a new UrlSubmission with this data.
     */
    create: XOR<UrlSubmissionCreateInput, UrlSubmissionUncheckedCreateInput>
    /**
     * In case the UrlSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UrlSubmissionUpdateInput, UrlSubmissionUncheckedUpdateInput>
  }

  /**
   * UrlSubmission delete
   */
  export type UrlSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
    /**
     * Filter which UrlSubmission to delete.
     */
    where: UrlSubmissionWhereUniqueInput
  }

  /**
   * UrlSubmission deleteMany
   */
  export type UrlSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UrlSubmissions to delete
     */
    where?: UrlSubmissionWhereInput
    /**
     * Limit how many UrlSubmissions to delete.
     */
    limit?: number
  }

  /**
   * UrlSubmission without action
   */
  export type UrlSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UrlSubmission
     */
    select?: UrlSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UrlSubmission
     */
    omit?: UrlSubmissionOmit<ExtArgs> | null
  }


  /**
   * Model SubmissionBatch
   */

  export type AggregateSubmissionBatch = {
    _count: SubmissionBatchCountAggregateOutputType | null
    _avg: SubmissionBatchAvgAggregateOutputType | null
    _sum: SubmissionBatchSumAggregateOutputType | null
    _min: SubmissionBatchMinAggregateOutputType | null
    _max: SubmissionBatchMaxAggregateOutputType | null
  }

  export type SubmissionBatchAvgAggregateOutputType = {
    totalUrls: number | null
    processedUrls: number | null
    successUrls: number | null
    failedUrls: number | null
    pendingUrls: number | null
  }

  export type SubmissionBatchSumAggregateOutputType = {
    totalUrls: number | null
    processedUrls: number | null
    successUrls: number | null
    failedUrls: number | null
    pendingUrls: number | null
  }

  export type SubmissionBatchMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.BatchStatus | null
    totalUrls: number | null
    processedUrls: number | null
    successUrls: number | null
    failedUrls: number | null
    pendingUrls: number | null
    startedAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
    errorMessage: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionBatchMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    status: $Enums.BatchStatus | null
    totalUrls: number | null
    processedUrls: number | null
    successUrls: number | null
    failedUrls: number | null
    pendingUrls: number | null
    startedAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
    errorMessage: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionBatchCountAggregateOutputType = {
    id: number
    name: number
    description: number
    status: number
    totalUrls: number
    processedUrls: number
    successUrls: number
    failedUrls: number
    pendingUrls: number
    searchEngineConfigIds: number
    urlFilters: number
    startedAt: number
    completedAt: number
    cancelledAt: number
    errorMessage: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionBatchAvgAggregateInputType = {
    totalUrls?: true
    processedUrls?: true
    successUrls?: true
    failedUrls?: true
    pendingUrls?: true
  }

  export type SubmissionBatchSumAggregateInputType = {
    totalUrls?: true
    processedUrls?: true
    successUrls?: true
    failedUrls?: true
    pendingUrls?: true
  }

  export type SubmissionBatchMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalUrls?: true
    processedUrls?: true
    successUrls?: true
    failedUrls?: true
    pendingUrls?: true
    startedAt?: true
    completedAt?: true
    cancelledAt?: true
    errorMessage?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionBatchMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalUrls?: true
    processedUrls?: true
    successUrls?: true
    failedUrls?: true
    pendingUrls?: true
    startedAt?: true
    completedAt?: true
    cancelledAt?: true
    errorMessage?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionBatchCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    status?: true
    totalUrls?: true
    processedUrls?: true
    successUrls?: true
    failedUrls?: true
    pendingUrls?: true
    searchEngineConfigIds?: true
    urlFilters?: true
    startedAt?: true
    completedAt?: true
    cancelledAt?: true
    errorMessage?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubmissionBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmissionBatch to aggregate.
     */
    where?: SubmissionBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionBatches to fetch.
     */
    orderBy?: SubmissionBatchOrderByWithRelationInput | SubmissionBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubmissionBatches
    **/
    _count?: true | SubmissionBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionBatchMaxAggregateInputType
  }

  export type GetSubmissionBatchAggregateType<T extends SubmissionBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmissionBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmissionBatch[P]>
      : GetScalarType<T[P], AggregateSubmissionBatch[P]>
  }




  export type SubmissionBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionBatchWhereInput
    orderBy?: SubmissionBatchOrderByWithAggregationInput | SubmissionBatchOrderByWithAggregationInput[]
    by: SubmissionBatchScalarFieldEnum[] | SubmissionBatchScalarFieldEnum
    having?: SubmissionBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionBatchCountAggregateInputType | true
    _avg?: SubmissionBatchAvgAggregateInputType
    _sum?: SubmissionBatchSumAggregateInputType
    _min?: SubmissionBatchMinAggregateInputType
    _max?: SubmissionBatchMaxAggregateInputType
  }

  export type SubmissionBatchGroupByOutputType = {
    id: string
    name: string
    description: string | null
    status: $Enums.BatchStatus
    totalUrls: number
    processedUrls: number
    successUrls: number
    failedUrls: number
    pendingUrls: number
    searchEngineConfigIds: string[]
    urlFilters: JsonValue | null
    startedAt: Date | null
    completedAt: Date | null
    cancelledAt: Date | null
    errorMessage: string | null
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: SubmissionBatchCountAggregateOutputType | null
    _avg: SubmissionBatchAvgAggregateOutputType | null
    _sum: SubmissionBatchSumAggregateOutputType | null
    _min: SubmissionBatchMinAggregateOutputType | null
    _max: SubmissionBatchMaxAggregateOutputType | null
  }

  type GetSubmissionBatchGroupByPayload<T extends SubmissionBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionBatchGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionBatchGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalUrls?: boolean
    processedUrls?: boolean
    successUrls?: boolean
    failedUrls?: boolean
    pendingUrls?: boolean
    searchEngineConfigIds?: boolean
    urlFilters?: boolean
    startedAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    errorMessage?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["submissionBatch"]>

  export type SubmissionBatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalUrls?: boolean
    processedUrls?: boolean
    successUrls?: boolean
    failedUrls?: boolean
    pendingUrls?: boolean
    searchEngineConfigIds?: boolean
    urlFilters?: boolean
    startedAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    errorMessage?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["submissionBatch"]>

  export type SubmissionBatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalUrls?: boolean
    processedUrls?: boolean
    successUrls?: boolean
    failedUrls?: boolean
    pendingUrls?: boolean
    searchEngineConfigIds?: boolean
    urlFilters?: boolean
    startedAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    errorMessage?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["submissionBatch"]>

  export type SubmissionBatchSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    totalUrls?: boolean
    processedUrls?: boolean
    successUrls?: boolean
    failedUrls?: boolean
    pendingUrls?: boolean
    searchEngineConfigIds?: boolean
    urlFilters?: boolean
    startedAt?: boolean
    completedAt?: boolean
    cancelledAt?: boolean
    errorMessage?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionBatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "status" | "totalUrls" | "processedUrls" | "successUrls" | "failedUrls" | "pendingUrls" | "searchEngineConfigIds" | "urlFilters" | "startedAt" | "completedAt" | "cancelledAt" | "errorMessage" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["submissionBatch"]>

  export type $SubmissionBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubmissionBatch"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      status: $Enums.BatchStatus
      totalUrls: number
      processedUrls: number
      successUrls: number
      failedUrls: number
      pendingUrls: number
      searchEngineConfigIds: string[]
      urlFilters: Prisma.JsonValue | null
      startedAt: Date | null
      completedAt: Date | null
      cancelledAt: Date | null
      errorMessage: string | null
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["submissionBatch"]>
    composites: {}
  }

  type SubmissionBatchGetPayload<S extends boolean | null | undefined | SubmissionBatchDefaultArgs> = $Result.GetResult<Prisma.$SubmissionBatchPayload, S>

  type SubmissionBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionBatchCountAggregateInputType | true
    }

  export interface SubmissionBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubmissionBatch'], meta: { name: 'SubmissionBatch' } }
    /**
     * Find zero or one SubmissionBatch that matches the filter.
     * @param {SubmissionBatchFindUniqueArgs} args - Arguments to find a SubmissionBatch
     * @example
     * // Get one SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionBatchFindUniqueArgs>(args: SelectSubset<T, SubmissionBatchFindUniqueArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubmissionBatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionBatchFindUniqueOrThrowArgs} args - Arguments to find a SubmissionBatch
     * @example
     * // Get one SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmissionBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchFindFirstArgs} args - Arguments to find a SubmissionBatch
     * @example
     * // Get one SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionBatchFindFirstArgs>(args?: SelectSubset<T, SubmissionBatchFindFirstArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubmissionBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchFindFirstOrThrowArgs} args - Arguments to find a SubmissionBatch
     * @example
     * // Get one SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubmissionBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubmissionBatches
     * const submissionBatches = await prisma.submissionBatch.findMany()
     * 
     * // Get first 10 SubmissionBatches
     * const submissionBatches = await prisma.submissionBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionBatchWithIdOnly = await prisma.submissionBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionBatchFindManyArgs>(args?: SelectSubset<T, SubmissionBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubmissionBatch.
     * @param {SubmissionBatchCreateArgs} args - Arguments to create a SubmissionBatch.
     * @example
     * // Create one SubmissionBatch
     * const SubmissionBatch = await prisma.submissionBatch.create({
     *   data: {
     *     // ... data to create a SubmissionBatch
     *   }
     * })
     * 
     */
    create<T extends SubmissionBatchCreateArgs>(args: SelectSubset<T, SubmissionBatchCreateArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubmissionBatches.
     * @param {SubmissionBatchCreateManyArgs} args - Arguments to create many SubmissionBatches.
     * @example
     * // Create many SubmissionBatches
     * const submissionBatch = await prisma.submissionBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionBatchCreateManyArgs>(args?: SelectSubset<T, SubmissionBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubmissionBatches and returns the data saved in the database.
     * @param {SubmissionBatchCreateManyAndReturnArgs} args - Arguments to create many SubmissionBatches.
     * @example
     * // Create many SubmissionBatches
     * const submissionBatch = await prisma.submissionBatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubmissionBatches and only return the `id`
     * const submissionBatchWithIdOnly = await prisma.submissionBatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionBatchCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubmissionBatch.
     * @param {SubmissionBatchDeleteArgs} args - Arguments to delete one SubmissionBatch.
     * @example
     * // Delete one SubmissionBatch
     * const SubmissionBatch = await prisma.submissionBatch.delete({
     *   where: {
     *     // ... filter to delete one SubmissionBatch
     *   }
     * })
     * 
     */
    delete<T extends SubmissionBatchDeleteArgs>(args: SelectSubset<T, SubmissionBatchDeleteArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubmissionBatch.
     * @param {SubmissionBatchUpdateArgs} args - Arguments to update one SubmissionBatch.
     * @example
     * // Update one SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionBatchUpdateArgs>(args: SelectSubset<T, SubmissionBatchUpdateArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubmissionBatches.
     * @param {SubmissionBatchDeleteManyArgs} args - Arguments to filter SubmissionBatches to delete.
     * @example
     * // Delete a few SubmissionBatches
     * const { count } = await prisma.submissionBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionBatchDeleteManyArgs>(args?: SelectSubset<T, SubmissionBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmissionBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubmissionBatches
     * const submissionBatch = await prisma.submissionBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionBatchUpdateManyArgs>(args: SelectSubset<T, SubmissionBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubmissionBatches and returns the data updated in the database.
     * @param {SubmissionBatchUpdateManyAndReturnArgs} args - Arguments to update many SubmissionBatches.
     * @example
     * // Update many SubmissionBatches
     * const submissionBatch = await prisma.submissionBatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubmissionBatches and only return the `id`
     * const submissionBatchWithIdOnly = await prisma.submissionBatch.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubmissionBatchUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubmissionBatch.
     * @param {SubmissionBatchUpsertArgs} args - Arguments to update or create a SubmissionBatch.
     * @example
     * // Update or create a SubmissionBatch
     * const submissionBatch = await prisma.submissionBatch.upsert({
     *   create: {
     *     // ... data to create a SubmissionBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubmissionBatch we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionBatchUpsertArgs>(args: SelectSubset<T, SubmissionBatchUpsertArgs<ExtArgs>>): Prisma__SubmissionBatchClient<$Result.GetResult<Prisma.$SubmissionBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubmissionBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchCountArgs} args - Arguments to filter SubmissionBatches to count.
     * @example
     * // Count the number of SubmissionBatches
     * const count = await prisma.submissionBatch.count({
     *   where: {
     *     // ... the filter for the SubmissionBatches we want to count
     *   }
     * })
    **/
    count<T extends SubmissionBatchCountArgs>(
      args?: Subset<T, SubmissionBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubmissionBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubmissionBatchAggregateArgs>(args: Subset<T, SubmissionBatchAggregateArgs>): Prisma.PrismaPromise<GetSubmissionBatchAggregateType<T>>

    /**
     * Group by SubmissionBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionBatchGroupByArgs} args - Group by arguments.
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
      T extends SubmissionBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionBatchGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionBatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubmissionBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubmissionBatch model
   */
  readonly fields: SubmissionBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubmissionBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SubmissionBatch model
   */
  interface SubmissionBatchFieldRefs {
    readonly id: FieldRef<"SubmissionBatch", 'String'>
    readonly name: FieldRef<"SubmissionBatch", 'String'>
    readonly description: FieldRef<"SubmissionBatch", 'String'>
    readonly status: FieldRef<"SubmissionBatch", 'BatchStatus'>
    readonly totalUrls: FieldRef<"SubmissionBatch", 'Int'>
    readonly processedUrls: FieldRef<"SubmissionBatch", 'Int'>
    readonly successUrls: FieldRef<"SubmissionBatch", 'Int'>
    readonly failedUrls: FieldRef<"SubmissionBatch", 'Int'>
    readonly pendingUrls: FieldRef<"SubmissionBatch", 'Int'>
    readonly searchEngineConfigIds: FieldRef<"SubmissionBatch", 'String[]'>
    readonly urlFilters: FieldRef<"SubmissionBatch", 'Json'>
    readonly startedAt: FieldRef<"SubmissionBatch", 'DateTime'>
    readonly completedAt: FieldRef<"SubmissionBatch", 'DateTime'>
    readonly cancelledAt: FieldRef<"SubmissionBatch", 'DateTime'>
    readonly errorMessage: FieldRef<"SubmissionBatch", 'String'>
    readonly createdBy: FieldRef<"SubmissionBatch", 'String'>
    readonly createdAt: FieldRef<"SubmissionBatch", 'DateTime'>
    readonly updatedAt: FieldRef<"SubmissionBatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubmissionBatch findUnique
   */
  export type SubmissionBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter, which SubmissionBatch to fetch.
     */
    where: SubmissionBatchWhereUniqueInput
  }

  /**
   * SubmissionBatch findUniqueOrThrow
   */
  export type SubmissionBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter, which SubmissionBatch to fetch.
     */
    where: SubmissionBatchWhereUniqueInput
  }

  /**
   * SubmissionBatch findFirst
   */
  export type SubmissionBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter, which SubmissionBatch to fetch.
     */
    where?: SubmissionBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionBatches to fetch.
     */
    orderBy?: SubmissionBatchOrderByWithRelationInput | SubmissionBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmissionBatches.
     */
    cursor?: SubmissionBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmissionBatches.
     */
    distinct?: SubmissionBatchScalarFieldEnum | SubmissionBatchScalarFieldEnum[]
  }

  /**
   * SubmissionBatch findFirstOrThrow
   */
  export type SubmissionBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter, which SubmissionBatch to fetch.
     */
    where?: SubmissionBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionBatches to fetch.
     */
    orderBy?: SubmissionBatchOrderByWithRelationInput | SubmissionBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubmissionBatches.
     */
    cursor?: SubmissionBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubmissionBatches.
     */
    distinct?: SubmissionBatchScalarFieldEnum | SubmissionBatchScalarFieldEnum[]
  }

  /**
   * SubmissionBatch findMany
   */
  export type SubmissionBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter, which SubmissionBatches to fetch.
     */
    where?: SubmissionBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubmissionBatches to fetch.
     */
    orderBy?: SubmissionBatchOrderByWithRelationInput | SubmissionBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubmissionBatches.
     */
    cursor?: SubmissionBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubmissionBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubmissionBatches.
     */
    skip?: number
    distinct?: SubmissionBatchScalarFieldEnum | SubmissionBatchScalarFieldEnum[]
  }

  /**
   * SubmissionBatch create
   */
  export type SubmissionBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * The data needed to create a SubmissionBatch.
     */
    data: XOR<SubmissionBatchCreateInput, SubmissionBatchUncheckedCreateInput>
  }

  /**
   * SubmissionBatch createMany
   */
  export type SubmissionBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubmissionBatches.
     */
    data: SubmissionBatchCreateManyInput | SubmissionBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubmissionBatch createManyAndReturn
   */
  export type SubmissionBatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * The data used to create many SubmissionBatches.
     */
    data: SubmissionBatchCreateManyInput | SubmissionBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubmissionBatch update
   */
  export type SubmissionBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * The data needed to update a SubmissionBatch.
     */
    data: XOR<SubmissionBatchUpdateInput, SubmissionBatchUncheckedUpdateInput>
    /**
     * Choose, which SubmissionBatch to update.
     */
    where: SubmissionBatchWhereUniqueInput
  }

  /**
   * SubmissionBatch updateMany
   */
  export type SubmissionBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubmissionBatches.
     */
    data: XOR<SubmissionBatchUpdateManyMutationInput, SubmissionBatchUncheckedUpdateManyInput>
    /**
     * Filter which SubmissionBatches to update
     */
    where?: SubmissionBatchWhereInput
    /**
     * Limit how many SubmissionBatches to update.
     */
    limit?: number
  }

  /**
   * SubmissionBatch updateManyAndReturn
   */
  export type SubmissionBatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * The data used to update SubmissionBatches.
     */
    data: XOR<SubmissionBatchUpdateManyMutationInput, SubmissionBatchUncheckedUpdateManyInput>
    /**
     * Filter which SubmissionBatches to update
     */
    where?: SubmissionBatchWhereInput
    /**
     * Limit how many SubmissionBatches to update.
     */
    limit?: number
  }

  /**
   * SubmissionBatch upsert
   */
  export type SubmissionBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * The filter to search for the SubmissionBatch to update in case it exists.
     */
    where: SubmissionBatchWhereUniqueInput
    /**
     * In case the SubmissionBatch found by the `where` argument doesn't exist, create a new SubmissionBatch with this data.
     */
    create: XOR<SubmissionBatchCreateInput, SubmissionBatchUncheckedCreateInput>
    /**
     * In case the SubmissionBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionBatchUpdateInput, SubmissionBatchUncheckedUpdateInput>
  }

  /**
   * SubmissionBatch delete
   */
  export type SubmissionBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
    /**
     * Filter which SubmissionBatch to delete.
     */
    where: SubmissionBatchWhereUniqueInput
  }

  /**
   * SubmissionBatch deleteMany
   */
  export type SubmissionBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubmissionBatches to delete
     */
    where?: SubmissionBatchWhereInput
    /**
     * Limit how many SubmissionBatches to delete.
     */
    limit?: number
  }

  /**
   * SubmissionBatch without action
   */
  export type SubmissionBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionBatch
     */
    select?: SubmissionBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubmissionBatch
     */
    omit?: SubmissionBatchOmit<ExtArgs> | null
  }


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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    password: 'password',
    role: 'role',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const ImportPlatformScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    type: 'type',
    icon: 'icon',
    apiConfig: 'apiConfig',
    defaultConfig: 'defaultConfig',
    isEnabled: 'isEnabled',
    sortOrder: 'sortOrder',
    totalImported: 'totalImported',
    lastImportAt: 'lastImportAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ImportPlatformScalarFieldEnum = (typeof ImportPlatformScalarFieldEnum)[keyof typeof ImportPlatformScalarFieldEnum]


  export const AiConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    provider: 'provider',
    apiKey: 'apiKey',
    baseUrl: 'baseUrl',
    modelConfig: 'modelConfig',
    isActive: 'isActive',
    isEnabled: 'isEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiConfigScalarFieldEnum = (typeof AiConfigScalarFieldEnum)[keyof typeof AiConfigScalarFieldEnum]


  export const ExternalApiConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    displayName: 'displayName',
    description: 'description',
    provider: 'provider',
    apiConfig: 'apiConfig',
    isEncrypted: 'isEncrypted',
    isEnabled: 'isEnabled',
    isActive: 'isActive',
    totalCalls: 'totalCalls',
    successCalls: 'successCalls',
    failedCalls: 'failedCalls',
    lastUsedAt: 'lastUsedAt',
    quotaConfig: 'quotaConfig',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExternalApiConfigScalarFieldEnum = (typeof ExternalApiConfigScalarFieldEnum)[keyof typeof ExternalApiConfigScalarFieldEnum]


  export const SearchEngineConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    type: 'type',
    icon: 'icon',
    description: 'description',
    apiEndpoint: 'apiEndpoint',
    apiKey: 'apiKey',
    apiToken: 'apiToken',
    siteUrl: 'siteUrl',
    extraConfig: 'extraConfig',
    isEnabled: 'isEnabled',
    autoSubmit: 'autoSubmit',
    sortOrder: 'sortOrder',
    totalSubmitted: 'totalSubmitted',
    totalSuccess: 'totalSuccess',
    totalFailed: 'totalFailed',
    lastSubmitAt: 'lastSubmitAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SearchEngineConfigScalarFieldEnum = (typeof SearchEngineConfigScalarFieldEnum)[keyof typeof SearchEngineConfigScalarFieldEnum]


  export const UrlSubmissionScalarFieldEnum: {
    id: 'id',
    url: 'url',
    urlType: 'urlType',
    entityId: 'entityId',
    locale: 'locale',
    googleSubmitStatus: 'googleSubmitStatus',
    googleSubmitStatusMessage: 'googleSubmitStatusMessage',
    googleSubmitHttpStatus: 'googleSubmitHttpStatus',
    googleSubmitResponseBody: 'googleSubmitResponseBody',
    googleSubmitResponseTime: 'googleSubmitResponseTime',
    googleSubmittedAt: 'googleSubmittedAt',
    bingSubmitStatus: 'bingSubmitStatus',
    bingSubmitStatusMessage: 'bingSubmitStatusMessage',
    bingSubmitHttpStatus: 'bingSubmitHttpStatus',
    bingSubmitResponseBody: 'bingSubmitResponseBody',
    bingSubmitResponseTime: 'bingSubmitResponseTime',
    bingSubmittedAt: 'bingSubmittedAt',
    indexedByGoogle: 'indexedByGoogle',
    googleIndexedAt: 'googleIndexedAt',
    googleLastCheckAt: 'googleLastCheckAt',
    googleCheckMessage: 'googleCheckMessage',
    googleIndexStatusRaw: 'googleIndexStatusRaw',
    indexedByBing: 'indexedByBing',
    bingIndexedAt: 'bingIndexedAt',
    bingLastCheckAt: 'bingLastCheckAt',
    bingCheckMessage: 'bingCheckMessage',
    bingIndexStatusRaw: 'bingIndexStatusRaw',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UrlSubmissionScalarFieldEnum = (typeof UrlSubmissionScalarFieldEnum)[keyof typeof UrlSubmissionScalarFieldEnum]


  export const SubmissionBatchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    status: 'status',
    totalUrls: 'totalUrls',
    processedUrls: 'processedUrls',
    successUrls: 'successUrls',
    failedUrls: 'failedUrls',
    pendingUrls: 'pendingUrls',
    searchEngineConfigIds: 'searchEngineConfigIds',
    urlFilters: 'urlFilters',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt',
    errorMessage: 'errorMessage',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionBatchScalarFieldEnum = (typeof SubmissionBatchScalarFieldEnum)[keyof typeof SubmissionBatchScalarFieldEnum]


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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'SubmissionStatus'
   */
  export type EnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus'>
    


  /**
   * Reference to a field of type 'SubmissionStatus[]'
   */
  export type ListEnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus[]'>
    


  /**
   * Reference to a field of type 'BatchStatus'
   */
  export type EnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus'>
    


  /**
   * Reference to a field of type 'BatchStatus[]'
   */
  export type ListEnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolNullableFilter<"User"> | boolean | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolNullableFilter<"User"> | boolean | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type ImportPlatformWhereInput = {
    AND?: ImportPlatformWhereInput | ImportPlatformWhereInput[]
    OR?: ImportPlatformWhereInput[]
    NOT?: ImportPlatformWhereInput | ImportPlatformWhereInput[]
    id?: StringFilter<"ImportPlatform"> | string
    name?: StringFilter<"ImportPlatform"> | string
    slug?: StringFilter<"ImportPlatform"> | string
    type?: StringFilter<"ImportPlatform"> | string
    icon?: StringNullableFilter<"ImportPlatform"> | string | null
    apiConfig?: JsonFilter<"ImportPlatform">
    defaultConfig?: JsonNullableFilter<"ImportPlatform">
    isEnabled?: BoolFilter<"ImportPlatform"> | boolean
    sortOrder?: IntFilter<"ImportPlatform"> | number
    totalImported?: IntFilter<"ImportPlatform"> | number
    lastImportAt?: DateTimeNullableFilter<"ImportPlatform"> | Date | string | null
    createdAt?: DateTimeFilter<"ImportPlatform"> | Date | string
    updatedAt?: DateTimeFilter<"ImportPlatform"> | Date | string
  }

  export type ImportPlatformOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    apiConfig?: SortOrder
    defaultConfig?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    sortOrder?: SortOrder
    totalImported?: SortOrder
    lastImportAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportPlatformWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ImportPlatformWhereInput | ImportPlatformWhereInput[]
    OR?: ImportPlatformWhereInput[]
    NOT?: ImportPlatformWhereInput | ImportPlatformWhereInput[]
    name?: StringFilter<"ImportPlatform"> | string
    type?: StringFilter<"ImportPlatform"> | string
    icon?: StringNullableFilter<"ImportPlatform"> | string | null
    apiConfig?: JsonFilter<"ImportPlatform">
    defaultConfig?: JsonNullableFilter<"ImportPlatform">
    isEnabled?: BoolFilter<"ImportPlatform"> | boolean
    sortOrder?: IntFilter<"ImportPlatform"> | number
    totalImported?: IntFilter<"ImportPlatform"> | number
    lastImportAt?: DateTimeNullableFilter<"ImportPlatform"> | Date | string | null
    createdAt?: DateTimeFilter<"ImportPlatform"> | Date | string
    updatedAt?: DateTimeFilter<"ImportPlatform"> | Date | string
  }, "id" | "slug">

  export type ImportPlatformOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    apiConfig?: SortOrder
    defaultConfig?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    sortOrder?: SortOrder
    totalImported?: SortOrder
    lastImportAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ImportPlatformCountOrderByAggregateInput
    _avg?: ImportPlatformAvgOrderByAggregateInput
    _max?: ImportPlatformMaxOrderByAggregateInput
    _min?: ImportPlatformMinOrderByAggregateInput
    _sum?: ImportPlatformSumOrderByAggregateInput
  }

  export type ImportPlatformScalarWhereWithAggregatesInput = {
    AND?: ImportPlatformScalarWhereWithAggregatesInput | ImportPlatformScalarWhereWithAggregatesInput[]
    OR?: ImportPlatformScalarWhereWithAggregatesInput[]
    NOT?: ImportPlatformScalarWhereWithAggregatesInput | ImportPlatformScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ImportPlatform"> | string
    name?: StringWithAggregatesFilter<"ImportPlatform"> | string
    slug?: StringWithAggregatesFilter<"ImportPlatform"> | string
    type?: StringWithAggregatesFilter<"ImportPlatform"> | string
    icon?: StringNullableWithAggregatesFilter<"ImportPlatform"> | string | null
    apiConfig?: JsonWithAggregatesFilter<"ImportPlatform">
    defaultConfig?: JsonNullableWithAggregatesFilter<"ImportPlatform">
    isEnabled?: BoolWithAggregatesFilter<"ImportPlatform"> | boolean
    sortOrder?: IntWithAggregatesFilter<"ImportPlatform"> | number
    totalImported?: IntWithAggregatesFilter<"ImportPlatform"> | number
    lastImportAt?: DateTimeNullableWithAggregatesFilter<"ImportPlatform"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ImportPlatform"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ImportPlatform"> | Date | string
  }

  export type AiConfigWhereInput = {
    AND?: AiConfigWhereInput | AiConfigWhereInput[]
    OR?: AiConfigWhereInput[]
    NOT?: AiConfigWhereInput | AiConfigWhereInput[]
    id?: StringFilter<"AiConfig"> | string
    name?: StringFilter<"AiConfig"> | string
    provider?: StringFilter<"AiConfig"> | string
    apiKey?: StringFilter<"AiConfig"> | string
    baseUrl?: StringFilter<"AiConfig"> | string
    modelConfig?: JsonFilter<"AiConfig">
    isActive?: BoolFilter<"AiConfig"> | boolean
    isEnabled?: BoolFilter<"AiConfig"> | boolean
    createdAt?: DateTimeFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AiConfig"> | Date | string
  }

  export type AiConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    modelConfig?: SortOrder
    isActive?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiConfigWhereInput | AiConfigWhereInput[]
    OR?: AiConfigWhereInput[]
    NOT?: AiConfigWhereInput | AiConfigWhereInput[]
    name?: StringFilter<"AiConfig"> | string
    provider?: StringFilter<"AiConfig"> | string
    apiKey?: StringFilter<"AiConfig"> | string
    baseUrl?: StringFilter<"AiConfig"> | string
    modelConfig?: JsonFilter<"AiConfig">
    isActive?: BoolFilter<"AiConfig"> | boolean
    isEnabled?: BoolFilter<"AiConfig"> | boolean
    createdAt?: DateTimeFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"AiConfig"> | Date | string
  }, "id">

  export type AiConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    modelConfig?: SortOrder
    isActive?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiConfigCountOrderByAggregateInput
    _max?: AiConfigMaxOrderByAggregateInput
    _min?: AiConfigMinOrderByAggregateInput
  }

  export type AiConfigScalarWhereWithAggregatesInput = {
    AND?: AiConfigScalarWhereWithAggregatesInput | AiConfigScalarWhereWithAggregatesInput[]
    OR?: AiConfigScalarWhereWithAggregatesInput[]
    NOT?: AiConfigScalarWhereWithAggregatesInput | AiConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiConfig"> | string
    name?: StringWithAggregatesFilter<"AiConfig"> | string
    provider?: StringWithAggregatesFilter<"AiConfig"> | string
    apiKey?: StringWithAggregatesFilter<"AiConfig"> | string
    baseUrl?: StringWithAggregatesFilter<"AiConfig"> | string
    modelConfig?: JsonWithAggregatesFilter<"AiConfig">
    isActive?: BoolWithAggregatesFilter<"AiConfig"> | boolean
    isEnabled?: BoolWithAggregatesFilter<"AiConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AiConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiConfig"> | Date | string
  }

  export type ExternalApiConfigWhereInput = {
    AND?: ExternalApiConfigWhereInput | ExternalApiConfigWhereInput[]
    OR?: ExternalApiConfigWhereInput[]
    NOT?: ExternalApiConfigWhereInput | ExternalApiConfigWhereInput[]
    id?: StringFilter<"ExternalApiConfig"> | string
    name?: StringFilter<"ExternalApiConfig"> | string
    displayName?: StringFilter<"ExternalApiConfig"> | string
    description?: StringNullableFilter<"ExternalApiConfig"> | string | null
    provider?: StringFilter<"ExternalApiConfig"> | string
    apiConfig?: JsonFilter<"ExternalApiConfig">
    isEncrypted?: BoolFilter<"ExternalApiConfig"> | boolean
    isEnabled?: BoolFilter<"ExternalApiConfig"> | boolean
    isActive?: BoolFilter<"ExternalApiConfig"> | boolean
    totalCalls?: IntFilter<"ExternalApiConfig"> | number
    successCalls?: IntFilter<"ExternalApiConfig"> | number
    failedCalls?: IntFilter<"ExternalApiConfig"> | number
    lastUsedAt?: DateTimeNullableFilter<"ExternalApiConfig"> | Date | string | null
    quotaConfig?: JsonNullableFilter<"ExternalApiConfig">
    createdAt?: DateTimeFilter<"ExternalApiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ExternalApiConfig"> | Date | string
  }

  export type ExternalApiConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    description?: SortOrderInput | SortOrder
    provider?: SortOrder
    apiConfig?: SortOrder
    isEncrypted?: SortOrder
    isEnabled?: SortOrder
    isActive?: SortOrder
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    quotaConfig?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalApiConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExternalApiConfigWhereInput | ExternalApiConfigWhereInput[]
    OR?: ExternalApiConfigWhereInput[]
    NOT?: ExternalApiConfigWhereInput | ExternalApiConfigWhereInput[]
    displayName?: StringFilter<"ExternalApiConfig"> | string
    description?: StringNullableFilter<"ExternalApiConfig"> | string | null
    provider?: StringFilter<"ExternalApiConfig"> | string
    apiConfig?: JsonFilter<"ExternalApiConfig">
    isEncrypted?: BoolFilter<"ExternalApiConfig"> | boolean
    isEnabled?: BoolFilter<"ExternalApiConfig"> | boolean
    isActive?: BoolFilter<"ExternalApiConfig"> | boolean
    totalCalls?: IntFilter<"ExternalApiConfig"> | number
    successCalls?: IntFilter<"ExternalApiConfig"> | number
    failedCalls?: IntFilter<"ExternalApiConfig"> | number
    lastUsedAt?: DateTimeNullableFilter<"ExternalApiConfig"> | Date | string | null
    quotaConfig?: JsonNullableFilter<"ExternalApiConfig">
    createdAt?: DateTimeFilter<"ExternalApiConfig"> | Date | string
    updatedAt?: DateTimeFilter<"ExternalApiConfig"> | Date | string
  }, "id" | "name">

  export type ExternalApiConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    description?: SortOrderInput | SortOrder
    provider?: SortOrder
    apiConfig?: SortOrder
    isEncrypted?: SortOrder
    isEnabled?: SortOrder
    isActive?: SortOrder
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    quotaConfig?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExternalApiConfigCountOrderByAggregateInput
    _avg?: ExternalApiConfigAvgOrderByAggregateInput
    _max?: ExternalApiConfigMaxOrderByAggregateInput
    _min?: ExternalApiConfigMinOrderByAggregateInput
    _sum?: ExternalApiConfigSumOrderByAggregateInput
  }

  export type ExternalApiConfigScalarWhereWithAggregatesInput = {
    AND?: ExternalApiConfigScalarWhereWithAggregatesInput | ExternalApiConfigScalarWhereWithAggregatesInput[]
    OR?: ExternalApiConfigScalarWhereWithAggregatesInput[]
    NOT?: ExternalApiConfigScalarWhereWithAggregatesInput | ExternalApiConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExternalApiConfig"> | string
    name?: StringWithAggregatesFilter<"ExternalApiConfig"> | string
    displayName?: StringWithAggregatesFilter<"ExternalApiConfig"> | string
    description?: StringNullableWithAggregatesFilter<"ExternalApiConfig"> | string | null
    provider?: StringWithAggregatesFilter<"ExternalApiConfig"> | string
    apiConfig?: JsonWithAggregatesFilter<"ExternalApiConfig">
    isEncrypted?: BoolWithAggregatesFilter<"ExternalApiConfig"> | boolean
    isEnabled?: BoolWithAggregatesFilter<"ExternalApiConfig"> | boolean
    isActive?: BoolWithAggregatesFilter<"ExternalApiConfig"> | boolean
    totalCalls?: IntWithAggregatesFilter<"ExternalApiConfig"> | number
    successCalls?: IntWithAggregatesFilter<"ExternalApiConfig"> | number
    failedCalls?: IntWithAggregatesFilter<"ExternalApiConfig"> | number
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ExternalApiConfig"> | Date | string | null
    quotaConfig?: JsonNullableWithAggregatesFilter<"ExternalApiConfig">
    createdAt?: DateTimeWithAggregatesFilter<"ExternalApiConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExternalApiConfig"> | Date | string
  }

  export type SearchEngineConfigWhereInput = {
    AND?: SearchEngineConfigWhereInput | SearchEngineConfigWhereInput[]
    OR?: SearchEngineConfigWhereInput[]
    NOT?: SearchEngineConfigWhereInput | SearchEngineConfigWhereInput[]
    id?: StringFilter<"SearchEngineConfig"> | string
    name?: StringFilter<"SearchEngineConfig"> | string
    slug?: StringFilter<"SearchEngineConfig"> | string
    type?: StringFilter<"SearchEngineConfig"> | string
    icon?: StringNullableFilter<"SearchEngineConfig"> | string | null
    description?: StringNullableFilter<"SearchEngineConfig"> | string | null
    apiEndpoint?: StringFilter<"SearchEngineConfig"> | string
    apiKey?: StringNullableFilter<"SearchEngineConfig"> | string | null
    apiToken?: StringNullableFilter<"SearchEngineConfig"> | string | null
    siteUrl?: StringNullableFilter<"SearchEngineConfig"> | string | null
    extraConfig?: JsonNullableFilter<"SearchEngineConfig">
    isEnabled?: BoolFilter<"SearchEngineConfig"> | boolean
    autoSubmit?: BoolFilter<"SearchEngineConfig"> | boolean
    sortOrder?: IntFilter<"SearchEngineConfig"> | number
    totalSubmitted?: IntFilter<"SearchEngineConfig"> | number
    totalSuccess?: IntFilter<"SearchEngineConfig"> | number
    totalFailed?: IntFilter<"SearchEngineConfig"> | number
    lastSubmitAt?: DateTimeNullableFilter<"SearchEngineConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"SearchEngineConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SearchEngineConfig"> | Date | string
  }

  export type SearchEngineConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    apiEndpoint?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    apiToken?: SortOrderInput | SortOrder
    siteUrl?: SortOrderInput | SortOrder
    extraConfig?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    autoSubmit?: SortOrder
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
    lastSubmitAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchEngineConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: SearchEngineConfigWhereInput | SearchEngineConfigWhereInput[]
    OR?: SearchEngineConfigWhereInput[]
    NOT?: SearchEngineConfigWhereInput | SearchEngineConfigWhereInput[]
    name?: StringFilter<"SearchEngineConfig"> | string
    type?: StringFilter<"SearchEngineConfig"> | string
    icon?: StringNullableFilter<"SearchEngineConfig"> | string | null
    description?: StringNullableFilter<"SearchEngineConfig"> | string | null
    apiEndpoint?: StringFilter<"SearchEngineConfig"> | string
    apiKey?: StringNullableFilter<"SearchEngineConfig"> | string | null
    apiToken?: StringNullableFilter<"SearchEngineConfig"> | string | null
    siteUrl?: StringNullableFilter<"SearchEngineConfig"> | string | null
    extraConfig?: JsonNullableFilter<"SearchEngineConfig">
    isEnabled?: BoolFilter<"SearchEngineConfig"> | boolean
    autoSubmit?: BoolFilter<"SearchEngineConfig"> | boolean
    sortOrder?: IntFilter<"SearchEngineConfig"> | number
    totalSubmitted?: IntFilter<"SearchEngineConfig"> | number
    totalSuccess?: IntFilter<"SearchEngineConfig"> | number
    totalFailed?: IntFilter<"SearchEngineConfig"> | number
    lastSubmitAt?: DateTimeNullableFilter<"SearchEngineConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"SearchEngineConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SearchEngineConfig"> | Date | string
  }, "id" | "slug">

  export type SearchEngineConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    apiEndpoint?: SortOrder
    apiKey?: SortOrderInput | SortOrder
    apiToken?: SortOrderInput | SortOrder
    siteUrl?: SortOrderInput | SortOrder
    extraConfig?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    autoSubmit?: SortOrder
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
    lastSubmitAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SearchEngineConfigCountOrderByAggregateInput
    _avg?: SearchEngineConfigAvgOrderByAggregateInput
    _max?: SearchEngineConfigMaxOrderByAggregateInput
    _min?: SearchEngineConfigMinOrderByAggregateInput
    _sum?: SearchEngineConfigSumOrderByAggregateInput
  }

  export type SearchEngineConfigScalarWhereWithAggregatesInput = {
    AND?: SearchEngineConfigScalarWhereWithAggregatesInput | SearchEngineConfigScalarWhereWithAggregatesInput[]
    OR?: SearchEngineConfigScalarWhereWithAggregatesInput[]
    NOT?: SearchEngineConfigScalarWhereWithAggregatesInput | SearchEngineConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchEngineConfig"> | string
    name?: StringWithAggregatesFilter<"SearchEngineConfig"> | string
    slug?: StringWithAggregatesFilter<"SearchEngineConfig"> | string
    type?: StringWithAggregatesFilter<"SearchEngineConfig"> | string
    icon?: StringNullableWithAggregatesFilter<"SearchEngineConfig"> | string | null
    description?: StringNullableWithAggregatesFilter<"SearchEngineConfig"> | string | null
    apiEndpoint?: StringWithAggregatesFilter<"SearchEngineConfig"> | string
    apiKey?: StringNullableWithAggregatesFilter<"SearchEngineConfig"> | string | null
    apiToken?: StringNullableWithAggregatesFilter<"SearchEngineConfig"> | string | null
    siteUrl?: StringNullableWithAggregatesFilter<"SearchEngineConfig"> | string | null
    extraConfig?: JsonNullableWithAggregatesFilter<"SearchEngineConfig">
    isEnabled?: BoolWithAggregatesFilter<"SearchEngineConfig"> | boolean
    autoSubmit?: BoolWithAggregatesFilter<"SearchEngineConfig"> | boolean
    sortOrder?: IntWithAggregatesFilter<"SearchEngineConfig"> | number
    totalSubmitted?: IntWithAggregatesFilter<"SearchEngineConfig"> | number
    totalSuccess?: IntWithAggregatesFilter<"SearchEngineConfig"> | number
    totalFailed?: IntWithAggregatesFilter<"SearchEngineConfig"> | number
    lastSubmitAt?: DateTimeNullableWithAggregatesFilter<"SearchEngineConfig"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SearchEngineConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SearchEngineConfig"> | Date | string
  }

  export type UrlSubmissionWhereInput = {
    AND?: UrlSubmissionWhereInput | UrlSubmissionWhereInput[]
    OR?: UrlSubmissionWhereInput[]
    NOT?: UrlSubmissionWhereInput | UrlSubmissionWhereInput[]
    id?: StringFilter<"UrlSubmission"> | string
    url?: StringFilter<"UrlSubmission"> | string
    urlType?: StringFilter<"UrlSubmission"> | string
    entityId?: StringNullableFilter<"UrlSubmission"> | string | null
    locale?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitStatus?: EnumSubmissionStatusNullableFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitHttpStatus?: IntNullableFilter<"UrlSubmission"> | number | null
    googleSubmitResponseBody?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitResponseTime?: IntNullableFilter<"UrlSubmission"> | number | null
    googleSubmittedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingSubmitStatus?: EnumSubmissionStatusNullableFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    bingSubmitHttpStatus?: IntNullableFilter<"UrlSubmission"> | number | null
    bingSubmitResponseBody?: StringNullableFilter<"UrlSubmission"> | string | null
    bingSubmitResponseTime?: IntNullableFilter<"UrlSubmission"> | number | null
    bingSubmittedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    indexedByGoogle?: BoolNullableFilter<"UrlSubmission"> | boolean | null
    googleIndexedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    googleLastCheckAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    googleCheckMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    googleIndexStatusRaw?: JsonNullableFilter<"UrlSubmission">
    indexedByBing?: BoolNullableFilter<"UrlSubmission"> | boolean | null
    bingIndexedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingLastCheckAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingCheckMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    bingIndexStatusRaw?: JsonNullableFilter<"UrlSubmission">
    createdAt?: DateTimeFilter<"UrlSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"UrlSubmission"> | Date | string
  }

  export type UrlSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    urlType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    googleSubmitStatus?: SortOrderInput | SortOrder
    googleSubmitStatusMessage?: SortOrderInput | SortOrder
    googleSubmitHttpStatus?: SortOrderInput | SortOrder
    googleSubmitResponseBody?: SortOrderInput | SortOrder
    googleSubmitResponseTime?: SortOrderInput | SortOrder
    googleSubmittedAt?: SortOrderInput | SortOrder
    bingSubmitStatus?: SortOrderInput | SortOrder
    bingSubmitStatusMessage?: SortOrderInput | SortOrder
    bingSubmitHttpStatus?: SortOrderInput | SortOrder
    bingSubmitResponseBody?: SortOrderInput | SortOrder
    bingSubmitResponseTime?: SortOrderInput | SortOrder
    bingSubmittedAt?: SortOrderInput | SortOrder
    indexedByGoogle?: SortOrderInput | SortOrder
    googleIndexedAt?: SortOrderInput | SortOrder
    googleLastCheckAt?: SortOrderInput | SortOrder
    googleCheckMessage?: SortOrderInput | SortOrder
    googleIndexStatusRaw?: SortOrderInput | SortOrder
    indexedByBing?: SortOrderInput | SortOrder
    bingIndexedAt?: SortOrderInput | SortOrder
    bingLastCheckAt?: SortOrderInput | SortOrder
    bingCheckMessage?: SortOrderInput | SortOrder
    bingIndexStatusRaw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrlSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: UrlSubmissionWhereInput | UrlSubmissionWhereInput[]
    OR?: UrlSubmissionWhereInput[]
    NOT?: UrlSubmissionWhereInput | UrlSubmissionWhereInput[]
    urlType?: StringFilter<"UrlSubmission"> | string
    entityId?: StringNullableFilter<"UrlSubmission"> | string | null
    locale?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitStatus?: EnumSubmissionStatusNullableFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitHttpStatus?: IntNullableFilter<"UrlSubmission"> | number | null
    googleSubmitResponseBody?: StringNullableFilter<"UrlSubmission"> | string | null
    googleSubmitResponseTime?: IntNullableFilter<"UrlSubmission"> | number | null
    googleSubmittedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingSubmitStatus?: EnumSubmissionStatusNullableFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    bingSubmitHttpStatus?: IntNullableFilter<"UrlSubmission"> | number | null
    bingSubmitResponseBody?: StringNullableFilter<"UrlSubmission"> | string | null
    bingSubmitResponseTime?: IntNullableFilter<"UrlSubmission"> | number | null
    bingSubmittedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    indexedByGoogle?: BoolNullableFilter<"UrlSubmission"> | boolean | null
    googleIndexedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    googleLastCheckAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    googleCheckMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    googleIndexStatusRaw?: JsonNullableFilter<"UrlSubmission">
    indexedByBing?: BoolNullableFilter<"UrlSubmission"> | boolean | null
    bingIndexedAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingLastCheckAt?: DateTimeNullableFilter<"UrlSubmission"> | Date | string | null
    bingCheckMessage?: StringNullableFilter<"UrlSubmission"> | string | null
    bingIndexStatusRaw?: JsonNullableFilter<"UrlSubmission">
    createdAt?: DateTimeFilter<"UrlSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"UrlSubmission"> | Date | string
  }, "id" | "unique_url">

  export type UrlSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    urlType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    googleSubmitStatus?: SortOrderInput | SortOrder
    googleSubmitStatusMessage?: SortOrderInput | SortOrder
    googleSubmitHttpStatus?: SortOrderInput | SortOrder
    googleSubmitResponseBody?: SortOrderInput | SortOrder
    googleSubmitResponseTime?: SortOrderInput | SortOrder
    googleSubmittedAt?: SortOrderInput | SortOrder
    bingSubmitStatus?: SortOrderInput | SortOrder
    bingSubmitStatusMessage?: SortOrderInput | SortOrder
    bingSubmitHttpStatus?: SortOrderInput | SortOrder
    bingSubmitResponseBody?: SortOrderInput | SortOrder
    bingSubmitResponseTime?: SortOrderInput | SortOrder
    bingSubmittedAt?: SortOrderInput | SortOrder
    indexedByGoogle?: SortOrderInput | SortOrder
    googleIndexedAt?: SortOrderInput | SortOrder
    googleLastCheckAt?: SortOrderInput | SortOrder
    googleCheckMessage?: SortOrderInput | SortOrder
    googleIndexStatusRaw?: SortOrderInput | SortOrder
    indexedByBing?: SortOrderInput | SortOrder
    bingIndexedAt?: SortOrderInput | SortOrder
    bingLastCheckAt?: SortOrderInput | SortOrder
    bingCheckMessage?: SortOrderInput | SortOrder
    bingIndexStatusRaw?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UrlSubmissionCountOrderByAggregateInput
    _avg?: UrlSubmissionAvgOrderByAggregateInput
    _max?: UrlSubmissionMaxOrderByAggregateInput
    _min?: UrlSubmissionMinOrderByAggregateInput
    _sum?: UrlSubmissionSumOrderByAggregateInput
  }

  export type UrlSubmissionScalarWhereWithAggregatesInput = {
    AND?: UrlSubmissionScalarWhereWithAggregatesInput | UrlSubmissionScalarWhereWithAggregatesInput[]
    OR?: UrlSubmissionScalarWhereWithAggregatesInput[]
    NOT?: UrlSubmissionScalarWhereWithAggregatesInput | UrlSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UrlSubmission"> | string
    url?: StringWithAggregatesFilter<"UrlSubmission"> | string
    urlType?: StringWithAggregatesFilter<"UrlSubmission"> | string
    entityId?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    locale?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    googleSubmitStatus?: EnumSubmissionStatusNullableWithAggregatesFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    googleSubmitHttpStatus?: IntNullableWithAggregatesFilter<"UrlSubmission"> | number | null
    googleSubmitResponseBody?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    googleSubmitResponseTime?: IntNullableWithAggregatesFilter<"UrlSubmission"> | number | null
    googleSubmittedAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    bingSubmitStatus?: EnumSubmissionStatusNullableWithAggregatesFilter<"UrlSubmission"> | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    bingSubmitHttpStatus?: IntNullableWithAggregatesFilter<"UrlSubmission"> | number | null
    bingSubmitResponseBody?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    bingSubmitResponseTime?: IntNullableWithAggregatesFilter<"UrlSubmission"> | number | null
    bingSubmittedAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    indexedByGoogle?: BoolNullableWithAggregatesFilter<"UrlSubmission"> | boolean | null
    googleIndexedAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    googleLastCheckAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    googleCheckMessage?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    googleIndexStatusRaw?: JsonNullableWithAggregatesFilter<"UrlSubmission">
    indexedByBing?: BoolNullableWithAggregatesFilter<"UrlSubmission"> | boolean | null
    bingIndexedAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    bingLastCheckAt?: DateTimeNullableWithAggregatesFilter<"UrlSubmission"> | Date | string | null
    bingCheckMessage?: StringNullableWithAggregatesFilter<"UrlSubmission"> | string | null
    bingIndexStatusRaw?: JsonNullableWithAggregatesFilter<"UrlSubmission">
    createdAt?: DateTimeWithAggregatesFilter<"UrlSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UrlSubmission"> | Date | string
  }

  export type SubmissionBatchWhereInput = {
    AND?: SubmissionBatchWhereInput | SubmissionBatchWhereInput[]
    OR?: SubmissionBatchWhereInput[]
    NOT?: SubmissionBatchWhereInput | SubmissionBatchWhereInput[]
    id?: StringFilter<"SubmissionBatch"> | string
    name?: StringFilter<"SubmissionBatch"> | string
    description?: StringNullableFilter<"SubmissionBatch"> | string | null
    status?: EnumBatchStatusFilter<"SubmissionBatch"> | $Enums.BatchStatus
    totalUrls?: IntFilter<"SubmissionBatch"> | number
    processedUrls?: IntFilter<"SubmissionBatch"> | number
    successUrls?: IntFilter<"SubmissionBatch"> | number
    failedUrls?: IntFilter<"SubmissionBatch"> | number
    pendingUrls?: IntFilter<"SubmissionBatch"> | number
    searchEngineConfigIds?: StringNullableListFilter<"SubmissionBatch">
    urlFilters?: JsonNullableFilter<"SubmissionBatch">
    startedAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    errorMessage?: StringNullableFilter<"SubmissionBatch"> | string | null
    createdBy?: StringFilter<"SubmissionBatch"> | string
    createdAt?: DateTimeFilter<"SubmissionBatch"> | Date | string
    updatedAt?: DateTimeFilter<"SubmissionBatch"> | Date | string
  }

  export type SubmissionBatchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
    searchEngineConfigIds?: SortOrder
    urlFilters?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubmissionBatchWhereInput | SubmissionBatchWhereInput[]
    OR?: SubmissionBatchWhereInput[]
    NOT?: SubmissionBatchWhereInput | SubmissionBatchWhereInput[]
    name?: StringFilter<"SubmissionBatch"> | string
    description?: StringNullableFilter<"SubmissionBatch"> | string | null
    status?: EnumBatchStatusFilter<"SubmissionBatch"> | $Enums.BatchStatus
    totalUrls?: IntFilter<"SubmissionBatch"> | number
    processedUrls?: IntFilter<"SubmissionBatch"> | number
    successUrls?: IntFilter<"SubmissionBatch"> | number
    failedUrls?: IntFilter<"SubmissionBatch"> | number
    pendingUrls?: IntFilter<"SubmissionBatch"> | number
    searchEngineConfigIds?: StringNullableListFilter<"SubmissionBatch">
    urlFilters?: JsonNullableFilter<"SubmissionBatch">
    startedAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    cancelledAt?: DateTimeNullableFilter<"SubmissionBatch"> | Date | string | null
    errorMessage?: StringNullableFilter<"SubmissionBatch"> | string | null
    createdBy?: StringFilter<"SubmissionBatch"> | string
    createdAt?: DateTimeFilter<"SubmissionBatch"> | Date | string
    updatedAt?: DateTimeFilter<"SubmissionBatch"> | Date | string
  }, "id">

  export type SubmissionBatchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
    searchEngineConfigIds?: SortOrder
    urlFilters?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubmissionBatchCountOrderByAggregateInput
    _avg?: SubmissionBatchAvgOrderByAggregateInput
    _max?: SubmissionBatchMaxOrderByAggregateInput
    _min?: SubmissionBatchMinOrderByAggregateInput
    _sum?: SubmissionBatchSumOrderByAggregateInput
  }

  export type SubmissionBatchScalarWhereWithAggregatesInput = {
    AND?: SubmissionBatchScalarWhereWithAggregatesInput | SubmissionBatchScalarWhereWithAggregatesInput[]
    OR?: SubmissionBatchScalarWhereWithAggregatesInput[]
    NOT?: SubmissionBatchScalarWhereWithAggregatesInput | SubmissionBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubmissionBatch"> | string
    name?: StringWithAggregatesFilter<"SubmissionBatch"> | string
    description?: StringNullableWithAggregatesFilter<"SubmissionBatch"> | string | null
    status?: EnumBatchStatusWithAggregatesFilter<"SubmissionBatch"> | $Enums.BatchStatus
    totalUrls?: IntWithAggregatesFilter<"SubmissionBatch"> | number
    processedUrls?: IntWithAggregatesFilter<"SubmissionBatch"> | number
    successUrls?: IntWithAggregatesFilter<"SubmissionBatch"> | number
    failedUrls?: IntWithAggregatesFilter<"SubmissionBatch"> | number
    pendingUrls?: IntWithAggregatesFilter<"SubmissionBatch"> | number
    searchEngineConfigIds?: StringNullableListFilter<"SubmissionBatch">
    urlFilters?: JsonNullableWithAggregatesFilter<"SubmissionBatch">
    startedAt?: DateTimeNullableWithAggregatesFilter<"SubmissionBatch"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"SubmissionBatch"> | Date | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"SubmissionBatch"> | Date | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"SubmissionBatch"> | string | null
    createdBy?: StringWithAggregatesFilter<"SubmissionBatch"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SubmissionBatch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubmissionBatch"> | Date | string
  }

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

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    userId: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateManyInput = {
    id: string
    userId: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ImportPlatformCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    apiConfig: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    sortOrder?: number
    totalImported?: number
    lastImportAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportPlatformUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    apiConfig: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    sortOrder?: number
    totalImported?: number
    lastImportAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportPlatformUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    apiConfig?: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    lastImportAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportPlatformUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    apiConfig?: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    lastImportAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportPlatformCreateManyInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    apiConfig: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    sortOrder?: number
    totalImported?: number
    lastImportAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ImportPlatformUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    apiConfig?: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    lastImportAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportPlatformUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    apiConfig?: JsonNullValueInput | InputJsonValue
    defaultConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalImported?: IntFieldUpdateOperationsInput | number
    lastImportAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigCreateInput = {
    id?: string
    name: string
    provider: string
    apiKey: string
    baseUrl: string
    modelConfig: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUncheckedCreateInput = {
    id?: string
    name: string
    provider: string
    apiKey: string
    baseUrl: string
    modelConfig: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    modelConfig?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    modelConfig?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigCreateManyInput = {
    id?: string
    name: string
    provider: string
    apiKey: string
    baseUrl: string
    modelConfig: JsonNullValueInput | InputJsonValue
    isActive?: boolean
    isEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    modelConfig?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    apiKey?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    modelConfig?: JsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalApiConfigCreateInput = {
    id?: string
    name: string
    displayName: string
    description?: string | null
    provider: string
    apiConfig: JsonNullValueInput | InputJsonValue
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: number
    successCalls?: number
    failedCalls?: number
    lastUsedAt?: Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalApiConfigUncheckedCreateInput = {
    id?: string
    name: string
    displayName: string
    description?: string | null
    provider: string
    apiConfig: JsonNullValueInput | InputJsonValue
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: number
    successCalls?: number
    failedCalls?: number
    lastUsedAt?: Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalApiConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    apiConfig?: JsonNullValueInput | InputJsonValue
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalCalls?: IntFieldUpdateOperationsInput | number
    successCalls?: IntFieldUpdateOperationsInput | number
    failedCalls?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalApiConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    apiConfig?: JsonNullValueInput | InputJsonValue
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalCalls?: IntFieldUpdateOperationsInput | number
    successCalls?: IntFieldUpdateOperationsInput | number
    failedCalls?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalApiConfigCreateManyInput = {
    id?: string
    name: string
    displayName: string
    description?: string | null
    provider: string
    apiConfig: JsonNullValueInput | InputJsonValue
    isEncrypted?: boolean
    isEnabled?: boolean
    isActive?: boolean
    totalCalls?: number
    successCalls?: number
    failedCalls?: number
    lastUsedAt?: Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExternalApiConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    apiConfig?: JsonNullValueInput | InputJsonValue
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalCalls?: IntFieldUpdateOperationsInput | number
    successCalls?: IntFieldUpdateOperationsInput | number
    failedCalls?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExternalApiConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    apiConfig?: JsonNullValueInput | InputJsonValue
    isEncrypted?: BoolFieldUpdateOperationsInput | boolean
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalCalls?: IntFieldUpdateOperationsInput | number
    successCalls?: IntFieldUpdateOperationsInput | number
    failedCalls?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    quotaConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEngineConfigCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    description?: string | null
    apiEndpoint: string
    apiKey?: string | null
    apiToken?: string | null
    siteUrl?: string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: number
    totalSubmitted?: number
    totalSuccess?: number
    totalFailed?: number
    lastSubmitAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchEngineConfigUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    description?: string | null
    apiEndpoint: string
    apiKey?: string | null
    apiToken?: string | null
    siteUrl?: string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: number
    totalSubmitted?: number
    totalSuccess?: number
    totalFailed?: number
    lastSubmitAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchEngineConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    apiEndpoint?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiToken?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSubmit?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalSubmitted?: IntFieldUpdateOperationsInput | number
    totalSuccess?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastSubmitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEngineConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    apiEndpoint?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiToken?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSubmit?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalSubmitted?: IntFieldUpdateOperationsInput | number
    totalSuccess?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastSubmitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEngineConfigCreateManyInput = {
    id?: string
    name: string
    slug: string
    type: string
    icon?: string | null
    description?: string | null
    apiEndpoint: string
    apiKey?: string | null
    apiToken?: string | null
    siteUrl?: string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: boolean
    autoSubmit?: boolean
    sortOrder?: number
    totalSubmitted?: number
    totalSuccess?: number
    totalFailed?: number
    lastSubmitAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SearchEngineConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    apiEndpoint?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiToken?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSubmit?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalSubmitted?: IntFieldUpdateOperationsInput | number
    totalSuccess?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastSubmitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEngineConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    apiEndpoint?: StringFieldUpdateOperationsInput | string
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null
    apiToken?: NullableStringFieldUpdateOperationsInput | string | null
    siteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    extraConfig?: NullableJsonNullValueInput | InputJsonValue
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSubmit?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    totalSubmitted?: IntFieldUpdateOperationsInput | number
    totalSuccess?: IntFieldUpdateOperationsInput | number
    totalFailed?: IntFieldUpdateOperationsInput | number
    lastSubmitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrlSubmissionCreateInput = {
    id?: string
    url: string
    urlType: string
    entityId?: string | null
    locale?: string | null
    googleSubmitStatus?: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: string | null
    googleSubmitHttpStatus?: number | null
    googleSubmitResponseBody?: string | null
    googleSubmitResponseTime?: number | null
    googleSubmittedAt?: Date | string | null
    bingSubmitStatus?: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: string | null
    bingSubmitHttpStatus?: number | null
    bingSubmitResponseBody?: string | null
    bingSubmitResponseTime?: number | null
    bingSubmittedAt?: Date | string | null
    indexedByGoogle?: boolean | null
    googleIndexedAt?: Date | string | null
    googleLastCheckAt?: Date | string | null
    googleCheckMessage?: string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: boolean | null
    bingIndexedAt?: Date | string | null
    bingLastCheckAt?: Date | string | null
    bingCheckMessage?: string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrlSubmissionUncheckedCreateInput = {
    id?: string
    url: string
    urlType: string
    entityId?: string | null
    locale?: string | null
    googleSubmitStatus?: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: string | null
    googleSubmitHttpStatus?: number | null
    googleSubmitResponseBody?: string | null
    googleSubmitResponseTime?: number | null
    googleSubmittedAt?: Date | string | null
    bingSubmitStatus?: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: string | null
    bingSubmitHttpStatus?: number | null
    bingSubmitResponseBody?: string | null
    bingSubmitResponseTime?: number | null
    bingSubmittedAt?: Date | string | null
    indexedByGoogle?: boolean | null
    googleIndexedAt?: Date | string | null
    googleLastCheckAt?: Date | string | null
    googleCheckMessage?: string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: boolean | null
    bingIndexedAt?: Date | string | null
    bingLastCheckAt?: Date | string | null
    bingCheckMessage?: string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrlSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    indexedByGoogle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    googleIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bingIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrlSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    indexedByGoogle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    googleIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bingIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrlSubmissionCreateManyInput = {
    id?: string
    url: string
    urlType: string
    entityId?: string | null
    locale?: string | null
    googleSubmitStatus?: $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: string | null
    googleSubmitHttpStatus?: number | null
    googleSubmitResponseBody?: string | null
    googleSubmitResponseTime?: number | null
    googleSubmittedAt?: Date | string | null
    bingSubmitStatus?: $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: string | null
    bingSubmitHttpStatus?: number | null
    bingSubmitResponseBody?: string | null
    bingSubmitResponseTime?: number | null
    bingSubmittedAt?: Date | string | null
    indexedByGoogle?: boolean | null
    googleIndexedAt?: Date | string | null
    googleLastCheckAt?: Date | string | null
    googleCheckMessage?: string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: boolean | null
    bingIndexedAt?: Date | string | null
    bingLastCheckAt?: Date | string | null
    bingCheckMessage?: string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UrlSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    indexedByGoogle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    googleIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bingIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UrlSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    urlType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    googleSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    googleSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    googleSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingSubmitStatus?: NullableEnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus | null
    bingSubmitStatusMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitHttpStatus?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmitResponseBody?: NullableStringFieldUpdateOperationsInput | string | null
    bingSubmitResponseTime?: NullableIntFieldUpdateOperationsInput | number | null
    bingSubmittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    indexedByGoogle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    googleIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    googleCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    googleIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    indexedByBing?: NullableBoolFieldUpdateOperationsInput | boolean | null
    bingIndexedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingLastCheckAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bingCheckMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bingIndexStatusRaw?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionBatchCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BatchStatus
    totalUrls?: number
    processedUrls?: number
    successUrls?: number
    failedUrls?: number
    pendingUrls?: number
    searchEngineConfigIds?: SubmissionBatchCreatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    errorMessage?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionBatchUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BatchStatus
    totalUrls?: number
    processedUrls?: number
    successUrls?: number
    failedUrls?: number
    pendingUrls?: number
    searchEngineConfigIds?: SubmissionBatchCreatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    errorMessage?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionBatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    totalUrls?: IntFieldUpdateOperationsInput | number
    processedUrls?: IntFieldUpdateOperationsInput | number
    successUrls?: IntFieldUpdateOperationsInput | number
    failedUrls?: IntFieldUpdateOperationsInput | number
    pendingUrls?: IntFieldUpdateOperationsInput | number
    searchEngineConfigIds?: SubmissionBatchUpdatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionBatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    totalUrls?: IntFieldUpdateOperationsInput | number
    processedUrls?: IntFieldUpdateOperationsInput | number
    successUrls?: IntFieldUpdateOperationsInput | number
    failedUrls?: IntFieldUpdateOperationsInput | number
    pendingUrls?: IntFieldUpdateOperationsInput | number
    searchEngineConfigIds?: SubmissionBatchUpdatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionBatchCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.BatchStatus
    totalUrls?: number
    processedUrls?: number
    successUrls?: number
    failedUrls?: number
    pendingUrls?: number
    searchEngineConfigIds?: SubmissionBatchCreatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    cancelledAt?: Date | string | null
    errorMessage?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionBatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    totalUrls?: IntFieldUpdateOperationsInput | number
    processedUrls?: IntFieldUpdateOperationsInput | number
    successUrls?: IntFieldUpdateOperationsInput | number
    failedUrls?: IntFieldUpdateOperationsInput | number
    pendingUrls?: IntFieldUpdateOperationsInput | number
    searchEngineConfigIds?: SubmissionBatchUpdatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionBatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    totalUrls?: IntFieldUpdateOperationsInput | number
    processedUrls?: IntFieldUpdateOperationsInput | number
    successUrls?: IntFieldUpdateOperationsInput | number
    failedUrls?: IntFieldUpdateOperationsInput | number
    pendingUrls?: IntFieldUpdateOperationsInput | number
    searchEngineConfigIds?: SubmissionBatchUpdatesearchEngineConfigIdsInput | string[]
    urlFilters?: NullableJsonNullValueInput | InputJsonValue
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type ImportPlatformCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    apiConfig?: SortOrder
    defaultConfig?: SortOrder
    isEnabled?: SortOrder
    sortOrder?: SortOrder
    totalImported?: SortOrder
    lastImportAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportPlatformAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
    totalImported?: SortOrder
  }

  export type ImportPlatformMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    isEnabled?: SortOrder
    sortOrder?: SortOrder
    totalImported?: SortOrder
    lastImportAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportPlatformMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    isEnabled?: SortOrder
    sortOrder?: SortOrder
    totalImported?: SortOrder
    lastImportAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportPlatformSumOrderByAggregateInput = {
    sortOrder?: SortOrder
    totalImported?: SortOrder
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

  export type AiConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    modelConfig?: SortOrder
    isActive?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    apiKey?: SortOrder
    baseUrl?: SortOrder
    isActive?: SortOrder
    isEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalApiConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    provider?: SortOrder
    apiConfig?: SortOrder
    isEncrypted?: SortOrder
    isEnabled?: SortOrder
    isActive?: SortOrder
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
    lastUsedAt?: SortOrder
    quotaConfig?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalApiConfigAvgOrderByAggregateInput = {
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
  }

  export type ExternalApiConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    provider?: SortOrder
    isEncrypted?: SortOrder
    isEnabled?: SortOrder
    isActive?: SortOrder
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalApiConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    provider?: SortOrder
    isEncrypted?: SortOrder
    isEnabled?: SortOrder
    isActive?: SortOrder
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExternalApiConfigSumOrderByAggregateInput = {
    totalCalls?: SortOrder
    successCalls?: SortOrder
    failedCalls?: SortOrder
  }

  export type SearchEngineConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    apiEndpoint?: SortOrder
    apiKey?: SortOrder
    apiToken?: SortOrder
    siteUrl?: SortOrder
    extraConfig?: SortOrder
    isEnabled?: SortOrder
    autoSubmit?: SortOrder
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
    lastSubmitAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchEngineConfigAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
  }

  export type SearchEngineConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    apiEndpoint?: SortOrder
    apiKey?: SortOrder
    apiToken?: SortOrder
    siteUrl?: SortOrder
    isEnabled?: SortOrder
    autoSubmit?: SortOrder
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
    lastSubmitAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchEngineConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    apiEndpoint?: SortOrder
    apiKey?: SortOrder
    apiToken?: SortOrder
    siteUrl?: SortOrder
    isEnabled?: SortOrder
    autoSubmit?: SortOrder
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
    lastSubmitAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SearchEngineConfigSumOrderByAggregateInput = {
    sortOrder?: SortOrder
    totalSubmitted?: SortOrder
    totalSuccess?: SortOrder
    totalFailed?: SortOrder
  }

  export type EnumSubmissionStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel> | $Enums.SubmissionStatus | null
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

  export type UrlSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    urlType?: SortOrder
    entityId?: SortOrder
    locale?: SortOrder
    googleSubmitStatus?: SortOrder
    googleSubmitStatusMessage?: SortOrder
    googleSubmitHttpStatus?: SortOrder
    googleSubmitResponseBody?: SortOrder
    googleSubmitResponseTime?: SortOrder
    googleSubmittedAt?: SortOrder
    bingSubmitStatus?: SortOrder
    bingSubmitStatusMessage?: SortOrder
    bingSubmitHttpStatus?: SortOrder
    bingSubmitResponseBody?: SortOrder
    bingSubmitResponseTime?: SortOrder
    bingSubmittedAt?: SortOrder
    indexedByGoogle?: SortOrder
    googleIndexedAt?: SortOrder
    googleLastCheckAt?: SortOrder
    googleCheckMessage?: SortOrder
    googleIndexStatusRaw?: SortOrder
    indexedByBing?: SortOrder
    bingIndexedAt?: SortOrder
    bingLastCheckAt?: SortOrder
    bingCheckMessage?: SortOrder
    bingIndexStatusRaw?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrlSubmissionAvgOrderByAggregateInput = {
    googleSubmitHttpStatus?: SortOrder
    googleSubmitResponseTime?: SortOrder
    bingSubmitHttpStatus?: SortOrder
    bingSubmitResponseTime?: SortOrder
  }

  export type UrlSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    urlType?: SortOrder
    entityId?: SortOrder
    locale?: SortOrder
    googleSubmitStatus?: SortOrder
    googleSubmitStatusMessage?: SortOrder
    googleSubmitHttpStatus?: SortOrder
    googleSubmitResponseBody?: SortOrder
    googleSubmitResponseTime?: SortOrder
    googleSubmittedAt?: SortOrder
    bingSubmitStatus?: SortOrder
    bingSubmitStatusMessage?: SortOrder
    bingSubmitHttpStatus?: SortOrder
    bingSubmitResponseBody?: SortOrder
    bingSubmitResponseTime?: SortOrder
    bingSubmittedAt?: SortOrder
    indexedByGoogle?: SortOrder
    googleIndexedAt?: SortOrder
    googleLastCheckAt?: SortOrder
    googleCheckMessage?: SortOrder
    indexedByBing?: SortOrder
    bingIndexedAt?: SortOrder
    bingLastCheckAt?: SortOrder
    bingCheckMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrlSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    urlType?: SortOrder
    entityId?: SortOrder
    locale?: SortOrder
    googleSubmitStatus?: SortOrder
    googleSubmitStatusMessage?: SortOrder
    googleSubmitHttpStatus?: SortOrder
    googleSubmitResponseBody?: SortOrder
    googleSubmitResponseTime?: SortOrder
    googleSubmittedAt?: SortOrder
    bingSubmitStatus?: SortOrder
    bingSubmitStatusMessage?: SortOrder
    bingSubmitHttpStatus?: SortOrder
    bingSubmitResponseBody?: SortOrder
    bingSubmitResponseTime?: SortOrder
    bingSubmittedAt?: SortOrder
    indexedByGoogle?: SortOrder
    googleIndexedAt?: SortOrder
    googleLastCheckAt?: SortOrder
    googleCheckMessage?: SortOrder
    indexedByBing?: SortOrder
    bingIndexedAt?: SortOrder
    bingLastCheckAt?: SortOrder
    bingCheckMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UrlSubmissionSumOrderByAggregateInput = {
    googleSubmitHttpStatus?: SortOrder
    googleSubmitResponseTime?: SortOrder
    bingSubmitHttpStatus?: SortOrder
    bingSubmitResponseTime?: SortOrder
  }

  export type EnumSubmissionStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel>
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

  export type EnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SubmissionBatchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
    searchEngineConfigIds?: SortOrder
    urlFilters?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    errorMessage?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionBatchAvgOrderByAggregateInput = {
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
  }

  export type SubmissionBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    errorMessage?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionBatchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    cancelledAt?: SortOrder
    errorMessage?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionBatchSumOrderByAggregateInput = {
    totalUrls?: SortOrder
    processedUrls?: SortOrder
    successUrls?: SortOrder
    failedUrls?: SortOrder
    pendingUrls?: SortOrder
  }

  export type EnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
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

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
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

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumSubmissionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionStatus | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubmissionBatchCreatesearchEngineConfigIdsInput = {
    set: string[]
  }

  export type EnumBatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.BatchStatus
  }

  export type SubmissionBatchUpdatesearchEngineConfigIdsInput = {
    set?: string[]
    push?: string | string[]
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

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GamePixGameCacheUpdatecustomTagsInput = {
    set?: string[]
    push?: string | string[]
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedEnumSubmissionStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel> | $Enums.SubmissionStatus | null
  }

  export type NestedEnumSubmissionStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubmissionStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusNullableFilter<$PrismaModel>
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

  export type NestedEnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
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

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    name?: string | null
    emailVerified?: boolean | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    role?: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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