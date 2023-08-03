<script>
/**
 * InputData component
 */

import { reportService } from '../../../services/report.service';
import { shopService } from '../../../services/shop.service';
import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      inputData: [],
      variableObject:{},
      modalTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25],
      filter: null,
      filterOn: [],
      externalData:[],
      sortBy: "dateInitiated",
      sortDesc: false,
      fields: [

        { key: "fileName",sortable: true, label: "File Name" },
        { key: "type",sortable: true, label: "Type" },
        { key: "size", sortable: true, label: "File Size" },
        { key: "createby", sortable: true, label: "Created By " },
        { key: "dateInitiated", sortable: true, label:"Date created" },
        { key: "dateModified", sortable: true, label:"Date modified" },
        { key: "dateAccessed", sortable: true, label:"Date accessed" },
      ],

      columns: [
        { field: "fileName", label: " File Name" },
        { field: "type",label: "Type" },
        { field: "size",label: "File Size" },
        { field: "createby",label: "Created By" },
        { field: "dateInitiated", label:"Date created" },
        { field: "dateModified", label:"Date modified" },
        { field: "dateAccessed", label:"Date accessed" },
      ],

      form: {
        startDate: "",
        endDate:""
      },
    };
  },

  created() {
    this.loadAllInputData(),
    this.loadAllExternalData()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.inputData.length;
    },

    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.inputData.length;
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

    async loadAllExternalData() {
            try {
                await shopService.getAllExternalData().then(response=>{
                    if(response.responseBody.length>0){
                      this.externalData = response.responseBody;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

    async loadAllInputData() {
        try {
          await reportService.getGlobalInputDataReport().then(response=>{
            if(response.responseBody.length>0){
                this.inputData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    searchInputData() {
      this.submitted = true;
      reportService.searchInputData(this.form).then(result=>{
        if(result.status=="SUCCESS"){
          this.submitted = false;
          this.form = Object.assign({}, this.form);
          this.inputData = [];
          console.log(result.responseBody);
          this.inputData = result.responseBody
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
  <div class="card">

    <b-modal id="filename-modal-standard" :title="modalTitle" title-class="font-18" hide-footer>
          <div class="row">
            <div class="col-xl-12">
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Full Name: {{variableObject.firstName + " " + variableObject.lastName}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Phone Number: {{variableObject.phoneNumber}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Email address: {{variableObject.emailAddress}}
                </p>
              </div>
            </div>
    </b-modal>

    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>
          <vue-excel-xlsx
              class="btn"
              :data="inputData"
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

      <h4 class="card-title mb-4"></h4>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-3">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
            </label>
          </div>
        </div>
        
        <!-- date Filter -->
        <div class="col-sm-12 col-md-6">

          <div id="tickets-table_filter" class="row mb-3">
            <form  @submit.prevent="searchInputData">
              <label class=" ml-3  d-inline-flex align-items-center">
                Start 
                <input
                  v-model="form.startDate"
                  type="date"
                  class="form-control form-control-sm ml-2"
                />
              </label>
              <label class=" ml-3  d-inline-flex align-items-center">
                End
                <input
                  v-model="form.endDate"
                  type="date"
                  class="form-control form-control-sm ml-2"
                />
              </label>
              <button class="ml-3 btn btn-primary d-inline-flex align-items-center" type="submit">Search</button>
            </form>
          </div>
            
        </div>
        <!-- end of date filter -->

        <!-- Search -->
        <div class="col-sm-12 col-md-3">
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
          :items="inputData"
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

        <template v-slot:cell(date)="row">
            <div
            >{{row.item.dates.dateInitiated.substring(0,10)}}</div>
          </template>

          <template v-slot:cell(status)="row">
            <div
              class="badge font-size-14 badge-soft-success"
              :class="{'badge-soft-danger': `${row.item.transactionDetails.transactionStatus}` === 'declined',
              'badge-soft-success': `${row.item.transactionDetails.transactionStatus}` === 'collected',
              'badge-soft-info': `${row.item.transactionDetails.transactionStatus}` === 'approved',
              'badge-soft-warning': `${row.item.transactionDetails.transactionStatus}` === 'pending'}"
            >{{row.item.transactionDetails.transactionStatus==='pending'?'Deposit Pending':row.item.transactionDetails.transactionStatus==='approved'?'Pending Collection':String(row.item.transactionDetails.transactionStatus).toUpperCase()}}</div>
          </template>
          <!-- <template v-slot:cell(receiverDetails)="row">
            <div>{{row.value.receiverFirstName + ' ' + row.value.receiverDetails}}</div>
          </template> -->
          <template v-slot:cell(fileName)="row">
              <a
                @click="storeState(row.item, 'File Details')"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view"
              >
                <div v-b-modal.filename-modal-standard>{{row.value.fileName}}</div>
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
</template>