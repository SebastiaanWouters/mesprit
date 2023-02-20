<template>
  <div>
    <MainLayout>
      <ArticleComponent :id="params.id"></ArticleComponent>
    </MainLayout>
  </div>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'
const { params } = useRoute()

</script>

<style lang="scss" scoped>

</style>
