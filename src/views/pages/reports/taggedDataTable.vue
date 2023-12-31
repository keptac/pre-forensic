<script>
/**
 * InputData component
 */

import { reportService } from '../../../services/report.service';
import {
  paymentServiceMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {

       // Internal Data
      taggedData: [
      ],
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

      // External Data
      externalData: [

      ],

      etotalRows: 1,
      ecurrentPage: 1,
      eperPage: 5,
      epageOptions: [5, 10],
      efilter: null,
      efilterOn: [],
      esortBy: "batchDate",
      esortDesc: false,
      efields: [
        { key: "source",sortable: true, label: "Source" },
        { key: "batchDate",sortable: true, label: "Batch Date" },
        { key: "qtyReportsPulled", sortable: true, label: "QTY Reports Pulled " },
      ],

      ecolumns: [
        { field: "source", label: "Source" },
        { field: "batchDate",label: "Batch Date" },
        { field: "qtyReportsPulled", label: "QTY Reports Pulled " },
      ],

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
      return this.taggedData.length;
    },

    notification() {
        return this.$store ? this.$store.state.notification : null;
      }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.taggedData.length;
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
                await reportService.getAllExternalData().then(response=>{
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
                this.taggedData = response.responseBody;
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
          this.taggedData = [];
          console.log(result.responseBody);
          this.taggedData = result.responseBody
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
              :data="taggedData"
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

      <h4 class="card-title mb-4">Internal Data</h4>
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
          :items="taggedData"
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
              :class="{'badge-soft-danger': `${row.item.transactionDetails.transactionStatus}` === 'declined',
              'badge-soft-success': `${row.item.transactionDetails.transactionStatus}` === 'collected',
              'badge-soft-info': `${row.item.transactionDetails.transactionStatus}` === 'approved',
              'badge-soft-warning': `${row.item.transactionDetails.transactionStatus}` === 'pending'}"
            >{{row.item.transactionDetails.transactionStatus==='pending'?'Deposit Pending':row.item.transactionDetails.transactionStatus==='approved'?'Pending Collection':String(row.item.transactionDetails.transactionStatus).toUpperCase()}}</div>
          </template>
          <template v-slot:cell(temp)="row">
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

  <!-- External Data -->
  <div class="card col-md-6">
    <div class="card-body">
      <b-dropdown right toggle-class="arrow-none card-drop" class="float-right" variant="white">
        <template v-slot:button-content>
          <i class="mdi mdi-dots-vertical"></i>
        </template>
        <!-- item-->
        <b-dropdown-item>
          <vue-excel-xlsx
              class="btn"
              :data="externalData"
              :columns="ecolumns"
              :file-name="'External Data Report'"
              :file-type="'xlsx'"
              :sheet-name="''"
              >
              Export Report
          </vue-excel-xlsx>
        </b-dropdown-item>
        <!-- item-->
      
      </b-dropdown>

      <h4 class="card-title mb-4">External Data</h4>
      <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="eperPage" size="sm" :options="epageOptions"></b-form-select>&nbsp;entries
            </label>
          </div>
        </div>
        <!-- Search -->
        <div class="col-sm-12 col-md-6">
          <div id="tickets-table_filter" class="dataTables_filter text-md-right">
            <label class="d-inline-flex align-items-center">
              Search:
              <b-form-input
                v-model="efilter"
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
          :items="externalData"
          :fields="efields"
          responsive="sm"
          :per-page="eperPage"
          :current-page="ecurrentPage"
          :sort-by.sync="esortBy"
          :sort-desc.sync="esortDesc"
          :filter="efilter"
          :filter-included-fields="efilterOn"
          @filtered="eonFiltered"
        >

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