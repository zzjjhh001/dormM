/**
* 分页组件
*/ 
<template>
  <el-pagination class="page-box" @size-change="handleSizeChange" 
  @current-change="handleCurrentChange" background :current-page="childMsg.currentPage" 
  :page-sizes="[6, 12, 18, 24]" :page-size="childMsg.pageSize" 
  layout="total, sizes, prev, pager, next, jumper" :total="childMsg.total">
  </el-pagination>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['childMsg'],
  data() {
    return {
      pageparm: {
        currentPage: this.childMsg.currentPage,
        pageSize: this.childMsg.pageSize,
      }
    }
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      console.log("size-change触发了")
      this.pageparm.pageSize = val
      this.$emit('callFather', this.pageparm)
    },
    handleCurrentChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      
      console.log(val)
      console.log("current-change触发了")
      this.pageparm.currentPage = val
      this.$emit('callFather', this.pageparm)
    }
  }
}
</script>

<style>
.page-box {
  margin: 10px auto;
}
</style>