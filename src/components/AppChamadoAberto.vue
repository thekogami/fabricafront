<template>
  <q-page class="q-pa-md flex flex-col justify-between">
    <!-- Título do Chamado -->
    <div class="text-center q-mb-md">
      <h3>🔵 Problema de Computador</h3>
    </div>

    <!-- Histórico de Ações -->
    <div class="q-card q-pa-md q-mb-md historico-acoes">
      <h5>Histórico de Ações:</h5>

      <div v-for="(acao, index) in historicoAcoes" :key="index" class="q-mb-md">
        <q-card flat bordered class="q-pa-sm q-mb-sm" :class="acao.cor">
          <div class="q-mb-xs">
            <strong>{{ acao.usuario }}</strong> - {{ acao.data }}
          </div>
          <div>{{ acao.mensagem }}</div>
        </q-card>
      </div>
    </div>

    <!-- Caixa de Resposta -->
    <div class="responder-chamado q-pa-md">
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
import { ref } from "vue";

export default {
  name: "AppChamadoAberto",
  setup() {
    const historicoAcoes = ref([
      {
        usuario: "Técnico Mourão",
        data: "21-06-2024 14:30",
        mensagem:
          "Realizei a manutenção no equipamento e o chamado foi resolvido com sucesso!",
        cor: "bg-indigo-3",
      },
      {
        usuario: "Técnico Mourão",
        data: "21-06-2024 14:00",
        mensagem: "Olá boa tarde! Seu chamado já está em atendimento.",
        cor: "bg-yellow-3",
      },
      {
        usuario: "Ann Culhane",
        data: "21-06-2024 13:30",
        mensagem:
          "Olá bom dia! Meu computador está apresentando tela azul às vezes, preciso de um suporte técnico urgente!",
        cor: "bg-green-3",
      },
    ]);

    const novaMensagem = ref("");

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

    return {
      historicoAcoes,
      novaMensagem,
      enviarMensagem,
    };
  },
};
</script>

<style scoped>
/* Estilização básica */
.q-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.q-card {
  max-height: 60vh;
  overflow-y: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.historico-acoes {
  flex-grow: 1;
}

.responder-chamado {
  position: sticky;
  bottom: 0;
  background-color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
</style>
