import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://api2.binance.com/api/v3/ticker/24hr"
      );
      // console.log(response.data);
      setData(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const parsedData = (data) => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.symbol}</td>
          <td>{item.lastPrice}</td>
          <td>{item.priceChange}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <h1>Binance cryptos</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table>
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <td>Symbol</td>
              <td>Last Price</td>
              <td>Price Change</td>
            </tr>
          </thead>
          <tbody>{data && parsedData(data)}</tbody>
        </table>
      )}
    </div>
  );
}
