<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import TimelineData from './timelineData';


export default {
  page: {
    title: "Timeline",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, TimelineData },
  data() {
    return {
      title: "Timeline of key data",
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
            <TimelineData/>
        </div>
    </div>
  </Layout>
</template>