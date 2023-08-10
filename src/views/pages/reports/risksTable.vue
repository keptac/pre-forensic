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
      riskData: [
        { "id":"",
          "date":"", 
          "from_to":"", 
          "type": "", 
          "description": "" 
        },
      ],
      expandedRisksData: [],
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


      exapndedRiskTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [5, 10, 25],
      filter: null,
      filterOn: [],
      sortBy: "id",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true, label: "Identifier" },
        { key: "date", sortable: true, label: "Date" },
        { key: "from_to",sortable: true, label: "From/To" },
        { key: "type",sortable: true, label: "Type(Email/Chat)" },
        { key: "description",sortable: true, label: "Risk Description" },
      ],

      columns: [
        { field: "date", label: "Date" },
        { field: "from_to", label: "From/To" },
        { field: "type", label: "Type(Email/Chat)" },
        { field: "description", label: "Risk Description" },
      ],


      expandedFields: [
        { key: "id", sortable: true, label: " Identifier" },
        { key: "date",sortable: true, label: "Date" },
        { key: "from_to", sortable: true, label: "From/To" },
        { key: "subject", sortable:true, label:"Subject" },
        { key: "riskRating", sortable: true, label: "Risk Rating" },
        { key: "location", sortable: true, label: "Location" }
      ],

      mcolumns: [
        { field: "id", label: " ID" },
        { field: "date", label: " date" },
        { field: "from_to",label: "from_to " },
        { field: "subject", label: "subject" },
        { field: "riskRating", label: "riskRating" },
        { field: "location", label:"location" },
      ],
      
    };
  },

  created() {
    this.loadAllTransactions()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.riskData.length;
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
    this.totalRows = this.riskData.length;
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

    async loadAllTransactions() {
        try {
          await accountsService.getAllRisks().then(response=>{
            if(response.responseBody.length>0){
                this.riskData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    closeRisk(){
      this.expandedRisksData = [];
      this.showExpanded = false;

    },

    async expandRisk(title, id){
      this.showExpanded = true;
      this.exapndedRiskTitle = title;
  
        try {
          await accountsService.getRisksById(id).then(response=>{
            if(response.responseBody.length>0){
                this.expandedRisksData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.expandedRisksData =[
          { 
            "id": "" ,
            "date": "" ,
            "from_to": "" ,
            "subject":"" ,
            "riskRating": "" ,
            "location": "" 
          }
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
              :items="riskData"
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
                    @click="expandRisk(row.item.id, row.item.id)"
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
            <i class=" ri-close-circle-fill font-size-24 ml-2 mr-2"  @click="closeRisk()"></i>
            <h4 class="card-title mt-2">{{ exapndedRiskTitle }}</h4>
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
                    :data="expandedRisksData"
                    :columns="mcolumns"
                    :file-name="'Risks'"
                    :file-type="'xlsx'"
                    :sheet-name="'All Risks'"
                    >
                    Export
                </vue-excel-xlsx>
              </b-dropdown-item>
              </b-dropdown>
          </div>
          <div class="table-responsive">
            <b-table
              :items="expandedRisksData"
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