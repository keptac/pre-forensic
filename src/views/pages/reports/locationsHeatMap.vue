<script>
import MapChart from 'vue-map-chart'

export default {

  components: { MapChart },
  data() {
    return {
      countryData: {
        "ZA": 150,
        "ZW": 2,
        "ZM": 0,
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