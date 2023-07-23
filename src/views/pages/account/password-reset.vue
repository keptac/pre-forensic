<script>
import { required, email } from "vuelidate/lib/validators";

import {
  authServiceMethods,
  notificationMethods
} from "@/state/helpers";


import { authService } from '../../../services/auth.service';

export default {
  data() {
    return {
      email: "",
      password: "",
      newPassword: "",
      submitted: false
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
    password: { required },
    newPassword: { required }
  },
  methods: {

    ...authServiceMethods,
    ...notificationMethods,

    async passwordReset() {
      try {
        const { email, password, newPassword } = this;
          await authService.passwordReset({email, password, newPassword}).then(response=>{
            console.log(response)
          });
      } catch (error) {
            console.log(error);
      }
    },

  }
};
</script>

<template>
  <div>

    <div>
      <div class=" login-page">
      <div class="container hq-template">
          <div class="login-block col-lg-5 col-md-6 col-sm-10 col-10">
              <img class="mb-1 login-logo" src="@/assets/images/company_logo.png">
              <b-alert
                variant="danger"
                class="mt-3"
                v-if="notification.message"
                show
                dismissible
              >{{notification.message}}</b-alert>

              <form class="form-horizontal" @submit.prevent="passwordReset">
                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-mail-line auti-custom-input-icon"></i>
                                <label for="email">Email</label>
                                <input
                                  type="email"
                                  v-model="email"
                                  class="form-control"
                                  id="email"
                                  placeholder="Enter email"
                                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                                />
                                <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                                  <span v-if="!$v.email.required">Email is required.</span>
                                  <span v-if="!$v.email.email">Please enter valid email.</span>
                                </div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                <label for="userpassword">Password</label>
                                <input
                                  v-model="password"
                                  type="password"
                                  class="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                                />
                                <div
                                  v-if="submitted && !$v.password.required"
                                  class="invalid-feedback"
                                >Password is required.</div>
                              </div>

                              <div class="form-group auth-form-group-custom mb-4">
                                <i class="ri-lock-2-line auti-custom-input-icon"></i>
                                <label for="newuserpassword">New Password</label>
                                <input
                                  v-model="newPassword"
                                  type="password"
                                  class="form-control"
                                  id="newuserpassword"
                                  placeholder="Enter New Password"
                                  :class="{ 'is-invalid': submitted && $v.newPassword.$error }"
                                />
                                <div
                                  v-if="submitted && !$v.newPassword.required"
                                  class="invalid-feedback"
                                >New Password is required.</div>
                              </div>

                              <div class="mt-4 text-center">
                                <button v-if="!submitted"
                                  class="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                >Reset Password</button>
                                <div class="spinner" v-if="submitted">
                                  <i class="ri-loader-line spin-icon"></i>
                                </div>
                              </div>

                              <div class="mt-4 pb-3 text-center">
                               
                              </div>
                            </form>
          </div>
      </div>
      <div class="copyright">
        © 2023 Pre-Forensics.
    <br/>
        v0.1.0.
      </div>
      </div>
    </div>
  </div>
</template>