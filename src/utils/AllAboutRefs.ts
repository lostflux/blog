import { Ref } from "nuxt/dist/app/compat/vue-demi";

/**
 * Manage the state of a number ref in a clean way.
 * 
 * Supports, setting, incrementing, decrementing, and resetting.
 * 
 * Access the raw ref through the `ref` property.
 */
class NumRefManager {
  ref: Ref<number>;
  max: number;
  min: number = 0;

  constructor(max?: number, min?: number) {
    this.ref = ref(0);
    this.max = max || 0;
    this.min = min || 0;
  }

  public set value(index: number) {
    this.ref.value = index % this.max;
  }

  public get value() {
    return this.ref.value;
  }

  public next = () => {
    const val = this.ref.value + 1;
    this.ref.value = val > this.max ? this.min : val;
  }

  public prev = () => {
    const val = this.ref.value - 1;
    this.ref.value = val < this.min ? this.max : val;
  }
}

export {
  NumRefManager
}
