<template>
  <div>main:{{ counterStore.counter }}---{{ counterStore.doubleCounter }}</div>
  <button @click="changeCounter">修改counter</button>
</template>

<script setup lang="ts">
import useCounterStore from "@/store/counter";
const counterStore = useCounterStore();
function changeCounter() {
  counterStore.changeCounter(999);
}
</script>

<style lang="scss" scoped></style>
