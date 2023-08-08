<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { userService } from '../../../services/user.service';
import { shopService } from '../../../services/shop.service';
import { rolesService } from '../../../services/roles.service';

import {
  authServiceMethods,
  notificationMethods
} from "@/state/helpers";

  const initForm = { firstName: "", lastName: "", nationalId: "", phoneNumber: null, 
    email: "", location: "", role: "", userType: "", password: "", createdBy: JSON.parse(localStorage.getItem('user')).id
  };

export default {
  page: {
    title: "",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      tableData: [],
      shopList:[],
      roles:[],
      user:{},
      title: "",
      items: [
        {
          text: "",
          active: true
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "lastName", sortable: true },
        { key: "firstName", sortable: true },
        { key: "nationalId", sortable: true},
        { key: "email", sortable: true },
        { key: "phoneNumber", sortable: true },
        { key: "location", sortable: true },
        { key: "shopId", sortable: true },
        { key: "userType", sortable: true },
        // { key: "activityHistory", sortable: true },
        { key: "actions", sortable: true}
      ],
      form: {
        id:null,
        phoneNumber: null,
        email: null,
        location: "null",
        password: null, 
        firstName: null,
        lastName:null,  
        nationalId: null,
        role: null,
        userType: null,
        customerType:null,
        roleId:null,
        shopId: null,
        createdBy: JSON.parse(localStorage.getItem('user')).id,
      },
      submitted: false,
        submitform: false,
        submit: false,
        notificationType:"",
        noticationIcon: "",
        notificationMessage :false
    };
  },

  created() {
    this.loadAllUsers();
    this.loadAllShops();
    this.loadRoles();
  },

  computed: {
    rows() {
      return this.tableData.length;
    },
    notification() {
          return this.$store ? this.$store.state.notification : null;
        }
  },


  mounted() {
    this.totalRows = this.items.length;
  },

  methods: {
    ...authServiceMethods,
    ...notificationMethods,

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async loadAllShops() {
          try {
              await shopService.getAllShops().then(response=>{
                  if(response.responseBody.length>0){
                      this.shopList = response.responseBody;
                  }
              });
          } catch (error) {
              console.log(error);
          }
      },
  
      async loadRoles() {
          try {
              await rolesService.getAllRoles().then(response=>{
                  if(response.responseBody.length>0){
                      this.roles = response.responseBody;
                  }
              });
          } catch (error) {
              console.log(error);
          }
      },

    async loadAllUsers() {
      const rowsToBeRemoved = ["-1","0"];
        try {
        await userService.getUserByType("agent").then(response=>{
            if(response.responseBody.length>0){
              rowsToBeRemoved.forEach(element => {
                const indexOfObject = response.responseBody.findIndex(object => {
                  return object.id == element;
                });
                response.responseBody.splice(indexOfObject, 1);
              });
                this.tableData = response.responseBody;
            }
          });
        } catch (error) {
          console.log(error);
        }
    },

    storeState(user){
      this.form = user;
      this.user = user;
    },

    disableUser(user, status){
      this.form = user;
      this.form.enabled = !status;
      this.form.locked = status;
      this.editUser();
    },

    editUser() {
      this.submitted = true;
          const {form} = this;
          const userForm = {
            "operation" : "registration",
            "accessToken" : JSON.parse(localStorage.getItem('access_token')),
            "requestBody" : form
          }

          userService.editUser(userForm).then(result=>{
            if(result.status=="SUCCESS"){
              this.notificationType = "success";
              this.noticationIcon = "mdi-check-all";
              this.notificationMessage = result.message;
              this.submitted = false;
              this.form = Object.assign({}, initForm);
              this.loadAllUsers();
            } else {
              this.notificationMessage = result.message;
              this.notificationType = "danger";
              this.noticationIcon = "mdi-block-helper";
            }
          }
        );
    },
  }
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />
    <div class="row">
      <b-modal size="lg" id="modal-standard" title="Edit User" title-class="font-18" hide-footer>
                      <div class="card-body">
                        <b-alert
                          :variant="notificationType" 
                          class="mt-3"
                          v-if="notificationMessage"
                          show
                          dismissible
                        >
                          <i :class="'mdi '+ noticationIcon + ' mr-2'"></i>{{notificationMessage}}
                        </b-alert>
                        <form class="needs-registration" @submit.prevent="editUser">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="validationCustom01">First Name</label>
                                <input
                                  id="validationCustom01"
                                  v-model="form.firstName"
                                  type="text"
                                  class="form-control"
                                  placeholder="First Name"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="validationCustom02"> Surname </label>
                                <div>
                                  <input
                                    id="validationCustom02"
                                    v-model="form.lastName"
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter Surname"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                                <label for="validationCustom02"> ID Number </label>
                                <div>
                                  <input
                                    id="validationCustom02"
                                    v-model="form.nationalId"
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter National ID"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="validationCustom01">Phone Number</label>
                                <input
                                  id="validationCustom01"
                                  v-model="form.phoneNumber"
                                  type="number"
                                  class="form-control"
                                  placeholder="Phone Number"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="validationCustom02"> Email Address</label>
                                <div>
                                  <input
                                    id="validationCustom02"
                                    v-model="form.email"
                                    type="email"
                                    class="form-control"
                                    placeholder="Enter email address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>



                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom03">Physical Address</label>
                                <input
                                  id="validationCustom03"
                                  v-model="form.location"
                                  type="text"
                                  class="form-control"
                                  placeholder="Physical Address"
                                />
                              </div>
                            </div>
                          </div>

                    <div class="row" v-if="form.roleId > 0 ">
                      <div class="col-md-6">
                          <div class="form-group">
                              <label>Select Shop</label>
                              <select class="form-control" v-model="form.shopId" >
                                  <option v-for="(shop, index) in shopList" :value="shop.id" :key="index">{{shop.name}}</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>User Role</label>
                            <select class="form-control" v-model="form.roleId" >
                              <option v-for="role in roles" :value="role.id" :key="role.id" :disabled="role.title.includes('Super Admin')">{{role.title}}</option>
                            </select>

                        </div>
                      </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Save changes</button>
                  </form>
              </div>
      </b-modal>
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template #cell(actions)="row">
                  <a
                    @click="storeState(row.item)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Edit"
                  >
                    
                  <i v-b-modal.modal-standard class="mdi mdi-pencil font-size-18" ></i>
               
                  </a>
                <a
                  v-if="row.item.enabled"
                    @click="disableUser(row.item, true)"
                    href="javascript:void(0);"
                    class="text-danger"
                    v-b-tooltip.hover
                    title="Disable"
                  >
                    <i class="mdi mdi-cancel font-size-18"></i>
                </a>
                <a
                  v-if="!row.item.enabled"
                    @click="disableUser(row.item, false)"
                    href="javascript:void(0);"
                    class="text-success"
                    v-b-tooltip.hover
                    title="Enable User"
                  >
                    <i class="mdi mdi-check font-size-18"></i>
                </a>

              </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>