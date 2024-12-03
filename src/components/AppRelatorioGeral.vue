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
import axios from "axios";
import BarChart from "components/BarChart.vue";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      chartData1: {
        columns: [],
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
        columns: [],
      },
      chartData2: {
        columns: [],
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
        columns: [],
      },
    };
  },
  mounted() {
    this.fetchChartData1();
    this.fetchChartData2();
  },
  methods: {
    async fetchChartData1() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/relatorio/chart1"
        );
        this.chartData1.columns = response.data.columns;
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico 1:", error);
      }
    },
    async fetchChartData2() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/relatorio/chart2"
        );
        this.chartData2.columns = response.data.columns;
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico 2:", error);
      }
    },
  },
};
</script>

<style>
/* Adicione estilos globais, se necessário */
</style>
