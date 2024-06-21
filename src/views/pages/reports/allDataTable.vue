<script>
/**
 * InputData component
 */

import { reportService } from '../../../services/report.service';
import inputJsonData from '../../../assets/data/input_internal_data_json.json';

import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {

       // All Data
      allData: [],
      variableObject:{},
      modalTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10],
      filter: null,
      filterOn: [],
      sortBy: "dateInitiated",
      sortDesc: false,
      fields: [
        { key: "fileName", sortable: true, label:"File Name" },
        { key: "description",sortable: true, label: "Description" },
        { key: "datatype",sortable: true, label: "Data type" },
        { key: "createby", sortable: true, label: "Created By" },
        { key: "relationship", sortable: true, label: "Relationship" },
        { key: "behaviour", sortable: true, label:"Behavior" },
        { key: "context", sortable: true, label:"Context" },
        { key: "dateAccessed", sortable: true, label:"Date" },
        { key: "location", sortable: true, label:"Location" },
        { key: "overallRating", sortable: true, label:"Rating" },
        { key: "action",  sortable:false, label:"Action" },
      ],


      columns: [
      { field: "fileName", label:"File Name" },
        { field: "description", label: "Description" },
        { field: "datatype", label: "Data type" },
        { field: "createby",  label: "Created By" },
        { field: "relationship",  label: "Relationship" },
        { field: "behaviour",  label:"Behavior" },
        { field: "context",  label:"Context" },
        { field: "dateAccessed",  label:"Date" },
        { field: "location",  label:"Location" },
        { field: "overallRating",  label:"Rating" },
     

      ],
      form: {
        startDate: "",
        endDate:""
      }
    };
  },

  created() {
    this.loadAllInputData()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.allData.length;
    },

    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.allData.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    ...paymentServiceMethods,
    ...notificationMethods,

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async loadAllInputData() {
        try {
          await reportService.getAlls3Data().then(response=>{
            if(response.responseBody.length>0){
                this.allData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.allData = JSON.parse(localStorage.getItem("all_results"));

        if( this.allData == undefined){
          this.allData = inputJsonData;
          localStorage.setItem('all_results_count', this.allData.length);
        }

    },

    searchInputData() {
      this.submitted = true;
      reportService.searchInputData(this.form).then(result=>{
        if(result.status=="SUCCESS"){
          this.submitted = false;
          this.form = Object.assign({}, this.form);
          this.allData = [];
          console.log(result.responseBody);
          this.allData = result.responseBody
        }
      });
    },

    storeState(object, title){
      this.variableObject = object;
      this.modalTitle = title;
    },
  }
};
</script>

<template>

<div>

  <!-- InternalData -->
  <div class="card">

    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>
          <vue-excel-xlsx
              class="btn"
              :data="allData"
              :columns="columns"
              :file-name="'InputData Report'"
              :file-type="'xlsx'"
              :sheet-name="''"
              >
              Export Report
          </vue-excel-xlsx>
        </b-dropdown-item>
        <!-- item-->
      
      </b-dropdown>

      <h4 class="card-title mb-4">Results</h4>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-3">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
            </label>
          </div>
        </div>

        <!-- Search -->
        <div class="col-sm-12 col-md-9">
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
          :items="allData"
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

</template>