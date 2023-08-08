<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import TaggedDataTable from './taggedDataTable';

/**
 * Starter page component
 */
export default {
  page: {
    title: "Tagged Data",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, TaggedDataTable },
  data() {
    return {
      title: "Tagged Data",
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
            <TaggedDataTable/>
        </div>
    </div>
  </Layout>
</template>