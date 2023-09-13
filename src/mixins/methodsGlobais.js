const methodsGlobais = {
    data () {
        return {
            isAuthorized: localStorage.getItem('token') !== null ? true : false,
            loginUsuario: '',
        }
    },
    methods:{
        removeMascaraCNPJ(cnpj){
            cnpj = cnpj.replace(".", "");
            cnpj = cnpj.replace(".", "");
            cnpj = cnpj.replace("-", "");
            cnpj = cnpj.replace("/", "");
        return cnpj;
        },
        removeMascaraCEP(cep){
            cep = cep.replace(".", "");
            cep = cep.replace("-", "");
        return cep;
        },
        formatDateLocaleBR(date){
            return date = this.$moment(date).format('DD/MM/YYYY')
        },
        toRoute(nameRota){
            this.$router.push({ name: nameRota }).catch(()=>{});
        }
    }
}
export default methodsGlobais