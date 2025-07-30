<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import Stat from "./widget";
// import RevenueAnalytics from "./revenue";
// import RemittanceAnalytics from "./remittance-analytics";
import BusinessConditions from "../reports/new-fraud-alerts-table.vue";
// import LocationsHeatMap from "../reports/visual_graphs/locationsHeatMap"
import EventOvertime from "../reports/visual_graphs/event-overtime"
import RiskScorebar from "../reports/visual_graphs/risk-score-bar"


export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    // LocationsHeatMap,
    EventOvertime,
    RiskScorebar,
    // RevenueAnalytics,
    // RemittanceAnalytics,
    BusinessConditions
  },
  data() {
    return {
      title: "Fraud overview dashboard",
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
      <div class="col-xl-6">
        <!-- <EventOvertime/> -->
        <EventOvertime/>
         <RiskScorebar />
      </div>
      <div class="col-xl-6">
        <BusinessConditions />
      </div>
    </div>
  </Layout>
</template>