<script>

  import { authService } from '../../../services/auth.service';
  import { required } from "vuelidate/lib/validators";
  
  export default {
      data() {
        return {
          activationResponse: 'Set your password below to activate your account',
          success: false,
          passwordSet:false,
          token:"",
          password:"",
          submitted: false,
        }
      },
    created() {
      this.token = this.$route.params.token;
    },


  
    validations: {
        password: { required }
      },
  
    methods: { 
      async activateAccount() {
          
          this.$v.$touch();
          if (this.$v.$invalid) {
            return;
          } else {
            this.passwordSet = true
            this.submitted = true;
            try {
            await authService.activateAgentAccount(this.token, this.password).then(response=>{

              if(response.body.status ==='SUCCESS'){
                this.activationResponse = response.body.message.replace("token", "account").replace("confirmed", "activated") + ". Proceed to login.";
                this.success = true;
              }else{
                this.submitted = false;
                this.success = false;
                this.activationResponse = response.body.message.replace("Email","Account");
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
      <div class="my-5 pt-sm-5">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="text-center">
                <div class="mb-1">
                  <img src="@/assets/images/company_logo.png" alt="logo" height="200" />
                </div>
  
                <div class="row justify-content-center">
                  <div class="col-sm-4">
                    <div class="activate-img">
                      <img
                        v-if="success"
                        src="@/assets/images/welcome.jpg"
                        alt
                        class="img-fluid mx-auto d-block"
                        height="100"
                      />
                    </div>
                  </div>
                </div>
  
                
                <b-alert
                  variant="success"
                  class="mt-3"
                  v-if="this.success"
                  show
                >
                  <h3>Welcome to Pre-Forensics</h3>
                  <h5 >{{this.activationResponse}}</h5>
                  <div class="mt-3 text-center">
                                <router-link tag="a" to="/login" class="font-size-18">
                                  <i class="mdi mdi-lock mr-1"></i> Proceed to Login
                                </router-link>
                              </div>
                </b-alert>
                
                <b-alert
                  variant="danger"
                  class="mt-3"
                  v-if="!this.success && this.passwordSet"
                  show
                ><h5>{{this.activationResponse}}</h5></b-alert>

                <b-alert
                  variant="warning"
                  class="mt-3"
                  v-if="!this.passwordSet"
                  show
                ><h5>{{this.activationResponse}}</h5></b-alert>
  
                <form v-if="!this.success" class="activation-area" @submit.prevent="activateAccount">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                            <label for="validationCustom04">Set new password</label>
                            <input
                              id="validationCustom03"
                              v-model="password"
                              type="password"
                              class="form-control"
                              placeholder="Enter Password"
                              :class="{ 'is-invalid': $v.password.$error }"
                            />
                            <div v-if="$v.password.$error" class="invalid-feedback">
                                  <span v-if="!$v.password.required">Please enter password.</span>
                                </div>
                        </div>
                      </div>
                    </div>
                    
                  <button class="btn btn-primary" type="submit" v-if="!submitted">Activate Account</button>
                  <div class="spinner" v-if="submitted">
                      <i class="ri-loader-line spin-icon"></i>
                    </div>
                </form>
  
                <div class="row">
                  <div class="col-md-4">
                    <div class="mt-4 activate-box">
                      <div class="p-3">
                        <div class="avatar-sm mx-auto">
                          <span class=" ">
                            <img src="@/assets/images/playstore.png" alt="logo" height="50" />
                          </span>
                        </div>
  
                        <h5 class="font-size-15 text-uppercase mt-4">Google Playstore</h5>
                        <p class="mb-0">
                          Download Pre-Forensics for Android 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mt-4 activate-box">
                      <div class="p-3">
                        <div class="avatar-sm mx-auto">
                          <span class="avatar-title bg-soft-primary rounded-circle">
                            <img src="@/assets/images/appstore.png" alt="logo" height="50" />
                          </span>
                        </div>
                        <h5 class="font-size-15 text-uppercase mt-4">Apple Store</h5>
                        <p class=" mb-0">
                        Download Pre-Forensics for IOS
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mt-4 activate-box">
                      <div class="p-3">
                        <div class="avatar-sm mx-auto">
                          <span class="avatar-title bg-soft-primary rounded-circle">
                            <i class="mdi mdi-email-outline font-size-24 text-primary"></i>
                          </span>
                        </div>
                        <h5 class="font-size-15 text-uppercase mt-4">Do you need Support?</h5>
                        <p class="text-muted mb-0">
                          <a
                            href="mailto:ackdevelopers@gmail.com"
                            class="text-decoration-underline"
                          >support@acksolutions.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end row -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>