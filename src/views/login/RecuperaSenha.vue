<template>
    <v-card max-width="500" elevation="15" outlined class="mx-auto">
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-container>
                    <v-alert
                        v-if="isAlert"
                        dense
                        border="left"
                        :type="typeAlert"
                        dismissible
                        >
                        {{this.mensagemError}}
                    </v-alert>
                    <v-card-title primary-title>Recuperar a senha</v-card-title>

                    <v-text-field
                        class="my-2"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        label="Nova senha"
                        :type="showPassword ? 'text' : 'password'"
                        min="6" max="10"
                        hint="Pelo menos 6 caracteres"
                        counter
                        required
                        prepend-icon="mdi-lock"
                        @keyup="validaSenha();validaNovaSenha()"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-progress-linear v-if="isProgress" v-model="progress" :color="colorProgress" height="25"><strong>{{ textProgress }}</strong></v-progress-linear>

                    <v-text-field
                        class="my-2"
                        v-model="rePassword"
                        :rules="rePasswordRules"
                        :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'"
                        label="Redigite Senha"
                        :type="showRePassword ? 'text' : 'password'"
                        min="6" max="10"
                        hint="Pelo menos 6 caracteres"
                        counter
                        required
                        prepend-icon="mdi-lock"
                        @keyup="validaSenha()"
                        @click:append="showRePassword = !showRePassword"
                    ></v-text-field>
                    
                    <v-btn block rounded color="primary" @click="alterarSenha" :disabled="isButton" class="my-2">Atualizar senha</v-btn>

                    <v-btn block rounded color="warning" @click="toRoute('Login')" class="my-2">Ir para página de Login</v-btn>
                </v-container>
            </v-form>
        </v-card-text>

        <Loading :msg="msgLoading" :isLoading="loading"></Loading>
    </v-card>
</template>

<script>
import methodsGlobais from '@/mixins/methodsGlobais.js'
import Loading from '@/views/loading/Loading.vue'
export default {
    name: 'RecuperaSenha',
    mixins: [methodsGlobais],
    components: {
        Loading
    },
    data(){
        return{
            valid: false,
            showPassword: false,
            showRePassword: false,
            isButton: true,
            rePassword: '',
            password: '',
            typeAlert: '',
            loading: false,
            msgLoading: '',
            isProgress: false,
            progress: 0,
            colorProgress: 'red',
            textProgress: 'Fraca',
            token: '',
            isAlert: false,
            mensagemError: '',
            passwordRules: [
                v => !!v || 'Nova senha é obrigatória',
                v => v.length >= 6 || 'Nova senha não pode ter menos que 6 caracteres',
            ],
            rePasswordRules: [
                v => !!v || 'Nova senha é obrigatória',
                v => v.length >= 6 || 'Nova senha não pode ter menos que 6 caracteres',
                v => v === this.password || 'A senha digitada é diferente da nova senha',
            ],
        }
    },
    mounted() {
        this.token = this.$route.query.token;
    },
    methods:{
        validaSenha(){
           if(!this.password || !this.rePassword || this.password.length < 6 || this.rePassword.length < 6 || (this.password !== this.rePassword)){
               this.isButton = true;
           }else{
               this.isButton = false;
           }
        },
        validaNovaSenha(){
            this.progress = 0;
            let caracteresEspeciais = /\W|_/;
            let letraMinuscula = /[a-z]/; // verifica a existência de letras minúsculas 
            let letraMaiuscula = /[A-Z]/; // verifica a existência de letras maiúsculas
            let numero = /[0-9]/; // verifica a existência números
            if(numero.test(this.password)){
                this.isProgress = true;
                this.progress += 20;
            } 
            if (caracteresEspeciais.test(this.password)) {
                this.isProgress = true;
                this.progress += 20;
            } 
            if (letraMinuscula.test(this.password)) {
                this.isProgress = true;
                this.progress += 20;
            }
            if (letraMaiuscula.test(this.password)) {
                this.isProgress = true;
                this.progress += 20;
            }
            if (this.password.length >= 6 & this.password.length < 8) {
                this.isProgress = true;
                this.progress += 20;
            }
            if (this.password.length >= 8) {
                this.isProgress = true;
                this.progress += 30;
            }

            if (this.progress == 100) {
                this.colorProgress = 'orange';
                this.textProgress = 'Aceitável';
            } 
            if (this.progress > 100) {
                this.colorProgress = 'green';
                this.textProgress = 'Forte';
            } 
            if (this.progress < 100) {
                this.colorProgress = 'red';
                this.textProgress = 'Fraca';
            }
            if (this.progress == 0) {
                this.isProgress = false;
            }
            
        },
        alterarSenha(){
            this.msgLoading = 'Alterando sua senha...';
            this.loading = true;
            let emBase64 = btoa(this.password)
            var params = new URLSearchParams();
            params.append('token', this.token);
            params.append('senha', emBase64);
            this.$http.put('/usuario/password', params)
            .then(response =>{
                if(response.status === 200){
                    localStorage.setItem("isUpdated", true);
                    this.toRoute("Login");
                } 
                if(response.status === 204) {
                    this.$refs.form.reset();
                    this.isButton = true;
                    this.isProgress = false;
                    this.loading = false;
                    this.isAlert = true;
                    this.typeAlert = 'error';
                    this.mensagemError = 'Link de recuperação de senha expirado!, click no botão IR PARA PÁGINA DE LOGIN para gerar novo link';
                    
                }
            })
            .catch(erro =>{
                console.log(erro);
            })
        }
    }
}
</script>