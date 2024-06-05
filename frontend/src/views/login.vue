<template>
  <v-app>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="console.log('login', fromDatas)">
                <v-text-field
                  v-model="fromDatas.email"
                  label="Email"
                  type="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="fromDatas.password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary" block>Login</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="console.log('signup')"
                >Don't have an account? Sign Up</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

const fromDatas = reactive({
  email: "",
  password: ""
})
</script>

<style scoped></style>
