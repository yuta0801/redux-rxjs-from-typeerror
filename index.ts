import { createStore } from 'redux'
import { from } from 'rxjs'

const store = createStore(state => state)

const state$ = from(store)
