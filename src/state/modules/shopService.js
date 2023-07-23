import { shopService } from '../../services/shop.service';

export const state = { status: false };

export const actions = {
        async getAllShops({dispatch, commit}) {
        try {

            await shopService.getAllShops().then(response=>{
                if(response.length>0){
                    commit('getShopsSuccess', response);
                    // return response;
                }
            });
           
        } catch (error) {
            commit('getShopsFailure', error);
            dispatch('notification/error', error, { root: true });
        }
    },

        // register the shop
       async authorizeTransaction({ dispatch, commit }, shop) {
            commit('authorizeTransaction', shop);
            return shopService.authorizeTransaction(shop)
                .then(
                    response => {
                        console.log("------->>>> REGISTER SHOP", response);
                        if(response.status=="SUCCESS"){
                            commit('authorizeTransactionSuccess', response.responseBody);
                            dispatch('notification/success', response.message, { root: true });
                            return response;
                        }else{
                            commit('authorizeTransactionFailure', response.message);
                            dispatch('notification/error', response.message, { root: true });
                            return response;
                        }
                    },
                    error => {
                        commit('authorizeTransactionFailure', error);
                        dispatch('notification/error', error, { root: true });
                    }
                );
        },
};

export const mutations = {
    getShopsSuccess(state) {
        state.status = true;
    },
    getShopsFailure(state) {
        state.status = false;
    },
    authorizeTransactionSuccess(state) {
        state.status = true;
    },
    authorizeTransactionFailure(state) {
        state.status = true;
    },
};

