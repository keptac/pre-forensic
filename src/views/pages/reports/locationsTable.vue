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
      locationsData: [
        { "id":"1",
          "country":"South Africa", 
          "city":"Johannesburg ", 
          "count": 150
        },
      ],
      expandedLocationsData: [],
      variableObject:{},
      transactionsObject:[],

      mtotalRows: 1,
      showExpanded: false,
      mcurrentPage: 1,
      mperPage: 50,
      mpageOptions: [5, 10, 25],
      mfilter: null,
      mfilterOn: [],
      msortBy: "id",
      msortDesc: false,


      expandedLocationTitle:"",
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
      ],

      columns: [
        { field: "id", label: "id" },
        { field: "country", label: "Country" },
        { field: "regcityistrationNumber", label:  "City" },
        { field: "count", label: "Count" },
      ],


      expandedFields: [
      { key: "id", sortable: true, label: "id" },
        { key: "country", sortable: true, label: "Country" },
        { key: "city",sortable: true, label: "City" },
        { key: "count",sortable: true, label: "Count" },
    ],

      mcolumns: [
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

    mrows() {
      return this.transactionsObject.length;
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

    monFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.mtotalRows = filteredItems.length;
      this.mcurrentPage = 1;
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
    },

    closeLocation(){
      this.expandedLocationsData = [];
      this.showExpanded = false;

    },

    async expandKeyLocation(title, id){
      this.showExpanded = true;
      this.expandedLocationTitle = title;
  
        try {
          await accountsService.getLocationsByIdentifier(id).then(response=>{
            if(response.responseBody.length>0){
                this.expandedLocationsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.expandedLocationsData =[
          { "id":"1",
            "country":"South Africa", 
            "city":"Johannesburg ", 
            "count": 150
          },
        ]

    },
  }
};
</script>

<template>

  <div class="row">
    <div class="col-md-6">
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
              <template v-slot:cell(count)="row">
                  <a
                    @click="expandKeyLocation(row.item.id, row.item.count)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Click to view"
                  >
                 {{row.item.count}}

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
    
    <div v-if="showExpanded" class="col-md-6">
      <div class=" card">
        <div class="card-body">

          <div class="row">
            <i class=" ri-close-circle-fill font-size-24 ml-2 mr-2"  @click="closeLocation()"></i>
            <h4 class="card-title mt-2">{{ expandedLocationTitle }}</h4>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="mperPage" size="sm" :options="mpageOptions"></b-form-select>&nbsp;entries
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-7">
              <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                <label class="d-inline-flex align-items-center">
                  Search:
                  <b-form-input
                    v-model="mfilter"
                    type="search"
                    class="form-control form-control-sm ml-2"
                  ></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->

            <b-dropdown right toggle-class="arrow-none card-drop" class="col-md-1 float-right" variant="white">
              <template v-slot:button-content>
                <i class="mdi mdi-dots-vertical"></i>
              </template>
              <b-dropdown-item>
                <vue-excel-xlsx
                    class="btn"
                    :data="expandedLocationsData"
                    :columns="mcolumns"
                    :file-name="'Locations'"
                    :file-type="'xlsx'"
                    :sheet-name="'All Locations'"
                    >
                    Export
                </vue-excel-xlsx>
              </b-dropdown-item>
              </b-dropdown>
          </div>
          <div class="table-responsive">
            <b-table
              :items="expandedLocationsData"
              :fields="expandedFields"
              responsive="sm"
              :per-page="mperPage"
              :current-page="mcurrentPage"
              :sort-by.sync="msortBy"
              :sort-desc.sync="msortDesc"
              :filter="mfilter"
              :filter-included-fields="mfilterOn"
              @filtered="monFiltered"
            >
            </b-table>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded mb-0">
                  <!-- pagination -->
                  <b-pagination v-model="mcurrentPage" :total-rows="mrows" :per-page="mperPage"></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>