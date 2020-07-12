<template>
  <div class="app">
    <keep-alive>
      <router-view include="home"></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style></style>
