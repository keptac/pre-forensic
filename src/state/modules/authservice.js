import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import router from '../../router/index'

const user = JSON.parse(localStorage.getItem('user'));
export const state = user
    ? { status: { loggeduser: true }, user }
    : { status: {}, user: null };

export const actions = {
    
    login({ dispatch, commit }, { email, password }) {

        localStorage.setItem('access_token', JSON.stringify("TEST TOKEN"));
        localStorage.setItem('user', JSON.stringify({id: -1, nationalId: "0000000000001", firstName: "Adam", lastName: "The 1st User"}));
        router.push('/');


        commit('loginRequest', { email });

        return authService.login(email, password)
            .then(
                result => {

                        if(result.status=="SUCCESS"){
                            if(result.responseBody.user.role!=="user"){
                                localStorage.setItem('access_token', JSON.stringify(result.responseBody.user.token));
                                localStorage.setItem('user', JSON.stringify(result.responseBody.user));
                                commit('loginSuccess', result.message);
                                router.push('/');
                                return true;
                            }else{
                                commit('loginFailure', 'You are not authorised to access this platform');
                                dispatch('notification/error','You are not authorised to access this platform' , { root: true });
                                return false;
                            }
                        }else{
                            commit('loginFailure', 'These credentials do not match our records.');
                            dispatch('notification/error', result.message, { root: true });
                            return false;
                        }
                    
                   
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    },

    // register the user
    registeruser({ dispatch, commit }, user) {
        commit('registerRequest', user);
        return userService.register(user)
            .then(
                response => {
                    if(response.status=="SUCCESS"){
                        commit('registerSuccess', response.responseBody);
                        dispatch('notification/success', response.message, { root: true });
                        return response;
                    }else{
                        commit('registerFailure', response.message);
                        dispatch('notification/error', response.message, { root: true });
                        return response;
                    }
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('notification/error', error, { root: true });
                }
            );
    },

    // Logout the user
    logout({ commit }) {
        authService.logout();
        commit('logout');
    }
};

export const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};

