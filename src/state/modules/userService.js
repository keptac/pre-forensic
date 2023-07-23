import { userService } from '../../services/user.service';

export const state = { status: false };

export const actions = {
        async getAllUsers({dispatch, commit}) {
        try {

        await userService.getAllUsers().then(response=>{
                if(response.length>0){
                    commit('getUsersSuccess', response);
                    // return response;
                }
            });
           
        } catch (error) {
            commit('getUsersFailure', error);
            dispatch('notification/error', error, { root: true });
        }
    },

};

export const mutations = {
    getUsersSuccess(state) {
        state.status = true;
    },
    getUsersFailure(state) {
        state.status = false;
    },
};

