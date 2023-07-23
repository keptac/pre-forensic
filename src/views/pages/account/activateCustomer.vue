<script>

import { authService } from '../../../services/auth.service';

export default {
    data() {
      return {
        activationResponse: '',
        success: false,
        token:"",
        form: {
          password:"",
          verifyPassword:""
        },
      }
    },
  created() {

    this.activateAccount(this.$route.params.token);
  },

  methods: { 
    async activateAccount() {
      try {
          await authService.activateCustomerAccount(this.token,).then(response=>{console.log("----------------\n\n\n");
            if(response.status ==='SUCCESS'){
              this.activationResponse = response.message.replace("token", "account").replace("confirmed", "activated") + ". Rerouting to set password ...";
              this.success = true;
            }else{
              this.success = false;
              this.activationResponse = response.message.replace("Email","Account");
            }
            
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
    <div class="my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <div class="mb-1">
                <img src="@/assets/images/logo.png" alt="logo" height="100" />
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
                <h3 >{{this.activationResponse}}</h3>
              </b-alert>
              
              <b-alert
                variant="danger"
                class="mt-3"
                v-if="!this.success"
                show
              ><h5>{{this.activationResponse}}</h5></b-alert>

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