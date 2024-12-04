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
                  <div v-else-if="col.name === 'actions'">
                    <q-btn flat icon="edit" @click="openEditModal(props.row)" />
                    <q-btn flat icon="delete" @click="deleteChamado(props.row.id)" />
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

      <!-- Modal de Edição -->
      <q-dialog v-model="showEditModal">
        <q-card>
          <q-card-section>
            <div class="text-h6">Editar Chamado</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="editChamadoData.descricao"
              label="Descrição"
              filled
              dense
            />
            <q-select
              v-model="editChamadoData.status"
              :options="statusOptions"
              label="Status"
              filled
              dense
            />
            <q-input
              v-model="editChamadoData.dataAbertura"
              label="Data de Abertura"
              filled
              dense
              readonly
            />
            <q-input
              v-model="editChamadoData.prioridade"
              label="Prioridade"
              filled
              dense
              readonly
            />
            <q-input
              v-model="editChamadoData.usuarioNome"
              label="Usuário"
              filled
              dense
              readonly
            />
            <q-input
              v-model="editChamadoData.tecnicoNome"
              label="Técnico"
              filled
              dense
              readonly
            />
            <q-input
              v-model="editChamadoData.requerente"
              label="Requerente"
              filled
              dense
              readonly
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" @click="closeEditModal" />
            <q-btn flat label="Salvar" color="primary" @click="saveEditChamado" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export default {
  name: "AppRequisicoes",
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const requisicoes = ref([]);
    const selectedRequisicoes = ref([]);
    const showEditModal = ref(false);
    const editChamadoData = ref({
      id: null,
      descricao: "",
      status: "",
      dataAbertura: "",
      prioridade: "",
      usuarioNome: "",
      tecnicoNome: "",
      requerente: ""
    });

    const statusOptions = [
      { label: "Aberto", value: "Aberto" },
      { label: "Em andamento", value: "Em andamento" },
      { label: "Resolvido", value: "Resolvido" }
    ];

    const columns = [
      { name: "id", required: true, label: "ID", align: "left", field: "id", alignClass: 'text-left' },
      {
        name: "requerente",
        label: "Requerente",
        align: "left",
        field: "requerente",
        alignClass: 'text-left'
      },
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
      {
        name: "prioridade",
        required: true,
        label: "Prioridade",
        align: "left",
        field: "prioridade",
        alignClass: 'text-left'
      },
      {
        name: "tecnicoNome",
        label: "Técnico",
        align: "left",
        field: "tecnicoNome",
        alignClass: 'text-left'
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

    const parseDate = (dateString) => {
      return parse(dateString, "dd/MM/yyyy HH:mm:ss", new Date());
    };

    const openChamado = (id) => {
      router.push({ name: "AppChamadoAberto", params: { id } });
    };

    const openEditModal = (chamado) => {
      editChamadoData.value = { ...chamado, dataAbertura: formatDate(chamado.dataAbertura) };
      showEditModal.value = true;
    };

    const closeEditModal = () => {
      showEditModal.value = false;
    };

    const saveEditChamado = async () => {
      try {
        const dataToSend = {
          ...editChamadoData.value,
          status: editChamadoData.value.status.value, // Extrair o valor do status
          dataAbertura: parseDate(editChamadoData.value.dataAbertura)
        };
        console.log("Dados enviados para edição:", dataToSend);
        await axios.put(`http://localhost:8080/api/chamados/${editChamadoData.value.id}`, dataToSend);
        fetchRequisicoes(); // Atualize a lista de requisições após a edição
        closeEditModal();
      } catch (error) {
        console.error("Erro ao editar requisição:", error);
      }
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
      selectedRequisicoes,
      openChamado,
      openEditModal,
      closeEditModal,
      saveEditChamado,
      deleteChamado,
      formatDate,
      parseDate,
      showEditModal,
      editChamadoData,
      statusOptions
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

.text-center {
  text-align: center;
}
</style>
