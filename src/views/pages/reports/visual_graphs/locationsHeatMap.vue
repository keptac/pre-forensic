<script>
import MapChart from 'vue-map-chart'

export default {

  components: { MapChart },
  data() {
    return {
      countryData: {
        "US": 100,
        "CA": 20,
        "CU": 40,
      }
    };
  }
};
</script>

<template>
          <div class="card">
            <div class="card-body">
              <p class="text-center">Locations Heat Map</p>
              <MapChart
                :countryData="countryData"
                highColor="#940101"
                lowColor="#fccfcf"
                countryStrokeColor="#909090"
                defaultCountryFillColor="#dadada"
                />
            </div>
          </div>
</template>