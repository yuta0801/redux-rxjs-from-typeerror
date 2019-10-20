# Type Error when trying to convert from Redux store to observable using RxJS.from

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

# Versions

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
