<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="600" v-if="isDialog">
          <v-card>
            <v-toolbar color="primary" dark>Recuperar senha</v-toolbar>
            <v-card-text>
              <v-text-field v-model="email" :rules="emailRules" label="Email" type="text" required prepend-icon="mdi-gmail"></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="recuperarSenha">Enviar</v-btn>
              <v-btn text @click="isDialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import methodsGlobais from '@/mixins/methodsGlobais.js'
export default {
    name: 'ModalEsqueciSenha',
    mixins: [methodsGlobais],
    props: ['isDialog'],
    data(){
        return{
            email: '',
            emailRules: [
                v => !!v || 'Email é obrigatório',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido'
            ],
        }
    },
    methods:{
       closeAlert(timer) {
           setTimeout(()=>{
                this.isAlert = false;
            },timer);
       },
       recuperarSenha() {
        this.$http.get('/usuario/email', {params: {email: this.email}})
        .then(response =>{
            if(response.status === 200){
                this.isAlert = true;
                this.mensagemError = 'Usuário já cadastrado';
                this.closeAlert(10000);
            } else {
                this.toRoute("CadastroUsuario")
            }
        })
        .catch(erro =>{
            console.log(erro);
        })
       }
    }
}
</script>