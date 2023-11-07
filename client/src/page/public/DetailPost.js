import React, { useEffect, useState } from "react";
import { BoxInfo, PageHeader, Post, RelatedPost } from "components";
import { useSelector } from "react-redux";
import withBase from "hocs/withBase";
import { createSlug } from "ultils/helpers";
import { useParams } from "react-router-dom";
import * as apis from "apis";

const DetailPost = ({ location }) => {
  const { categories } = useSelector((state) => state.app);
  const { pid } = useParams();
  const [post, setPost] = useState(null);
  const title = location.pathname.split("/")[1];

  const fetchProduct = async (pid) => {
    const response = await apis.apiGetPost(pid);
    if (response.success) setPost(response.currentPort);
  };

  useEffect(() => {
    if (pid) fetchProduct(pid);
  }, [pid]);

  return (
    <div className="w-main mx-auto flex flex-col gap-5">
      <PageHeader
        category={
          categories?.find((el) => createSlug(el.value) === title)?.value
        }
      />
      <div className="w-full grid grid-cols-10 gap-5">
        <Post data={post} />
        <div className="col-span-3 flex flex-col gap-5">
          <BoxInfo user={post?.user} />
          <RelatedPost
            categoryCode={
              categories?.find((el) => createSlug(el.value) === title)?.code
            }
            cate={"Tin nổi bật"}
            star
            limit={3}
          />
          <RelatedPost
            categoryCode={
              categories?.find((el) => createSlug(el.value) === title)?.code
            }
            cate={"Tin mới đăng"}
          />
        </div>
      </div>
    </div>
  );
};

export default withBase(DetailPost);
