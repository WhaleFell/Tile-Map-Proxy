<template>
  <div class="">
    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item
        value="footer"
        :active="settings.footer"
        @click="settings.footer = !settings.footer"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"> </v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>页脚 / Footer</v-list-item-title>

        <v-list-item-subtitle>
          在底部显示页脚 / Show footer at the bottom
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        value="footer"
        :active="settings.systemBar"
        @click="settings.systemBar = !settings.systemBar"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"> </v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>系统信息条 / SystemBar</v-list-item-title>

        <v-list-item-subtitle>
          在最上面显示系统信息条 / Show system information bar at the top
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        value="footer"
        :active="settings.theme === 'dark'"
        @click="settings.switchTheme()"
      >
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"> </v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title> 开启黑夜模式 / Dark Mode </v-list-item-title>

        <v-list-item-subtitle>
          切换到黑夜模式 / Switch to dark mode
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/stores/settings"

const settings = useSettingsStore()
</script>

<style scoped></style>
