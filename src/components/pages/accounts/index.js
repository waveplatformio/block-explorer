import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import getTimeAfterDate from "../../hepers/getTimeBeforeNow";
import ReactPaginate from "react-paginate";
import InfiniteScroll from "react-infinite-scroll-component";

// var qs = require("qs");

const BlockById = ({ match, ...props }) => {
  const [allBlocks, setAllBlocks] = useState([]);
  const [page, setPage] = useState(0);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://51.255.211.135:8181/accounts`)
      .then((res) => {
        // this.setState({
        //   fetching: false,
        //   allBlocks: res.data.blockchain_state.tips,
        // });
        // debugger;

        // let transacs = [];
        // res.data.map((el) => {
        //   const transactions = el.transactions.map((trx) => ({
        //     ...trx,
        //     blockId: el.hash,
        //   }));
        //   transacs = [...transacs, ...transactions];
        // });

        // debugger;
        setAllBlocks(res.data);
        // debugger;
      })
      .catch((e) => {
        // if (e.response && e.response.data && e.response.data.message) {
        //   this.setState({
        //     fetching: false,
        //     error: e.response.data.message,
        //   });
        // } else {
        //   this.setState({
        //     fetching: false,
        //     error: "Something went wrong. Try Again",
        //   });
        // }
      });
  }, []);
  // const loadMore = () => {
  //   axios
  //     .get("http://51.255.211.135:8181/chain?page=0")
  //     .then((res) => {
  //       // this.setState({
  //       //   fetching: false,
  //       //   allBlocks: res.data.blockchain_state.tips,
  //       // });
  //       // debugger;
  //       setAllBlocks(res.data);
  //       // debugger;
  //     })
  //     .catch((e) => {
  //       // if (e.response && e.response.data && e.response.data.message) {
  //       //   this.setState({
  //       //     fetching: false,
  //       //     error: e.response.data.message,
  //       //   });
  //       // } else {
  //       //   this.setState({
  //       //     fetching: false,
  //       //     error: "Something went wrong. Try Again",
  //       //   });
  //       // }
  //     });
  // }

  //   const generateQueryString = (queryObject) => {
  //     return qs.stringify(queryObject, { encode: false });
  //   };

  //   const pageChangeHandler = ({ selected }) => changeRoute(selected);

  //   const changeRoute = (pg) => {
  //     // var obj = qs.parse(props.location.search);
  //     // console.log(match, obj);
  //     // debugger;

  //     const page = pg.toString();
  //     let queryObj = { ...match.params, page };

  //     const queryStr = generateQueryString(queryObj);

  //     props.history.push(`/blocks?${queryStr}`);
  //   };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
          <div className="card h-100">
            <div className="card-header newHeader">
              <span className="card-header-title">Top Accounts</span>
            </div>

            <div
              className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
              style={{
                maxHeight: "60vh",
                minHeight: "500px",
                position: "relative",
                overflow: "visible",
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
                  {/* {blockError ? (
                    <div className="alert alert-danger" role="alert">
                      {blockError}
                    </div>
                  ) : (
                    <> */}

                  <table class="table waveTable">
                    <thead>
                      <tr>
                        <th> Rank</th>
                        <th>Accounts</th>
                        <th>Balance</th>
                        <th>Freezed Wave</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBlocks.map((el, i) => {
                        return (
                          <tr>
                            <td>#{i + 1}</td>
                            <td>
                              <a
                                className="hathOverflow"
                                href={/Wallet/ + el.pubKey}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={el.pubKey}
                              >
                                {el.pubKey}
                              </a>
                            </td>

                            <td>{el.balance} Wave</td>
                            <td>{el.blocked} Wave</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* <div className="text-center w-100">
                    <button
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      className="loadMoreBtn mx-auto btnBluGradient "
                    >
                      Load More
                    </button>
                  </div> */}
                </div>
                {/* 
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={10}
                  // marginPagesDisplayed={2}
                  // pageRangeDisplayed={5}
                  forcePage={Number(props.location.search.split("=")[1])}
                  onPageChange={pageChangeHandler}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockById;
