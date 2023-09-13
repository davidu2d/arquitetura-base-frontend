export default{
    login:(login) => {
        var params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client', 'ingressosbr-web');
        params.append('username', login.username);
        params.append('password', login.password);
        return this.$http({
            method: 'post',
            url:'oauth/token',
            auth:{username: 'ingressosbr-web', password: '415782@U2d'},
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            data: params
        })
    }
}