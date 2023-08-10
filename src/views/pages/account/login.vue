<script>
  import { required, email } from "vuelidate/lib/validators";
  
  import {
    authServiceMethods,
    notificationMethods
  } from "@/state/helpers";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        caseNumber:"#ENR1029",
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
      password: { required }
    },
    methods: {
  
      ...authServiceMethods,
      ...notificationMethods,
  
      tryToLogIn() {
        this.submitted = true;
        this.$v.$touch();
  
        if (this.$v.$invalid) {
          return;
        } else {
            const { email, password } = this;
            if (email && password) {
              this.login({ email, password });
              localStorage.setItem("caseNumber", this.caseNumber);
            }
        }
      }
    }
  };
  </script>
  
  <template>
    <div>
  
      <div>
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-lg-5 hidden-mobile">
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
  
                          <!-- <h4 class="font-size-18 mt-4">Welcome Back !</h4> -->
                        </div>
                        <div class="mt-5 text-center">
                          <p>
                            © 2023 Pre-Forensic.
                          </p>
                        </div>
                        <div class="mt-3 text-center">
                          <p>
                            v0.1.0-beta
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7"  id="right-login">
              <div class="legend-login justify-content-center ">
                      <div class="text-center mobile-display">
                            <a href="/" class="logo ">
                              <img src="@/assets/images/company_logo.png" height="50" alt="logo" />
                            </a>
                        </div>

                        <div class="text-center p-2 mt-5">
                          <p class="font-size-20 text-muted">Sign in Liminal Clarity AI.</p>
                        </div>
  
                        <b-alert
                          variant="danger"
                          class="mt-3"
                          v-if="notification.message"
                          show
                          dismissible
                        >{{notification.message}}</b-alert>
                      <div class="text-center ">
                          <form class="form-horizontal justify-content-center" @submit.prevent="tryToLogIn">
                            <div class="form-group auth-form-group-custom mb-4">
                              <i class="ri-mail-line auti-custom-input-icon"></i>
                              <label for="email">Case number</label>
                              <input
                                type="text"
                                v-model="caseNumber"
                                class="form-control "
                                id="caseNumber"
                                placeholder="Case Number"
                                :class="{ 'is-invalid': submitted }"
                              />
                            </div>
                            <div class="form-group auth-form-group-custom mb-4">
                              <i class="ri-mail-line auti-custom-input-icon"></i>
                              <label for="email">Email</label>
                              <input
                                type="email"
                                v-model="email"
                                class="form-control "
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
  
                            <div class="mt-4 text-center">
                              <button
                                class=" w-md waves-effect waves-light login-button"
                                type="submit"
                              >Log In</button>
                            </div>
  
                            <!-- <div class="mt-4 text-center">
                              <router-link tag="a" to="/forgot-password" class="text-muted font-size-18">
                                <i class="mdi mdi-lock mr-1"></i> Forgot your password?
                              </router-link>
                            </div> -->
                          </form>
                        </div>

                        <div class="mobile-display">
                        <div class="mt-5 text-center">
                          <p>
                            © 2023 Pre-Forensic.
                          </p>
                        </div>
                        <div class="mt-3 text-center">
                          <p>
                            v0.1.0-beta
                          </p>
                        </div>
                      </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>