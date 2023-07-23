<script>
import { required, email } from "vuelidate/lib/validators";
import { authService } from '../../../services/auth.service';

export default {
  data() {
    return {
      email: "",
      resetOTP:"",
      newPassword:"",
      message:"",
      submitted: false,
      responseReturned:false,
      resetOTPSent:false,
      passwordSet:false
    };
  },

  created() {
    document.body.classList.add("auth-body-bg");
  },
  validations: {
    email: { required, email },
  },
  methods: {

    async forgotPassword() {
          this.$v.$touch();
          this.submitted = true;
          if (this.$v.$invalid) {
            return;
          } else {
            try {
            await authService.forgotPassword(this.email).then(response=>{
              if(response.status ==='SUCCESS'){
                this.success = true;
                this.responseReturned = true;
                this.message = response.message
                this.resetOTPSent = true;
              }else{
                this.submitted = false;
                this.success = false;
                
                this.responseReturned = true;
                this.message = response.message
              }
              
            });
        } catch (error) {
              console.log(error);
        }
      }
    },

    async resetPassword() {
          this.responseReturned = false;
          this.message = "";
          this.$v.$touch();
          this.submitted = true;
          if (this.$v.$invalid) {
            return;
          } else {
            try {
            await authService.passwordReset(this.email, this.resetOTP, this.newPassword).then(response=>{

              if(response.status ==='SUCCESS'){
                this.success = true;
                this.responseReturned = true;
                this.passwordSet = true;
                this.message = response.message;
              }else{
                this.submitted = false;
                this.success = false;
                this.responseReturned = true;
                this.message = response.message
              }
            });
        } catch (error) {
              console.log(error);
        }
      }
    },

  }
};
</script>

<template>


<div>
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-lg-5">
              <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div class="w-100">
                  <div class="row justify-content-center">
                    <div class="col-lg-9">
                      <div>
                        <div class="text-center">
                          <div>
                            <a href="/" class="logo">
                              <img src="@/assets/images/company_logo.png" height="70" alt="logo" />
                            </a>
                          </div>
  
                          <h4 class="font-size-18 mt-4">Password Reset</h4>
                        </div>
                        <div class="mt-5 text-center">
                          <p>
                            © 2023 Pre-Forensics.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7"  id="right-login">
              <div class="legend-login">
                <div class="text-center p-2 mt-5">
                  <p class="font-size-20 text-muted">Enter email to send reset link.</p>
                </div>
 
                <b-alert
                :variant="success?'success':'danger'"
                class="mt-3"
                v-if="responseReturned"
                show
                dismissible
              >{{message}}</b-alert>

              <form class="form-horizontal" @submit.prevent="forgotPassword" v-if="!resetOTPSent">
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


                              <div class="mt-4 text-center">
                                <button
                                  class="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                >Reset Password</button>
                              </div>

                              
              </form>

              <div v-if="!passwordSet">
                <form class="form-horizontal" @submit.prevent="resetPassword" v-if="resetOTPSent">
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
                    <i class="ri-mail-line auti-custom-input-icon"></i>
                    <label for="email">Reset OTP</label>
                      <input
                      type="text"
                      v-model="resetOTP"
                      class="form-control"
                      id="resetOTP"
                      placeholder="Enter reset OTP"
                    />
                  </div>
                  <div class="form-group auth-form-group-custom mb-4">
                    <i class="ri-mail-line auti-custom-input-icon"></i>
                    <label for="email">New Password</label>
                    <input
                      type="password"
                      v-model="newPassword"
                      class="form-control"
                      id="newPassword"
                      placeholder="Enter New Password"
                    />
                  </div>

                  <div class="mt-4 text-center">
                    <button
                      class="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >Set Password</button>
                  </div>
                </form>
              </div>
              <div class="mt-4 text-center">
                <router-link tag="a" to="/login" class="text-muted font-size-18">
                  <i class="mdi mdi-lock mr-1"></i> Log In
                </router-link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>