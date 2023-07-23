import store from '@/state/store'

export default [{
        path: '*',
        name: '404',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('../views/pages/utility/error-404')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters['auth/loggedIn']) {
                    next({ name: 'home' })
                } else {
                    next()
                }
            },
        },
    },

    {
        path: '/password-reset',
        name: 'Password Reset',
        component: () =>
            import ('../views/pages/account/password-reset'),
            meta: {
                beforeResolve(routeTo, routeFrom, next) {
                    if (store.getters['auth/loggedIn']) {
                        next({ name: 'home' })
                    } else {
                        next()
                    }
                },
            },
    },

    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () =>
            import ('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters['auth/loggedIn']) {
                    next({ name: 'home' })
                } else {
                    next()
                }
            },
        },
    },

    // Activate Account
    {   path: '/verify/:token',
        name: 'verify',
        component: () =>
            import ('../views/pages/account/activateCustomer.vue'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (!store.getters['auth/loggedIn']) {
                    next()
                }
            },
        }

    },

    {
        path: '/verify-agent/:token',
        name: 'verify',
        component: () =>
            import ('../views/pages/account/activate'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {

                if (!store.getters['auth/loggedIn']) {
                    next()
                }
            },
        }

    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {

                store.dispatch('authservice/logout')

                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                        (route) => route.push('/login')
                    )
                    // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? { name: 'home' } : {...routeFrom })
            },
        },
    },
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: true,
        },
        component: () =>
            import ('../views/pages/dashboard/index')
    },



    //new routes

    {
        path: '/reports/input-data',
        name: 'Remittances Report',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/reports/inputData')
    },

    {
        path: '/reports/keywords',
        name: 'Keywords and anomalies',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/reports/keywords')
    },

    {
        path: '/reports/risks',
        name: 'Behavioural Risk',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/reports/risks')
    },

    {
        path: '/reports/tagged-data',
        name: 'Tagged Data',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/reports/taggedData')
    },
    

        //USER MANAGEMENT
        {
            path: '/users/registration',
            name: 'User Registration',
            meta: { authRequired: true },
            component: () =>
                import ('../views/pages/user-management/registration')
        },
        {
            path: '/users',
            name: 'View Users',
            meta: { authRequired: true },
            component: () =>
                import ('../views/pages/user-management/userlist')
        },
    


    //AUXILIARY PAGES

    {
        path: '/pages/error-404',
        name: 'Error-404',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/utility/error-404')
    },
    {
        path: '/pages/error-500',
        name: 'Error-500',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/utility/error-500')
    },


    {
        path: '/charts/apex',
        name: 'Apex chart',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/charts/apex')
    },
    {
        path: '/charts/chartjs',
        name: 'Chartjs chart',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/charts/chartjs/index')
    },
    {
        path: '/charts/chartist',
        name: 'Chartist chart',
        meta: { authRequired: true },
        component: () =>
            import ('../views/pages/charts/chartist')
    },
]