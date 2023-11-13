import React, { useCallback, useEffect, useState } from "react";
import { PageHeader, Pagination } from "components";
import * as apis from "apis";
import icons from "ultils/icons";
import NoPost from "assets/no-product.png";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatMoney } from "ultils/helpers";
import Post from "assets/logo-image.png";
import moment from "moment";

const { RiDeleteBin6Line, FaArrowUpWideShort, FaArrowDownShortWide } = icons;

const ManagePost = () => {
  const [postAll, setPostAll] = useState(null);
  const [params] = useSearchParams();
  const [update, setUpdate] = useState(false);
  const [createdAt, setCreatedAt] = useState(false);
  const [title, setTitle] = useState(null);

  const handelPostAll = async (queries) => {
    const response = await apis.apiGetPosts(queries);
    if (response.success) setPostAll(response.postData);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const onClickSort = useCallback(() => {
    setCreatedAt(!createdAt);
  }, [createdAt]);

  const handelDeletePost = async (pid) => {
    const response = await apis.apiDeletePost(pid);
    if (response.success) toast.success("Xóa sản phẩm thành công");
    else toast.error(response.mes);
    rerender();
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    queries.limit = 12;
    if (title) queries.title = title;
    else delete queries.title;
    if (createdAt) queries.order = ["createdAt", "DESC"];
    else queries.order = ["createdAt", "ASC"];
    handelPostAll(queries);
    window.scrollTo(0, 0);
  }, [params, update, createdAt, title]);

  return (
    <div className="w-full flex flex-col gap-0 py-5 pr-5">
      <PageHeader
        category={"Quản trị viên"}
        header={"Quản lý tin đăng của người dùng"}
        fixed
      />
      <div className="w-full h-[93px]"></div>
      <div className="w-full flex items-center justify-between">
        {createdAt ? (
          <span className="cursor-pointer text-xl" onClick={onClickSort}>
            <FaArrowUpWideShort />
          </span>
        ) : (
          <span className="cursor-pointer text-xl" onClick={onClickSort}>
            <FaArrowDownShortWide />
          </span>
        )}
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-2/5 input input-bordered pr-10"
          placeholder="Nhập tiêu đề bài viết..."
        />
      </div>
      <div className="w-full pt-5">
        {postAll?.count > 0 ? (
          <table className="table table-zebra capitalize bg-white shadow-md">
            <thead className="table-header-group text-black">
              <tr>
                <th>mã tin</th>
                <th>ảnh đại diện</th>
                <th className="w-[200px]">tiêu đề</th>
                <th>giá</th>
                <th>Người đăng</th>
                <th>ngày bắt đầu</th>
                <th>ngày hết hạn</th>
                <th>Ngày đăng</th>
                <th>trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {postAll?.rows?.map((el) => (
                <tr key={el.id}>
                  <td>{`#${el?.attributes?.hashtag}`}</td>
                  <td>
                    <img
                      src={JSON.parse(el?.images)[0] || Post}
                      alt={el?.title}
                      className="w-[60px] h-[60px] rounded-md object-contain border"
                    />
                  </td>
                  <td>
                    <span className="capitalize line-clamp-1 whitespace-nowrap w-[200px]">
                      {el?.title?.toLowerCase()}
                    </span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">{`${formatMoney(
                      el?.attributes?.price.split("triệu/tháng")[0]
                    )} VNĐ`}</span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {el?.user?.name}
                    </span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {el?.overviews?.created}
                    </span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {el?.overviews?.expired}
                    </span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {moment(el?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <span
                        className="p-2 bg-main-red shadow-lg text-white rounded-md cursor-pointer"
                        title="Xóa sản phẩm"
                        onClick={() => handelDeletePost(el.id)}
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full p-3 shadow-sm rounded-md bg-white">
            <img
              src={NoPost}
              alt="No Post"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {postAll?.count > 12 && (
          <div className="bg-white shadow-sm mt-5 w-full p-2 rounded-full">
            <Pagination limit={12} totalCount={postAll?.count} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePost;
