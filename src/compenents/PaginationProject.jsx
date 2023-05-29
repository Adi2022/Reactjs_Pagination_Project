import React, { useEffect, useState } from "react";

const PaginationProject = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const getProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products?limit=20`);
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePages = (pageSelect) => {
    if (
      pageSelect >= 1 &&
      pageSelect <= products.length / 5 &&
      pageSelect !== pages
    )
      setPages(pageSelect);
  };
  return (
    <>  
    <h1 className="heading1">Pagination 2</h1>
      <div className="container">
        
        {products.slice(pages * 5 - 5, pages * 5).map((product) => {
          return (
            <div key={product.id} className="product_cards">
              <img src={product.image} alt={product.image} />
              <p>{product.category}</p>
            </div>
          );
        })}
      </div>

      {/*  to get all pages */}

      <div className="getAllPages">
        <span onClick={() => handlePages(pages - 1)}>
          {" "}
          <i class="fa-solid fa-backward"></i>
        </span>
        {[...Array(products.length / 5)].map((_, i) => {
          return (
            <span
              className={pages === i + 1 ? "selected" : ""}
              onClick={() => handlePages(i + 1)}
            >
              {i + 1}
            </span>
          );
        })}
        <span
          onClick={() => handlePages(pages + 1)}
          className={pages < products.length / 5 ? "" : "disabledPage"}
        >
          {" "}
          <i class="fa-solid fa-forward"></i>
        </span>
      </div>
    </>
  );
};

export default PaginationProject;
