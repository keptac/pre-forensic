<script>
/**
 * Transactions component
 */

import { accountsService } from '../../../../services/accounts.service';
import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      simpleLineChart: {
        data: {
            labels: ['20', '40', '60', '80', '100'],
            series: [
                [10, 20, 50, 80, 100]
            ]
        },
        options: {
            height: 300,
            fullWidth: true,
        }
      },
      simpleBarChart: {
        data: {
            labels: ['20', '40', '60', '80', '100'],
            series: [
                [10, 20, 25, 30, 40]
            ]
        },
        options: {
            height: 300,
            fullWidth: true,
            seriesBarDistance: 0
        }
      }
    };
  },

  created() {
    this.loadAllTransactions()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.timelineData.length;
    },


    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
  },
  methods: {
    /**
     * Search the table data with search input
     */
    ...paymentServiceMethods,
    ...notificationMethods,

    async loadAllTransactions() {
        try {
          await accountsService.getAllRisks().then(response=>{
            if(response.responseBody.length>0){
                this.timelineData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },
  }
};
</script>

<template>

<div class="card">
  <div class="card-body">
    <h5 class="chart-title" style="text-align:center; margin-bottom: 20px;">Risk scores</h5>
    <div class="chart-container" style="position: relative;">
      <!-- Y Axis Label -->
      <div class="y-axis-label" style="position: absolute; left: -40px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-weight: bold;">Risk Score</div>
      <chartist
        ratio="ct-chart"
        :data="simpleBarChart.data"
        :options="simpleBarChart.options"
        type="Bar"
        class="custom-bar-width"
      ></chartist>
      <!-- X Axis Label -->
      <div class="x-axis-label" style="text-align: center; margin-top: 10px; font-weight: bold;">Score Range</div>
    </div>
  </div>
</div>

</template>