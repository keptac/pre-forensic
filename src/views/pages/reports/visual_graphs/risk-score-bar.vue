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
          <chartist
              ratio="ct-chart"
              :data="simpleBarChart.data"
              :options="simpleBarChart.options"
              type="Bar"
            ></chartist>
        </div>
  </div>
</template>