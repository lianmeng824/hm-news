<template>
  <div class="hm-herder">
   <div class="back">
       <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
   </div>
   <div class="titel"><slot></slot></div>
   <div class="extra"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.hm-herder{
    height: 40px;
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 40px;
    .back,
    .extra {
        width: 40px;
        text-align: center;
    }
    .titel {
        flex:1;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
    }
}
</style>
