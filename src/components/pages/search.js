import React from "react";
import axios from "axios";

// axios.defaults.baseURL = "http://164.132.182.31:5000/";

class Search extends React.Component {
  state = {
    blockNumber: "",
    accountNumber: "",
    TransactionID: "",
    responseData: null,
    transactionData: null,
    walletData: null,
    transactionsData: null,
    blockData: null,
    error: null,
    fetching: false,
    allBlocks: [],

    allTransactions: null,

    searchValue: "",
    searchType: "block",
  };

  componentDidMount() {
    this.setState({
      fetching: true,
    });
    // const [stat, setStat] = React.useState(false);
    // useEffect(() => {
    axios
      .get("http://51.255.211.135:8181/blockchain/statistics")
      .then((res) => {
        this.setState({
          stat: res.data,
        });
        // (res.data);
        // debugger;
      })
      .catch((err) => {
        console.log(err);
      });
    // }, []);

    let transactions = [];
    // http://51.255.211.135/get_header_by_height
    // curl -d '{}' -H "Content-Type: application/json" -X POST http://51.255.211.135/get_blockchain_state

    // fetch("http://51.255.211.135:8181/wallet/create ", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify({
    //     secret: `apple   alaska   albert   albino   album
    //   alcohol  alex     alpha    amadeus  amanda   amazon
    //   america  analog   animal   antenna  antonio  apollo
    //   april    aroma    artist   aspirin  athlete  atlas
    //   banana   bandit   banjo    bikini   bingo    bonus
    //   camera   canada   carbon   casino   catalog  cinema
    //   citizen  cobra    comet    compact  complex  context
    //   credit   critic   crystal  culture  david    delta
    //   dialog   diploma  doctor   domino   dragon   drama
    //   extra    fabric   final    focus    forum    galaxy
    //   gallery  global   harmony  hotel    humor    index
    //   japan    kilo     lemon    liter  `,
    //   }),
    // });
    // axios
    // .post("/wallet/create", {
    //   secret: `apple   alaska   albert   albino   album
    //   alcohol  alex     alpha    amadeus  amanda   amazon
    //   america  analog   animal   antenna  antonio  apollo
    //   april    aroma    artist   aspirin  athlete  atlas
    //   banana   bandit   banjo    bikini   bingo    bonus
    //   camera   canada   carbon   casino   catalog  cinema
    //   citizen  cobra    comet    compact  complex  context
    //   credit   critic   crystal  culture  david    delta
    //   dialog   diploma  doctor   domino   dragon   drama
    //   extra    fabric   final    focus    forum    galaxy
    //   gallery  global   harmony  hotel    humor    index
    //   japan    kilo     lemon    liter  `,
    // })
    // .then((res) => {
    //   res.data.chain.map((el, i) => {
    //     if (el.transactions.length) {
    //       el.transactions.map((trans) => {
    //         if (transactions.length < 10) {
    //           transactions.push(trans);
    //         }
    //       });
    //     }
    //   });
    //   this.setState({
    //     fetching: false,
    //     allTransactions: transactions,
    //   });
    // })
    // .catch((e) => {
    //   if (e.response && e.response.data && e.response.data.message) {
    //     this.setState({
    //       fetching: false,
    //       error: e.response.data.message,
    //     });
    //   } else {
    //     this.setState({
    //       fetching: false,
    //       error: "Something went wrong. Try Again",
    //     });
    //   }
    // });

    axios
      .get("http://51.255.211.135:8181/chain")
      .then((res) => {
        this.setState({
          fetching: false,
          allBlocks: res.data,
        });
        // debugger;
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });

    axios
      .post(
        "http://51.255.211.135:8181/wallet/sign-in",
        {
          secret:
            "bless fiction fame tell crater maze february fault long maid bring legend",
        },
        {
          withCredentials: "omit",
        }
      )
      .then((res) => {
        debugger;
        axios.post(
          "http://51.255.211.135:8181/wallet/transact",
          {
            to:
              "37e31578af0233e850e163825cd64d9c4c3dc0e951dd08591180c8d3a8872131",
            amount: 1.1,
            type: "transaction",
          },
          {
            withCredentials: "omit",
          }
        );
      });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clearRes = () => {
    this.setState({
      fetching: true,
      transactionsData: null,
      walletData: null,
      blockData: null,
      transactionData: null,
      allTransactions: null,
    });
  };

  handelSubmitTransaction = (e) => {
    e.preventDefault();
    this.clearRes();
    axios
      .get(
        `http://51.255.211.135:8181/transaction/by/${this.state.TransactionID}`
      )
      .then((res) => {
        this.setState({
          transactionData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
  };

  handelSubmitSearchBlock = (e) => {
    e.preventDefault();
    this.props.history.push(`/blocks/${this.state.blockNumber}`);
    return;
    console.log("sbmt");
    this.clearRes();
    axios
      .get(`/block/by/${this.state.blockNumber}`)
      .then((res) => {
        this.setState({
          blockData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
    // 1Ep7Mki2vFRQQfbYeNeJXkJbUjo54TbL2H
    // 19Zi8ZcJ4PV2AV64i74GHXKTfyazBnH72h
  };

  handelSubmitSearchWallet = (e) => {
    if (e) e.preventDefault();
    this.setState({
      fetching: true,
      blockData: null,
      allTransactions: null,
      transactionData: null,
    });

    axios
      .post(`/search_wallet/${this.state.accountNumber}`)
      .then((res) => {
        this.setState({
          walletData: res.data,
          fetching: false,
          error: null,
        });
      })
      .catch((e) => {
        if (e.response.data.message) {
          this.setState({
            fetching: false,
            error: e.response.data.message,
          });
        } else {
          this.setState({
            fetching: false,
            error: "Something went wrong. Try Again",
          });
        }
      });
  };

  handelSubmitTransactions = (e) => {
    if (e) e.preventDefault();

    axios.post(`/transactions/${this.state.accountNumber}`).then((res) => {
      this.setState({
        transactionsData: res.data,
      });
    });
  };

  timeConverter = (timestamp) => {
    let a = new Date(timestamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };

  getTable = (data, i = 0) => {
    return (
      <>
        <tr key={i}>
          <td
            onClick={() => {
              this.setState(
                {
                  accountNumber: data.fromwallet,
                  walletData: null,
                },
                () => {
                  this.handelSubmitSearchWallet();
                  this.handelSubmitTransactions();
                }
              );
            }}
            className="cursorPointer"
          >
            <span className="link"> {data.fromwallet} </span>
          </td>
          <td
            onClick={() => {
              this.setState(
                {
                  accountNumber: data.towallet,
                  walletData: null,
                },
                () => {
                  this.handelSubmitSearchWallet();
                  this.handelSubmitTransactions();
                }
              );
            }}
            className="cursorPointer"
          >
            <span className="link"> {data.towallet}</span>
          </td>
          <td>{data.amount}</td>
          <td>{data.status}</td>
          <td className="txid">{data.txid}</td>
          <td>{this.timeConverter(data.timestamp)}</td>
        </tr>
      </>
    );
  };

  calcTotalReceivedSent = (arr, address) => {
    let Sent = 0;
    let Received = 0;
    arr.map((el) => {
      if (el.fromwallet === address) {
        Sent += el.amount;
      } else {
        Received += el.amount;
      }
    });

    return {
      Sent,
      Received,
    };
  };

  getSearchResult = () => {
    if (this.state.walletData) {
      return (
        <>
          <h3 className="w700 mb-4">Address</h3>
          <div className="w700  d-md-flex d-block address ">
            <div className="test-sm-centre">
              <img
                className="qrImg"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.state.walletData.address}`}
              />
            </div>
            <div className=" pl-0 pl-md-3 test-sm-centre">
              <h5 className="font-sm-14 ">
                address: {this.state.walletData.address}
              </h5>
              <h5 className="font-sm-14">
                balance: {this.state.walletData.balance}
              </h5>
              <h5 className="font-sm-14">
                Transactions:{" "}
                {this.state.transactionsData &&
                  this.state.transactionsData.transactions.length}
              </h5>

              <h5 className="font-sm-14">
                Total Sent:{" "}
                {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Sent}
              </h5>
              <h5 className="font-sm-14">
                Total Received :{" "}
                {this.state.transactionsData &&
                  this.calcTotalReceivedSent(
                    this.state.transactionsData.transactions,
                    this.state.walletData.address
                  ).Received}
              </h5>
            </div>
          </div>

          {this.state.transactionsData && (
            <div className="table-container">
              <h3 className="mt-5">Transactions</h3>
              <table className="table table-striped mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th>fromwallet</th>
                    <th>towallet</th>
                    <th>amount</th>
                    <th>status</th>
                    <th>txid</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.transactionsData.transactions.map((el, i) => {
                    return this.getTable(el, i);
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      );
    } else if (this.state.transactionData) {
      return (
        <>
          <h3 className="text-center">Transaction Details</h3>
          <div className="table-container">
            <table className="table table-striped mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>fromwallet</th>
                  <th>towallet</th>
                  <th>amount</th>
                  <th>status</th>
                  <th>txid</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {this.getTable(this.state.transactionData.transaction)}
              </tbody>
            </table>
          </div>
        </>
      );
    } else if (this.state.blockData) {
      return (
        <>
          <h3 className="">Block Details</h3>
          <div className="table-container">
            <table className="table table-striped mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>fromwallet</th>
                  <th>towallet</th>
                  <th>amount</th>
                  <th>status</th>
                  <th>txid</th>
                  <th>date</th>
                </tr>
              </thead>

              {this.state.blockData.block.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })}
            </table>
          </div>
        </>
      );
    } else if (this.state.allBlocks) {
      return (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="table-container">
                <table className="table table-striped mt-3">
                  <thead className="thead-dark">
                    <h3> blocks </h3>
                  </thead>

                  {/* {this.state.allTransactions.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })} */}
                </table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="table-container">
                <table className="table table-striped mt-3">
                  <thead className="thead-dark">
                    <h3> transactions </h3>
                  </thead>

                  {/* {this.state.allTransactions.map((el, i) => {
                return <tbody>{this.getTable(el, i)}</tbody>;
              })} */}
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  getTimeAfterDate = (date) => {
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

  byBlockId = () => {
    axios.post(
      "/get_header_by_height",
      { height: 0 },
      {
        heder: { "Content-Type": "application/json" },
      }
    );
  };

  submitSearch = (e) => {
    e.preventDefault();
    debugger;
    console.log(this.state.searchType, this.state.searchValue);
    if (this.state.searchType === "block") {
      this.props.history.push(`/block/${this.state.searchValue}`);
    }
    if (this.state.searchType === "Wallet") {
      this.props.history.push(`/wallet/${this.state.searchValue}`);
    }
    if (this.state.searchType === "transaction") {
      this.props.history.push(`/transaction/${this.state.searchValue}`);
    }
  };

  render() {
    return (
      <>
        <div className="searchWrapper ">
          <div className="container py-4">
            <form
              onSubmit={this.submitSearch}
              className="row d-flex flex-column pb-4 pl-4"
            >
              <div>
                <label style={{ color: "#fff" }}>
                  The WAVE Blockchain Explorer
                </label>
              </div>
              <div className="searchBox">
                <select
                  onChange={(e) => {
                    this.setState({
                      searchType: e.target.value,
                    });
                  }}
                >
                  <option value="block">block</option>
                  <option value="Wallet">address</option>
                  <option value="transaction">Txn Hash</option>
                </select>
                <input
                  onChange={(e) => {
                    // debugger;
                    this.setState({
                      searchValue: e.target.value,
                    });
                  }}
                  placeholder="Search by Address / Txn Hash / Block "
                />
                <button>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    width="20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-search fa-w-16 fa-2x"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      className=""
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <section className="overview">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="box">
                  <div className="title">
                    Overview{" "}
                    <img src="https://beta.waveplatform.io/public/scan/assets/images/icon.png" />{" "}
                    Wave (WAE)
                  </div>
                  <div className="box-row">
                    <div className="box-col">
                      <span className="col-name">PRICE</span>
                      <div className="d-flex">
                        <span className="col-value">$0.05</span>
                        {/* <span className="col-percent text-success">
                          (+37.66%)
                        </span> */}
                      </div>
                    </div>
                    <div className="box-col">
                      <span className="col-name">FULLY DILUTED MARKET CAP</span>
                      <span className="col-value">— Not Connected</span>
                    </div>
                  </div>
                  <div className="box-row">
                    <div className="box-col d-flex pt-3">
                      <span className="col-label">Max Total Supply:</span>
                      <span className="col-value2">175.000.000 Wave</span>
                    </div>
                    <div className="box-col d-flex pt-3">
                      <span className="col-label">Circulating Supply:</span>
                      <span className="col-value2">
                        {this.state.stat?.currency_supply} Wave
                      </span>
                    </div>
                  </div>
                  <div className="d-flex pt-3">
                    <div className="col">Wallet Addressess:</div>
                    <div className="col">
                      {this.state.stat?.wallet_addresses}{" "}
                      {/* <span className="text-success">(+0,035%)</span> */}
                    </div>
                    {/* <div className="col">Chart Here</div> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box">
                  <div className="title">Profile Summary</div>
                  <ul className="like-table">
                    <li>
                      <div>Official Wallet:</div>
                      <div>
                        <a href="#">https://waveplatform.io/wallets</a>
                      </div>
                    </li>
                    <li>
                      <div>Decimals:</div>
                      <div>6</div>
                    </li>
                    <li>
                      <div>Official Site:</div>
                      <div>
                        <a href="#">https://waveplatform.io/wallets</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="boxes">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="blue-box first">
                  <div class="title">Total WAVE Frozen:</div>
                  <div class="number">{this.state.stat?.freezers_sum}</div>
                  <a href="/transactions?page=0" class="btn">
                    view statistics
                  </a>
                </div>
              </div>
              <div class="col-md-4">
                <div class="blue-box second">
                  <div class="title">Latest Block:</div>
                  <div class="number">6.945.061</div>
                  <a href="//blocks?page=0" class="btn">
                    view all blocks
                  </a>
                </div>
              </div>
              <div class="col-md-4">
                <div class="blue-box third">
                  <div class="title">Holders:</div>
                  <div class="number">{this.state.stat?.holders}</div>
                  <a href="/accounts" class="btn">
                    view all holders
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container  pt-5">
          <br />
          <br />
          {/* {this.getSearchResult()} */}
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100">
                <div className="card-header newHeader">
                  <span className="card-header-title">Latest Blocks</span>
                </div>

                <div
                  className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
                  style={{
                    height: "400px",
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
                      {this.state.allBlocks &&
                        this.state.allBlocks.length &&
                        this.state.allBlocks.map((el, i) => {
                          // if (!el.transactions.length) return;
                          // {this.getTimeAfterDate(el.timestamp)}

                          const time = new Date(el.timestamp);

                          return (
                            <>
                              <div className="row">
                                <div className="col-sm-4">
                                  <div className="media align-items-sm-center mr-4 mb-1 mb-sm-0">
                                    <div className="d-none d-sm-flex mr-2">
                                      <span className="btn btn-icon btn-soft-secondary">
                                        <span className="btn-icon__inner text-dark">
                                          Bk
                                        </span>
                                      </span>
                                    </div>
                                    <div className="media-body">
                                      <span className="d-inline-block d-sm-none">
                                        Block
                                      </span>{" "}
                                      <a
                                        className="hathOverflow"
                                        href={/block/ + el.hash}
                                      >
                                        {el.hash}
                                      </a>
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
                                            time.getDate()}
                                          <br />
                                          {time.getHours() +
                                            ":" +
                                            time.getMinutes() +
                                            ":" +
                                            time.getSeconds()}
                                          {/* <Moment format="HH:mm:ss ">{time}</Moment> */}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <div className="d-flex justify-content-between">
                                    <div className="text-nowrap">
                                      <span className="d-block mb-1 mb-sm-0">
                                        Minted{" "}
                                        <a
                                          className="hash-tag text-truncate"
                                          href="#"
                                        >
                                          {el.validator}
                                        </a>
                                      </span>
                                      <a
                                        href="/txs?block=11627830"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Transactions in this Block"
                                      >
                                        185 txns{" "}
                                      </a>{" "}
                                      <span className="small text-secondary">
                                        {/* {this.getTimeAfterDate(el.timestamp)} */}
                                      </span>
                                      <span className="d-inline-block d-sm-none">
                                        <span
                                          className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                          data-toggle="tooltip"
                                          title=""
                                          data-original-title="Block Reward"
                                        >
                                          {/* {Number(
                                            el.data.total_transaction_fees
                                          ) / 100000000} */}
                                          Wave
                                        </span>{" "}
                                      </span>
                                    </div>
                                    <div className="d-none d-sm-block">
                                      <span
                                        className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Block Reward"
                                      >
                                        Wave
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr className="hr-space" />
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div
                    id="mCSB_1_scrollbar_vertical"
                    className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
                    style={{ display: "block" }}
                  >
                    <div className="mCSB_draggerContainer">
                      <div
                        id="mCSB_1_dragger_vertical"
                        className="mCSB_dragger"
                        style={{
                          position: "absolute",
                          minHeight: "50px",
                          display: "block",
                          height: "224px",
                          maxHeight: "366px",
                          top: "0px",
                        }}
                      >
                        <div
                          className="mCSB_dragger_bar"
                          style={{ lineHeight: " 50px" }}
                        ></div>
                      </div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3">
                  <a
                    className="btn btnBluGradient w-75 m-auto  btn-xs btn-block btn-soft-primary"
                    href="/blocks?page=0"
                  >
                    View all blocks
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card h-100">
                <div className="card-header newHeader">
                  <span className="card-header-title">Latest transactions</span>
                </div>

                <div
                  className="js-scrollbar card-body overflow-hidden mCustomScrollbar _mCS_1 mCS-autoHide"
                  style={{
                    height: "400px",
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
                      {this.state.allBlocks &&
                        this.state.allBlocks.length &&
                        this.state.allBlocks.map((el, i) => {
                          if (!el.transactions.length) return;

                          const time = new Date(
                            el.transactions[0].input.timestamp
                          );
                          return (
                            <>
                              {" "}
                              <div className="row">
                                <div className="col-sm-4">
                                  <div className="media align-items-sm-center mr-4 mb-1 mb-sm-0">
                                    <div className="d-none d-sm-flex mr-2">
                                      <span className="btn btn-icon btn-soft-secondary">
                                        <span className="btn-icon__inner text-dark">
                                          Tx
                                        </span>
                                      </span>
                                    </div>
                                    <div className="media-body">
                                      <span className="d-inline-block d-sm-none">
                                        Block
                                      </span>{" "}
                                      <a
                                        className="hathOverflow"
                                        href={
                                          /transaction/ +
                                          el.transactions[0].txId
                                        }
                                      >
                                        {el.transactions[0].txId}
                                      </a>
                                      <span className="d-sm-block small text-secondary ml-1 ml-sm-0 text-nowrap">
                                        {" "}
                                        {/* {this.getTimeAfterDate(
                                          
                                        )} */}
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
                                            time.getDate()}
                                          <br />
                                          {time.getHours() +
                                            ":" +
                                            time.getMinutes() +
                                            ":" +
                                            time.getSeconds()}
                                          {/* <Moment format="HH:mm:ss ">{time}</Moment> */}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <div className="d-flex justify-content-between">
                                    <div className="text-nowrap">
                                      <span className="d-block mb-1 mb-sm-0">
                                        from{" "}
                                        <a
                                          className="hash-tag text-truncate"
                                          href={
                                            "Wallet/" +
                                            el.transactions[0].input.from
                                          }
                                        >
                                          {el.transactions[0].input.from}
                                        </a>
                                      </span>
                                      <div
                                        href="/txs?block=11627830"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Transactions in this Block"
                                      >
                                        to{" "}
                                        <a
                                          className=" hash-tag text-truncate"
                                          href={
                                            "wallet/" +
                                            el.transactions[0].output.to
                                          }
                                        >
                                          {el.transactions[0].output.to}
                                        </a>
                                      </div>{" "}
                                      <span className="small text-secondary"></span>
                                      {/* <span className="d-inline-block d-sm-none">
                                        <span
                                          className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                          data-toggle="tooltip"
                                          title=""
                                          data-original-title="Block Reward"
                                        >
                                          fee: {el.transactions[0].output.fee}{" "}
                                          Waves
                                        </span>{" "}
                                      </span> */}
                                    </div>
                                    <div className="d-none d-sm-flex flex-column">
                                      <span
                                        className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Block Reward"
                                      >
                                        Tx: {el.transactions[0].output.amount}{" "}
                                        Wave
                                      </span>
                                      <span
                                        className="u-label u-label--xs u-label--badge-in u-label--secondary text-center text-nowrap"
                                        data-toggle="tooltip"
                                        title=""
                                        data-original-title="Block Reward"
                                      >
                                        fee: {el.transactions[0].output.fee}{" "}
                                        Wave
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr className="hr-space" />
                            </>
                          );
                        })}
                    </div>
                  </div>
                  <div
                    id="mCSB_1_scrollbar_vertical"
                    className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical"
                    style={{ display: "block" }}
                  >
                    <div className="mCSB_draggerContainer">
                      <div
                        id="mCSB_1_dragger_vertical"
                        className="mCSB_dragger"
                        style={{
                          position: "absolute",
                          minHeight: "50px",
                          display: "block",
                          height: "224px",
                          maxHeight: "366px",
                          top: "0px",
                        }}
                      >
                        <div
                          className="mCSB_dragger_bar"
                          style={{ lineHeight: " 50px" }}
                        ></div>
                      </div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
                <div className="card-footer p-3">
                  <a
                    className="btn btn-xs  btnBluGradient w-75 m-auto  btn-block btn-soft-primary"
                    href="/transactions?page=0"
                  >
                    View all transactions
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* {this.state.fetching && (
          <div className="text-center">
            {" "}
            <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />{" "}
          </div>
        )}

        {this.state.error && (
          <h4 className="text-center" style={{ color: "red" }}>
            {this.state.error}
          </h4>
        )} */}
        </div>
      </>
    );
  }
}

export default Search;
