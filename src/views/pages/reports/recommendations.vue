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
      recommandation:"Our analysis has revealed that the individual poses minimal risk to the client, based on an Ai-analysis of the data provided. Further investigation on additional data sets may be required to corroborate these findings.",
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
    </div>
  </Layout>
</template>