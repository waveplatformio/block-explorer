import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsListContainer from "../transactions/transactionsListContainer";

function Index({ match }) {
  const [WalletData, setWalletData] = useState(null);
  const [WalletTime, setWalletTime] = useState(null);
  const [WalletError, setWalletError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://51.255.211.135:8181/wallet/" + match.params?.ID)
      .then((res) => {
        if (res.data.error) {
          return setWalletError(res.data.error);
        }
        setWalletData(res.data.wallet);
        setWalletTransactions([
          ...res.data.transactions.INCOMING,
          ...res.data.transactions.OUTGOING,
        ]);

        // let sum = 0;

        // let dd = [
        //   ...res.data.transactions.INCOMING,
        //   ...res.data.transactions.OUTGOING,
        // ].map((el) => {
        //   sum += el.output.amount;
        // });

        // debugger;
        // console.log(new Date(res.data.header.data.timestamp * 1000));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        // setLoading(false);

        // setWalletTime(new Date(testObj.timestamp));

        // setWalletData(testObj);
        // debugger;
        setWalletError("Wallet not found ");
      });
  }, [match.params?.ID]);
  return (
    <div className="mt-1 pt-4">
      {/* <h3 className="w700 mb-4 text-center  text-sm-left">Address</h3> */}
      {WalletError ? (
        <div className="alert alert-danger w700" role="alert">
          {WalletError}
        </div>
      ) : (
        <div className="page">
          <div className="page-title">Adress Information</div>
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-2">
                <div className="qr">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${WalletData?.pubKey}`}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-4">
                    <div className="address-box first">
                      <div className="title">Adress:</div>
                      <div style={{ fontSize: "17px" }} className="value">
                        {WalletData?.pubKey}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="address-box second">
                      <div className="title">Balance:</div>
                      <div className="value"> {WalletData?.balance}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="address-box third">
                      <div className="title">Pending: transactions:</div>
                      <div className="value">{WalletData?.blocked}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <div className="w700  d-md-flex d-block address ">
        //   <div className="test-sm-centre">
        //     <img
        //       className="qrImg"
        //       src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${WalletData?.pubKey}`}
        //     />
        //   </div>

        //   <div className=" pl-0 pl-md-3 test-sm-centre">
        //     <h5 className="font-sm-14 walletAddress ">
        //       address: <span> {WalletData?.pubKey}</span>
        //     </h5>
        //     <h5 className="font-sm-14">balance: {WalletData?.balance} Wave</h5>
        //     <h5 className="font-sm-14">
        //       blocked: {WalletData?.blocked}

        //     </h5>

        //     <h5 className="font-sm-14">
        //       pending: {WalletData?.pending}

        //     </h5>
        //   </div>
        // </div>
      )}
      <div className="container">
        <TransactionsListContainer transactions={walletTransactions} />
      </div>
    </div>
  );
}

export default Index;
