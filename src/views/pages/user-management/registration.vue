<script>
  import Layout from "../../layouts/main";
  import PageHeader from "@/components/page-header";
  import appConfig from "@/app.config";
  import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

  
  import {
    required,
    email,
    alphaNum,
    numeric
  } from "vuelidate/lib/validators";
  
  import { shopService } from '../../../services/shop.service';
  import { rolesService } from '../../../services/roles.service';
  
  import {
    authServiceMethods,
    notificationMethods
  } from "@/state/helpers";
  
    const initForm = { 
      firstName: null, 
      lastName: null, 
      nationalId: null, 
      phoneNumber: null, 
      email: null, 
      location: null,
      role: null, 
      roleId:null,
      password: "pass@123", 
      createdBy: JSON.parse(localStorage.getItem('user')).id,
      shopId: null
    };
  
  export default {
    page: {
      title: "User Registration",
      meta: [{ name: "description", content: appConfig.description }]
    },
    components: { Layout, PageHeader, VuePhoneNumberInput },
    data() {
      return {
        title: "User Registration",
        shopList:[],
        phonenumberResults: {},
        roles:[],
        items: [
          {
            text: "",
            href: "/"
          },
          {
            text: "User Registration",
            active: true
          }
        ],
  
        
        form: {
          
          firstName: null,
          lastName: null,
          email: null,
          password: "pass@123",
          phoneNumber: null,
          nationalId: null,
          role: null,
          roleId: null,
          userType: "agent",
          shopId: null,
          location: null,
          createdBy: JSON.parse(localStorage.getItem('user')).id,
        },
  
        submitted: false,
        submitform: false,
        submit: false,
        notificationType:"",
        noticationIcon: ""
      };
    },
    validations: {
      form: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: { required, numeric },
        nationalId: { required, alphaNum },
        role: { required },
        shopId: {required},
        location: {required}
      },
    },
      computed: {
        notification() {
          return this.$store ? this.$store.state.notification : null;
        }
    },
    created() {
        this.loadAllShops();
        this.loadRoles();
        // 
    },
    methods: {
      ...authServiceMethods,
      ...notificationMethods,

      onUpdatePhonenumber (payload) {
        this.phonenumberResults = payload.formattedNumber.replace("+","");
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
  
      formSubmit() {
        this.submitted = true;
        this.$v.$touch();
  
        if (this.$v.$invalid) {
          return;
        } else {
            const {form} = this;
            form.roleId = form.role.id;
            if(form.role.title.includes("supervisor") || form.role.title.includes("manager") || form.role.title.includes("branch")){
              form.role = "shop-admin"
            }else if(form.role.title.includes("teller")){
              form.role = "user";
            }else{
              form.role = "super-admin";
            }

            form.phoneNumber = this.phonenumberResults;
  
            const userForm = {
                  "operation" : "registration",
                  "accessToken" : JSON.parse(localStorage.getItem('access_token')),
                  "requestBody" : form
            }
  
            this.registeruser(userForm).then(result=>{
              if(result.status=="SUCCESS"){
                this.notificationType = "success";
                this.noticationIcon = "mdi-check-all";
                this.submitted = false;
                this.form = Object.assign({}, initForm);
              } else {
                this.submitted = false;
                this.notificationType = "danger";
                this.noticationIcon = "mdi-block-helper";
              }
            });
        }
      },
    }
  
  };
  </script>
  
  <template>
    <Layout>
      <PageHeader :title="title" :items="items" />
      <div class="row">
        <div class="col-lg-7">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">User Registration </h4>
              <p
                class="card-title-desc"
              >Register system users for different shops.</p>
              <form class="needs-registration" @submit.prevent="formSubmit">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="validationCustom01">First name</label>
                      <input
                        id="validationCustom01"
                        v-model="form.firstName"
                        type="text"
                        class="form-control"
                        placeholder="First name"
                        :class="{ 'is-invalid': submitted && $v.form.firstName.$error }"
                      />
                      <div v-if="submitted && $v.form.firstName.$error" class="invalid-feedback">
                        <span v-if="!$v.form.firstName.required">This value is required.</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="validationCustom02">Last name</label>
                      <input
                        id="validationCustom02"
                        v-model="form.lastName"
                        type="text"
                        class="form-control"
                        placeholder="Last name"
                        :class="{ 'is-invalid': submitted && $v.form.lastName.$error }"
                      />
                      <div v-if="submitted && $v.form.lastName.$error" class="invalid-feedback">
                        <span v-if="!$v.form.lastName.required">This value is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="validationCustom04">ID Number</label>
                      <div>
                        <input
                          id="validationCustom04"
                          v-model="form.nationalId"
                          type="text"
                          class="form-control"
                          placeholder="Enter ID Number"
                          :class="{ 'is-invalid': submitted && $v.form.nationalId.$error }"
                        />
                        <div v-if="submitted && $v.form.nationalId.$error" class="invalid-feedback">
                          <span v-if="!$v.form.nationalId.required">This value is required.</span>
                          <span v-if="!$v.form.nationalId.alphaNum">This value should be a valid ID Number.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="form-group">
                      <label for="validationCustom05">Phone Number</label>
                      <div>
                        <VuePhoneNumberInput
                          default-country-code="ZW"
                          required
                          v-model="form.phoneNumber"
                          @update="onUpdatePhonenumber"
                          :class="{ 'is-invalid': $v.form.phoneNumber.$error }"
                      />

                        <div v-if="submitted && $v.form.phoneNumber.$error" class="invalid-feedback">
                          <span v-if="!$v.form.phoneNumber.required">This value is required.</span>
                          <span v-if="!$v.form.phoneNumber.numeric">This value should be a valid phone number.</span>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>E-Mail</label>
                      <div>
                        <input
                          v-model="form.email"
                          type="email"
                          name="email"
                          class="form-control"
                          :class="{ 'is-invalid': submitted && $v.form.email.$error }"
                          placeholder="Enter a valid e-mail"
                        />
                        <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
                          <span v-if="!$v.form.email.required">This value is required.</span>
                          <span v-if="!$v.form.email.email">This value should be a valid email.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="row">
  
                <div class="col-md-12">
                    <div class="form-group">
                      <label for="validationCustom02">Physical Address</label>
                      <input
                        id="validationCustom02"
                        v-model="form.location"
                        type="text"
                        class="form-control"
                        placeholder="Address"
                        :class="{ 'is-invalid': submitted && $v.form.location.$error }"
                      />
                      <div v-if="submitted && $v.form.location.$error" class="invalid-feedback">
                        <span v-if="!$v.form.location.required">This value is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                              <label>Select Branch</label>
                              <select class="form-control" v-model="form.shopId" :class="{ 'is-invalid': submitted && $v.form.shopId.$error }">
                                  <option v-for="(shop, index) in shopList" :value="shop.id" :key="index">{{shop.name}}</option>
                              </select>
                              <div v-if="submitted && $v.form.shopId.$error" class="invalid-feedback">
                                  <span v-if="!$v.form.shopId.required">This value is required.</span>
                              </div>
                          </div>
                      </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>User Role</label>
                        <select class="form-control" v-model="form.role" :class="{ 'is-invalid': submitted && $v.form.role.$error }">
                          <option v-for="role in roles" :value="role" :key="role.id" :disabled="role.title.includes('Super Admin')">{{role.title}}</option>
                        </select>
                        <div v-if="submitted && $v.form.role.$error" class="invalid-feedback">
                          <span v-if="!$v.form.role.required">This value is required.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="spinner" v-if="submitted">
                                  <i class="ri-loader-line spin-icon"></i>
                              </div>
                <button v-if="!submitted" class="btn btn-primary" type="submit">Submit form</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <b-alert
            :variant="notificationType" 
            class="mt-3"
            v-if="notification.message"
            show
            dismissible
          >
            <i :class="'mdi '+ noticationIcon + ' mr-2'"></i>{{notification.message}}
          </b-alert>
        </div>
      </div>
    </Layout>
  </template>