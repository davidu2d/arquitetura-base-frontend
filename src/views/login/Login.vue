<template>
    <v-card max-width="500" elevation="15" outlined class="mx-auto">
        <v-card-text>
            <v-form v-model="valid">
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
                    <v-card-title primary-title>Acessar o sistema</v-card-title>
                    <v-text-field
                        v-model="username"
                        :rules="loginRules"
                        label="Login (E-mail)"
                        type="text"
                        required
                        prepend-icon="mdi-account"
                        @keyup="validaLogin()"
                    ></v-text-field>

                    <v-text-field
                        class="my-2"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        label="Senha"
                        :type="showPassword ? 'text' : 'password'"
                        min="6" max="10"
                        hint="Pelo menos 6 caracteres"
                        counter
                        required
                        prepend-icon="mdi-lock"
                        @keyup="validaLogin()"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    
                    <v-btn block rounded color="primary" @click="login" :disabled="isButton" class="my-2">Entrar</v-btn>
                    <v-btn block rounded color="warning" @click="isModalRecuperaSenha" class="my-2">Esqueci a senha</v-btn>
                </v-container>
                <br>
                <v-divider></v-divider>
                <v-container>
                    <v-card-title primary-title>Cadastrar Usuário</v-card-title>
                    <v-text-field
                        class="my-4"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        type="text"
                        required
                        prepend-icon="mdi-gmail"
                        @keyup="validaCadastro()"
                    ></v-text-field>
                    
                    <v-btn block rounded color="success" :disabled="isButtonCad" @click="cadastrar">Cadastrar</v-btn>
                </v-container>
            </v-form>
        </v-card-text>
    
        <v-row justify="space-around">
            <v-col cols="auto">
                <v-dialog persistent transition="dialog-top-transition" max-width="600" v-model="isRecuperaSenha">
                    <v-card v-if="!loading">
                        <v-form ref="form">
                            <v-toolbar color="red darken-3" class="my-2" dark>Recuperar senha</v-toolbar>
                            <v-card-text>
                                <v-alert
                                    v-if="isAlertModal"
                                    dense
                                    border="left"
                                    type="warning"
                                    icon="mdi-alert"
                                    dismissible
                                    >
                                    {{this.mensagemError}}
                                </v-alert>
                                <v-text-field v-model="reEmail" :rules="reEmailRules" label="Email" type="text" required @keyup="validaEmailRecuperaSenha()" prepend-icon="mdi-gmail"></v-text-field>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn rounded @click="recuperarSenha" :disabled="isButtonRecuperaSenha" color="primary">Enviar</v-btn>
                                <v-btn rounded @click="fecharModalRecuperaSenha" color="error">Fechar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <Loading :msg="msgLoading" :isLoading="loading"></Loading>
    </v-card>
</template>

<script>
import methodsGlobais from '@/mixins/methodsGlobais.js'
import Loading from '@/views/loading/Loading.vue'
export default {
    name: 'Login',
    mixins: [methodsGlobais],
    components: {
        Loading
    },
    data(){
        return{
            showPassword: false,
            isRecuperaSenha: false,
            dialog: true,
            valid: false,
            isButton: true,
            isButtonCad: true,
            isButtonRecuperaSenha: true,
            username: '',
            password: '',
            email: '',
            reEmail: '',
            isAlert: false,
            isAlertModal: false,
            mensagemError: '',
            typeAlert: '',
            loading: false,
            msgLoading: '',
            loginRules: [
                v => !!v || 'Login é obrigatório',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido'
            ],
            passwordRules: [
                v => !!v || 'Senha é obrigatória',
                v => v.length >= 6 || 'Senha não pode ter menos que 6 caracteres',
            ],
            emailRules: [
                v => !!v || 'Email é obrigatório',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido'
            ],
            reEmailRules: [
                v => !!v || 'Email é obrigatório',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail deve ser valido'
            ],
        }
    },
    created() {
        if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            location.reload();
        }
        if (localStorage.getItem('isUpdated') !== null){
            this.isAlert = true;
            this.mensagemError = 'Senha alterada com sucesso';
            this.typeAlert = 'success';
            this.closeAlert(10000);
        }
    },
    methods:{
        isModalRecuperaSenha() {
            this.isAlert = false;
            this.reEmail = '';
            this.isRecuperaSenha = true;
        },
        fecharModalRecuperaSenha() {
            this.isRecuperaSenha = false;
            this.reEmail = '';
            this.isButtonRecuperaSenha = true;
            this.$refs.form.resetValidation()
        },
        validaLogin(){
           if(!this.username || !this.password || this.password.length < 6){
               this.isButton = true;
           }else{
               this.isButton = false;
           }
        },
        validaCadastro(){
            let valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
           if(!this.email || this.email.length <= 0 || !valid.test(this.email)){
               this.isButtonCad = true;
           }else{
               this.isButtonCad = false;
           }
        },
        validaEmailRecuperaSenha(){
           let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
           if(!this.reEmail || this.reEmail.length <= 0 || !re.test(this.reEmail)){
               this.isButtonRecuperaSenha = true;
           }else{
               this.isButtonRecuperaSenha = false;
           }
        },
        login(){
            this.isAlert = false;
            let obj = {
                username: this.username ? this.username : null,
                password: this.password ? this.password : null
            }
            var params = new URLSearchParams();
            params.append('grant_type', 'password');
            params.append('client', 'app-u2d-pix');
            params.append('username', obj.username);
            params.append('password', obj.password);
            return this.$http({
                method: 'post',
                url:'oauth/token',
                auth:{username: 'app-u2d-pix', password: '415782@U2d'},
                headers: {"Content-type": "application/x-www-form-urlencoded"},
                data: params
            }).then(response => {
                if(response.status === 200){
                    localStorage.setItem("token", response.data.access_token);
                    let jwtData = localStorage.getItem('token').split('.')[1];
                    let decodedJwtJsonData = atob(jwtData);
                    let loginUsuario = JSON.parse(decodedJwtJsonData).user_name;
                    localStorage.setItem("userName", loginUsuario);
                    this.isAuthorized = true;
                    this.toRoute("Home");    
                    location.reload();
                }
            }).catch(() =>{
                this.typeAlert = 'warning';
                this.mensagemError = 'Login ou senha inválido';
                this.isAlert = true;
                this.closeAlert(10000);
            })
        
        },
        closeAlert(timer) {
           setTimeout(()=>{
                this.isAlert = false;
                this.isAlertModal = false;
                localStorage.removeItem("isUpdated");
            },timer);
        },
        cadastrar() {
            this.$http.get('/usuario/email', {params: {email: this.email}})
            .then(response =>{
                if(response.status === 200){
                    this.isAlert = true;
                    this.typeAlert = 'warning';
                    this.mensagemError = 'Usuário já cadastrado';
                    this.closeAlert(10000);
                } else {
                    this.toRoute("CadastroUsuario")
                }
            })
            .catch(erro =>{
                console.log(erro);
            })
        },
        recuperarSenha() {
            this.loading = true;
            this.isRecuperaSenha = false;
            this.msgLoading = 'Verificando E-mail digitado...';
            this.$http.get('/usuario/email', {params: {email: this.reEmail}})
                .then(response =>{
                    if(response.status === 200){
                        this.msgLoading = 'Enviando E-mail de recuperação de senha...';
                        let passwordResetRequest = {
                            email: this.reEmail
                        }
                        this.$http.put('/usuario/change-password', passwordResetRequest)
                        .then(response =>{
                            if(response.status === 202){
                                this.loading = false;
                                this.isAlert = true;
                                this.typeAlert = 'success';
                                this.mensagemError = 'Um E-mail foi enviado para o endereço: '+ this.reEmail;
                                this.closeAlert(30000);
                            }
                        })
                        .catch(erro =>{
                            this.loading = false;
                            this.isRecuperaSenha = true;
                            console.log(erro);
                        })

                    } else {
                        this.loading = false;
                        this.isRecuperaSenha = true;
                        this.isAlertModal = true;
                        this.typeAlert = 'warning';
                        this.mensagemError = 'E-mail não cadastrado';
                        this.closeAlert(10000);
                    }
                })
                .catch(erro =>{
                    this.loading = false;
                    this.isRecuperaSenha = true;
                    console.log(erro);
                })
        }
    }
}
</script>