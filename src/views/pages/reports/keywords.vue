<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import KeywordsTable from './keywordsTable';


export default {
  page: {
    title: "",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, KeywordsTable },
  data() {
    return {
      title: "",
      items: [
        ""
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
            <KeywordsTable/>
        </div>
    </div>
  </Layout>
</template>