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
      Individual: "Jeff Skilling ",
      Company: "Enron",


      statData: [
        {
          title: "Sources ",
          icon: "mdi mdi-finance",
          value: localStorage.getItem('external_data_count')
        },
        {
          title: "Data size",
          icon: "mdi mdi-finance",
          value: "100gb"
        },
        {
          title: "Relationships Identified",
          icon: "mdi mdi-finance",
          value: localStorage.getItem('entity_data_count')
        },
        {
          title: "Locations Indentified",
          icon: "mdi mdi-finance",
          value: "3"
        },
        {
          title: "Anomalies Detected",
          icon: "mdi mdi-finance",
          value: 0
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
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="text-truncate font-size-14 mb-2">Case Number: <b>{{CaseNumber}}</b></p>
              <p class="text-truncate font-size-16 mb-2"><b>{{Individual}}</b></p>
              <p class="text-truncate font-size-16 mb-2">Company: {{Company}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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