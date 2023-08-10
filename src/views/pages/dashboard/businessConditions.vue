

<script>

import Gauge from "../reports/visual_graphs/gauge"

export default {

  components: { Gauge }, 
  data() {
    return {
      keywords:localStorage.getItem('keyword_data_count'),
      behavioualRisks:0
    };
  }
};
</script>

<template>
  <div class="">
    <div class="card-body">
      <h4 class="card-title mb-4">Case Overview</h4>
      <div class="row mb-2">
        <div class="col-xl-6">
          <div class="col-md-12">
            <div class="card ">
              <div class="card-body text-center mb-2 mt-2">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-14 mb-2">Internal Sources</h5>
                    <p class="text-truncate font-size-16 mb-2">YES</p>
                    <h5 class="text-truncate font-size-14 mb-2">External Sources</h5>
                    <p class="text-truncate font-size-16 mb-2">NO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body text-center mb-2 mt-2">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-16 mb-2">Behavioural Risks Identified</h5>
                    <h2 class="text-truncate mb-2">{{ behavioualRisks }}</h2>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card">
              <div class="card-body text-center mb-2 mt-2">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-16 mb-2">Keywords</h5>
                    <h2 class="text-truncate mb-2">{{keywords}}</h2>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
            
        </div>
        <div class="col-xl-6">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body text-center mb-2 mt-2">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-18 mb-2">Entities</h5>
                    <p class="text-truncate font-size-14 mb-2">Internal: 0</p>
                    <p class="text-truncate font-size-14 mb-2">Suppliers: 0</p>
                    <p class="text-truncate font-size-14 mb-1">External: 0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12">
            <div class="card">
              <div class="card-body text-center mb-2 mt-2">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <h5 class="text-truncate font-size-16 mb-2">Data itemized for tag review</h5>
                    <h2 class="text-truncate  mb-2">0</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

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