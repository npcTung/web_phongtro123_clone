import React, { memo, useEffect, useState } from "react";
import { Pagination, SortPost } from "components";
import { PostItem } from "components";
import * as apis from "apis";
import { useSearchParams } from "react-router-dom";

const PostsItem = ({ categoryCode, provinceCode }) => {
  const [params] = useSearchParams();
  const [sort, setSort] = useState(0);
  const [posts, setPosts] = useState(null);

  const fetchProducts = async (queries) => {
    const response = await apis.apiGetPosts(queries);
    if (response.success) setPosts(response.postData);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (sort === 1) queries.order = ["createdAt", "DESC"];
    else delete queries.order;
    if (categoryCode) queries.categoryCode = categoryCode;
    else delete queries.categoryCode;
    if (provinceCode) queries.provinceCode = provinceCode;
    else delete queries.provinceCode;
    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [sort, params, categoryCode, provinceCode]);

  return (
    <div className="col-span-7 bg-white rounded-md py-4 flex flex-col gap-5 shadow-md">
      <SortPost sort={sort} setSort={setSort} />
      <div className="w-full">
        {posts?.rows?.map((el) => (
          <PostItem key={el.id} data={el} />
        ))}
      </div>
      {+posts?.count >= +process.env.REACT_APP_LIMIT && (
        <Pagination
          limit={process.env.REACT_APP_LIMIT}
          totalCount={posts?.count}
        />
      )}
    </div>
  );
};

export default memo(PostsItem);
