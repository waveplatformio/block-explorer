import React from "react";
import Moment from "react-moment";

function transactionsListContainer({ transactions = [], history }) {
  const getDate = (d) => {
    const newD = new Date(d);
    return <Moment format="YYYY/MM/DD">{newD}</Moment>;
  };
  return (
    <div className="table-container transactionsList w-100">
      <h3 className="mt-5">Transactions</h3>
      <table className="table table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>fromwallet</th>
            <th>towallet</th>
            <th>amount</th>
            {/* <th>status</th> */}
            <th>txid</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {/* {this.state.transactionsData.transactions.map((el, i) => {
                    return this.getTable(el, i);
                  })} */}

          {transactions.length
            ? transactions.map((el, i) => (
                <tr key={"i"}>
                  <td
                    onClick={() => {
                      // this.setState(
                      //   {
                      //     accountNumber: data.fromwallet,
                      //     walletData: null,
                      //   },
                      //   () => {
                      //     this.handelSubmitSearchWallet();
                      //     this.handelSubmitTransactions();
                      //   }
                      // );
                    }}
                    className="cursorPointer"
                  >
                    <a href={"/wallet/" + el.input.from} className="link">
                      {" "}
                      {el.input.from}{" "}
                    </a>
                  </td>
                  <td
                    onClick={() => {
                      // this.setState(
                      //   {
                      //     accountNumber: data.towallet,
                      //     walletData: null,
                      //   },
                      //   () => {
                      //     this.handelSubmitSearchWallet();
                      //     this.handelSubmitTransactions();
                      //   }
                      // );
                    }}
                    className="cursorPointer"
                  >
                    <a href={"/wallet/" + el.output.to} className="link">
                      {" "}
                      {el.output.to}
                    </a>
                  </td>
                  <td>{el.output.amount} Wave</td>
                  {/* <td>{"data.status"}</td> */}
                  <td className="">
                    <a href={"/transaction/" + el.txId} className="link">
                      {" "}
                      {el.txId}
                    </a>
                  </td>
                  <td>{getDate(el.input.timestamp)}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default transactionsListContainer;
