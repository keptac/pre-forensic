<script>
import simplebar from "simplebar-vue";
import { layoutComputed } from "@/state/helpers";

import MetisMenu from "metismenujs/dist/metismenujs";

import { superAdminMenuItems } from "./roles/superadmin";
// import { tellerMenuItems } from "./roles/teller-menu";
// import { shopAdminMenuItems } from "./roles/shopadmin-menu";
// import { operationFinanceMenuItems } from "./operation-finance-menu";

export default {
  components: {
    simplebar,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userRole:  JSON.parse(localStorage.getItem('user')).role,
      menuItems: [],
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem('accessRights')))
    this.menuItems = JSON.parse(localStorage.getItem('accessRights'));
    this.menuItems = superAdminMenuItems;
    // if(this.userRole==="super-admin"){
    //   this.menuItems = superAdminMenuItems;
    // }else if(this.userRole==="shop-admin"){
    //   this.menuItems = shopAdminMenuItems;
    // }else if(this.userRole==="user"){
    //    this.menuItems = tellerMenuItems;
    // }
  },
  computed: {
    ...layoutComputed,
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu("#side-menu");
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("mm-active");
        const parent2 = parent.parentElement.closest("ul");
        if (parent2 && parent2.id !== "side-menu") {
          parent2.classList.add("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("mm-active");
            var childAnchor = parent3.querySelector(".has-arrow");
            var childDropdown = parent3.querySelector(".has-dropdown");
            if (childAnchor) childAnchor.classList.add("mm-active");
            if (childDropdown) childDropdown.classList.add("mm-active");

            const parent4 = parent3.parentElement;
            if (parent4 && parent4.id !== "side-menu") {
              parent4.classList.add("mm-show");
              const parent5 = parent4.parentElement;
              if (parent5 && parent5.id !== "side-menu") {
                parent5.classList.add("mm-active");
                const childanchor = parent5.querySelector(".is-parent");
                if (childanchor && parent5.id !== "side-menu") {
                  childanchor.classList.add("mm-active");
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    onRoutechange() {
      setTimeout(() => {
        const currentPosition = document.getElementsByClassName("mm-active")[0]
          .offsetTop;
        if (currentPosition > 400)
          this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
            currentPosition + 200;
      }, 300);
    },
  },
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar");
              document.body.removeAttribute("data-sidebar-size");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "light");
              document.body.removeAttribute("data-sidebar");
              document.body.removeAttribute("data-sidebar-size");
              document.body.classList.remove("vertical-collpsed");
              break;
            case "compact":
              document.body.setAttribute("data-sidebar-size", "small");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "icon":
              document.body.setAttribute("data-keep-enlarged", "true");
              document.body.classList.add("vertical-collpsed");
              document.body.setAttribute("data-sidebar", "dark");
              document.body.removeAttribute("data-topbar", "dark");
              break;
            case "colored":
              document.body.setAttribute("data-sidebar", "colored");
              document.body.removeAttribute("data-keep-enlarged");
              document.body.classList.remove("vertical-collpsed");
              document.body.removeAttribute("data-sidebar-size");
              break;
            default:
              document.body.setAttribute("data-sidebar", "light");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};
</script>
<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu sidebar-flex">
    <div class="sidebar-flex-inner">
      <simplebar class="h-100 sidebar-content" ref="currentMenu" id="my-element">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
          <!-- Left Menu Start -->
          <ul class="metismenu list-unstyled" id="side-menu">
            <template v-for="item in menuItems">
              <li class="menu-title" v-if="item.isTitle" :key="item.id">
                {{ $t(item.title) }}
              </li>

              <!--end Layouts menu -->
              <li v-if="!item.isTitle && !item.isLayout" :key="item.id">
                <a
                  v-if="hasItems(item)"
                  href="javascript:void(0);"
                  class="is-parent"
                  :class="{
                    'has-arrow': !item.badge,
                    'has-dropdown': item.badge,
                  }"
                >
                  <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                  <span>{{ $t(item.title) }}</span>
                  <span
                    :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                    v-if="item.badge"
                    >{{ $t(item.badge.text) }}</span
                  >
                </a>



                <router-link
                  :to="item.link"
                  v-if="!hasItems(item)"
                  class="side-nav-link-ref"
                  :class="{'active-menu': $route.path === item.link}"
                >
                  <i :class="`bx ${item.icon}`" v-if="item.icon"></i>
                  <span>{{ $t(item.title) }}</span>
                  <span
                    :class="`badge badge-pill badge-${item.badge.variant} float-right`"
                    v-if="item.badge"
                    >{{ $t(item.badge.text) }}</span
                  >
                </router-link>
                <ul v-if="hasItems(item)" class="sub-menu" aria-expanded="false">
                  <li v-for="(subitem, index) of item.subItems" :key="index">
                    <router-link
                      :to="subitem.link"
                      v-if="!hasItems(subitem)"
                      class="side-nav-link-ref"
                      >{{ $t(subitem.title) }}</router-link
                    >
                    <a
                      v-if="hasItems(subitem)"
                      class="side-nav-link-a-ref has-arrow"
                      href="javascript:void(0);"
                      >{{ subitem.title }}</a
                    >
                    <ul
                      v-if="hasItems(subitem)"
                      class="sub-menu mm-collapse"
                      aria-expanded="false"
                    >
                      <li
                        v-for="(subSubitem, index) of subitem.subItems"
                        :key="index"
                      >
                        <router-link
                          :to="subSubitem.link"
                          class="side-nav-link-ref"
                          >{{ $t(subSubitem.title) }}</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </simplebar>
      <div class="sidebar-bottom-image">
        <a href="index.html" class="logo logo-dark">
          <span class="logo-lg">
            <img src="@/assets/images/company-logo-bottom.png" alt height="40" />
          </span>
        </a>
      </div>
    </div>
  </div>
  <!-- Left Sidebar End -->
</template>