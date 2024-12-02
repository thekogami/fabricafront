<template>
  <div class="requisicoes-usuarios-app q-pa-md">
    <q-page>
      <q-card>
        <q-card-section>
          <div class="text-h6">Minhas Requisições</div>
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
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'status'">
                    <q-chip
                      :color="statusColor(props.row.status)"
                      text-color="white"
                      size="small"
                    >
                      {{ props.row.status }}
                    </q-chip>
                  </div>
                  <div v-else>
                    {{ props.row[col.field] }}
                  </div>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "AppRequisicoes",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const requisicoes = ref([
      {
        id: 1,
        requerente: "João Silva",
        nome: "Requisição de Exemplo",
        status: "Aberto",
        dataAbertura: "2023-10-01",
      },
    ]);
    const selectedRequisicoes = ref([]);

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

    const fetchRequisicoes = async () => {
      try {
        const response = await axios.get("/api/chamados");
        requisicoes.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar requisições:", error);
      }
    };

    onMounted(() => {
      fetchRequisicoes();
    });

    const filteredRequisicoes = computed(() => {
      return requisicoes.value.filter(
        (requisicao) =>
          requisicao.requerente
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          requisicao.nome
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      );
    });

    const statusColor = (status) => {
      return status === "Aberto" ? "green" : "orange";
    };

    const openChamado = (id) => {
      const chamado = requisicoes.value.find((req) => req.id === id);
      if (chamado) {
        router.push({ name: "AppChamadoAberto", params: { id: chamado.id, chamado } });
      }
    };

    return {
      searchQuery,
      requisicoes,
      columns,
      filteredRequisicoes,
      statusColor,
      selectedRequisicoes,
      openChamado,
    };
  },
};
</script>

<style scoped>
.requisicoes-usuarios-app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.q-page {
  max-width: 1200px;
  margin: 0 auto;
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