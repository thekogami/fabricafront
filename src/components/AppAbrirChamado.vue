<template>
  <div class="support-page">
    <main class="main-content">
      <div class="content">
        <!-- Lista de tickets -->
        <div class="ticket-list">
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Problemas Computador' }"
            @click="selectTicket('Problemas Computador', 'Alta')"
            @dblclick="openDetailsModal('Problemas Computador', 'Alta')"
          >
            <h3>Problemas Computador</h3>
            <p>Ticket específico para relatar problemas de computador.</p>
          </div>
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Manutenção Infraestrutura' }"
            @click="selectTicket('Manutenção Infraestrutura', 'Média')"
            @dblclick="openDetailsModal('Manutenção Infraestrutura', 'Média')"
          >
            <h3>Manutenção Infraestrutura</h3>
            <p>
              Ticket específico para manutenção e instalação de equipamentos de
              infraestrutura de TI.
            </p>
          </div>
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Falha em Sistemas' }"
            @click="selectTicket('Falha em Sistemas', 'Alta')"
            @dblclick="openDetailsModal('Falha em Sistemas', 'Alta')"
          >
            <h3>Falha em Sistemas</h3>
            <p>Ticket relacionado a falhas de sistema interno.</p>
          </div>
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Novo Colaborador / Acessos' }"
            @click="selectTicket('Novo Colaborador / Acessos', 'Baixa')"
            @dblclick="openDetailsModal('Novo Colaborador / Acessos', 'Baixa')"
          >
            <h3>Novo Colaborador / Acessos</h3>
            <p>
              Ticket relacionado à solicitação de RH para novos acessos de
              colaborador.
            </p>
          </div>
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Reservar um item' }"
            @click="selectTicket('Reservar um item', 'Baixa')"
            @dblclick="openDetailsModal('Reservar um item', 'Baixa')"
          >
            <h3>Reservar um item</h3>
            <p>Ticket específico para reservar item de informática.</p>
          </div>
          <div
            class="ticket-item"
            :class="{ selected: selectedTicket === 'Instalação de programa' }"
            @click="selectTicket('Instalação de programa', 'Média')"
            @dblclick="openDetailsModal('Instalação de programa', 'Média')"
          >
            <h3>Instalação de programa</h3>
            <p>Ticket específico para instalações de software ou hardware.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de Detalhes Complementares -->
    <div v-if="showDetailsModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Detalhes Complementares</h3>
        <textarea
          v-model="details"
          placeholder="Informe os detalhes..."
        ></textarea>
        <div class="file-upload">
          <label for="file-upload" class="file-upload-label">
            Anexar arquivos (max: 10MB)
          </label>
          <input type="file" id="file-upload" class="file-upload-input" />
          <p>Arraste o arquivo e solte aqui:</p>
        </div>
        <div class="modal-buttons">
          <button @click="closeDetailsModal">Fechar</button>
          <button @click="submitDetails">Enviar</button>
        </div>
      </div>
    </div>

    <!-- Popup de Confirmação -->
    <q-dialog v-model="showSuccessDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Chamado Criado</div>
        </q-card-section>
        <q-card-section>
          Chamado {{ createdTicketId }} criado com sucesso.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" @click="showSuccessDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    return { $q };
  },
  data() {
    return {
      selectedTicket: null,
      selectedPriority: null,
      showDetailsModal: false,
      details: "",
      showSuccessDialog: false,
      createdTicketId: null,
    };
  },
  methods: {
    selectTicket(ticket, priority) {
      this.selectedTicket = ticket;
      this.selectedPriority = priority;
    },
    openDetailsModal(ticket, priority) {
      this.selectedTicket = ticket;
      this.selectedPriority = priority;
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.details = "";
    },
    async submitDetails() {
      try {
        const userId = localStorage.getItem('userId'); // Assumindo que o ID do usuário está armazenado no localStorage
        const userName = localStorage.getItem('userName'); // Assumindo que o nome do usuário está armazenado no localStorage
        const response = await axios.post('http://localhost:8080/api/chamados', {
          descricao: this.selectedTicket,
          status: "Aberto", // Definindo o status inicial como "Aberto"
          descricaoProblema: this.details, // Adicionando a descrição do problema
          prioridade: this.selectedPriority, // Adicionando a prioridade
          usuarioId: userId, // Adicionando o ID do usuário
          usuarioNome: userName // Adicionando o nome do usuário
        });
        console.log("Chamado criado com sucesso:", response.data);
        this.createdTicketId = response.data.id;
        this.showSuccessDialog = true;
        this.closeDetailsModal();
      } catch (error) {
        console.error("Erro ao criar chamado:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao criar chamado',
        });
      }
    },
  },
};
</script>

<style scoped>
.support-page {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #8cc63f;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo {
  width: 40px;
}

.menu-button img {
  width: 25px;
}

.sidebar-nav {
  margin-top: 30px;
  width: 100%;
}

.nav-item {
  color: #fff;
  font-weight: bold;
  margin: 15px 0;
  text-decoration: none;
  font-size: 16px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}

.top-bar {
  height: 60px;
  background-color: #4caf50;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
}

.top-bar-icons .icon {
  margin-left: 15px;
  width: 24px;
  cursor: pointer;
}

.content {
  display: flex;
  padding: 20px;
}

.categories {
  width: 200px;
  background-color: #e0e0e0;
  padding: 15px;
}

.categories h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.selected {
  background-color: #999;
  font-weight: bold;
  color: #fff;
}

.ticket-list {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ticket-item {
  background-color: #e0e0e0;
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.ticket-item:hover {
  background-color: #d0d0d0;
  transform: scale(1.02);
}

.ticket-item.selected {
  background-color: #4caf50;
  color: white;
}

.ticket-item h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.ticket-item p {
  margin: 5px 0 0;
  font-size: 14px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content textarea {
  width: 100%;
  height: 150px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.file-upload {
  margin-top: 20px;
}

.file-upload-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.file-upload-input {
  display: block;
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  background-color: #f44336;
}
</style>
