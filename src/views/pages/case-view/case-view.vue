<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import recommendationsJsonData from '../../../assets/data/recommendations.json';
import CasesDataTable from "./casesDataTable.vue";
import inputJsonData from '../../../assets/data/case_data.json';
/**
 * Starter page component
 */
export default {
  page: {
    title: "New Alerts",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, CasesDataTable },

  data() {
    return {
      title: "Alert Views",
      caseNumber: JSON.parse(localStorage.getItem("recommendations")) == undefined ? recommendationsJsonData[0].caseNumber : JSON.parse(localStorage.getItem("recommendations"))[0].caseNumber,
      items: [],
      displayNewCaseForm: false,
      caseData: [],
    };
  },

  computed: {
    flaggedIncidents() {
      let data = this.caseData;
      return data.filter(c => {
        const status = String(c.status).toLowerCase();
        return status === 'open' || status === 'under investigation';
      }).length;
    },
    confirmedIncidents() {
      let data = this.caseData;
      return data.filter(c => String(c.status).toLowerCase() === 'pending review').length;
    },
    underInvestigationIncidents() {
      let data = this.caseData;
      return data.filter(c => String(c.status).toLowerCase() === 'under investigation').length;
    },
    closedIncidents() {
      let data = this.caseData;
      return data.filter(c => String(c.status).toLowerCase() === 'closed').length;
    }
  },

  created() {
    this.loadCaseData();
  },

  methods: {
    showForm() {
      this.displayNewCaseForm = !this.displayNewCaseForm;
    },
    loadCaseData() {
      // Try to get from localStorage first
      let localData = localStorage.getItem("case_data");
      if (localData) {
        try {
          this.caseData = JSON.parse(localData);
        } catch (e) {
          this.caseData = inputJsonData;
        }
      } else {
        this.caseData = inputJsonData;
      }
      localStorage.setItem('case_data_count', this.caseData.length);
    }
  }
}




</script>

<template>
  <Layout>
    <PageHeader class="mt-3 ml-2" :title="title" :items="items" />

      <div class="row">
         <div class=" col-lg-12">
          <div class="card-body">
            <h4 class="card-title mb-4">Alert Risk Summary</h4>
          <div class="row ">
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body b">
                <i style="font-size: 2em; margin-bottom:20px; color:red" class="fas fa-flag"></i>
                  <h5 style="color: black">Flagged Incidents</h5>
                  <h3  style="color: black">{{ flaggedIncidents }}</h3>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body">
                <i style="font-size: 2em; margin-bottom:20px; color:blue" class="fas fa-user-check"></i>
                  <h5 style="color: black">Confirmed Incidents</h5>
                  <h3  style="color: black">{{ confirmedIncidents }}</h3>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body">
                <i style="font-size: 2em; margin-bottom:20px; color:orange" class="fas fa-search"></i>
                  <h5 style="color: black">Under Investigation</h5>
                  <h3  style="color: black">{{ underInvestigationIncidents }}</h3>
              </div>
            </div>
          </div>

          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body">
                <i style="font-size: 2em; margin-bottom:20px; color:green" class="fas fa-check-circle"></i>
                  <h5 style="color: black">Closed</h5>
                  <h3  style="color: black">{{ closedIncidents }}</h3>
              </div>
            </div>
          </div>
          </div>  
          </div>
    </div>
</div>

      <div class="row" v-if="!displayNewCaseForm">
          <div class="col-lg-12 ">
            <CasesDataTable :case-data="caseData"/>
          </div>
        </div>


      
    <!-- <div class="row ">
          <div class="col-lg-2 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-file-alt"></i>
                  <h5 style="color: white">Examiner notes</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-2 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-envelope"></i>
                  <h5 style="color: white">Emails</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-2 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-file-alt"></i>
                  <h5 style="color: white">System Logs</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-2 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-file-alt"></i>
                  <h5 style="color: white">Documents</h5>
              </div>
            </div>
          </div>
          </div>  -->

      
  </Layout>
</template>