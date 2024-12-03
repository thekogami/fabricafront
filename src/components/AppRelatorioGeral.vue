<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      chartData: {
        columns: [],
        type: "bar",
      },
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get("http://localhost:8080/api/relatorio/chart");
        this.chartData.columns = response.data.columns;
        this.renderChart();
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    },
    renderChart() {
      const chart = document.getElementById("chart");
      const data = this.chartData.columns;
      const labels = data.map(item => item[0]);
      const values = data.map(item => item[1]);

      const canvas = document.createElement("canvas");
      chart.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Chamados',
            data: values,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style>
/* Adicione estilos globais, se necessário */
</style>
