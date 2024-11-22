<template>
  <div>
    <div :id="chartId"></div>
  </div>
</template>

<script>
import bb from "billboard.js";
import "billboard.js/dist/billboard.css";

export default {
  name: "BarChart",
  props: {
    chartId: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    loadAfter: {
      type: Number,
      default: 1000,
    },
    additionalData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chart = bb.generate({
        data: this.chartData,
        bindto: `#${this.chartId}`,
        ...this.chartOptions,
      });

      if (this.additionalData) {
        setTimeout(() => {
          this.chart.load(this.additionalData);
        }, this.loadAfter);
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos específicos para o gráfico aqui, se necessário */
</style>