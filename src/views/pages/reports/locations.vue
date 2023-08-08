<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import LocationsTable from './locationsTable';


export default {
  page: {
    title: "Locations",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, LocationsTable },
  data() {
    return {
      title: "Locations",
      items: [
        ""
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />
    <div class="row">
        <div class="col-lg-12 ">
          <div class="card">
            <div class="card-body">
              <p class="text-center">Locations Visual Map Coming soon</p>
            </div>
          </div>
        </div>
    </div>
      <div class="row">
        <div class="col-lg-12 ">
            <LocationsTable/>
        </div>
    </div>
  </Layout>
</template>