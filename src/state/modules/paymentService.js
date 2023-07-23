import { paymentService } from '../../services/payment.service';

export const state = { status: false };

export const actions = {
        async getAllTransactions({dispatch, commit}) {
        try {

            await paymentService.getAllTransactions().then(response=>{
                if(response.length>0){
                    commit('getTransactionsSuccess', response);
                    // return response;
                }
            });
           
        } catch (error) {
            commit('getTransactionsFailure', error);
            dispatch('notification/error', error, { root: true });
        }
    },

    async getTransactionByReference({dispatch, commit}, reference) {
        try {

            await paymentService.getAllTransactions(reference).then(response=>{
                if(response.length>0){
                    commit('getTransactionsSuccess', response);
                    // return response;
                }
            });
           
        } catch (error) {
            commit('getTransactionsFailure', error);
            dispatch('notification/error', error, { root: true });
        }
    },

        // register the shop
       async authorizeTransaction({ dispatch, commit }, shop) {
            commit('registerRequest', shop);
            return paymentService.authorizeTransaction(shop)
                .then(
                    response => {
                        console.log("------->>>> REGISTER SHOP", response);
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
};

export const mutations = {
    getTransactionsSuccess(state) {
        state.status = true;
    },
    getTransactionsFailure(state) {
        state.status = false;
    },
    registerSuccess(state) {
        state.status = true;
    },
    registerFailure(state) {
        state.status = true;
    },
};

