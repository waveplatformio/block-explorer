import React from "react";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import GetTimeAfterDate from "../../hepers/getTimeBeforeNow";

function transactionsContainer({ transaction }) {
  // debugger;
  console.log(transaction, "propspropsprops");
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
          <div className="card h-100">
            <div className="card-header newHeader">
              <span className="card-header-title">
                transaction #{transaction.txId}
              </span>
            </div>

            <div
              className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
              style={{
                minHeight: "400px",
                position: "relative",
                overflow: "visible",
                maxHeight: "1000px",
              }}
            >
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
                style={{ maxHeight: "none" }}
              >
                <div
                  id="mCSB_1_container"
                  className="mCSB_container"
                  style={{ position: "relative", top: "0px", left: "0px" }}
                  dir="ltr"
                >
                  {transaction.loading ? (
                    <div className="text-center">
                      <img src="https://www.siue.edu/~itoberm/Images/ThinkingAnimate.gif" />
                    </div>
                  ) : transaction.hasError ? (
                    <div className="alert alert-danger" role="alert">
                      {transaction.hasError}
                    </div>
                  ) : (
                    <>
                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          Timestamp:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          &#128341;{" "}
                          <Moment format="YYYY/MM/DD HH:mm:ss">
                            {transaction.time}
                          </Moment>
                        </div>
                      </div>
                      <hr />
                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          txId:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {transaction.txId}
                        </div>
                      </div>
                      <hr />

                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          from:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          <a href={"/wallet/" + transaction?.input?.from}>
                            {transaction?.input?.from}
                          </a>
                        </div>
                      </div>
                      <hr />
                      {/* 
                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          previousHash:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.previousHash}
                        </div>
                      </div>
                      <hr /> */}

                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          to:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          <a href={"/wallet/" + transaction?.output?.to}>
                            {transaction?.output?.to}
                          </a>
                        </div>
                      </div>
                      <hr />

                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          amount:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          {transaction?.output?.amount} Wave
                        </div>
                      </div>
                      <hr />

                      <div class="row align-items-center">
                        <div class="col-md-3 font-weight-bold font-weight-sm-normal mb-1 mb-md-0e">
                          <i
                            class="fal fa-question-circle text-secondary mr-1"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="top"
                            data-original-title=""
                            title=""
                            data-content="The date and time at which a block is mined."
                          ></i>
                          fee:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          {transaction?.output?.fee} Wave
                        </div>
                      </div>
                      <hr />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default transactionsContainer;
