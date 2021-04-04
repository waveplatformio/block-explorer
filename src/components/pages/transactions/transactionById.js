import React, { useEffect, useState } from "react";
import axios from "axios";

import TransactionContainer from "./transactionsContainer";

function TransactionById({ match }) {
  const [transactionData, setTransactionData] = useState(null);
  const [transactionTime, setTransactionTime] = useState(null);
  const [transactionError, setTransactionError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://51.255.211.135:8181/transactions/" + match.params?.ID)
      .then((res) => {
        if (res.data.error) {
          return setTransactionError(res.data.error);
        }
        setTransactionData(res.data);
        setTransactionTime(new Date(res.data.input.timestamp));
        // console.log(new Date(res.data.header.data.timestamp * 1000));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);

        // setLoading(false);

        // setTransactionTime(new Date(testObj.timestamp));

        // setTransactionData(testObj);
        // debugger;
        setTransactionError("Transactions not found ");
      });
  }, [match.params?.ID]);
  return (
    <div>
      <TransactionContainer
        transaction={{
          ...transactionData,
          time: transactionTime,
          hasError: transactionError,
          transactionName: match.params?.ID,
          loading,
        }}
      />
    </div>
  );
}

export default TransactionById;
