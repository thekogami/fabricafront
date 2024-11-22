<template>
  <div class="support-page">
    <main class="main-content">
      <div class="content">
        <!-- Lista de tickets -->
        <div class="ticket-list">
          <div class="ticket-item">
            <h3>Problemas Computador</h3>
            <p>Ticket específico para relatar problemas de computador.</p>
          </div>
          <div class="ticket-item">
            <h3>Manutenção Infraestrutura</h3>
            <p>
              Ticket específico para manutenção e instalação de equipamentos de
              infraestrutura de TI.
            </p>
          </div>
          <div class="ticket-item">
            <h3>Falha em Sistemas</h3>
            <p>Ticket relacionado a falhas de sistema interno.</p>
          </div>
          <div class="ticket-item">
            <h3>Novo Colaborador / Acessos</h3>
            <p>
              Ticket relacionado à solicitação de RH para novos acessos de
              colaborador.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* Estilos gerais da página */
.support-page {
  display: flex;
  height: 100vh;
}

/* Estilos do menu lateral */
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

/* Estilos do conteúdo principal */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
}

/* Barra superior */
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

/* Conteúdo da página */
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

/* Estilos dos tickets */
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
</style>
