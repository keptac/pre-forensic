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
  <div class="login-modern-bg">
    <!-- Subtle SVG background pattern -->
    <svg class="login-bg-svg" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;">
      <defs>
        <linearGradient id="bg-grad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#276858" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#6c63ff" stop-opacity="0.04"/>
        </linearGradient>
      </defs>
      <!-- Circles -->
      <circle cx="400" cy="200" r="100" fill="url(#bg-grad1)"/>
      <circle cx="1200" cy="700" r="80" fill="url(#bg-grad1)"/>
      <circle cx="900" cy="300" r="60" fill="url(#bg-grad1)"/>
      <circle cx="200" cy="800" r="40" fill="url(#bg-grad1)"/>
      <circle cx="700" cy="600" r="50" fill="url(#bg-grad1)"/>
      <circle cx="1100" cy="200" r="30" fill="url(#bg-grad1)"/>
      <circle cx="300" cy="500" r="25" fill="url(#bg-grad1)"/>
      <circle cx="1300" cy="400" r="35" fill="url(#bg-grad1)"/>
      <circle cx="600" cy="850" r="20" fill="url(#bg-grad1)"/>
      <circle cx="100" cy="300" r="15" fill="url(#bg-grad1)"/>
      <!-- Curved lines -->
      <path d="M0 150 Q 400 50 800 150 T 1440 150" stroke="url(#bg-grad1)" stroke-width="1" fill="none"/>
      <path d="M0 750 Q 700 900 1440 750" stroke="url(#bg-grad1)" stroke-width="1" fill="none"/>
    </svg>
    <div class="login-modern-container" style="position:relative;z-index:1;">
      <div class="login-modern-card">
        <div class="login-modern-logo">
          <img src="@/assets/images/company_logo.png" alt="logo" />
        </div>
        <div class="login-modern-title">Sign In</div>
        <b-alert
          variant="danger"
          class="mt-3"
          v-if="notification.message"
          show
          dismissible
        >{{notification.message}}</b-alert>
        <form class="login-modern-form" @submit.prevent="tryToLogIn">
          <div class="form-group">
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
          <div class="form-group">
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
          <button class="login-modern-btn" type="submit">Sign In</button>
        </form>
        <div class="login-modern-footer">
          <span>© 2025 Liminal. v0.2.0-beta</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-modern-bg {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9e7fd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.login-bg-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
.login-modern-container {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-modern-card {
  background: #fff;
  border-radius: 2.5rem;
  box-shadow: 0 8px 32px rgba(108,99,255,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}
.login-modern-logo img {
  max-width: 300px;
  max-height: 180px;
  margin-bottom: 2rem;
  border-radius: 2rem;
  box-shadow: 0 4px 24px rgba(108,99,255,0.18), 0 1.5px 6px rgba(0,0,0,0.08);
  background: #fff;
  padding: 1rem;
  display: block;
}
.login-modern-title {
  font-size: 2rem;
  font-weight: 700;
  color: #276858;
  margin-bottom: 2rem;
  text-align: center;
}
.login-modern-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.login-modern-form label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #554ee1;
  margin-bottom: 0.5rem;
}
.login-modern-form .form-control {
  border-radius: 2rem;
  font-size: 1.1rem;
  padding: 0.75rem 1.25rem;
  border: 1.5px solid #e0e0e0;
  background: #f7f7fb;
  transition: border 0.2s;
}
.login-modern-form .form-control:focus {
  border-color: #6c63ff;
  background: #fff;
  outline: none;
}
.login-modern-btn {
  background: linear-gradient(90deg, #276858 0%, #276858 100%);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 2rem;
  padding: 0.85rem 2.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(39,104,88,0.08);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.login-modern-btn:hover, .login-modern-btn:focus {
  background: linear-gradient(90deg, #1a4d3a 0%, #276858 100%);
  box-shadow: 0 4px 16px rgba(39,104,88,0.15);
}
.login-modern-footer {
  margin-top: 2.5rem;
  color: #888;
  font-size: 1rem;
  text-align: center;
}
.invalid-feedback {
  color: #e74c3c;
  font-size: 0.98rem;
  margin-top: 0.25rem;
}
@media (max-width: 600px) {
  .login-modern-card {
    padding: 2rem 1rem 1.5rem 1rem;
    max-width: 95vw;
  }
  .login-modern-logo img {
    max-width: 80px;
    max-height: 80px;
  }
  .login-modern-title {
    font-size: 1.3rem;
  }
}
</style>