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
      title: "Case Management",
      caseNumber:JSON.parse(localStorage.getItem("recommendations"))==undefined?recommendationsJsonData[0].caseNumber: JSON.parse(localStorage.getItem("recommendations"))[0].caseNumber,
      items: []
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-3 ml-2" :title="title" :items="items" />
    <div class="row">
        <div class="col-lg-10">
          <div class="card">
            <div class="card-body">
              <h3>Create a new case</h3>
              <p>A case must be created per individual to be analysed. A case houses the briefing, data and reported findings of an investigation file.
                You can also be invited to collaborate on an existing case. Contact the case administrator to receive an invitation in your account.
                </p>
                <button class="btn btn-primary" type="submit">Add new case</button>
            </div>
          </div>
        </div>

    </div>
      <div class="row">
        <div class="col-lg-12 ">
          <CasesDataTable/>
        </div>
      </div>

  </Layout>
</template>