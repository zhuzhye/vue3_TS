<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script setup lang="ts">
import httpRequest from "@/service";
httpRequest
  .get({
    url: "api/user"
  })
  .then((res) => {
    console.log(res);
  });
</script>

<style lang="less" scoped>
.home {
  color: red;
}
</style>
