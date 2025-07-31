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
      CaseNumber: localStorage.getItem('caseNumber'),
      Individual: "Fraud overview dashboard",
      Company: "Enron",


      statData: [
        {
          title: "Total fraud alerts this month ",
          icon: "mdi mdi-finance",
          value: 1079
        },
        {
          title: "Confirmed cases",
          icon: "mdi mdi-finance",
          value: 328
        },
        {
          title: "High Alert",
          icon: "mdi mdi-finance",
          value: "42"
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
          await reportService.getAlls3Data().then(
            response=>{
              console.log(response)
            }
          );
        // await reportService.getGlobalDashboard(this.dashboardReportId).then(response=>{
        //     if(response.status ==="SUCCESS"){
        //         this.reportData = response.responseBody;
        //         this.loadStats();
        //       }
        //   });
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
    <div class="col-md-4" v-for="(data, index) in statData" :key="index">
      <div class="card">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="text-truncate font-size-14 mb-2">{{data.title}}</p>
              <h5 class="mb-0 font-size-28">{{data.value}}</h5>
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