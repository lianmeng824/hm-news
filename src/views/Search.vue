<template>
  <div class="search">
    <div class="title">
      <div class="left">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="text" placeholder="请输入搜索的文字" />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right">搜索</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.search {
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .left {
      margin-right: 10px;
    }
    .center {
      flex: 1;
      width: 258px;
      position: relative;
      margin-top: -2px;
      input {
        width: 100%;
        height: 30px;
        border-radius: 15px;
        border: none;
        border: 1px solid #ccc;
        font-size: 14px;
        padding-left: 30px;
      }
      span {
        position: absolute;
        top: 17px;
        left: 10px;
      }
    }
    .right {
      margin-left: 10px;
      font-size: 16px;
      line-height: 50px;
    }
  }
}
</style>
