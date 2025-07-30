<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import recommendationsJsonData from '../../../assets/data/recommendations.json';
import CasesDataTable from "./casesDataTable.vue";
/**
 * Starter page component
 */
export default {
  page: {
    title: "New Case",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, CasesDataTable },
  data() {
    return {
      title: "Case Views",
      caseNumber:JSON.parse(localStorage.getItem("recommendations"))==undefined?recommendationsJsonData[0].caseNumber: JSON.parse(localStorage.getItem("recommendations"))[0].caseNumber,
      items: [],
      displayNewCaseForm:false
    };
  },

  methods:{
    showForm(){
        this.displayNewCaseForm = !this.displayNewCaseForm ;
      }
  }
}




</script>

<template>
  <Layout>
    <PageHeader class="mt-3 ml-2" :title="title" :items="items" />

      <div class="row">
         <div class=" col-lg-8">
          <div class="card-body">
            <h4 class="card-title mb-4">Case Risk Summary</h4>
          <div class="row ">
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body b">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-flag"></i>
                  <h5 style="color: black">Flagged Incidents</h5>
                  <h3  style="color: black">33</h3>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-headset"></i>
                  <h5 style="color: black">Confirmed Cases</h5>
                  <h3  style="color: black">15</h3>
              </div>
            </div>
          </div>
          </div>  
          </div>
    </div>
</div>

      <div class="row" v-if="!displayNewCaseForm">
          <div class="col-lg-12 ">
            <CasesDataTable/>
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