<template>
  <q-page class="q-pa-md flex flex-col justify-between">
    <div class="header q-mb-md">
      <div class="status-icon">
        <q-icon :name="statusIcon" />
      </div>
      <h3 class="title">{{ chamado?.nome || "Chamado não encontrado" }}</h3>
      <q-btn
        label="Concluir"
        color="positive"
        class="concluir-btn"
        @click="finalizarChamado"
        v-if="chamado"
      />
    </div>

    <div class="q-card q-pa-md q-mb-md historico-acoes" v-if="chamado">
      <h5>Histórico de Ações:</h5>

      <div v-if="historicoAcoes.length > 0">
        <div v-for="(acao, index) in historicoAcoes" :key="index" class="q-mb-md">
          <q-card flat bordered class="q-pa-sm q-mb-sm" :class="acao.cor">
            <div class="q-mb-xs">
              <strong>{{ acao.usuario }}</strong> - {{ acao.data }}
            </div>
            <div>{{ acao.mensagem }}</div>
          </q-card>
        </div>
      </div>
      <div v-else>
        <p>Nenhuma ação registrada.</p>
      </div>
    </div>

    <!-- Caixa de Resposta -->
    <div class="responder-chamado q-pa-md" v-if="chamado">
      <q-input
        v-model="novaMensagem"
        type="textarea"
        filled
        label="Digite sua mensagem"
        lazy-rules
        rules="[val => !!val || 'Mensagem não pode estar vazia']"
        class="mensagem-input"
      />
      <q-btn
        label="Enviar"
        color="primary"
        class="q-mt-sm enviar-btn"
        @click="enviarMensagem"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from 'axios';

export default {
  name: "AppChamadoAberto",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chamado = ref(null);
    const historicoAcoes = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/chamados/${props.id}`);
        chamado.value = response.data;
        if (chamado.value && chamado.value.historicoAcoes) {
          historicoAcoes.value = chamado.value.historicoAcoes;
        }
      } catch (error) {
        console.error("Erro ao carregar o chamado:", error);
      }
    });

    const novaMensagem = ref("");

    const statusIcon = computed(() => {
      if (historicoAcoes.value.length === 0) {
        return "info"; // Valor padrão caso não haja ações
      }
      const lastAction = historicoAcoes.value[0];
      if (lastAction.cor === "bg-red-3") return "error";
      if (lastAction.cor === "bg-yellow-3") return "warning";
      if (lastAction.cor === "bg-green-3") return "check_circle";
      return "info";
    });

    const enviarMensagem = () => {
      if (novaMensagem.value.trim() !== "") {
        historicoAcoes.value.unshift({
          usuario: "Você",
          data: new Date().toLocaleString(),
          mensagem: novaMensagem.value.trim(),
          cor: "bg-light-blue-3",
        });
        novaMensagem.value = ""; // Limpa a caixa de texto
      }
    };

    const finalizarChamado = () => {
      historicoAcoes.value.unshift({
        usuario: "Você",
        data: new Date().toLocaleString(),
        mensagem: "Chamado finalizado.",
        cor: "bg-red-3",
      });
    };

    return {
      chamado,
      historicoAcoes,
      novaMensagem,
      enviarMensagem,
      finalizarChamado,
      statusIcon,
    };
  },
};
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-icon {
  margin-right: 8px;
}

.title {
  flex-grow: 1;
  text-align: center;
}

.q-card {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.historico-acoes {
  flex-grow: 1;
}

.responder-chamado {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.mensagem-input {
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
}

.enviar-btn {
  align-self: flex-end;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 16px;
}

.concluir-btn {
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 16px;
}
</style>