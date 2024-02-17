import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Profil from '@/views/Profil.vue'
import SearchUser from '@/views/SearchUser.vue'
import * as Error from '@/views/errors'
import * as Auth from '@/views/auth'
import * as Discussion from '@/views/discussions'
import * as Contact from '@/views/contacts'
import * as GetStartedVue from '@/views/auth/GetStartedVue.vue'

const routes = [
  {
    path: '/get-stated',
    name: 'get-stated',
    component: GetStartedVue,
    meta: {title: 'TP Web Avancé Master 1 IFRI réalisé en groupe'}
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {title: 'Home'}
  },
  {
    path: '/profil',
    name: 'profil',
    component: Profil,
    meta: {title: 'Profil', requiresAuth: true},
  },
  {
    path: '/search/user',
    name: 'search_user',
    component: SearchUser,
    meta: {title: 'Search User', requiresAuth: true}
  },
  {
    path: '/',
    component: Auth.Layout,
    children: [
      { path: '/', name: 'demarrage', component: Auth.Demarrage, meta: {title: "Page de Démarrage", requiresAuth: false}},
      { path: '/login', name: 'login', component: Auth.Login, meta: {title: 'Login', requiresAuth: false} },
      { path: '/register', name: 'register', component: Auth.Register, meta: {title: 'Register', requiresAuth: false} },
      { path: '/reset/password', name: 'reset_pwd', component: Auth.ResetPassword, meta: {title: 'Reset Password', requiresAuth: false} },
    ]
  },
  {
    path: '/discussions',
    component: Discussion.Layout,
    children: [
      {path: '/discussions', name: 'discussions', component: Discussion.Disc, meta: {title: 'Discussions', requiresAuth: true}},
      {path: '/archived/discussions', name: 'archived_disc', component: Discussion.ArchivedDisc, meta: {title: 'Archived Discussions', requiresAuth: true}},
      {path: '/private/discussions', name: 'private_disc', component: Discussion.PrivateDisc, meta: {title: 'Private Discussions', requiresAuth: true}},
      {path: '/group/discussions', name: 'group_disc', component: Discussion.GroupDisc, meta: {title: 'Group Discussions', requiresAuth: true}},
      {path: '/details/group/discussions', name: 'details_gd', component: Discussion.DetailsGD, meta: {title: 'Details Group Discussions', requiresAuth: true}},
      {path: '/details/private/discussions', name: 'details_pd', component: Discussion.DetailsPD, meta: {title: 'Details Private Discussions', requiresAuth: true}},
    ]
  },
  {
    path: '/contacts',
    component: Contact.Layout,
    children: [
      {path: '/contacts', name: 'contacts', component: Contact.Contacts, meta: {title: 'Contacts', requiresAuth: true}},
      {path: '/blocked/contacts', name: 'c_blocked', component: Contact.ContactBlocked, meta: {title: 'Contact Blocked', requiresAuth: true}},
      {path: '/requests/contacts', name: 'c_requests', component: Contact.ContactRequests, meta: {title: 'Contact Requests', requiresAuth: true}},
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error.Layout,
    children: [
        { path: '/:pathMatch(.*)*', name: '404', component: Error.PageNotFound, meta: {title: 'Page not found'} },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title+' | '+import.meta.env.VITE_APP_NAME

  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth && !localStorage.getItem('accessToken')) {
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    next({ name: 'login', query: { redirect: to.fullPath }})
  } else if ((!to.meta.requiresAuth || to.name === 'login' || to.name === '' || to.name === 'register') && localStorage.getItem('accessToken')) {
    // Si l'utilisateur est déjà connecté et tente d'accéder à une page non authentifiée,
    // rediriger vers la page de profil
    next({ name: 'profil' })
  } else {
    // Si l'utilisateur est authentifié ou si la route ne nécessite pas d'authentification,
    // accéder à la route
    next()
  }
})

export default router
