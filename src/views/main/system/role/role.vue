<template>
  <div>
    <PageSearch :searchConfig="roleConfig"></PageSearch>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search/page-search.vue";
import roleConfig from "./config/role.config";
</script>

<style scoped></style>
