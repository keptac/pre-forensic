<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import AllDataTable from './allDataTable';

/**
 * Starter page component
 */
export default {
  page: {
    title: "All Results",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, AllDataTable },
  data() {
    return {
      title: "All Results",
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
        <div class="col-lg-12 ">
            <AllDataTable/>
        </div>
    </div>
  </Layout>
</template>