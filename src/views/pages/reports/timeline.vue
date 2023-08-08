<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import TimelineData from './timelineData';
import TimelineChart from './visual_graphs/timelineChart';


export default {
  page: {
    title: "Timeline",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, TimelineData, TimelineChart },
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
        <div class="col-lg-4 ">
            <TimelineData/>
        </div>
        <div class="col-lg-8 ">
            <TimelineChart/>
        </div>
    </div>
  </Layout>
</template>