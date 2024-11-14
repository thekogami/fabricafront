<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
          <q-item-section> Felipe </q-item-section>
        </q-item>

        <q-separator />

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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Abrir chamado",
    icon: "add",
    link: "/abrir-chamado",
  },
  {
    title: "Minhas requisições de suporte",
    icon: "list",
    link: "/requisicoes",
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
    case "/ajuda":
      return "Ajuda";
    default:
      return "Home";
  }
});
</script>

<style scoped>
.custom-toolbar {
  background-color: #a3c9ab;
}
</style>