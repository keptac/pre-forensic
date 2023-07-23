<script>

import i18n from "../i18n";

export default {
  data() {
    return {
      languages: [
        {
         
          language: "en",
          title: "English"
        },
      ],
      current_language: "en",
      userName: JSON.parse(localStorage.getItem('user')).firstName + ' '+JSON.parse(localStorage.getItem('user')).lastName,
      role:JSON.parse(localStorage.getItem('user')).role, 
    };
  },
  components: {  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
    randomiseUserProfile(){
      var avatarGender;
      (Math.random() < 0.3) ?  avatarGender="male" :  avatarGender="female"  
      return require.context('../assets/images/avatars/', false, /\.gif$/)('./' +  avatarGender +'.gif')
    },

    logoutSession(){
      location.reload(true);
    },
  }
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/company_logo_emblem.png" alt height="30" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/company_logo.png" alt height="40" />
            </span>
          </a>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block d-lg-none ml-2">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            id="page-header-search-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <!-- <i class="ri-search-line"></i> -->
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
            aria-labelledby="page-header-search-dropdown"
          >
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Search ..." />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            @click="initFullScreen"
          >
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <img  :src="randomiseUserProfile()" 
              height="100"
              class="rounded-circle header-profile-user"
            />
            <span class="d-none d-xl-inline-block ml-1">{{ $t(userName)}}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <div class="dropdown-item" href="#">
            <i class="ri-user-line align-middle mr-1"></i>
            {{ $t('navbar.dropdown.user.list.profile') }} ({{ $t(role)}}) 
          </div> 
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger" href="/#/logout" @click="logoutSession" >
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            {{ $t('navbar.dropdown.user.list.logout') }}
          </a>
        </b-dropdown>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>