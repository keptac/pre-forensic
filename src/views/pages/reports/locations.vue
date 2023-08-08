<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import LocationsTable from './locationsTable';
import LocationsHeatMap from './locationsHeatMap';


export default {
  page: {
    title: "Locations",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, LocationsTable, LocationsHeatMap },
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
          <LocationsHeatMap/>
        </div>
    </div>
  </Layout>
</template>