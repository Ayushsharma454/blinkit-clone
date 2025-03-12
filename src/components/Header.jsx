import React from "react";

const Header = () => {
  return (
    <>
      <div className="header-wrapper">
        <div className="logo">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="Logo"
          />
        </div>

        <div className="deliver-address">
          <p>Delivery in 8 minutes</p>
          <p>1396, Shanti Path, Sector 33C, S</p>
        </div>
        <div className="search-bar">
            <input placeholder="search"/>
        </div>
        <div className="login">
            <p> Login</p>
        </div>
        <div className="add-to-cart">
            <button>My Cart</button>
        </div>
      </div>
    </>
  );
};

export default Header;
