<template>
  <div class="gunali">
      <hm-header>栏目管理</hm-header>
        <h3>点击删除以下频道（至少保留4个）</h3>
        <div class="list">
            <div class="item" @click="del(index)" v-for="(item, index) in active" :key="item.id">{{item.name}}</div>
        </div>

        <h3>点击增加以下频道</h3>
        <div class="list">
            <div @click="add(index)" class="item" v-for="(item, index) in deactive" :key="item.id">{{item.name}}</div>
        </div>
  </div>
</template>

<script>
export default {
  async created() {
    // 先从本地获取，如果本地有数据，直接使用本地的数据
    const active = JSON.parse(localStorage.getItem('active')) // 转数组
    const deactive = JSON.parse(localStorage.getItem('deactive'))
    if (active) {
      this.active = active
      this.deactive = deactive
      return
    }
    // 获取所有的栏目数据
    const res = await this.$axios.get('/category')
    console.log(res.data)

    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.active = data
    }
  },
  data() {
    return {
      active: [],
      deactive: []
    }
  },
  methods: {
    del(index) {
      if (this.active.length <= 4) {
        return this.$toast('不能少于4个')
      }

      this.deactive.push(this.active[index]) // 要先添加 才能再删除 否则下标会变
      this.active.splice(index, 1)
    },
    add(index) {
      this.active.push(this.deactive[index])
      this.deactive.splice(index, 1)
    }
  },
  watch: {
    active: {
      deep: true,
      handler() { // JSON.stringify(this.deactive)转字符串
        localStorage.setItem('active', JSON.stringify(this.active))
        localStorage.setItem('deactive', JSON.stringify(this.deactive))
      }
    }
  }

}
</script>

<style lang="less" scoped>
.gunali {
    margin: 10px;
    h3 {
        font-size: 20px;
        color: #999;
    }
    .list {
        padding-bottom: 15px;
        //清除浮动
        overflow: hidden;
        .item {
            float: left;
            width: 75px;
            height: 30px;
            font-size: 18px;
            background-color: #ddd;
            line-height: 30px;
            text-align: center;
            margin: 5px;
        }
    }
}
</style>
