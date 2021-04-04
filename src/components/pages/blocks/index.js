import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Route } from "react-router-dom";
import { User } from "react-router-dom";
import getTimeAfterDate from "../../hepers/getTimeBeforeNow";
import ReactPaginate from "react-paginate";
import InfiniteScroll from "react-infinite-scroll-component";

var qs = require("qs");

const BlockById = ({ match, ...props }) => {
  const [allBlocks, setAllBlocks] = useState([]);
  const [page, setPage] = useState(0);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://51.255.211.135:8181/chain?page=${page}`)
      .then((res) => {
        // this.setState({
        //   fetching: false,
        //   allBlocks: res.data.blockchain_state.tips,
        // });
        // debugger;
        setAllBlocks([...allBlocks, ...res.data]);
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
  }, [page]);

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

  const generateQueryString = (queryObject) => {
    return qs.stringify(queryObject, { encode: false });
  };

  const pageChangeHandler = ({ selected }) => changeRoute(selected);

  const changeRoute = (pg) => {
    // var obj = qs.parse(props.location.search);
    // console.log(match, obj);
    // debugger;

    const page = pg.toString();
    let queryObj = { ...match.params, page };

    const queryStr = generateQueryString(queryObj);

    props.history.push(`/blocks?${queryStr}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 mb-12 mb-lg-0 mt-5 pt-5">
          <div className="card h-100">
            <div className="card-header newHeader">
              <span className="card-header-title">All Blocks</span>
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
                        <th> Block</th>
                        <th>Date</th>
                        <th>Txn</th>
                        <th>Minted</th>
                        <th>Reward</th>
                        {/* <th>To</th>
                    <th>Value</th>
                    <th>Txn Fee</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {allBlocks.map((el, i) => {
                        const time = new Date(el.timestamp);

                        return (
                          <tr>
                            <td>
                              <a
                                className="hathOverflow"
                                href={/block/ + el.hash}
                              >
                                {el.hash}
                              </a>
                            </td>
                            <td>
                              <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                {" "}
                                <div
                                  style={{
                                    // color: "#ffffff8c",
                                    fontSize: "12px",
                                    // lineHeight: "9px",
                                  }}
                                  className="right"
                                >
                                  {" "}
                                  {/* <Moment format="YYYY/MM/DD">{time}</Moment> */}
                                  {time.getFullYear() +
                                    "/" +
                                    (time.getMonth() + 1) +
                                    "/" +
                                    time.getDate() +
                                    " "}
                                  {time.getHours() +
                                    ":" +
                                    time.getMinutes() +
                                    ":" +
                                    time.getSeconds()}
                                  {/* <Moment format="HH:mm:ss ">{time}</Moment> */}
                                </div>
                                {/* {getTimeAfterDate(el.input.timestamp)} */}
                              </span>
                            </td>

                            <td>
                              <a
                                className="hash-tag text-truncate"
                                href={/block/ + el.hash}
                              >
                                {el.transactions.length}
                              </a>
                            </td>

                            <td>
                              {" "}
                              <a
                                className="hash-tag text-truncate"
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                {el.validator}{" "}
                              </a>{" "}
                            </td>
                            <td>{el.blockReward} Wave </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="text-center w-100">
                    <button
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      className="loadMoreBtn mx-auto btnBluGradient "
                    >
                      Load More
                    </button>
                  </div>
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
