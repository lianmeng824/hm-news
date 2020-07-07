<template>
  <div class="hm-header-parent">
    <div class="hm-herder">
        <div class="back">
            <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
        </div>
        <div class="titel"><slot></slot></div>
        <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.hm-header-parent {
    height: 40px;
    .hm-herder{
        background-color: #f5f5f5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
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

}

</style>
