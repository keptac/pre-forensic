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
      keywordsData: [
        {
          "id":1,
          "keyword":"TEST",
          "count":20
        }
      ],
      expandedKeywordsData: [],
      variableObject:{},
      transactionsObject:[],

      mtotalRows: 1,
      showExpanded: false,
      mcurrentPage: 1,
      mperPage: 50,
      mpageOptions: [5, 10, 25],
      mfilter: null,
      mfilterOn: [],
      msortBy: "keyword",
      msortDesc: false,


      exapndedKeywordTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [5, 10, 25],
      filter: null,
      filterOn: [],
      sortBy: "keyword",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true, label: "Id" },
        { key: "keyword", sortable: true, label: "Keyword" },
        { key: "count",sortable: true, label: "Count" },
        { key: "Action",sortable: false, label: "Action" },
      ],
      columns: [
        { field: "keyword", label: "Count" },
        { field: "count", label: "Count" },
      ],


      expandedFields: [
        { key: "id", sortable: true, label: " Id" },
        { key: "date",sortable: true, label: "Datae" },
        { key: "from", sortable: true, label: "From" },
        { key: "to", sortable: true, label: "To" },
        { key: "subject", sortable:true, label:"Subject" },
        { key: "keyword", sortable: true, label: "Keyword" },
        { key: "members", sortable: true, label: "Members" },
        { key: "riskRating", sortable: true, label: "Risk Rating" },
        { key: "location", sortable: true, label: "Location" }
      ],

      mcolumns: [
        { field: "id", label: " ID" },
        { field: "date", label: " date" },
        { field: "from",label: "from" },
        { field: "to", label: "to" },
        { field: "subject", label: "subject" },
        { field: "keyword", label:"keyword" },
        { field: "members", label:"members" },
        { field: "riskRating", label:"riskRating" },
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
      return this.keywordsData.length;
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
    this.totalRows = this.keywordsData.length;
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
          await accountsService.getAllKeywords().then(response=>{
            if(response.responseBody.length>0){
                this.keywordsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    closeKeyWord(){
      this.expandedKeywordsData = [];
      this.showExpanded = false;

    },

    async expandKeyWord(title, id){
      this.showExpanded = true;
      this.exapndedKeywordTitle = title;
  
        try {
          await accountsService.getKeywordsById(id).then(response=>{
            if(response.responseBody.length>0){
                this.expandedKeywordsData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }

        this.expandedKeywordsData =[
        { "id": " T1" ,"date": "25/03/223" ,"from": "Kelvin" ,"to": "Andre" ,"subject":"Test subject" ,"keyword": "TEST" ,"members": "John, James, Mary, Martha" ,"riskRating": "5.6/10" ,"location": "Harare" }
      ]

    },
  }
};
</script>

<template>

  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">

          <p class="card-title mb-4">The following keywords were highlighted for further analysis in brief</p>
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
              :items="keywordsData"
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
                    @click="expandKeyWord(row.item.keyword, row.item.id)"
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
    
    <div v-if="showExpanded" class="col-md-8">
      <div class=" card">
        <div class="card-body">

          <div class="row">
            <i class=" ri-close-circle-fill font-size-24 ml-2 mr-2"  @click="closeKeyWord()"></i>
            <h4 class="card-title mt-2">{{ exapndedKeywordTitle }}</h4>
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
                    :data="expandedKeywordsData"
                    :columns="mcolumns"
                    :file-name="'Keywords'"
                    :file-type="'xlsx'"
                    :sheet-name="'All Keywords'"
                    >
                    Export
                </vue-excel-xlsx>
              </b-dropdown-item>
              </b-dropdown>
          </div>
          <div class="table-responsive">
            <b-table
              :items="expandedKeywordsData"
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