<script>
import { required, numeric } from "vuelidate/lib/validators";

import { shopService } from "../../../services/shop.service";
import { rolesService } from "../../../services/roles.service";

import { authServiceMethods, notificationMethods } from "@/state/helpers";

const initForm = {
  caseName: null,
  caseNumber: null,
  description: null,
  createdBy: JSON.parse(localStorage.getItem("user")).id,
  shopId: null,
};

export default {
  data() {
    return {
      title: "User Registration",
      roles: [],

      form: {
        caseName: null,
        caseNumber: null,
        description: null,
        createdBy: JSON.parse(localStorage.getItem("user")).id,
      },

      submitted: false,
      submitform: false,
      submit: false,
      notificationType: "",
      noticationIcon: "",
    };
  },
  validations: {
    form: {
      caseName: { required },
      caseNumber: { required, numeric },
      description: { required },
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
  },
  created() {
    this.loadAllShops();
    this.loadRoles();
    //
  },
  methods: {
    ...authServiceMethods,
    ...notificationMethods,

    onUpdatePhonenumber(payload) {
      this.phonenumberResults = payload.formattedNumber.replace("+", "");
    },

    async loadAllShops() {
      try {
        await shopService.getAllShops().then((response) => {
          if (response.responseBody.length > 0) {
            this.shopList = response.responseBody;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async loadRoles() {
      try {
        await rolesService.getAllRoles().then((response) => {
          if (response.responseBody.length > 0) {
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
        const { form } = this;
        form.roleId = form.role.id;
        if (
          form.role.title.includes("supervisor") ||
          form.role.title.includes("manager") ||
          form.role.title.includes("branch")
        ) {
          form.role = "shop-admin";
        } else if (form.role.title.includes("teller")) {
          form.role = "user";
        } else {
          form.role = "super-admin";
        }

        form.caseNumber = this.phonenumberResults;

        const userForm = {
          operation: "registration",
          accessToken: JSON.parse(localStorage.getItem("access_token")),
          requestBody: form,
        };

        this.registeruser(userForm).then((result) => {
          if (result.status == "SUCCESS") {
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

    onFileChange(event) {
      const file = event.target.files[0];
      // Handle the file upload logic here
      console.log(file);
      this.form.file = file;
    },
  },
};
</script>
  
  <template>
  <div class="row">
    <div class="col-lg-7">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Add new case</h4>
          <form class="needs-registration" @submit.prevent="formSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="validationCustom01">Case Name</label>
                  <input
                    id="validationCustom01"
                    v-model="form.caseName"
                    type="text"
                    class="form-control"
                    placeholder="Case Name"
                    :class="{
                      'is-invalid': submitted && $v.form.caseName.$error,
                    }"
                  />
                  <div
                    v-if="submitted && $v.form.caseName.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.caseName.required"
                      >This value is required.</span
                    >
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="validationCustom04">Case Number</label>
                  <div>
                    <input
                      id="validationCustom04"
                      v-model="form.caseNumber"
                      type="text"
                      class="form-control"
                      placeholder="Enter Case Number"
                      :class="{
                        'is-invalid': submitted && $v.form.caseNumber.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.form.caseNumber.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.caseNumber.required"
                        >This value is required.</span
                      >
                      <span v-if="!$v.form.caseNumber.alphaNum"
                        >This value should be a valid Case Number.</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="validationCustom02">Description</label>
                  <input
                    id="validationCustom02"
                    v-model="form.description"
                    type="text"
                    class="form-control"
                    placeholder="Description"
                    :class="{
                      'is-invalid': submitted && $v.form.description.$error,
                    }"
                  />
                  <div
                    v-if="submitted && $v.form.description.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.description.required"
                      >This value is required.</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="validationCustom02"
                    >Detailed description of area of concern for context</label
                  >
                  <textarea
                    id="validationCustom02"
                    v-model="form.fullDescription"
                    class="form-control"
                    placeholder="Whistleblower statement, and/or detailed problem statement"
                    :class="{
                      'is-invalid': submitted && $v.form.fullDescription.$error,
                    }"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="validationCustom02"
                    >Additional relevant keywords to provide further
                    context</label
                  >
                  <textarea
                    id="validationCustom02"
                    v-model="form.keywords"
                    class="form-control"
                    placeholder="Individual names, entity names, deal names, date range etc"
                    :class="{
                      'is-invalid': submitted && $v.form.keywords.$error,
                    }"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <input
                    id="validationCustom02"
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.form.file.$error }"
                    @change="onFileChange"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group form-check">
                  <input
                    id="termsCheckbox"
                    v-model="form.termsAccepted"
                    type="checkbox"
                    class="form-check-input"
                    :class="{
                      'is-invalid': submitted && !$v.form.termsAccepted,
                    }"
                  />
                  <label class="form-check-label" for="termsCheckbox">
                    I agree to the
                    <a href="/terms-and-conditions" target="_blank"
                      >Terms and Conditions</a
                    >
                  </label>
                  <div
                    v-if="submitted && !$v.form.termsAccepted"
                    class="invalid-feedback"
                  >
                    You must accept the terms and conditions.
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <button v-if="!submitted" class="btn btn-primary" type="submit">
                  Process new case
                </button>
              </div>
              <div class="col-md-2">
                <button class="btn btn-danger" type="submit">Cancel</button>
              </div>
            </div>

            <div class="spinner" v-if="submitted">
              <i class="ri-loader-line spin-icon"></i>
            </div>
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
        <i :class="'mdi ' + noticationIcon + ' mr-2'"></i
        >{{ notification.message }}
      </b-alert>
    </div>
  </div>
</template>