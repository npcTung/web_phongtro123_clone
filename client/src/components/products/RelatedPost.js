import React, { memo, useEffect, useState } from "react";
import { SItem } from "components";
import * as apis from "apis";

const RelatedPost = () => {
  const [newPosts, setNewPosts] = useState(null);

  const fetchNewPosts = async (queries) => {
    const response = await apis.apiGetProducts(queries);
    if (response.success) setNewPosts(response.postData);
  };

  useEffect(() => {
    const queries = {};
    queries.limit = 12;
    queries.order = ["createdAt", "DESC"];
    fetchNewPosts(queries);
  }, []);

  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="font-semibold text-lg">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts?.rows?.map((item) => {
          return <SItem key={item?.id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default memo(RelatedPost);
