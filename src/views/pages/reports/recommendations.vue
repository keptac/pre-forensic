<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

/**
 * Starter page component
 */
export default {
  page: {
    title: "Recommendations ",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      title: "Recommendations",
      recommandation:JSON.parse(localStorage.getItem("recommendations"))[0].recommendation,
      caseNumber:JSON.parse(localStorage.getItem("recommendations"))[0].caseNumber,
      items: [
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />
      <div class="row">
        <div class="col-lg-8 ">
          <div class="card">
            <div class="card-body">
              <p>{{recommandation}}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 ">
          <div class="card">
            <div class="card-header">
              <h5>Case Number</h5>
            </div>
            <div class="card-body">
              <p class="text-center">{{ caseNumber }}</p>
            </div>
          </div>
        </div>
    </div>
  </Layout>
</template>