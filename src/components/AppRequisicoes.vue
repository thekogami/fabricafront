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
                <q-td v-for="col in props.cols" :key="col.name" :props="props" :class="col.alignClass">
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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "AppRequisicoes",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const requisicoes = ref([]);
    const selectedRequisicoes = ref([]);

    const columns = [
      { name: "id", required: true, label: "ID", align: "left", field: "id", alignClass: 'text-left' },
      {
        name: "descricao",
        required: true,
        label: "Descrição",
        align: "left",
        field: "descricao",
        alignClass: 'text-left'
      },
      {
        name: "status",
        required: true,
        label: "Status",
        align: "left",
        field: "status",
        alignClass: 'text-left'
      },
      {
        name: "dataAbertura",
        required: true,
        label: "Data de Abertura",
        align: "left",
        field: "dataAbertura",
        alignClass: 'text-left'
      },
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

    const filteredRequisicoes = computed(() => {
      return requisicoes.value.filter(
        (requisicao) =>
          requisicao.descricao
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          (requisicao.status && requisicao.status
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()))
      );
    });

    const statusColor = (status) => {
      return status === "Aberto" ? "green" : "orange";
    };

    const formatDate = (dateString) => {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss", {
        locale: ptBR,
      });
    };

    const openChamado = (id) => {
      router.push({ name: "AppChamadoAberto", params: { id } });
    };

    return {
      searchQuery,
      requisicoes,
      columns,
      filteredRequisicoes,
      statusColor,
      selectedRequisicoes,
      openChamado,
      formatDate,
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

.text-left {
  text-align: left;
}
</style>