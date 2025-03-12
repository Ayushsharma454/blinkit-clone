import React, { useState } from "react";

import { useEffect } from "react";

const Cards = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getData = async () => {
    let res = await fetch(`https://dummyjson.com/products`);
    let response = await res.json();
    setData(response.products);
    console.log(response.products);
  };

  useEffect(() => {
    getData();
  }, []);
  const add = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: prevCart[product.id]
        ? {
            ...prevCart[product.id],
            quantity: prevCart[product.id].quantity + 1,
          }
        : { ...product, quantity: 1 },
    }));

    console.log(cart);
  };

  const remove = (productId) => {
    setCart((prevCart) => {
      if (!prevCart[productId]) return prevCart;

      if (prevCart[productId].quantity === 1) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }

      return {
        ...prevCart,
        [productId]: {
          ...prevCart[productId],
          quantity: prevCart[productId].quantity - 1,
        },
      };
    });
  };

  const handleClick = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(data.length / 10) &&
      pageNumber != page
    ) {
      setPage(pageNumber);
    }
  };

  const filteredProducts = data.filter((pro) =>
    pro.title.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div>
        <p>Search products</p>
        <input
          type="text"
          placeholder="Search For products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredProducts.length > 0 ? (
        <>
          <div className="cards">
            {filteredProducts.slice(page * 10 - 10, page * 10).map((pro) => (
              <div className="card" key={pro.id}>
                <img src={pro.images} alt="Logo" />
                <p className="card-title">{pro.title}</p>
                <p className="weight">{pro.weight} ml</p>
                <div className="cart">
                  <p className="price">${pro.price}</p>
                  <div className="add-cart">
                    <button onClick={() => remove(pro.id)}>-</button>
                    <span>{cart[pro.id]?.quantity || "Add"}</span>
                    <button onClick={() => add(pro)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-items">     
          <h2>cart</h2>
          {Object.keys(cart).length === 0 ? <p>Cart is empty</p> : null}
          <div>
            {Object.values(cart).map((item) => (
                // {console.log(cart)}
              <div className="card" key={item.id}>
                <h3>{item.title}</h3>
                <p>Price : ${item.price}</p>
                <div>
                  <button onClick={() => remove(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => add(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="pageNo-wrapper">
            <div className="pageNo">
              <span onClick={() => handleClick(page - 1)} disable={page - 1}>
                Prev
              </span>
              {[...Array(Math.ceil(data.length / 10))].map((__, i) => (
                <span
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => handleClick(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
              <span
                onClick={() => handleClick(page + 1)}
                disable={[page < Math.ceil(data.length / 10)]}
              >
                next
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>No Product Found</p>
      )}
    </>
  );
};

export default Cards;
