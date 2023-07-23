<script>
/**
 * Sales Analytics component
 */
export default {
  data() {
    return {
      businessConditions: JSON.parse(localStorage.getItem("businessConditions"))
    };
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">Business Conditions</h4>
      <div class="row mb-2">
        <div class="col-xl-6">
            <p class="mb-2 text-truncate">

              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Min Amount: ${{businessConditions.minimumTransactionAmount}}
            </p>
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Minimum Charge: ${{businessConditions.minimumTransactionCharge}}
            </p>
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Max Amount: ${{businessConditions.maximumTransactionAmount}}
            </p>
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Maximum Charge: ${{businessConditions.maximumTransactionCharge}}
            </p>
            
        </div>
        <div class="col-xl-6">
            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Fee Percentage: {{businessConditions.percentageFeesCharged}} %
            </p>

            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Monthly Limit: ${{businessConditions.monthlyTransactionLimit}}
            </p>

            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Daily Limit: ${{businessConditions.dailyTransactionLimit}}
            </p>

            <p class="mb-2 text-truncate">
              <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Weekly Limit: ${{businessConditions.weeklyTransactionLimit}}
            </p>
        </div>
      </div>
    </div>
  </div>
</template>