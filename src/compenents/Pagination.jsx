import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const getApiProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    console.log(data.products);
    setProduct(data.products);
  };

  useEffect(() => {
    getApiProducts();
  }, []);

  const selectPage = (selectedPage) => {
     if(selectedPage>=1 && selectedPage<=product.length/10 && selectedPage!==page)
    setPage(selectedPage);
  };
  return (
    <div>
      <h1 className="heading1">Pagination 1</h1>
      <div className="products">
        {product &&
          product.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div key={prod.id} className="products_cards">
                <p className="brand">{prod.brand}</p>
                <img src={prod.thumbnail} alt={prod.image} />
              </div>
            );
          })}
      </div>

      <div className="pagination_prod">
        <span onClick={() => selectPage(page - 1)}>
          <i class="fa-solid fa-backward"></i>
        </span>
        
          {/* map to get all pages */}
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span className={page===i+1?"page_selected":""  }  onClick={() => selectPage(i + 1)}>
                {i + 1}
              </span>
            );
          })}
       
        <span onClick={() => selectPage(page +1)}  className={page<product.length/10?"":"disabled"  }>
          <i class="fa-solid fa-forward"></i>
        </span>
      </div>
    </div>
  );
};

export default Pagination;
