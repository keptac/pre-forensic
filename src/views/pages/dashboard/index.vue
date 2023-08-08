<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "./widget";
// import RevenueAnalytics from "./revenue";
// import RemittanceAnalytics from "./remittance-analytics";
// import BusinessConditions from "./businessConditions";
import LocationsHeatMap from "../reports/locationsHeatMap"


/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    // RevenueAnalytics,
    // RemittanceAnalytics,
    // BusinessConditions,
    LocationsHeatMap
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
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-12">
        <Stat />
      </div>

    </div>
    <div class="row">
      <div class="col-xl-5">
        <LocationsHeatMap />
      </div>
      <div class="col-xl-7">
        <LocationsHeatMap />
      </div>
    </div>
  </Layout>
</template>