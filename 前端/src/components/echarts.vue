<template>
  <div ref="myEcharts" :style="{width: '300px', height: '300px'}">
  </div>
</template>

<script>
export default {
  name:'',
  components: {
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.myEcharts)
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  },
  mounted() {
    this.drawLine()
  },
}
</script>
<style  scoped>

</style>