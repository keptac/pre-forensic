<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import LocationsTable from './locationsTable';
import MapChart from 'vue-map-chart'


export default {
  page: {
    title: "Locations",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, LocationsTable, MapChart },
  data() {
    return {
      title: "Locations",
      items: [
        ""
      ],
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
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />

      <div class="row">
        <div class="col-lg-5">
            <LocationsTable/>
        </div>

        <div class="col-lg-7 ">
          <div class="card">
            <div class="card-body">
              <p class="text-center">Locations Visual Map</p>
              <MapChart
                :countryData="countryData"
                highColor="#940101"
                lowColor="#fccfcf"
                countryStrokeColor="#909090"
                defaultCountryFillColor="#dadada"
                />
            </div>
          </div>
        </div>
    </div>
  </Layout>
</template>