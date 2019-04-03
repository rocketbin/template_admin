<template>
  <q-page class="flex flex-center"  >
    <q-card inline class="card-form q-card-main" style = "border-radius:18px;">
      <div class="login-head" style="display:flex;justify-content:center;" >
      </div>
      <q-card-main class="body" style="padding:20px;background-color: rgba(0,0,0, 0.6);border-radius:18px" dark>
          <div class="row-input">
              <q-input dark float-label="Username" v-model="credentials.username" error-label="might be a wrong email" :before="[{icon: 'perm_identity'}]" @keyup="keyenter" />
          </div>
          <div class="row-input">
              <q-input dark float-label="Password" v-model="credentials.password" error-label="might be a wrong password" type="password" :before="[{icon: 'lock'}]" no-pass-toggle @keyup="keyenter" />
          </div>        
          <br>
          <div>
            <div class="row-btn" align="right">
              <!-- <q-btn color="positive" flat class="" label="register" @click=""/> -->
              <q-btn color="primary" flat class="" label="Login" @click="login" :loading="loading">
                <q-spinner-oval slot="loading" />
              </q-btn>
            </div>
          </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>
<script>
import { _purl } from 'src/assets/purl'
import { _token } from 'src/assets/token'
import { _glob } from 'src/assets/global'

export default {
  data () {
    return {
      loading: false,
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    keyenter (ev) {
      if (ev.keyCode === 13) {
        this.login()
      }
    },
    login () {
      this.loading = true
    _purl.signin({
          email: this.credentials.username,
          password: this.credentials.password
    }).then(r => {
      this.loading = false
      console.log(r.data.token)
      _token.integrate(r.data.token, r.data.user)
      window.location.href = '/dashboard'
      _glob.notify('logged in!', 'positive')
    }).catch(e => {
      this.loading = false
      _glob.notify('email or password does not match our records!', 'negative')
    })
    }
  }
}
</script>