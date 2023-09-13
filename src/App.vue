<template>
  <v-app>
    <Menu></Menu>
    <v-main>
      <Loading></Loading>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Loading from '@/views/loading/Loading.vue'
import Menu from '@/views/templates/Menu.vue'
export default {
  name: 'App',
  props: {
      source: String,
    },
  components: {
    Menu,
    Loading
  },
  data () {
      return {
        drawer: true,
        dialog: false,
      items: [
        { icon: 'mdi-plus-circle', text: 'Cadastro de Empresa', nameRota: 'CadastroEmpresa' },
        { icon: 'mdi-account-plus', text: 'Cadastro de Operador', nameRota: 'CadastroOperador'},
        { icon: 'mdi-credit-card-plus', text: 'Efetuar Vendas', nameRota: 'EfetuarVenda' },
        { icon: 'mdi-credit-card-outline', text: 'Consultar Vendas', nameRota: 'ConsultarVenda' },
        { icon: 'mdi-cancel', text: 'Cancelar Vendas', nameRota: 'CancelarVenda' },
        { icon: 'mdi-cog', text: 'Configuracao', nameRota: 'Configuracao' }
      ],
      }
    },
  
};
</script>

<style scoped>
  .espacamento{
    padding-left: 51em;
  }
  .v-application--is-ltr .v-list-item__avatar:first-child{
    margin-right: -1px;
  }
</style>
