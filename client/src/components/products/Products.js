import React, { memo, useEffect, useState } from "react";
import { Pagination, SortProduct } from "components";
import { ProductItem } from "components";
import * as apis from "apis";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [params] = useSearchParams();
  const [sort, setSort] = useState(0);
  const [products, setProducts] = useState(null);

  const fetchProducts = async (queries) => {
    const response = await apis.apiGetProducts(queries);
    if (response.success) setProducts(response.postData);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort === 1) queries.order = ["createdAt", "DESC"];
    else delete queries.order;
    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [sort, params]);

  return (
    <div className="col-span-7 bg-white rounded-md py-4 flex flex-col gap-5 shadow-md">
      <SortProduct sort={sort} setSort={setSort} />
      <div className="w-full">
        {products?.rows?.map((el) => (
          <ProductItem key={el.id} data={el} />
        ))}
      </div>
      {+products?.count >= +process.env.REACT_APP_LIMIT && (
        <Pagination
          limit={process.env.REACT_APP_LIMIT}
          totalCount={products?.count}
        />
      )}
    </div>
  );
};

export default memo(Products);
