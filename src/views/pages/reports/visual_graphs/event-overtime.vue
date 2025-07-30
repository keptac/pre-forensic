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
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [

                [1, 3, 2, 6, 2,7,4]
            ]
        },
        options: {
            height: 300,
            fullWidth: true,
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
              :data="simpleLineChart.data"
              :options="simpleLineChart.options"
              type="Line"
            ></chartist>
        </div>
  </div>
</template>