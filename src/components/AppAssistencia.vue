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
            <template v-slot:body="props">
              <q-tr :props="props" @dblclick="openChamado(props.row.id)">
                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  :class="col.alignClass"
                >
                  <div v-if="col.name === 'status'">
                    <q-chip
                      :color="statusColor(props.row.status)"
                      text-color="white"
                      size="small"
                    >
                      {{ props.row.status }}
                    </q-chip>
                  </div>
                  <div v-else-if="col.name === 'dataAbertura'">
                    {{ formatDate(props.row.dataAbertura) }}
                  </div>
                  <div v-else>
                    {{ props.row[col.field] }}
                  </div>
                </q-td>
                <q-td>
                  <q-btn flat icon="edit" @click="editChamado(props.row.id)" />
                  <q-btn flat icon="delete" @click="deleteChamado(props.row.id)" />
                </q-td>
              </q-tr>
            </template>
            <template v-slot:no-data>
              <div class="text-center q-pa-md">Sem chamados cadastrados</div>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "AppAssistencia",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const selectedFilter = ref("todos");
    const requisicoes = ref([]);
    const selectedRequisicoes = ref([]);

    const columns = [
      {
        name: "id",
        required: true,
        label: "ID",
        align: "left",
        field: "id",
        alignClass: "text-left",
      },
      {
        name: "descricao",
        required: true,
        label: "Descrição",
        align: "left",
        field: "descricao",
        alignClass: "text-left",
      },
      {
        name: "status",
        required: true,
        label: "Status",
        align: "left",
        field: "status",
        alignClass: "text-left",
      },
      {
        name: "dataAbertura",
        required: true,
        label: "Data de Abertura",
        align: "left",
        field: "dataAbertura",
        alignClass: "text-left",
      },
      {
        name: "actions",
        label: "Ações",
        align: "center",
        field: "actions",
        alignClass: 'text-center'
      }
    ];

    const fetchRequisicoes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chamados");
        console.log("Dados recebidos:", response.data);
        requisicoes.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar requisições:", error);
      }
    };

    onMounted(() => {
      fetchRequisicoes();
    });

    const filterChamados = (status) => {
      selectedFilter.value = status;
    };

    const filteredRequisicoes = computed(() => {
      return requisicoes.value.filter((requisicao) => {
        const matchesSearch =
          (requisicao.descricao &&
            requisicao.descricao
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())) ||
          (requisicao.status &&
            requisicao.status
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()));

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

    const formatDate = (dateString) => {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", {
        locale: ptBR,
      });
    };

    const openChamado = (id) => {
      router.push({ name: "AppChamadoAberto", params: { id } });
    };

    const editChamado = (id) => {
      router.push({ name: "AppChamadoAberto", params: { id } });
    };

    const deleteChamado = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/api/chamados/${id}`);
        fetchRequisicoes(); // Atualize a lista de requisições após a exclusão
      } catch (error) {
        console.error("Erro ao excluir requisição:", error);
      }
    };

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
      openChamado,
      editChamado,
      deleteChamado,
      formatDate,
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

.text-left {
  text-align: left;
}
</style>
