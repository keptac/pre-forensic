import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader
  })
}

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 'changeLoaderValue'])

export const authServiceMethods = mapActions('authservice', ['login', 'registeruser', 'logout'])
export const userServiceMethods = mapActions('userService', ['getAllUsers'])
export const shopServiceMethods = mapActions('shopServices', ['getAllShops','registerShop'])
export const paymentServiceMethods = mapActions('payment', ['getAllTransactions','authorizeTransaction', 'getTransactionByReference'])

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])
