<script>
/**
 * Transactions component
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
      transactionData: [],
      variableObject:{},
      modalTitle:"",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 25, 50],
      filter: null,
      filterOn: [],
      shopList:[],
      sortBy: "transactionId",
      sortDesc: false,
      fields: [

        // { key: "transactionId", sortable: true, label: " ID" },
        { key: "date", sortable: true, label:"Dates" },
        { key: "senderDetails",sortable: true, label: "Sender Name" },
        { key: "senderDetails.nationalId",sortable: true, label: "Sender ID" },
        { key: "receiverDetails", sortable: true, label: "Receiver Name" },
        { key: "receiverNationalId", sortable: true, label: "Receiver ID" },
        { key: "transactionDetails.amount", sortable: true, label: "Amount" },
        { key: "transactionDetails.purposeOfFunds", sortable: true, label: "Purpose" },
        // { key: "depositPayOutBranch", sortable: true, label: "Deposit Payout Branch" },
        // { key: "withdrawalPayOutBranch", sortable: true, label: "Preferred Payout Branch" },
        // { key: "preferredWithdrawalPayOutBranch", sortable: true, label: "Withdrawal Payout Branch" },
        // { key: "payoutBranches", sortable: false ,label: "Payout Branches" },
        { key: "status", sortable: true, label: "Status" },
        { key: "commissions", sortable: false },
      ],

      columns: [
        { field: "transactionId", label: " ID" },
        { field: "dates.dateInitiated", label:"Date" },
        { field: "senderDetails.lastName",label: "Sender Last Name" },
        { field: "senderDetails.firstName",label: "Sender First Name" },
        { field: "senderDetails.nationalId",label: "Sender National Id" },
        { field: "receiverDetails.lastName",  label: "Receiver Last Name" },
        { field: "receiverDetails.firstName",  label: "Receiver First Name" },
        { field: "receiverNationalId",  label: "Receiver Last Name" },
        { field: "transactionDetails.amount", label: "Amount" },
        { field: "transactionDetails.purposeOfFunds", label: "Purpose" },
        { field: "payoutBranches.depositPayOutBranch",label: "Payout Branches" },
        { field: "transactionDetails.transactionStatus", label: "Status" }
      ],

      form: {
        shopId:"",
        startDate: "",
        endDate:""
      },
    };
  },

  created() {
    this.loadAllTransactions(),
    this.loadAllShops()
  },

  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.transactionData.length;
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

    async loadAllShops() {
            try {
                await shopService.getAllShops().then(response=>{
                    if(response.responseBody.length>0){
                      this.shopList = response.responseBody;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

    async loadAllTransactions() {
        try {
          await reportService.getGlobalTransactionReport().then(response=>{
            if(response.responseBody.length>0){
                this.transactionData = response.responseBody;
              }
          });
        } catch (error) {
          console.log(error);
        }
    },

    searchTransactions() {
      this.submitted = true;
      reportService.searchTransactions(this.form).then(result=>{
        if(result.status=="SUCCESS"){
          this.submitted = false;
          this.form = Object.assign({}, this.form);
          this.transactionData = [];
          console.log(result.responseBody);
          this.transactionData = result.responseBody
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
    <b-modal id="user-modal-standard" :title="modalTitle" title-class="font-18" hide-footer>
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
    <b-modal id="commissions-modal-standard" :title="modalTitle" title-class="font-18" hide-footer>
          <div class="row">
            <div class="col-xl-12">
              <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Commission Status: {{variableObject.commissionStatus}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Deposit Commission : $ {{variableObject.depositCommission}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Deposit Commission Percentage: {{variableObject.depositCommissionPercentage}} %
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Withdrawal Commission: $ {{variableObject.withdrawalCommission}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Withdrawal Commission Percentage: {{variableObject.withdrawalCommissionPercentage}} %
                </p>
              </div>
            </div>
    </b-modal>
    <b-modal id="payoutBranches-modal-standard" :title="modalTitle" title-class="font-18" hide-footer>
          <div class="row">
            <div class="col-xl-12">
              <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Deposit Branch: {{variableObject.depositPayOutBranch}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Preferred Collection Branch : {{variableObject.preferredWithdrawalPayOutBranch}}
                </p>
                <p class="mb-2 text-truncate">
                  <i class="mdi mdi-circle text-primary font-size-10 mr-1"></i>Withdrawal Branch: {{variableObject.withdrawalPayOutBranch}}
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
              :data="transactionData"
              :columns="columns"
              :file-name="'Transactions Report'"
              :file-type="'xlsx'"
              :sheet-name="'latest transactions'"
              >
              Export Report
          </vue-excel-xlsx>
        </b-dropdown-item>
        <!-- item-->
      
      </b-dropdown>

      <h4 class="card-title mb-4">Latest Transactions</h4>
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
            <form  @submit.prevent="searchTransactions">
              <label class="d-inline-flex align-items-center">
                Branch
                  <select class="form-control form-control-sm ml-2" v-model="form.shopId">
                      <option  v-for="(shop, index) in shopList" :value="shop.id" :key="index" >{{shop.name}}</option>
                  </select>
              </label>
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
          <template v-slot:cell(senderDetails)="row">
              <a
                @click="storeState(row.item.senderDetails, 'Sender Details')"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view"
              >
                <div v-b-modal.user-modal-standard>{{row.value.firstName + ' ' + row.value.lastName}}</div>
              </a>
          </template>
          <template v-slot:cell(receiverDetails)="row">
              <a
                @click="storeState(row.item.receiverDetails, 'Receiver Details')"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view"
              >
                <div v-b-modal.user-modal-standard>{{row.value.firstName + ' ' + row.value.lastName}}</div>
              </a>
          </template>
          <template v-slot:cell(commissions)="row">
              <a
                @click="storeState(row.item.commissions, 'Commission Details')"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view more"
              >
                <a v-b-modal.commissions-modal-standard><i class="mdi mdi-eye font-size-18" ></i> 
                View Commissions</a>
              </a>
          </template>
          <template v-slot:cell(payoutBranches)="row">
              <a
                @click="storeState(row.item, 'Payout Branches')"
                href="javascript:void(0);"
                class="mr-3 text-primary"
                v-b-tooltip.hover
                title="Click to view more"
              >
               <a v-b-modal.payoutBranches-modal-standard> <i  class="mdi mdi-eye font-size-18" ></i>View Payout Branches</a>

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