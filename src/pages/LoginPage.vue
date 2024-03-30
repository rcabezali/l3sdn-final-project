<template>
  <q-layout>
    <q-page-container class="background">
      <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Login</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input v-model="form.email.value" square clearable type="text" label="Prénom" />
                  <q-input
                    v-model="form.password.value"
                    square
                    clearable
                    type="password"
                    label="Mot de passe"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  size="lg"
                  class="full-width"
                  label="Login"
                  color="light-blue-7"
                  @click="submitLogin(form)"
                />
                <!-- Login btn -->
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref } from 'vue'
import { Cookies, useQuasar } from 'quasar'
import { Hooks } from 'src/hooks/loginHooks'

const form = ref({
  email: {
    value: '',
    required: true
  },
  password: {
    value: '',
    required: true
  }
})

const $q = useQuasar()
const { isFormValid, validateInput } = Hooks()

const submitLogin = async (form_submited) => {
  const { valid, error } = isFormValid(form_submited)

  if (valid) {
    fetch('src/data/users.json')
      .then((buffer) => {
        let data = buffer.json()
        return data
      })
      .then((users) => {
        Object.keys(users).forEach((index) => {
          if (index !== 0) {
            let user = users[index]
            if (
              user.username == form_submited.email.value &&
              user.password == form_submited.password.value
            ) {
              $q.notify({
                type: 'positive',
                message: 'Vous êtes bien connecter en tant que: ' + user.username
              })
              Cookies.set('L3SDNUser', user.username)
              Cookies.set('L3SDNtype', user.type)
              Cookies.set('L3SDNexpiration', Date.now())
              document.location.href = '/'
            } else {
              $q.notify({
                type: 'negative',
                message:
                  "Le nom d'utilisateur ou le mot de passe est incorecte, veuillez réessayer."
              })
            }
          }
        })
      })
  } else {
    // Form validation failed, notify the user
    $q.notify({ type: 'negative', message: 'An error occurred: ' + error })
  }

  function encryptString(input, key) {
    let result = ''
    let i2 = false
    for (let i = 0; i < input.length + key.length; i++) {
      result += i2 ? input[Math.floor(i / 2)] || '' : key[Math.floor(i / 2)] || ''
      i2 = !i2 // Toggle the value of i2
    }
    return result
  }
}
</script>

<style>
.q-card {
  width: 360px;
}

.background {
  background-image: url('assets/login-background.png');
  background-size: cover;
}
</style>
