

<script>

import Gauge from "../reports/visual_graphs/gauge"

export default {

  components: { Gauge }, 
  data() {
    return {
      keywords:localStorage.getItem('keyword_data_count'),
      behavioualRisks: 0
    };
  }
};
</script>

<template>
  <div class="">
    <div class="card-body">
      <h4 class="card-title mb-4">Newest Fraud Alerts</h4>
      <div class="row mb-2">
        <div class="col-xl-6">
          <div class="col-md-12">
            <div class="card">
                <Gauge/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>