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
      transactionData: [],
      variableObject:{},
      transactionsObject:[],

      mtotalRows: 1,
      mcurrentPage: 1,
      mperPage: 50,
      mpageOptions: [5, 10, 25, 50],
      mfilter: null,
      mfilterOn: [],
      msortBy: "transactionReference",
      msortDesc: false,


      modalTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 50,
      pageOptions: [5, 10, 25, 50],
      filter: null,
      filterOn: [],
      sortBy: "transactionReference",
      sortDesc: false,
      fields: [
        { key: "id", sortable: true, label: " ID" },
        { key: "accountName",sortable: true, label: "Account Name" },
        { key: "accountType", sortable: true, label: "Account Type" },
        { key: "accountStatus", sortable: true, label: "Account Status" },
        { key: "balances", sortable: false, label: "Balances" }
      ],
      transactionFields: [
        { key: "id", sortable: true, label: " ID" },
        { key: "amount",sortable: true, label: "Amount" },
        { key: "currencyType", sortable: true, label: "Currency" },
        { key: "transactionCategory", sortable: true, label: "Type" },
        { key: "narration", sortable:true, label:"Narration" },
        { key: "transactionTimestamp", sortable: false, label: "Date" }
      ],
      columns: [
        { field: "id", label: " ID" },
        { field: "accountName", label: " Account Name" },
        { field: "accountType",label: "Account Type " },
        { field: "accountStatus", label: "Status" },
      ],

      mcolumns: [
        { field: "id", label: " ID" },
        { field: "amount", label: " Amount" },
        { field: "currencyType",label: "Currency " },
        { field: "transactionCategory", label: "Category" },
        { field: "narration", label: "Narration" },
        { field: "transactionTimestamp", label:"Date" },
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
      return this.transactionData.length;
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
    this.totalRows = this.transactionData.length;
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
      // const rowsToBeRemoved = ["1","2","3"];
      // const rowsToBeRemoved = ["3","4","5"];
      const rowsToBeRemoved = [];
        try {
          await accountsService.getAllAccounts().then(response=>{
            if(response.responseBody.length>0){

              rowsToBeRemoved.forEach(element => {
                const indexOfObject = response.responseBody.findIndex(object => {
                  return object.id == element;
                });
                response.responseBody.splice(indexOfObject, 1);
              });

                this.transactionData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    storeState(object, title, tranob){
      this.variableObject = object;
      this.transactionsObject = tranob;
      console.log(tranob);
      console.log(object);
      this.modalTitle = title;
    },
  }
};
</script>

<template>
  <div class="card">
    <b-modal size="xl" id="balances-modal-standard" :title="modalTitle" title-class="font-18" hide-footer>
          <div class="row">
            <div class="col-md-12">
                <p class="mb-2 text-truncate" v-for="balance in variableObject" :key="balance.id">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i> {{balance.currencyType.toUpperCase() + " Balance: " + balance.currentBalance}}
                </p>
              </div>
            </div>
          <div class="row">
            <div class="col-md-12">
              <div class="row mt-4">
                <div class="col-sm-12 col-md-5">
                  <div id="tickets-table_length" class="dataTables_length">
                    <label class="d-inline-flex align-items-center">
                      Show&nbsp;
                      <b-form-select v-model="mperPage" size="sm" :options="mpageOptions"></b-form-select>&nbsp;entries
                    </label>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
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

                <b-dropdown right toggle-class="arrow-none card-drop" class="col-md-1 float-right" variant="white">
                  <template v-slot:button-content>
                    <i class="mdi mdi-dots-vertical"></i>
                  </template>
                  <!-- item-->
                  <b-dropdown-item>
                    <vue-excel-xlsx
                        class="btn"
                        :data="transactionsObject"
                        :columns="mcolumns"
                        :file-name="' Report'"
                        :file-type="'xlsx'"
                        :sheet-name="'balances'"
                        >
                        Export
                    </vue-excel-xlsx>
                  </b-dropdown-item>
                  <!-- item-->
                </b-dropdown>
              </div>


              <div class="table-responsive">
                <b-table
                  :items="transactionsObject"
                  :fields="transactionFields"
                  responsive="sm"
                  :per-page="mperPage"
                  :current-page="mcurrentPage"
                  :sort-desc.sync="msortDesc"
                  :filter="mfilter"
                  :filter-included-fields="mfilterOn"
                  @filtered="monFiltered"
                >
                <template v-slot:cell(currencyType)="row">
                  <div>{{String(row.item.currencyType).toUpperCase()}}</div>
                </template>

                <template v-slot:cell(transactionTimestamp)="row">
                  <div>{{String(row.item.transactionTimestamp).substring(0,10)}}</div>
                </template>
                <template v-slot:cell(transactionCategory)="row">
                    <a
                      @click="row.toggleDetails"
                      href="javascript:void(0);"
                      class="text-success"
                      v-b-tooltip.hover
                      :title="row.item.transactionCategory"
                      v-if="row.item.transactionCategory==='credit'"
                    >
                      <i class="mdi mdi-arrow-left font-size-18">CR</i>
                  </a>
                  <a
                      @click="row.toggleDetails"
                      href="javascript:void(0);"
                      class="text-danger"
                      v-b-tooltip.hover
                      :title="row.item.transactionCategory"
                      v-if="row.item.transactionCategory==='debit'"
                    >
                      <i class="mdi mdi-arrow-right font-size-18">DR</i>
                  </a>
                
                </template>
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
     
    </b-modal>

    <div class="card-body">
      
      <h4 class="card-title mb-4"></h4>
      <div class="row mt-4">
        
        <div class="col-sm-12 col-md-4">
          <div id="tickets-table_length" class="dataTables_length">
            <label class="d-inline-flex align-items-center">
              Show&nbsp;
              <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
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

        <b-dropdown right toggle-class="arrow-none card-drop" class="col-md-1 float-right" variant="white">
                  <template v-slot:button-content>
                    <i class="mdi mdi-dots-vertical"></i>
                  </template>
                  <!-- item-->
                  <b-dropdown-item>
                    <vue-excel-xlsx
                        class="btn"
                        :data="transactionData"
                        :columns="columns"
                        :file-name="'Account List'"
                        :file-type="'xlsx'"
                        :sheet-name="'All Accounts'"
                        >
                        Export
                    </vue-excel-xlsx>
                  </b-dropdown-item>
                  <!-- item-->
                </b-dropdown>
      </div>
      <div class="table-responsive">
        <b-table
          :items="transactionData"
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
          <template v-slot:cell(accountStatus)="row">
            <div
              class="badge font-size-14 badge-soft-success"
              :class="{
              'badge-soft-success': `${row.item.accountStatus}` === 'active',
              'badge-soft-warning': `${row.item.accountStatus}` === 'inactive'}"
            >{{String(row.item.accountStatus).toUpperCase()}}</div>
          </template>

          <template v-slot:cell(balances)="row">
              <a
                @click="storeState(row.item.balanceList, row.item.accountName, row.item.accountTransactions)"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view"
              >
                <div v-b-modal.balances-modal-standard>View </div>
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