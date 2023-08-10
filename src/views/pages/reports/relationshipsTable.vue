<script>
/**
 * Transactions component
 */

import { reportService } from '../../../services/report.service';
import entityJsonData from '../../../assets/data/entity_data.json';
import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      relationshipsData: [],
      expandedRelationshipsData: [],
      variableObject:{},
      transactionsObject:[],

      mtotalRows: 1,
      showExpanded: false,
      mcurrentPage: 1,
      mperPage: 5,
      mpageOptions: [5, 10, 25],
      mfilter: null,
      mfilterOn: [],
      msortBy: "id",
      msortDesc: false,


      expandedRelationshipTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "Identifier", sortable: true, label: "Identifier" },
        { key: "DateRange", sortable: true, label: "Date Range" },
        { key: "InternalExternal",sortable: true, label: "Internal/External" },
        { key: "IdCompanyRegNumber",sortable: true, label: "Reg Number" },
        // { key: "Riskrating",sortable: true, label: "Risk Rating" },
        { key: "SupplierNumber",sortable: true, label: "Supplier Number" },
        { key: "InteractionCount",sortable: true, label: "Interation Count" },
      ],

      columns: [
        { field: "Identifier", label: "Identifier" },
        { field: "DateRange", label: "DateRange" },
        { field: "InternalExternal", label: "InternalExternal" },
        { field: "IdCompanyRegNumber", label: "IdCompanyRegNumber" },
        { field: "Riskrating", label: "Riskrating" },
        { field: "SupplierNumber", label: "SupplierNumber" },
        { field: "InteractionCount", label: "InteractionCount" },
      ],


      expandedFields: [
        { key: "Identifier", sortable: true, label: "Identifier" },
        { key: "DateRange", sortable: true, label: "Date Range" },
        { key: "InternalExternal",sortable: true, label: "Internal/External" },
        { key: "IdCompanyRegNumber",sortable: true, label: "ID/Company Reg Number" },
        { key: "Riskrating",sortable: true, label: "Risk Rating" },
        { key: "SupplierNumber",sortable: true, label: "Supplier Number" },
        { key: "InteractionCount",sortable: true, label: "Interation Count" },
    ],

      mcolumns: [
        { field: "Identifier", label: "Identifier" },
        { field: "DateRange", label: "DateRange" },
        { field: "InternalExternal", label: "InternalExternal" },
        { field: "IdCompanyRegNumber", label: "IdCompanyRegNumber" },
        { field: "Riskrating", label: "Riskrating" },
        { field: "SupplierNumber", label: "SupplierNumber" },
        { field: "InteractionCount", label: "InteractionCount" },
      ],
      
    };
  },

  created() {
    this.loadAllRelationships()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.relationshipsData.length;
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
    this.totalRows = this.relationshipsData.length;
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

    async loadAllRelationships() {


        try {
          await reportService.getAlls3Data().then(response=>{
            if(response.responseBody.length>0){
                this.relationshipsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.relationshipsData = JSON.parse(localStorage.getItem("entity_data"))

        if( this.relationshipsData == undefined){
          this.relationshipsData = entityJsonData;
          localStorage.setItem('entity_data_count', this.relationshipsData.length);
        }
    },

    closeRelationship(){
      this.expandedRelationshipsData = [];
      this.showExpanded = false;

    },

    async expandKeyRelationship(title, id){
      this.showExpanded = true;
      this.expandedRelationshipTitle = title;
  
        try {
          await reportService.getRelationshipsByIdentifier(id).then(response=>{
            if(response.responseBody.length>0){
                this.expandedRelationshipsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.expandedRelationshipsData =[]

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
              :items="relationshipsData"
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
              <template v-slot:cell(id)="row">
                  <a
                    @click="expandKeyRelationship(row.item.id, row.item.id)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Click to view"
                  >
                 {{row.item.id}}

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
            <i class=" ri-close-circle-fill font-size-24 ml-2 mr-2"  @click="closeRelationship()"></i>
            <h4 class="card-title mt-2">{{ expandedRelationshipTitle }}</h4>
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
                    :data="expandedRelationshipsData"
                    :columns="mcolumns"
                    :file-name="'Relationships'"
                    :file-type="'xlsx'"
                    :sheet-name="'All Relationships'"
                    >
                    Export
                </vue-excel-xlsx>
              </b-dropdown-item>
              </b-dropdown>
          </div>
          <div class="table-responsive">
            <b-table
              :items="expandedRelationshipsData"
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