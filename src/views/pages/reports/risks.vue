<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import RisksTable from './risksTable';


export default {
  page: {
    title: "Behavioural Risk",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, RisksTable },
  data() {
    return {
      title: "Behavioural Risk",
      items: [
        ""
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
            <RisksTable/>
        </div>
    </div>
  </Layout>
</template>