<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import RelationshipsTable from './relationshipsTable';


export default {
  page: {
    title: "Relationships",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, RelationshipsTable },
  data() {
    return {
      title: "Relationships",
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
          <p class="text-center">
            <img src="@/assets/data/bloom-visualisation.png" alt height="300" />
          </p>
        </div>
    </div>
      <div class="row">
        <div class="col-lg-12 ">
            <RelationshipsTable/>
        </div>
    </div>
  </Layout>
</template>