<script>
/**
 * Revenue Analytics component
 */

import { reportService } from '../../../services/report.service';

export default {
  data() {
    return {
      userRole:  JSON.parse(localStorage.getItem('user')).role,
      shopId:  JSON.parse(localStorage.getItem('user')).shopId,
      series: [
        {
          name: "value b",
          type: "column",
          data: []
        },
          {
          name: "value A",
          type: "column",
          data: []
        },

      ],
      legends:[],
      colors:[],
      graphName: "",
      graphs:[],
      dashboardReportId:"",
      chartOptions: {
        chart: {
          height: 280,
          type: "line",
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [3, 3, 3],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "20%"
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        colors: ["#005824", "#b99608"],
        labels: []
      }
    };
  },

  created() {
    if(this.userRole === 'user'||this.userRole === 'shop-admin'){
      this.dashboardReportId = this.shopId;
    }else{
      this.dashboardReportId = "";
    }
    
    this.getDashboardReport();
  },

  methods:{
    async getDashboardReport() {
        try {
          await reportService.getGlobalDashboard(this.dashboardReportId).then(response=>{
            if(response.status ==="SUCCESS"){
                this.chartOptions.labels = response.responseBody.graphs[0].labels;
                this.series = response.responseBody.graphs[0].series;
                this.legends = response.responseBody.graphs[0].legend;
                this.colors = response.responseBody.graphs[0].colors;
                this.graphName = response.responseBody.graphs[0].graphName;
                this.graphs = response.responseBody.graphs;

                this.$refs.chart.updateOptions({
                  colors: response.responseBody.graphs[0].colors
                });

              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    changeGraph(index, graphName){
      this.graphName = graphName;
      this.chartOptions.labels = this.graphs[index].labels;
      this.chartOptions.colors = this.graphs[index].colors;
      this.series = this.graphs[index].series;
      this.legends = this.graphs[index].legend;
      this.colors = this.graphs[index].colors;
      this.graphName = this.graphs[index].graphName;
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="float-right d-none d-md-inline-block">
        <div class="btn-group mb-2">
          <button type="button" class="btn btn-sm btn-light"  v-for="(graph, index) of graphs" :key="index" @click="changeGraph(index, graph.graphName)">{{graph.graphName}}</button>
        </div>
      </div>
      <h4 class="card-title mb-4">{{graphName}}</h4>
      <div>
        <div id="line-column-chart" class="apex-charts" dir="ltr"></div>
        <apexchart
          ref="chart"
          class="apex-charts"
          height="280"
          dir="ltr"
          :series="series"
          :options="chartOptions"
        ></apexchart>
      </div>
    </div>

    <div class="card-body border-top text-center">
      <div class="row">
        <div class="col-sm-3"  v-for="(legend, index) of legends" :key="index">
          <div class="mt-4 mt-sm-0">
            <p class="mb-2 text-truncate"  >
              <i class="mdi mdi-circle font-size-10 mr-1" :style="{ 'color': colors[index]}"></i> {{legend}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>