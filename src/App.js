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

  const generateTable = (data) => {
    //console.log(data)
    return (
      <table>
        <thead
          style={{
            backgroundColor: "black",
            color: "white"
          }}
        >
          <tr key="titles">
            {Object.keys(data[0]).map((key) => (
              <td style={{ padding: "0 40px" }}>{key}</td>
            ))}
          </tr>
        </thead>
        {data.map((item, index) => {
          return (
            <tbody>
              <tr key={index}>
                {Object.values(item).map((value) => (
                  <td>{value}</td>
                ))}
              </tr>
            </tbody>
          );
        })}
        ;
      </table>
    );
  };

  return (
    <div className="App">
      <h1>Binance cryptos</h1>
      {loading ? <h2>Loading...</h2> : data && generateTable(data)}
    </div>
  );
}
