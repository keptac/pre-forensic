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
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            series: [

                [1, 3, 2, 6, 2,7,4]
            ]
        },
        options: {
            height: 300,
            fullWidth: true,
            axisX: {
              labelInterpolationFnc: function(value) { return value; },
              axisTitle: 'Day of Week',
              showGrid: true,
              offset: 40
            },
            axisY: {
              labelInterpolationFnc: function(value) { return value; },
              axisTitle: 'Event Count',
              showGrid: true,
              offset: 50
            }
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
    <h5 class="chart-title" style="text-align:center; margin-bottom: 20px;">Risk timeline</h5>
    <div class="chart-container" style="position: relative;">
      <!-- Y Axis Label -->
      <div class="y-axis-label" style="position: absolute; left: -40px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-weight: bold;">Count</div>
      <chartist
        ratio="ct-chart"
        :data="simpleLineChart.data"
        :options="simpleLineChart.options"
        type="Line"
      ></chartist>
      <!-- X Axis Label -->
      <div class="x-axis-label" style="text-align: center; margin-top: 10px; font-weight: bold;">Day of Week</div>
    </div>
  </div>
</div>
</template>