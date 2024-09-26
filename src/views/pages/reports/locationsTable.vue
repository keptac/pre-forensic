<script>
/**
 * Transactions component
 */

import { accountsService } from '../../../services/accounts.service';
import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      locationsData: [],
      variableObject:{},
      transactionsObject:[],
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [5, 10, 25],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true, label: "id" },
        { key: "country", sortable: true, label: "Country" },
        { key: "city",sortable: true, label: "City" },
        { key: "count",sortable: true, label: "Count" },
        { key: "locationAi",sortable: true, label: "Location AI" },
        {key:"action", label:"Action"}
      ],

      columns: [
        { field: "id", label: "id" },
        { field: "country", label: "Country" },
        { field: "regcityistrationNumber", label:  "City" },
        { field: "count", label: "Count" },
      ],
      
    };
  },

  created() {
    this.loadAllLocations()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.locationsData.length;
    },
    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.locationsData.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    ...paymentServiceMethods,
    ...notificationMethods,

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },


    async loadAllLocations() {
        try {
          await accountsService.getAllLocations().then(response=>{
            if(response.responseBody.length>0){
                this.locationsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.locationsData =[
        { "id":"1",
          "country":"United States", 
          "city":"US ", 
          "count": 100
        },
        
        { "id":"2",
          "country":"CANADA", 
          "city":"CA", 
          "count": 20
        },
        { "id":"3",
          "country":"CUBA", 
          "city":"CU", 
          "count": 40
        },
      ];
    },

  }
};
</script>

<template>

  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="row mt-4"> 
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                <label class="d-inline-flex align-items-center">
                  Search:
                  <b-form-input
                    v-model="filter"
                    type="search"
                    class="form-control form-control-sm ml-2"
                  ></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->

          </div>
          <div class="table-responsive">
            <b-table
              :items="locationsData"
              :fields="fields"
              responsive="sm"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
            >
            <template v-slot:cell(action)="row">
                  <a
                    @click="expandKeyWord(row.item, row.item.keyword)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Click to view"
                  >
                  <i class=" ri-eye-fill font-size-24"></i>

                  </a>
              </template>
            </b-table>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>