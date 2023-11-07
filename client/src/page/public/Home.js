import React from "react";
import {
  Province,
  PageHeader,
  PostsItem,
  ItemSidebar,
  RelatedPost,
} from "components";
import { useSelector } from "react-redux";

const Home = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader
        header={"Kênh thông tin Phòng Trọ số 1 Việt Nam"}
        subheader={
          "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng."
        }
      />
      <Province />
      <div className="w-full grid grid-cols-10 gap-5">
        <PostsItem />
        <div className="col-span-3 flex flex-col gap-5">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <RelatedPost cate={"Tin mới đăng"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
