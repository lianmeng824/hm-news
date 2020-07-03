<template>
<div class="hm-navbar" @click="clickFn">
    <div class="titel"><slot></slot></div>
    <div class="content"><slot name="content"></slot> </div>
    <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
    </div>
</div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
    height: 50px;
    border-bottom: 2px solid #ccc;
    margin-left: 10px;
    display: flex;
    font-size: 16px;
    align-items: center;
    .titel {
        flex: 1;
    }
    .content {
        color: #999;
    }
    .arrow {
        padding: 0 20px;
    }
}
</style>
