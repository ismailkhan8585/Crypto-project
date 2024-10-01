import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../../Context/CoinContext";
import "./Coins.css"

const Coins = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();

  const { currency } = createContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData;
  }, [currency]);

  if (coinData) {
    return (
      <div className="coins">
        <div className="coins-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name}({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
      </div>
    );
  } else {
    <div className="Spinner">
    <div className="spin">

    </div>
    </div>
  }
};

export default Coins;
