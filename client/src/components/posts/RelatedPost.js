import React, { memo, useEffect, useState } from "react";
import { SItem } from "components";
import * as apis from "apis";
import { renderStarFromNumber } from "ultils/helpers";

const RelatedPost = ({ categoryCode, cate, star, limit }) => {
  const [newPosts, setNewPosts] = useState(null);

  const fetchNewPosts = async (queries) => {
    const response = await apis.apiGetPosts(queries);
    if (response.success) setNewPosts(response.postData);
  };

  useEffect(() => {
    const queries = {};
    queries.limit = +limit || 12;
    if (star) queries.order = ["star", "DESC"];
    else delete queries.order;
    queries.order = ["createdAt", "DESC"];
    if (categoryCode) queries.categoryCode = categoryCode;
    else delete queries.categoryCode;
    fetchNewPosts(queries);
  }, [categoryCode]);

  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="flex items-center gap-1">
        {star && (
          <span className="flex items-center gap-1">
            {renderStarFromNumber(newPosts?.star)}
          </span>
        )}
        <span className="font-semibold text-lg">{cate}</span>
      </h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts?.rows?.map((item) => {
          return <SItem key={item?.id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default memo(RelatedPost);
