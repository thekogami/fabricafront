<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="isAuthenticated" elevated>
      <q-toolbar class="custom-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-white">
          {{ pageTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isAuthenticated"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-light-green"
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> {{ userName }} </q-item-section>
        </q-item>

        <q-separator />

        <q-item to="/abrir-chamado">
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section> Abrir chamado </q-item-section>
        </q-item>

        <q-item to="/requisicoes">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section> Minhas requisições de suporte </q-item-section>
        </q-item>

        <q-item to="/assistencia">
          <q-item-section avatar>
            <q-icon name="support" />
          </q-item-section>
          <q-item-section> Assistência </q-item-section>
        </q-item>

        <q-item to="/relatorio">
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section> Relatório Geral </q-item-section>
        </q-item>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <q-space />

        <EssentialLink title="Sair" icon="exit_to_app" link="/logout" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Minhas requisições de suporte",
    icon: "list",
    link: "/requisicoes",
  },
  {
    title: "Assistência",
    icon: "support",
    link: "/assistencia",
  },
  {
    title: "Relatório Geral",
    icon: "bar_chart",
    link: "/relatorio",
  },
  {
    title: "Ajuda",
    icon: "help",
    link: "/ajuda",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const route = useRoute();

const pageTitle = computed(() => {
  switch (route.path) {
    case "/abrir-chamado":
      return "Abrir chamado";
    case "/requisicoes":
      return "Minhas requisições de suporte";
    case "/assistencia":
      return "Assistência";
    case "/relatorio":
      return "Relatório Geral";
    case "/historico":
      return "Histórico de chamados";
    case "/ajuda":
      return "Ajuda";
    default:
      return "Início";
  }
});

const userName = ref("");
const isAuthenticated = ref(false);

onMounted(async () => {
  const email = localStorage.getItem('userEmail');
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
  if (email) {
    try {
      const response = await axios.get(`http://localhost:8080/api/usuarios/${email}`);
      if (response.data) {
        userName.value = response.data.nome; // Supondo que o nome do usuário está no campo 'nome'
      }
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
    }
  }
});
</script>

<style scoped>
.custom-toolbar {
  background-color: #a3c9ab;
}
</style>
