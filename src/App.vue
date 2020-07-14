<template>
  <div class="app">
    <keep-alive include="home">
      <router-view ></router-view>
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
