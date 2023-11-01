import React, { memo, useEffect, useState } from "react";
import { SortProduct } from "components";
import { ProductItem } from "components";
import * as apis from "apis";

const Products = () => {
  const [sort, setSort] = useState(0);
  const [products, setProducts] = useState(null);

  const fetchProducts = async (queries) => {
    const response = await apis.apiGetProducts(queries);
    if (response.success) setProducts(response.postData);
  };

  useEffect(() => {
    fetchProducts();
  }, [sort]);

  return (
    <div className="col-span-7 border border-gray-300 rounded-md py-4">
      <SortProduct sort={sort} setSort={setSort} />
      <div className="w-full">
        {products?.rows?.map((el) => (
          <ProductItem key={el.id} data={el} />
        ))}
      </div>
    </div>
  );
};

export default memo(Products);
