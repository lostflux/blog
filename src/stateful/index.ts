
import { ReactiveEffect } from 'nuxt/dist/app/compat/vue-demi';
import { 
  readonly, ref, reactive,
  onMounted, onUnmounted, watch, Ref
} from 'vue';


class MyRef<T = any> {
  _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value() {
    const val = this._value;
    return val;
  }
  
  set value(newValue: T) {
    this._value = newValue;
  }

  public current = this.value;
}
/**
 * 
 * @param `initialState` the starting value of the state
 * @returns `[state, setState]`
 * 
 *  - `state`: the current value of the state
 *  - `setState`: a function to update the state
 */
export function useState<T = any>(initialState: T): [T, ((newState: T) => void)] {

  // create state and insert initial state
  const state = ref<T>();
  state.value = initialState;

  // set state func
  const setState = (newState: T) => {
    state.value = newState;
  };

  const value = state.value;
  
  return  [ value, setState ];
}

// use reference
export function useRef<T = any>(reference: T): Ref<T> {
  
  // create state and insert reference
  const state = ref<T>();
  state.value = reference;
  return state;
}


type EffectCallback = () => void | (() => void);
type Dependency = Ref | ReactiveEffect | (() => void);
type DependencyList = Dependency[];

/**
 * (alias) function useEffect(effect: EffectCallback, deps?: DependencyList): void
 * import useEffect
 * Accepts a function that contains imperative, possibly effectful code.
 * @param effect — Imperative function that can return a cleanup function
 * @param deps — If present, effect will only activate if the values in the list change.
 */
export function useEffect(effect: EffectCallback, deps?: Dependency | DependencyList): void {
  // if no deps, run effect on every render
  if (!deps) {
    effect();
    return;
  }

  // else, run effects on mount and when deps change
  onMounted(effect);
  watch(deps, effect);
}
