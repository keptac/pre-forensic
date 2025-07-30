<script>
/**
 * InputData component
 */

import { reportService } from '../../../services/report.service';
import inputJsonData from '../../../assets/data/case_data.json';

import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {

       // Internal Data
      caseData: [],
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
        { key: "caseNumber",sortable: true, label: "Case number" },
        { key: "caseName",sortable: true, label: "Employee/Vendor name" },
        { key: "caseDescription", sortable: true, label: "Case Description" },
        { key: "createby", sortable: true, label: "Investigator" },
        { key: "dateInitiated", sortable: true, label:"Date created" },
        // { key: "status", sortable: true, label:"Status" },
        { key: "action", sortable:false, label:"Action"}

      ],

      columns: [
        { field: "caseNumber", label: "Case number" },
        { field: "caseName",label: "Case name" },
        { field: "caseDescription",label: "Case Description" },
        { field: "createby",label: "Created By" },
        { field: "dateInitiated", label:"Date created" },
        { field: "status", label:"Status" }
      ],
      form: {
        startDate: "",
        endDate:""
      },

  

    };
  },

  created() {
    this.loadCaseData()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.caseData.length;
    },

    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.caseData.length;
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

    async loadCaseData() {
        // try {
        //   await reportService.getAlls3Data().then(response=>{
        //     if(response.responseBody.length>0){
        //         this.caseData = response.responseBody;
        //       }
        //   });
        // } catch (error) {
        //   console.log(error);
        // }

        // this.caseData = JSON.parse(localStorage.getItem("case_data"));

        // if( this.caseData == undefined){
        //   this.caseData = inputJsonData;
        //   localStorage.setItem('external_data_count', this.caseData.length);
        // }

        this.caseData = inputJsonData;
        localStorage.setItem('case_data_count', this.caseData.length);

    },

      saveBody(row){
      console.log(row)
    },

    searchInputData() {
      this.submitted = true;
      reportService.searchInputData(this.form).then(result=>{
        if(result.status=="SUCCESS"){
          this.submitted = false;
          this.form = Object.assign({}, this.form);
          this.caseData = [];
          console.log(result.responseBody);
          this.caseData = result.responseBody
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

  <b-modal size="lg" id="message-body-modal" title="Alert Details: Case view" title-class="font-18" hide-footer>
      <div class="row">
        <div class="col-lg-6 ">
          <div class="card">
            <div class="card-header">
              <h5>Case Summary</h5>
            </div>
            <div class="card-body">
              <p>LLM Generated Summary goes here<br/> Contains Actors involved</p>
            </div>
            
          </div>
        </div>
        <div class="col-lg-6 ">
          <div class="card">
            <div class="card-header">
              <h5>Events timeline</h5>
            </div>
            <div class="card-body">
              <p class="text-center">LLM Generate Timeline with risk explanation</p>
            </div>
          </div>
        </div>
      </div>
        <div class="row ">
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-file-alt"></i>
                  <h5 style="color: white">Examiner notes</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-envelope"></i>
                  <h5 style="color: white">Emails</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-file-alt"></i>
                  <h5 style="color: white">System Logs</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-3 ">
            <div class="card ">
              <div class="card-body body-colored">
                <i style="font-size: 2em; margin-bottom:20px" class="fas fa-download"></i>
                  <h5 style="color: white">Export Report</h5>
              </div>
            </div>
          </div>
          </div> 
    </b-modal>


  <!-- InternalData -->
   <div class="row">
    <div class="col-md-11">
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
                :data="caseData"
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

        <h4 class="card-title mb-4">Cases</h4>
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
            :items="caseData"
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

            <template v-slot:cell(status)="row">
              <div
                class="badge font-size-14 badge-soft-success"
                :class="{'badge-soft-danger': `${row.item.status}` === 'declined',
                'badge-soft-success': `${row.item.statuss}` === 'collected',
                'badge-soft-info': `${row.item.status}` === 'approved',
                'badge-soft-warning': `${row.item.status}` === 'pending'}"
              >{{row.item.status==='pending'?'Deposit Pending':row.item.status==='approved'?'Pending Collection':String(row.item.status).toUpperCase()}}</div>
            </template>

            <!-- <template v-slot:cell(action)="row">
                  <a
                    @click="expandKeyWord(row.item, row.item.keyword)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary"
                    v-b-tooltip.hover
                    title="Click to view"
                  >
                  <i class=" ri-eye-fill font-size-24"></i>

                  </a>
              </template> -->

              <template v-slot:cell(action)="row">
                  <a
                    @click="saveBody(row.item)"
                    href="javascript:void(0);"
                    class="mr-3 text-primary text-center"
                    v-b-tooltip.hover
                    title="View to read message"
                  >
                  <div v-b-modal.message-body-modal> <i class=" ri-eye-fill font-size-24"></i></div>

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



</div>

</template>