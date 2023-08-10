<script>
import VueSpeedometer from "vue-speedometer"

export default {

  components: { VueSpeedometer },
  data() {
    return {

    };
  }
};
</script>

<template>
   <div>
    <vue-speedometer
      :needleHeightRatio="0.7"
      :maxSegmentLabels="5"
      :segments="75"
      :value="333"
      textColor="#AAA"
    />
  </div>
</template>