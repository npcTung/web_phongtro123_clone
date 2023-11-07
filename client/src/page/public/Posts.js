import React from "react";
import {
  ItemSidebar,
  PageHeader,
  PostsItem,
  Province,
  RelatedPost,
} from "components";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { createSlug } from "ultils/helpers";

const Posts = ({ location }) => {
  const { categories } = useSelector((state) => state.app);
  const title = location.pathname.split("/")[1];
  return (
    <div className="w-main mx-auto flex flex-col gap-5">
      <PageHeader
        category={
          categories?.find((el) => createSlug(el.value) === title)?.value
        }
        header={
          categories?.find((el) => createSlug(el.value) === title)?.header
        }
        subheader={
          categories?.find((el) => createSlug(el.value) === title)?.subheader
        }
      />
      <Province />
      <div className="w-full grid grid-cols-10 gap-5">
        <PostsItem
          categoryCode={
            categories?.find((el) => createSlug(el.value) === title)?.code
          }
        />
        <div className="col-span-3 flex flex-col gap-5">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
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

export default withBase(Posts);
