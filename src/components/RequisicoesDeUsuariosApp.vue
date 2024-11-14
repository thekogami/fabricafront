<template>
  <div class="requisicoes-usuarios-app">
    <aside class="sidebar">
      <div class="logo">
        <!-- Logo da aplicação -->
      </div>
      <nav class="menu">
        <ul>
          <li><a href="#">PROCURE SUPORTE</a></li>
          <li><a href="#">MINHAS REQUISIÇÕES DE SUPORTE</a></li>
          <li><a href="#">AJUDA</a></li>
        </ul>
      </nav>
    </aside>

    <main class="main-content">
      <header class="header">
        <div class="search-bar">
          <input type="text" placeholder="Buscar" v-model="searchQuery" />
        </div>
        <div class="header-icons">
          <i class="icon-user"></i>
          <i class="icon-settings"></i>
          <i class="icon-logout"></i>
        </div>
      </header>

      <section class="requisicoes-table">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>ID</th>
              <th>Requerente</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Data de Abertura</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="requisicao in filteredRequisicoes" :key="requisicao.id">
              <td><input type="checkbox" /></td>
              <td>{{ requisicao.id }}</td>
              <td>{{ requisicao.requerente }}</td>
              <td>{{ requisicao.nome }}</td>
              <td>
                <span :class="statusClass(requisicao.status)">{{
                  requisicao.status
                }}</span>
              </td>
              <td>{{ requisicao.dataAbertura }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      requisicoes: [
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
          id: 1,
          requerente: "Ann Culhane",
          nome: "Falha em Sistemas",
          status: "Aberto",
          dataAbertura: "02-03-2024 17:30",
        },
        {
          id: 2,
          requerente: "Ahmad Rosser",
          nome: "Novo Colaborador / Acessos",
          status: "Em andamento",
          dataAbertura: "01-06-2024 16:30",
        },
      ],
    };
  },
  computed: {
    filteredRequisicoes() {
      return this.requisicoes.filter(
        (requisicao) =>
          requisicao.requerente
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          requisicao.nome.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    statusClass(status) {
      return {
        "status-aberto": status === "Aberto",
        "status-em-andamento": status === "Em andamento",
      };
    },
  },
};
</script>

<style scoped>
.requisicoes-usuarios-app {
  display: flex;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 20%;
  background-color: #4caf50;
  color: white;
  padding: 20px;
}

.sidebar .menu ul {
  list-style: none;
  padding: 0;
}

.sidebar .menu li {
  margin: 20px 0;
}

.sidebar .menu a {
  color: white;
  text-decoration: none;
}

.main-content {
  width: 80%;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar input {
  padding: 5px;
  width: 200px;
}

.header-icons .icon-user,
.header-icons .icon-settings,
.header-icons .icon-logout {
  margin-left: 10px;
  cursor: pointer;
}

.requisicoes-table table {
  width: 100%;
  border-collapse: collapse;
}

.requisicoes-table th,
.requisicoes-table td {
  padding: 10px;
  text-align: left;
}

.requisicoes-table th {
  background-color: #f2f2f2;
}

.status-aberto {
  color: green;
}

.status-em-andamento {
  color: orange;
}
</style>
