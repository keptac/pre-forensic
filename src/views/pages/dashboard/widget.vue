<script>
/**
 * Widget Component
 */

import { reportService } from '../../../services/report.service';

export default {
  data() {
    return {
      reportData:{},
      dashboardReportId:"",
      userRole:  JSON.parse(localStorage.getItem('user')).role,
      shopId:  JSON.parse(localStorage.getItem('user')).shopId,
      statData: [
        {
          title: "Date",
          icon: "mdi mdi-clock-outline",
          value: new Date().getDate() +"/"+ new Date().getMonth()+"/"+ new Date().getYear()
        },
        {
          title: "Sources ",
          icon: "ri-money-dollar-circle-line",
          value: "0.00"
        },
        {
          title: "Data size",
          icon: "mdi mdi-account-cash-outline",
          value: "0.00"
        },
        {
          title: "Relationships Identified",
          icon: "mdi mdi-finance",
          value: "0.00"
        },
        {
          title: "Locations Indentified",
          icon: "mdi mdi-finance",
          value: "0.00"
        },
        {
          title: "Anomalies Detected",
          icon: "mdi mdi-finance",
          value: "0.00"
        }
      ]
    };
  },

  created() {
    if(this.userRole === 'user'||this.userRole === 'shop-admin'){
      this.dashboardReportId = this.shopId;
    }else{
      this.dashboardReportId = "";
    }
    
    this.getDashboardReport()
  },

  methods:{
    async getDashboardReport() {
        try {
        await reportService.getGlobalDashboard(this.dashboardReportId).then(response=>{
            if(response.status ==="SUCCESS"){
                this.reportData = response.responseBody;
                this.loadStats();
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    async loadStats() {
        try {
          this.statData[0].value = "$ " + this.reportData.totalDepositAmount.toFixed(2);
          this.statData[1].value = "$ " + this.reportData.totalWithdrawalAmount.toFixed(2);
          this.statData[2].value = "$ " + this.reportData.totalServiceFeeCollectionAmount.toFixed(2);
          
        } catch (error) {
          console.log(error);
        }
    },
  }

};
</script>

<template>
  <div class="row">
    <div class="col-md-2" v-for="(data, index) in statData" :key="index">
      <div class="card">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="text-truncate font-size-14 mb-2">{{data.title}}</p>
              <h5 class="mb-0">{{data.value}}</h5>
            </div>
            <div class="text-primary">
              <i :class="`${data.icon} font-size-20`"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end row -->
</template>