	<template>
<div>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="green darken-3" dark elevation="10" height="70">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-10 pl-10">
        <v-btn text @click="toRoute('Home')">
        <span class="hidden-sm-and-down">Ingressos Br</span>
        </v-btn>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <template v-if="!isAuthorized">
        <v-btn class="ma-2" rounded dark @click="login">
          <v-icon>mdi-account-box</v-icon>
          <span>Entrar/Cadastrar</span>
        </v-btn>
      </template>
      
      <template v-else>
        <v-btn class="ma-2" dark rounded @click="toRoute('MinhaConta')">
              <v-icon>mdi-account-circle</v-icon>
              <span>Minha Conta</span>
            </v-btn>
      </template>
      
      
      <v-btn icon class="ma-1">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn icon class="ma-1">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
      <v-btn icon class="ma-1">
        <v-icon>mdi-gmail</v-icon>
      </v-btn>
      
    </v-app-bar>
  
    </div>
</template>

<script>
import methodsGlobais from '@/mixins/methodsGlobais.js'
export default {
  name: 'AppBar',
   mixins: [methodsGlobais],
  data () {
    return {
      loginUsuario: '',
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  methods:{
      login(){
          this.toRoute("Login");
      },
      logout() {
        localStorage.removeItem("token");
        this.toRoute('Home');
      }
  }
}
</script>