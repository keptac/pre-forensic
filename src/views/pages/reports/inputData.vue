<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import InputDataTable from './inputDataTable';

/**
 * Starter page component
 */
export default {
  page: {
    title: "",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, InputDataTable },
  data() {
    return {
      title: "",
      items: [
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
      <div class="row">
        <div class="col-lg-12 ">
            <InputDataTable/>
        </div>
    </div>
  </Layout>
</template>