# Type Error when trying to convert from Redux store to observable using RxJS.from

## RESOLVED

### Cause

This is a type definition of Redux issue and already fixed at GitHub master brunch.
**But the fixed version hasn't been published to npm yet.**
The changes would be published at next version after currently v4.0.4

### Currently solution

1. Copy `./node_modules/reduce-reducers/index.d.ts` to project
2. Fix first argment type of `subscribe` method in `Observable` type to `unknown` from `Observer<T>`
    it is [line 148](https://github.com/reduxjs/redux/blob/8aca937f695997e979bf8c0e03dbf22a2bf284dc/index.d.ts#L148) if v4.0.4
    ```diff
    -subscribe: (observer: Observer<T>) => { unsubscribe: Unsubscribe }
    +subscribe: (observer: unknown) => { unsubscribe: Unsubscribe }
    ```

### The issue I posted

reduxjs/redux#3586

## Code

```ts
import { createStore } from 'redux'
import { from } from 'rxjs'

const store = createStore(state => state)

const state$ = from(store)
```

## Error

```
$ tsc -p tsconfig.json
index.ts:6:21 - error TS2345: Argument of type 'Store<unknown, Action<any>>' is not assignable to parameter of type 'ObservableInput<any>'.
  Type 'Store<unknown, Action<any>>' is not assignable to type 'Subscribable<any>'.
    Types of property 'subscribe' are incompatible.
      Type '(listener: () => void) => Unsubscribe' is not assignable to type '{ (observer?: PartialObserver<any>): Unsubscribable; (next: null, error: null, complete: () => void): Unsubscribable; (next: null, error: (error: any) => void, complete?: () => void): Unsubscribable; (next: (value: any) => void, error: null, complete:
() => void): Unsubscribable; (next?: (value: any) => void, error?...'.
        Types of parameters 'listener' and 'observer' are incompatible.
          Type 'PartialObserver<any>' is not assignable to type '() => void'.
            Type 'NextObserver<any>' is not assignable to type '() => void'.
              Type 'NextObserver<any>' provides no match for the signature '(): void'.

6 const state$ = from(store)
                      ~~~~~


Found 1 error.
```

## Versions

```
redux: 4.0.4
rxjs: 6.5.3
typescript: 3.6.4
```

## Procedure for reproducing

1. Clone this repo: `git clone https://github.com/yuta0801/rxjs-redux-typeerror.git`
2. Install dependencies: `yarn`
3. Built TypeScript code: `yarn test` (`tsc -p tsconfig.json`)

## Online demo

https://codesandbox.io/s/github/yuta0801/redux-rxjs-from-typeerror
