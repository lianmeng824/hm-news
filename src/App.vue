<template>
  <div class="app">根组件
    <van-button type="primary">主要按钮</van-button>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    <div class="fa"></div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style>
.fa {
  width:300px;
  height: 300px;
  font-size: 20px;
  background-color: rgb(200, 243, 200);
}
</style>
