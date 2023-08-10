<script>
// import VueSpeedometer from "vue-speedometer"

export default {

  data() {
    return {

          series: [((8.3/10)*100)],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
              offsetY: -10
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                  name: {
                    fontSize: '14px',
                    color: undefined,
                    offsetY: 5
                  },
                  value: {
                    offsetY: 5,
                    fontSize: '16px',
                    color: undefined,
                    formatter: function (val) {
                      return (val*10)/100 ;
                    }
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  shadeIntensity: 0.1,
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 65, 91]
              },
            },
            stroke: {
              dashArray: 1
            },
            labels: ['Risk Rating'],
          },
          

        
    };
  }
};
</script>

<template>
  <apexchart type="radialBar" height="250" :options="chartOptions" :series="series"></apexchart>
</template>