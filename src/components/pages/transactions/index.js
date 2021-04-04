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
  const getTimeAfterDate = (date) => {
    const now = new Date();
    let time = Math.abs(now.getTime() - date);
    // calculate (and subtract) whole days
    var days = Math.floor(time / 86400);
    time -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(time / 3600) % 24;
    time -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(time / 60) % 60;
    time -= minutes * 60;

    // what's left is seconds
    var seconds = time % 60; // in theory the modulus is not required
    console.log(seconds, "s", minutes, "m", hours, "h", days, "d");
    if (days) {
      return days + " days ago";
    }
    if (hours) {
      return hours + " hours ago";
    }
    if (minutes) {
      return minutes + " mins ago";
    }
    if (seconds) {
      return seconds + " sec ago";
    }
  };

  const [allBlocks, setAllBlocks] = useState([]);
  const [page, setPage] = useState(0);
  const [blockError, setBlockError] = useState(null);

  useEffect(() => {
    // axios
    //   .get(`http://51.255.211.135:8181/transaction/unfinished?page=${page}`)
    //   .then((res) => {
    //     // debugger;
    //   });

    // axios.get(`http://51.255.211.135:8181/accounts`).then((res) => {
    //   // debugger;
    // });

    axios
      .get(`http://51.255.211.135:8181/chain?page=${page}`)
      .then((res) => {
        // this.setState({
        //   fetching: false,
        //   allBlocks: res.data.blockchain_state.tips,
        // });
        // debugger;

        let transacs = [];
        res.data.map((el) => {
          const transactions = el.transactions.map((trx) => ({
            ...trx,
            blockId: el.hash,
          }));
          transacs = [...transacs, ...transactions];
        });

        // debugger;
        setAllBlocks([...allBlocks, ...transacs]);
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
              <span className="card-header-title">All Transactions</span>
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
                        <th> Txn Hash</th>
                        <th>Block</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Txn Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBlocks.map((el, i) => {
                        const time = new Date(el.input.timestamp);

                        return (
                          <tr>
                            <td>
                              <span>
                                {" "}
                                <a
                                  className="hathOverflow"
                                  href={/transaction/ + el.txId}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={el.txId}
                                >
                                  {el.txId}
                                </a>
                              </span>
                            </td>
                            <td>
                              <a
                                className="hathOverflow"
                                href={/block/ + el.blockId}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={el.blockId}
                              >
                                {el.blockId}
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
                                href={"Wallet/" + el.input.from}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={el.input.from}
                              >
                                {el.input.from}
                              </a>
                            </td>
                            <td>
                              <a
                                className=" hash-tag text-truncate"
                                href={"wallet/" + el.output.to}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={el.output.to}
                              >
                                {el.output.to}
                              </a>
                            </td>
                            <td>{el.output.amount} Wave</td>
                            <td> {el.output.fee}</td>
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
