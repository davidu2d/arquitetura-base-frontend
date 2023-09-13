<template>
<div>
  <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app v-if="isAuthenticated">

      <v-list dense>
        <template v-for="item in items">

          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading"> {{ item.heading }} </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>

          <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="(child, i) in item.children" :key="i" link @click="toRoute(item.nameRota)">
              <v-list-item-action>
                
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :key="item.text" link @click="toRoute(item.nameRota)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- HEADER -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="black" dark elevation="5" height="69">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">DFlex NFe</span>
      </v-toolbar-title>
  
      <v-spacer></v-spacer>
      <template v-if="!isAuthorized">
        <v-btn class="ma-2" rounded dark @click="login">
          <v-icon>mdi-account-box</v-icon>
          <span>Entrar/Cadastrar</span>
        </v-btn>
      </template>
      
      <template v-else>
        <div class="espacamento">
        <v-list-item>
            <v-list-item-avatar>
            <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>{{usuarioLogado}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </div>
      </template>
      
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
    name: 'Menu',
    mixins: [methodsGlobais],
    data () {
      return {
        usuarioLogado: '',
        drawer: true,
        dialog: false,
        isAuthenticated: false,
        items: [
          { icon: 'mdi-plus-circle', text: 'Cadastro de Logista', children: [{ text: 'Cadastro de Logista', nameRota: 'CadastroEmpresa'}] },
          { icon: 'mdi-account-plus', text: 'Cadastro de Operador', nameRota: 'CadastroOperador'},
          { icon: 'mdi-credit-card-plus', text: 'Efetuar Vendas', nameRota: 'EfetuarVenda' },
          { icon: 'mdi-credit-card-outline', text: 'Consultar Vendas', nameRota: 'ConsultarVenda' },
          { icon: 'mdi-cancel', text: 'Cancelar Vendas', nameRota: 'CancelarVenda' },
          { icon: 'mdi-cog', text: 'Configuracao', nameRota: 'Configuracao' },
          { icon: 'mdi-exit-run', text: 'Sair', nameRota: 'Login' }
        ],
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.isAuthenticated = true;
        this.usuarioLogado = localStorage.getItem('userName');
      }
    },
    methods:{
      login(){
          this.toRoute("Login");
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        this.toRoute('Home');
      }

    }
  }
</script>

<style scoped>
  .espacamento{
    padding-left: 51em;
  }
  .v-application--is-ltr .v-list-item__avatar:first-child{
    margin-right: -1px;
  }
</style>