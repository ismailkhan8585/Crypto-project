import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  // Search
  const [input, setinput] = useState("");

  const inputHandler = (event) => {
    setinput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // Not reload the page
  const searchHandler = async (event) => {
    event.preventDefault();

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    // console.log(allCoin);

    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Market Palce
        </h1>
        <p>
          Welcome to the world Largest Crypto currency marketplace.Sign up to
          explore more about Crypto
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            list="coinList"
            type="text"
            placeholder="Search Crypto....."
            required
          />
            <datalist id="coinList">
            {allCoin.map((item,index)=>(<option key={index} value={item.name} />))}
            </datalist>



          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto_Table">
        <div className="Table_layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H change</p>
          <p className="market_cap">Market cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`}  className="Table_layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "Red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market_cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
