<template>
  <div class="assistencia q-pa-md">
    <q-page>
      <!-- Filtros de Resumo -->
      <div class="filtros-resumo q-mb-md">
        <q-btn
          flat
          :color="filterColor('todos')"
          class="filtro"
          @click="filterChamados('todos')"
        >
          <div class="q-mb-xs text-h6">{{ requisicoes.length }}</div>
          <div>Todos</div>
        </q-btn>
        <q-btn
          flat
          :color="filterColor('Aberto')"
          class="filtro"
          @click="filterChamados('Aberto')"
        >
          <div class="q-mb-xs text-h6">{{ countStatus("Aberto") }}</div>
          <div>Chamados Novos</div>
        </q-btn>
        <q-btn
          flat
          :color="filterColor('Em andamento')"
          class="filtro"
          @click="filterChamados('Em andamento')"
        >
          <div class="q-mb-xs text-h6">{{ countStatus("Em andamento") }}</div>
          <div>Chamados Andamento</div>
        </q-btn>
        <q-btn
          flat
          :color="filterColor('Resolvido')"
          class="filtro"
          @click="filterChamados('Resolvido')"
        >
          <div class="q-mb-xs text-h6">{{ countStatus("Resolvido") }}</div>
          <div>Chamados Resolvidos</div>
        </q-btn>
      </div>

      <!-- Tabela -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Chamados</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="searchQuery"
            label="Pesquisar"
            dense
            debounce="300"
            class="q-mb-md"
          />
          <q-table
            :rows="filteredRequisicoes"
            :columns="columns"
            row-key="id"
            flat
            bordered
            dense
            selection="multiple"
            v-model:selected="selectedRequisicoes"
          >
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-chip
                  :color="statusColor(props.row.status)"
                  text-color="white"
                  size="small"
                >
                  {{ props.row.status }}
                </q-chip>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "AppRequisicoes",
  setup() {
    const searchQuery = ref("");
    const selectedFilter = ref("todos");

    const requisicoes = ref([
      {
        id: 1,
        requerente: "Ana Julia",
        nome: "Problemas Computador",
        status: "Aberto",
        dataAbertura: "21-06-2024 14:30",
      },
      {
        id: 2,
        requerente: "Paulo S.",
        nome: "Manutenção Infraestrutura",
        status: "Em andamento",
        dataAbertura: "21-06-2024 14:30",
      },
      {
        id: 3,
        requerente: "Joao P.",
        nome: "Falha em Sistemas",
        status: "Aberto",
        dataAbertura: "01-06-2024 16:30",
      },
      {
        id: 4,
        requerente: "Pedro",
        nome: "Novo Colaborador / Acessos",
        status: "Em andamento",
        dataAbertura: "01-06-2024 16:30",
      },
      {
        id: 5,
        requerente: "Julia M.",
        nome: "Falha em Sistemas",
        status: "Aberto",
        dataAbertura: "01-06-2024 16:30",
      },
      {
        id: 6,
        requerente: "Julia M.",
        nome: "Novo Colaborador / Acessos",
        status: "Resolvido",
        dataAbertura: "01-06-2024 16:30",
      },
    ]);

    const columns = [
      { name: "id", required: true, label: "ID", align: "left", field: "id" },
      {
        name: "requerente",
        required: true,
        label: "Requerente",
        align: "left",
        field: "requerente",
      },
      {
        name: "nome",
        required: true,
        label: "Nome",
        align: "left",
        field: "nome",
      },
      {
        name: "status",
        required: true,
        label: "Status",
        align: "left",
        field: "status",
      },
      {
        name: "dataAbertura",
        required: true,
        label: "Data de Abertura",
        align: "left",
        field: "dataAbertura",
      },
    ];

    const filterChamados = (status) => {
      selectedFilter.value = status;
    };

    const filteredRequisicoes = computed(() => {
      return requisicoes.value.filter((requisicao) => {
        const matchesSearch =
          requisicao.requerente
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          requisicao.nome
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        const matchesFilter =
          selectedFilter.value === "todos" ||
          requisicao.status === selectedFilter.value;

        return matchesSearch && matchesFilter;
      });
    });

    const countStatus = (status) => {
      return requisicoes.value.filter(
        (requisicao) => requisicao.status === status
      ).length;
    };

    const filterColor = (filter) => {
      if (selectedFilter.value === filter) {
        return "primary";
      }
      switch (filter) {
        case "todos":
          return "yellow";
        case "Aberto":
          return "green";
        case "Em andamento":
          return "orange";
        case "Resolvido":
          return "grey";
        default:
          return "blue";
      }
    };

    const statusColor = (status) => {
      switch (status) {
        case "Aberto":
          return "green";
        case "Em andamento":
          return "orange";
        case "Resolvido":
          return "grey";
        default:
          return "blue";
      }
    };

    const selectedRequisicoes = ref([]);

    return {
      searchQuery,
      requisicoes,
      columns,
      filteredRequisicoes,
      statusColor,
      countStatus,
      filterColor,
      selectedRequisicoes,
      filterChamados,
      selectedFilter,
    };
  },
};
</script>

<style scoped>
.filtros-resumo {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.filtro {
  width: 120px;
  text-align: center;
  border-radius: 8px;
  padding: 10px;
}

.q-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.q-input {
  width: 100%;
}

.q-table {
  margin-top: 20px;
}
</style>
