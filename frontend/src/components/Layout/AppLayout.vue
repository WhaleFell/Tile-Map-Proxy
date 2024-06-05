<template>
  <v-layout class="rounded rounded-md" full-height>
    <!-- system bar -->
    <system-bar v-if="settings.systemBar"></system-bar>

    <!-- app bar -->
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ `${title} * ${currentRoute.meta.title}` }}</v-app-bar-title>

      <template v-slot:append>
        <theme-switch-btn></theme-switch-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list density="compact">
            <v-list-subheader>REPORTS</v-list-subheader>

            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <!-- nav drawer -->
    <v-navigation-drawer v-model="drawer">
      <v-list nav v-for="route in constantRoutes">
        <v-list-item
          v-if="route.meta?.ignore !== true"
          :prepend-icon="route.meta?.icon"
          :title="route.meta?.title"
          :to="route"
        >
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- main -->
    <v-main class="align-center justify-center h-screen">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <keep-alive max="5">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </v-main>

    <!-- footer -->
    <v-footer color="primary" v-if="settings.footer" app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import ThemeSwitchBtn from "./ThemeSwitchBtn.vue"
import { constantRoutes } from "@/router"
import { useSettingsStore } from "@/stores/settings"
import { useRoute } from "vue-router"
import SystemBar from "./SystemBar.vue"

const settings = useSettingsStore()
const currentRoute = useRoute()

const title = import.meta.env.VITE_APP_TITLE

const drawer = ref()
const items = ref([
  { text: "Real-Time", icon: "mdi-clock" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" }
])
</script>

<style scoped></style>
