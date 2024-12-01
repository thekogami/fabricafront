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
          </q-table>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AppRequisicoes",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const requisicoes = ref([
      {
        id: 1,
        requerente: "Ann Culhane",
        nome: "Problemas Computador",
        status: "Aberto",
        dataAbertura: "21-06-2024 14:30",
      },
      {
        id: 2,
        requerente: "Ahmad Rosser",
        nome: "Manutenção Infraestrutura",
        status: "Em andamento",
        dataAbertura: "06-05-2024 18:30",
      },
      {
        id: 3,
        requerente: "Ann Culhane",
        nome: "Falha em Sistemas",
        status: "Aberto",
        dataAbertura: "02-03-2024 17:30",
      },
      {
        id: 4,
        requerente: "Ahmad Rosser",
        nome: "Novo Colaborador / Acessos",
        status: "Em andamento",
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

    const selectedRequisicoes = ref([]);

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
