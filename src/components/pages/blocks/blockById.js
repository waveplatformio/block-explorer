import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import GetTimeAfterDate from "../../hepers/getTimeBeforeNow";
import BlockContainer from "./blockContainer";
import Transactions from "../transactions/transactionsContainer";
import TransactionsList from "../transactions/transactionsListContainer";

const BlockById = ({ match, ...props }) => {
  const [blockData, setBlockData] = useState(null);
  const [blockTime, setBlockTime] = useState(null);
  const [blockError, setBlockError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(props, "bbbbbbbbbbbbb");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://51.255.211.135:8181/block/" + match.params?.ID)
      .then((res) => {
        if (res.data.error) {
          return setBlockError(res.data.error);
        }
        setBlockTime(new Date(res.data.timestamp));

        setBlockData(res.data);

        // setBlockData(res.data.header.data);
        // setBlockTime(new Date(res.data.header.data.timestamp * 1000));
        // console.log(new Date(res.data00));
        setLoading(false);
      })
      .catch((err) => {
        // debugger;
        // let testObj = {
        //   previousHash:
        //     "b974c35b0ef543fac72ccd6ad63a8583c3ee840821a4ac4e334098e13626b087",
        //   transactions: [
        //     {
        //       id: "26d66553-7390-46fc-8059-15dd7036dd13",
        //       type: {
        //         type: "transaction",
        //       },
        //       input: {
        //         signature: "[B@729cf71e",
        //         from:
        //           "19bfc18fc741d581c2e80b13e611038d81b39d104e07a75ffc7cc76fa28fe12c",
        //         timestamp: 1612206615214,
        //       },
        //       output: {
        //         to: "toaddress",
        //         amount: 20.0,
        //         fee: 1,
        //       },
        //     },
        //   ],
        //   timestamp: 1612206615214,
        //   validator:
        //     "19bfc18fc741d581c2e80b13e611038d81b39d104e07a75ffc7cc76fa28fe12c",
        //   hash:
        //     "4107f5f639dc960f516aa4e7e0367ac15b4a2715f141fea1a629d844e2bed1c4",
        //   secret: "some wallet",
        //   blockReward: 5,
        //   signature:
        //     "TQhP0q3O/7GMlNuDR6EmU2i/JJ4RAuPEfmVpdo3Dtwvb92OAC+0SHS+1Udl3tqp7BrpFnT0blMIgYD3/sU0Euw==",
        // };
        setLoading(false);

        // debugger;
        setBlockError("Block nor found");
        debugger;
      });
  }, [match.params?.ID]);
  console.log(blockData, blockError, "llllllll");
  return (
    <>
      <BlockContainer
        block={{
          ...blockData,
          time: blockTime,
          hasError: blockError,
          blockName: match.params?.ID,
          loading,
        }}
      />
      <div className="container">
        <TransactionsList transactions={blockData?.transactions} />
      </div>
      {/* 
      <div className="blockTransactionsSection container">
        <h4>block transactions</h4>
        <Transactions />
      </div> */}
    </>
    // <div className="container">
    //   <div className="row">
    //     <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
    //       <div className="card h-100">
    //         <div className="card-header newHeader">
    //           <span className="card-header-title">
    //             Block #{match.params?.ID}
    //           </span>
    //         </div>

    //         <div
    //           className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
    //           style={{
    //             minHeight: "400px",
    //             position: "relative",
    //             overflow: "visible",
    //             maxHeight: "1000px",
    //           }}
    //         >
    //           <div
    //             id="mCSB_1"
    //             className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
    //             style={{ maxHeight: "none" }}
    //           >
    //             <div
    //               id="mCSB_1_container"
    //               className="mCSB_container"
    //               style={{ position: "relative", top: "0px", left: "0px" }}
    //               dir="ltr"
    //             >
    //               {blockError ? (
    //                 <div className="alert alert-danger" role="alert">
    //                   {blockError}
    //                 </div>
    //               ) : (
    //                 <>
    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       Timestamp:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>
    //                       &#128341;
    //                       {GetTimeAfterDate(blockData?.timestamp)}{" "}
    //                       <Moment format="YYYY/MM/DD">{blockTime}</Moment>
    //                     </div>
    //                   </div>
    //                   <hr />
    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       additions_root:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>

    //                       {blockData?.additions_root}
    //                     </div>
    //                   </div>
    //                   <hr />

    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       additions_root:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>

    //                       {blockData?.additions_root}
    //                     </div>
    //                   </div>
    //                   <hr />

    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       total_iters:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>

    //                       {blockData?.total_iters}
    //                     </div>
    //                   </div>
    //                   <hr />

    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       extension_data:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>

    //                       {blockData?.extension_data}
    //                     </div>
    //                   </div>
    //                   <hr />

    //                   <div class="row align-items-center">
    //                     <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
    //                       <i
    //                         class="fal fa-question-circle text-secondary mr-1"
    //                         data-container="body"
    //                         data-toggle="popover"
    //                         data-placement="top"
    //                         data-original-title=""
    //                         title=""
    //                         data-content="The date and time at which a block is mined."
    //                       ></i>
    //                       farmer_rewards_puzzle_hash:
    //                     </div>
    //                     <div class="col-md-9">
    //                       <i class="far fa-clock small mr-1"></i>

    //                       {blockData?.farmer_rewards_puzzle_hash}
    //                     </div>
    //                   </div>
    //                   <hr />
    //                 </>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BlockById;
