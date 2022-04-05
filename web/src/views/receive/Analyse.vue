<template>
<div v-loading="pageLoading">
    <div class="card_wrap" >
      <div id="outInEcharts" class="c_item"></div>
      <div id="subscriptionEchart" class="c_item"></div>
    </div>
    <div id="priceEchart"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { analyseApply } from "@/api/book/operate";
const echarts = require("echarts");
const pageLoading = ref(true);
const Model = reactive({
  storeModel: [],
  applyModel: []
});


const outInEcharts = () => {
  let myChart = echarts.init(document.getElementById("outInEcharts"), 'dark');
  let Out=0,In=0;
  Model.applyModel.filter((item)=> {
    if(item.apply ==3){
      In++;
      return item;
    }
    if(item.apply ==4){
      Out++;
      return item;
    }
  })

  let option = {
    title: {
      text: "出入库",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: [
          { value: In, name: "入库" },
          { value: Out, name: "出库" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
};
const subscriptionEchart = () => {
  let myChart = echarts.init(document.getElementById("subscriptionEchart"), 'dark');
  let applying=0,pass=0,reject=0;
  Model.applyModel.forEach((item)=> {
    if(item.apply == 1){ applying++ }
    if(item.apply == 2){ reject++ }
    if(item.apply == 3){ pass++ }
  })

  let option = {
    title: {
      text: "征订记录",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: [
          { value: pass, name: "通过" },
          { value: applying, name: "申请中" },
          { value: reject, name: "拒绝" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
};
const priceEchart = () => {
  let myChart = echarts.init(document.getElementById("priceEchart"), 'dark');

  let A=0,B=0,C=0,D=0,E=0,F=0,G=0;
  Model.storeModel.forEach((item)=> {
    if(Number(item.price)>150){
      G++;
    }
    else if(Number(item.price)>=125){
      F++
    }
    else if(Number(item.price)>=100){
      E++
    }
    else if(Number(item.price)>=75){
      D++
    }
    else if(Number(item.price)>=50){
      C++
    }
    else if(Number(item.price)>=25){
      B++
    }else{
      A++
    }
    
  })

  let option = {
    title: {
      text: "教材价格统计",
      left: "center"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      type: 'category',
      data: ['<25￥', '25~50￥', '50~75￥', '75~100￥', '100~125￥', '125~150￥', '150￥<'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '总量',
        data: [A, B, C, D, E, F, G],
        type: 'bar',
        barWidth: '40%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
};



onMounted( async () => {
 await analyseApply().then(res => {
    Model.storeModel = res.data.store;
    Model.applyModel = res.data.apply;
  });
  outInEcharts();
  subscriptionEchart();
  priceEchart();
  pageLoading.value = false;
});
</script>
<style scoped>
.card_wrap {
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  /* background-color: #080C4C; */
}
.c_item {
  flex: 1;
  height: 40vh;
  margin: 0 5px 5px 0;
  width: calc((100% - 10px) / 2);
  min-width: calc((100% - 10px) / 2);
  max-width: calc((100% - 10px) / 2);
}
.c_item :nth-child(3n) { 
    margin-right: 0;
  }
#priceEchart {
  width: 98%;
  height: 40vh;
}
</style>
