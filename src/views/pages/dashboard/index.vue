<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import router from '../../../router/index'

import Stat from "./widget";
import RevenueAnalytics from "./revenue";
// import RemittanceAnalytics from "./remittance-analytics";
import BusinessConditions from "./businessConditions";


/**
 * Dashboard component
 */
export default {
  components: {
    Layout,
    PageHeader,
    Stat,
    RevenueAnalytics,
    // RemittanceAnalytics,
    BusinessConditions
  },
  data() {
    return {
      title: "",
      items: [
        {
          text: ""
        },
        {
          text: "",
          active: true
        }
      ]
    };
  },

  created() { 
    //JSON.parse(localStorage.getItem('accessRights')).some(access => access.groupName === 'Teller Dashboard')
    if(JSON.parse(localStorage.getItem('accessRights')).some(access => access.groupName === 'Teller Dashboard')){
      router.push('/teller-dashboard')
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />
    <div class="row">
      <div class="col-xl-9">
        <Stat />
        <RevenueAnalytics />
      </div>
      <div class="col-xl-3">
        <BusinessConditions />
      </div>
    </div>
  </Layout>
</template>