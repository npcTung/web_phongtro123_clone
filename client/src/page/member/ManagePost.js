import React, { useCallback, useEffect, useState } from "react";
import { PageHeader, Pagination, UpdatePost } from "components";
import * as apis from "apis";
import { useSearchParams } from "react-router-dom";
import icons from "ultils/icons";
import NoPost from "assets/no-product.png";
import Post from "assets/logo-image.png";
import { formatMoney } from "ultils/helpers";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import { toast } from "react-toastify";

const { RiDeleteBin6Line, BiSolidMessageSquareEdit } = icons;

const ManagePost = ({ dispatch }) => {
  const [params] = useSearchParams();
  const [postsData, setPostsData] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProsts = async (queries) => {
    const response = await apis.apiGetPostsLimitUser(queries);
    if (response.success) setPostsData(response.postAdminData);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handelDeletePost = async (pid) => {
    const response = await apis.apiDeletePost(pid);
    if (response.success) toast.success("Xóa sản phẩm thành công");
    else toast.error(response.mes);
    rerender();
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    queries.limit = 12;
    fetchProsts(queries);
  }, [params, update]);

  return (
    <div className="w-full h-screen flex flex-col gap-0 py-5 pr-5">
      <PageHeader category={"quản lý người dùng"} header={"Quản lý tin đăng"} />
      <div className="w-full border"></div>
      <div className="w-full pt-5">
        {postsData?.count > 0 ? (
          <table className="table table-zebra capitalize bg-white shadow-md">
            <thead className="table-header-group text-black">
              <tr>
                <th>mã tin</th>
                <th>ảnh đại diện</th>
                <th className="w-[200px]">tiêu đề</th>
                <th>giá</th>
                <th>ngày bắt đầu</th>
                <th>ngày hết hạn</th>
                <th>trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {postsData?.rows?.map((el) => (
                <tr key={el.id}>
                  <td>{`#${
                    el?.attributes?.hashtag?.split("#")?.length > 1
                      ? el?.attributes?.hashtag?.split("#")[1]
                      : el?.attributes?.hashtag?.split("#")[0]
                  }`}</td>
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
                  <td>{`${formatMoney(
                    el?.attributes?.price.split("triệu/tháng")[0]
                  )} VNĐ`}</td>
                  <td>{el?.overviews?.created}</td>
                  <td>{el?.overviews?.expired}</td>
                  <td>
                    <span className="flex gap-2 text-lg">
                      <span
                        className="p-2 bg-yellow-400 shadow-lg text-white rounded-md cursor-pointer"
                        title="Sửa sản phẩm"
                        onClick={() =>
                          dispatch(
                            showModal({
                              isShowModal: true,
                              modalChildren: (
                                <UpdatePost dataPost={el} rerender={rerender} />
                              ),
                            })
                          )
                        }
                      >
                        <BiSolidMessageSquareEdit />
                      </span>
                      <span
                        className="p-2 bg-main-red shadow-lg text-white rounded-md cursor-pointer"
                        title="Xóa sản phẩm"
                        onClick={() => handelDeletePost(el.id)}
                      >
                        <RiDeleteBin6Line />
                      </span>
                    </span>
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
        {postsData?.count > +process.env.REACT_APP_LIMIT && (
          <div className="bg-white shadow-sm mt-5 w-full p-2 rounded-full">
            <Pagination
              limit={process.env.REACT_APP_LIMIT}
              totalCount={postsData?.count}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(ManagePost);
