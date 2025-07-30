<script>
/**
 * Sales Analytics component
 */

import { reportService } from '../../../services/report.service';

export default {
  data() {
    return {
      userRole:  JSON.parse(localStorage.getItem('user')).role,
      shopId:  JSON.parse(localStorage.getItem('user')).shopId,
      numberOfDeposits:0,
      numberOfWithdrawals: 0,
      dashboardReportId:"",
      reportData:{},
      series: [50, 50],
      chartOptions: {
        chart: {
          height: 230,
          type: "donut"
        },
        labels: ["Number of Deposits", "Number of Collections"],
        plotOptions: {
          pie: {
            donut: {
              size: "75%"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        colors: ["#005824", "#b1945e"] //018383
      }
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

          this.numberOfDeposits = this.reportData.totalDepositCount;
          this.numberOfWithdrawals =this.reportData.totalWithdrawalCount;

          var updatedSeries = [this.numberOfDeposits, this.numberOfWithdrawals];

          this.series = updatedSeries;
          
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

      <h4 class="card-title mb-4">Remittance Analytics</h4>

      <div id="donut-chart" class="apex-charts"></div>
      <apexchart
        class="apex-charts"
        height="230"
        dir="ltr"
        :series="series"
        :options="chartOptions"
      ></apexchart>
      <div class="row">

        <div class="col-6">
          <div class="text-center mt-4">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle font-size-10 mr-1" style="color:#005824"></i> Deposits
            </p>
            <h5>{{Math.round((numberOfDeposits/(numberOfWithdrawals+numberOfDeposits))*100)}} %</h5>
          </div>
        </div>

        <div class="col-6">
          <div class="text-center mt-4">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1" style="color:#b1945e"></i> Collections
            </p>
            <h5>{{Math.round((numberOfWithdrawals/(numberOfWithdrawals+numberOfDeposits))*100)}}%</h5>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>