<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "./widget";
// import RevenueAnalytics from "./revenue";
// import RemittanceAnalytics from "./remittance-analytics";
// import BusinessConditions from "./businessConditions";
import LocationsHeatMap from "../reports/visual_graphs/locationsHeatMap"
import Timelinechart from "../reports/visual_graphs/timelineChart"

export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    LocationsHeatMap,
    Timelinechart
    // RevenueAnalytics,
    // RemittanceAnalytics,
    // BusinessConditions
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: ""
        },
        {
          text: "Dashboard",
          active: true
        }
      ]
    };
  },

  created() { 
  },
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-3 ml-2" :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <Stat />
      </div>

    </div>
    <div class="row">
      <div class="col-xl-5">
        <Timelinechart/>
        <LocationsHeatMap />
      </div>
      <div class="col-xl-7">
        <!-- <LocationsHeatMap /> -->
      </div>
    </div>
  </Layout>
</template>