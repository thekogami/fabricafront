<template>
  <div>
    <BarChart
      chartId="barChart1"
      :chartData="chartData1"
      :chartOptions="chartOptions1"
      :additionalData="additionalData1"
    />
    <BarChart
      chartId="barChart2"
      :chartData="chartData2"
      :chartOptions="chartOptions2"
      :additionalData="additionalData2"
    />
  </div>
</template>

<script>
import BarChart from "components/BarChart.vue";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      chartData1: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 130, 100, 140, 200, 150, 50],
        ],
        type: "bar",
      },
      chartOptions1: {
        bar: {
          width: {
            ratio: 0.5,
          },
        },
      },
      additionalData1: {
        columns: [["data3", 130, -150, 200, 300, -200, 100]],
      },
      chartData2: {
        columns: [
          ["data1", -100, 100, 200, [-100, 0], [0, 100], [100, 200]],
          ["data2", 100, 300, 500, [0, 100], [100, 300], [200, 500]],
        ],
        type: "bar",
      },
      chartOptions2: {
        bar: {
          width: {
            ratio: 0.5,
          },
        },
      },
      additionalData2: {
        columns: [["data3", 200, 500, 800, [100, 200], [300, 500], [500, 800]]],
      },
    };
  },
};
</script>

<style>
/* Adicione estilos globais, se necessário */
</style>
