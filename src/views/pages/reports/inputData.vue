<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import InputDataTable from './inputDataTable';

/**
 * Starter page component
 */
export default {
  page: {
    title: "",
    meta: [{ name: "description" }]
  },
  components: { Layout, PageHeader, InputDataTable },
  data() {
    return {
      title: "INPUT DATA",
      items: [
      ]
    };
  }
};
</script>

<template>
  <Layout>
    <PageHeader class="mt-5 ml-2" :title="title" :items="items" />

    <div class="row">
        <div class="col-lg-12 ">
          <div class="card">
            <div class="card-body">
              <h3>Detailed description of area of concern for context</h3>
              <p style="padding-left: 40px;padding-right: 40px;">

                Dear Mr. Lay.<br/><br/>
                Has Enron become a risky place to work? For those of us who didn't get rich over the last few years. can we afford to stay?
                Skilling's abrupt departure will raise suspicions of accounting improprieties and valuation issues. Baron has been very aggressive in its accounting - most notably the Raptor transactions and the Condor vehicle. We do have Valuation issues with our international assets and possibly some of our EES MTM positions. 
                The spotlight will be on us, the market just can't accept that Skilling is leaving his dream job. I think that the valuation issues can be fixed and reported with other goodwill write-downs to occur in 2002. How do we fix the Raptor and Condor deals? They unwind in 2002 and 2003. We will have to pony up Enron stock and that won't go unnoticed.
                To the layman on the street. it will look like we recognized funds flow of $800 mm from merchant asset sales in 1999 by selling to a vehicle (Condor) that we capitalized with a promise of Enron stock in later years. Is that really funds flow or is it cash from equity issuance?
                We have recognized over 5550 million of fair value gains on stocks via our swaps with Raptor, much of that stock has declined significantly - Avici by 98%, from $178 mm to $5 mm, The New Power Co by 70%, from $20/share to $6/share. The value in the swaps won't be there for Raptor. So once again Enron will issue stock to offset these losses. Raptor is an tiM entity. It sure looks to the layman on the street that we are hiding losses in a related company and will compensate that company with Baron stock in the future.
                I am incredibly nervous that we will implode in a wave of accounting scandals. My 8 years of Enron work history will be worth nothing on my resume, the business world will consider the past successes as nothing but an elaborate accounting hoax. Skilling is resigning now for 'personal reasons' but I think he wasn't having fun, looked down the road and knew this stuff was unfixable and would rather abandon ship now than resign in shame in 2 years.
                Is there a way our accounting guru's can unwind these deals now? I have thought and thought about how to do this, but I keep bumping into one big problem - we booked the Condor and Raptor deals in 1999 and 2000, we enjoyed a wonderfully high stock price, many executives sold stock, we then try and reverse or fix the deals in 2001 and it's a bit like robbing the bank in one year and trying to pay it back 2 years later. Nice try, but investors were hurt, they bought at $70 and $80/share looking for $120/share and now they're at $38 or worse. We are under too much scrutiny and there are probably one or two disgruntled ‘redeployed’ employees who know enough about the ‘funny’ accounting to get us in trouble.
                What do we do? I know this question cannot be addressed in the all employee meeting, but can you give some assurances that you and Causey will sit down and take a good hard objective look at what is going to happen to Condor and Raptor in 2002 and 2003
                </p>
            </div>
          </div>
        </div>
    </div>

    <div class="row">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body row">
            <div class="col-md-4 list-section">
                <h5>Entities:</h5>
                <ul>
                    <li>Raptor I</li>
                    <li>Raptor II</li>
                    <li>Raptor III</li>
                    <li>Raptor IV</li>
                    <li>Condor</li>
                    <li>Avici</li>
                    <li>The New Power Co</li>
                    <li>Baron</li>
                </ul>
                <h5>Transactions:</h5>
                <ul>
                    <li>EES MTM</li>
                </ul>
            </div>
            <div class="col-md-4 list-section">
                <h5>Individuals:</h5>
                <ul>
                    <li>Jeff Skilling (President and COO)</li>
                    <li>Ken Lay (Chairman and CEO)</li>
                </ul>
                <h5>Tacitly implicated:</h5>
                <ul>
                    <li>Andy Fastow (CFO)</li>
                    <li>Rick Causey (Chief Accounting)</li>
                    <li>Bob Butts (Corporate accounting & financial reporting)</li>
                    <li>(Potentially many more)</li>
                </ul>
            </div>
            <div class="col-md-4 list-section">
                <h5>Desired Outcomes:</h5>
                <ul>
                    <li>Evidence of wrongdoings</li>
                    <li>Identify network of implicated individuals</li>
                    <li>Uncovering the extent of the frauds committed</li>
                    <li>Motivation behind changing to mark-to-market accounting method</li>
                </ul>
            </div>
          </div>
           
        </div>
    </div>
    </div>
      <div class="row">
        <div class="col-md-12 ">
            <InputDataTable/>
        </div>
    </div>
  </Layout>
</template>