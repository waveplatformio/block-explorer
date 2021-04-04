import React from "react";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import GetTimeAfterDate from "../../hepers/getTimeBeforeNow";

function blockContainer({ block }) {
  // debugger;
  console.log(block, "propspropsprops");
  // const time = new
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
          <div className="card h-100">
            <div className="card-header newHeader">
              <span className="card-header-title">
                Block #{block.blockName}
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
                  {block.loading ? (
                    <div className="text-center">
                      <img src="https://www.siue.edu/~itoberm/Images/ThinkingAnimate.gif" />
                    </div>
                  ) : block.hasError ? (
                    <div className="alert alert-danger" role="alert">
                      {block.hasError}
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
                            {block.time}
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
                          hash:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.hash}
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
                          blockReward:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.blockReward}
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
                          previousHash:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>
                          <a href={"/block/" + block.previousHash}>
                            {block.previousHash}
                          </a>
                        </div>
                      </div>
                      <hr />

                      {/* <div class="row align-items-center">
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
                          secret:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.secret}
                        </div>
                      </div>
                      <hr /> */}

                      {/* <div class="row align-items-center">
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
                          signature:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.signature}
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
                          validator:
                        </div>
                        <div class="col-md-9">
                          <i class="far fa-clock small mr-1"></i>

                          {block.validator}
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

export default blockContainer;
