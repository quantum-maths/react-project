import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import "./styles.css";
import "../DND/styles.css";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amountBTC: number;
}

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.op === "utx") {
      const { inputs, out: outputs, hash } = data.x;

      const from = inputs[0]?.prev_out?.addr || "Unknown";
      const to = outputs[0]?.addr || "Unknown";
      const value = outputs.reduce((sum: number, o: any) => sum + o.value, 0);
      const amountBTC = value / 100000000;

      const newTx: Transaction = {
        hash,
        from,
        to,
        amountBTC,
      };

      setTransactions((prev) => [newTx, ...prev].slice(0));
      setTotalBTC((prev) => prev + amountBTC);
    }
  };

  const start = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      const ws = new WebSocket("wss://ws.blockchain.info/inv");
      ws.onmessage = handleMessage;
      ws.onopen = () => {
        ws.send(JSON.stringify({ op: "unconfirmed_sub" }));
      };
      wsRef.current = ws;
    }
  };

  const stop = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const reset = () => {
    setTransactions([]);
    setTotalBTC(0);
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return (
    <div>
      <h2 className="header-container">Sum = {totalBTC.toFixed(7)} BTC</h2>
      <div className="header-container">
        <Button className="start" onClick={start}>
          Start
        </Button>
        <Button className="stop" onClick={stop}>
          Stop
        </Button>
        <Button className="reset-btn" onClick={reset}>
          Reset
        </Button>
      </div>
      <div className="transaction-list">
        <table className="transactions-table">
          <thead>
            <tr>
              <th className="transactions-th">From</th>
              <th className="transactions-th">To</th>
              <th className="transactions-th">Sum</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td className="transactions-td">{tx.from}</td>
                <td className="transactions-td">{tx.to}</td>
                <td className="transactions-td">
                  {tx.amountBTC.toFixed(7)} BTC
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
};

export default TransactionsComponent;
