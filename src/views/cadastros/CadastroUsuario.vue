<template>
    <div>
        <v-card max-width="1100" class="text-center mx-auto" elevation="15" outlined >
        <v-card-title primary-title>Cadastro de Usuário</v-card-title>
        <v-card-text>
            <v-form class="form-control" v-model="valid" lazy-validation autocomplete="off">
                <v-container>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="nome"
                                :rules="nomeRules"
                                label="Nome"
                                type="text"
                                required
                                prepend-icon="mdi-rename-box"
                                autocomplete="off">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="nomeSocial"
                                label="Nome Social"
                                type="text"
                                prepend-icon="mdi-rename-box"
                                autocomplete="off">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <!--<v-text-field
                                v-model="dataNascimento"
                                :rules="loginRules"
                                label="Data Nascimento"
                                type="date"
                                required
                                prepend-icon="mdi-calendar-range"
                                autocomplete="off">
                            </v-text-field>-->
                            <div>
                                <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div>
                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="date"
                                    label="Data Nascimento"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    :active-picker.sync="activePicker"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                ></v-date-picker>
                                </v-menu>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <v-combobox
                                v-model="genero"
                                :items="generos"
                                label="Orientação Sexual"
                                required
                                small-chips
                                clearable
                                persistent-hint
                                :hint="genero.description"
                                prepend-icon="mdi-gender-male-female">
                            </v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            
                            <v-radio-group v-model="tipoDocumento" row>
                                <template v-slot:label>
                                    <div>Nacionalidade:</div>
                                </template>
                                <v-radio label="Brasileiro" value="cpf"></v-radio>
                                <v-radio label="Estrangeiro" value="passaporte"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-if="tipoDocumento === 'cpf'"
                                v-model="numero"
                                :rules="nomeRules"
                                label="CPF"
                                type="text"
                                prepend-icon="mdi-rename-box"
                                @keyup="validaLogin()">
                            </v-text-field>
                            <v-text-field
                                v-if="tipoDocumento === 'passaporte'"
                                v-model="numero"
                                :rules="nomeRules"
                                label="Passaporte"
                                type="text"
                                prepend-icon="mdi-rename-box"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete
                                v-if="tipoDocumento === 'passaporte'"
                                v-model="pais"
                                :items="paises"
                                chips
                                required
                                small-chips
                                label="Pais"
                                clearable
                                prepend-icon="mdi-flag"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                v-model="cep"
                                :rules="loginRules"
                                label="CEP"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="logradouro"
                                :rules="loginRules"
                                label="Logradouro"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="numero"
                                :rules="loginRules"
                                label="Número"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                v-model="complemento"
                                :rules="loginRules"
                                label="Complemento"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="bairro"
                                :rules="loginRules"
                                label="Bairro"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="localidade"
                                :rules="loginRules"
                                label="Localidade"
                                type="text"
                                required
                                prepend-icon="mdi-map-marker"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                v-mask="'(##) #####-####'"
                                v-model="celular"
                                :rules="loginRules"
                                label="Celular"
                                type="text"
                                required
                                prepend-icon="mdi-cellphone"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="email"
                                :rules="loginRules"
                                label="Email"
                                type="text"
                                required
                                prepend-icon="mdi-gmail"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4.5">
                            <v-text-field
                                v-model="confirmEmail"
                                :rules="loginRules"
                                label="Confirmar email"
                                type="text"
                                required
                                prepend-icon="mdi-gmail"
                                @keyup="validaLogin()">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
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
                                @click:append="showPassword = !showPassword">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="confirmPassword"
                                :rules="passwordRules"
                                :append-icon="ConfirmShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                label="Confirmar senha"
                                :type="ConfirmShowPassword ? 'text' : 'password'"
                                min="6" max="10"
                                hint="Pelo menos 6 caracteres"
                                counter
                                required
                                prepend-icon="mdi-lock"
                                @keyup="validaLogin()"
                                @click:append="ConfirmShowPassword = !ConfirmShowPassword">
                            </v-text-field>
                        </v-col>
                    </v-row>
            
                </v-container>
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="teste">Salvar</v-btn>
        </v-card-actions>

        </v-card>
    </div>
    
</template>

<script>
import methodsGlobais from '@/mixins/methodsGlobais.js'
export default {
    name: 'CadastroUsuario',
    mixins: [methodsGlobais],
    data(){
        return{
            nome: '',
            nomeSocial: '',
            dataNascimento: Date,
            showPassword: false,
            ConfirmShowPassword: false,
            tipoDocumento: "cpf",
            activePicker: null,
            date: null,
            menu: false,
            pais: "brasil",
            paises: ['Brasil', 'Argentina'],
            genero: { text: 'Heterossexual', description: 'Atração pelo sexo oposto.'},
            generos: [
                { text: 'Heterossexual', description: 'Atração pelo sexo oposto.'},
                { text: 'Homossexual', description: 'Atração pelo mesmo sexo.'},
                { text: 'Bissexual', description: 'Atração por ambos.'},
                { text: 'Assexual', description: 'Atração por nenhum. Embora a pessoa não sinta desejo sexual, é capaz de manter um relacionamento amoroso.'},
                { text: 'Pansexual', description: 'Atração por pessoas, independente de sexo.'},
                { text: 'Outro', description: 'Outra orientação sexual'}
            ],
            nomeRules: [
                v => !!v || 'Nome é obrigatório'
            ],
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
        }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    created() {
        this.$http({
                method: 'GET',
                url:'paises.json',
                baseURL: 'http://localhost:8081'
        })
        .then(response =>{
            this.paises = response.data.map(pais => pais.nome_pais);
        })
        .catch(erro =>{
            console.log(erro);
        })
  },
    methods:{
        save (date) {
            console.log(date);
            this.$refs.menu.save(date);
      },
    }
}
</script>