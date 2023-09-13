import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login/Login.vue'
import RecuperaSenha from '../views/login/RecuperaSenha.vue'
import CadastroUsuario from '../views/cadastros/CadastroUsuario.vue'
import CadastroOperador from '../views/cadastros/CadastroOperador.vue'
import Configuracao from '../views/configuracoes/Configuracao.vue'
import CancelarVenda from '../views/operacoes/CancelarVenda.vue'
import ConsultarVenda from '../views/operacoes/ConsultarVenda.vue'
import EfetuarVenda from '../views/operacoes/EfetuarVenda.vue'
import MinhaConta from '../views/minhaConta/MinhaConta.vue'

Vue.use(VueRouter)

  const router = new VueRouter({
    mode:'hash',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
      },
      {
        path: '/recuperaSenha',
        name: 'RecuperaSenha',
        component: RecuperaSenha,
        meta: { requiresAuth: false }
      },
      {
        path: '/cadastroUsuario',
        name: 'CadastroUsuario',
        component: CadastroUsuario,
        meta: { requiresAuth: false }
      },
      {
        path: '/minhaConta',
        name: 'MinhaConta',
        component: MinhaConta,
        meta: { requiresAuth: true }
      },
      {
        path: '/cadastroOperador',
        name: 'CadastroOperador',
        component: CadastroOperador,
        meta: { requiresAuth: true }
      },
      {
        path: '/configuracoes',
        name: 'Configuracao',
        component: Configuracao,
        meta: { requiresAuth: true }
      },
      {
        path: '/cancelarVenda',
        name: 'CancelarVenda',
        component: CancelarVenda,
        meta: { requiresAuth: true }
      },
      {
        path: '/consultarVenda',
        name: 'ConsultarVenda',
        component: ConsultarVenda,
        meta: { requiresAuth: true }
      },
      {
        path: '/efetuarVenda',
        name: 'EfetuarVenda',
        component: EfetuarVenda,
        meta: { requiresAuth: true }
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        let token = localStorage.getItem('token')
        if (token === null && to.path !== '/login') {
            console.log("Usuário não autenticado");
            next('/login')
        }else {
          next()
      }
    } else {
        next()
    }
  })

export default router
