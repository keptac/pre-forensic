<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import RisksTable from './risksTable';


export default {
  page: {
    title: "",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, RisksTable },
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
            <RisksTable/>
        </div>
    </div>
  </Layout>
</template>