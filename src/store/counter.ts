import { defineStore } from "pinia";

const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  actions: {
    changeCounter(newCounter: number) {
      this.counter = newCounter;
    }
  }
});

export default useCounterStore;
