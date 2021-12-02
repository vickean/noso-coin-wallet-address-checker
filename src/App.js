import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [addresses, setAddresses] = useState([
    "N2geMF8Z7HJJPBrfP5gpd55Wwqk67CV",
    "NXTyk1WHxod4kKtrdkx1rc8jwhWRGn",
    "N3LGHxQ14tocfUYLQayp8naprkRUeFg",
    "N46svsTR5LWQQGGsSqLrsBRbxfuQ9FD",
    "N23JceUg1QdPGjAiJnXaVCd4zwybDw",
  ]);

  const [addressData, setAddressData] = useState([]);

  const getWalletData = async (address_array) => {
    const promises_array = address_array.map((address) => {
      return axios.get(
        `http://api.allorigins.win/get?url=https://explorer.nosocoin.com/api/v1/address/${address}.json`
      );
    });

    console.log(promises_array);

    const response_array = await Promise.all(promises_array);

    const output = response_array.map((resp) => {
      return JSON.parse(resp.data.contents).address;
    });

    console.log(output);

    setAddressData(output);
  };

  useEffect(() => {
    getWalletData(addresses);
  }, [addresses]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div
          style={{
            display: "flex",
            width: "60%",
            flexDirection: "column",
            textAlign: "left",
            padding: "1rem",
          }}
        >
          <div style={{ fontSize: "1rem" }}>TOTAL:</div>
          <div style={{ fontSize: "2.5rem" }}>
            {addressData.reduce((pre, cur) => pre + cur.balance, 0) / 100000000}
          </div>
        </div>
        {addressData.map((data) => {
          const { address, alias, balance, incoming, outgoing } = data;
          return (
            <div
              key={address}
              style={{
                display: "flex",
                width: "60%",
                flexWrap: "wrap",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  flex: 2,
                  minWidth: "100%",
                  paddingBottom: "0.5rem",
                }}
              >
                <div style={{ fontSize: "1rem" }}>ADDRESS:</div>
                <div>{address}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  flex: 2,
                  minWidth: "100%",
                  paddingBottom: "0.5rem",
                }}
              >
                <div style={{ fontSize: "1rem" }}>ALIAS:</div>
                <div>{alias || "N/A"}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  flex: 1,
                  paddingBottom: "0.5rem",
                }}
              >
                <div style={{ fontSize: "1rem" }}>BALANCE:</div>
                <div>{balance / 100000000}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  flex: 1,
                  paddingBottom: "0.5rem",
                }}
              >
                <div style={{ fontSize: "1rem" }}>INCOMING:</div>
                <div>{incoming / 100000000}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  flex: 1,
                  paddingBottom: "0.5rem",
                }}
              >
                <div style={{ fontSize: "1rem" }}>OUTGOING:</div>
                <div>{outgoing / 100000000}</div>
              </div>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
