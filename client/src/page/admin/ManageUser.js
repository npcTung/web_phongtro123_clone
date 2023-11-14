import React, { useCallback, useEffect, useState } from "react";
import { PageHeader, Pagination, UpdateUserByAdmin } from "components";
import { Link, useSearchParams } from "react-router-dom";
import * as apis from "apis";
import NoUser from "assets/logo-image.png";
import Avatar from "assets/logo-image.png";
import moment from "moment";
import icons from "ultils/icons";
import { toast } from "react-toastify";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const {
  BiSolidMessageSquareEdit,
  RiDeleteBin6Line,
  FaArrowDownShortWide,
  FaArrowUpWideShort,
} = icons;

const ManageUser = ({ dispatch }) => {
  const [userAll, setUserAll] = useState(null);
  const [params] = useSearchParams();
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(null);
  const [createdAt, setCreatedAt] = useState(false);

  const handelUserAll = async (queries) => {
    const response = await apis.apiGetAllUser(queries);
    if (response.success) setUserAll(response.usersData);
  };

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const onClickSort = useCallback(() => {
    setCreatedAt(!createdAt);
  }, [createdAt]);

  const handelDeleteUser = async (uid) => {
    if (uid) {
      const response = await apis.apiDeleteUser(uid);
      if (response.success) toast.success("Xóa tài khoản thành công");
      else toast.error(response.mes);
      rerender();
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    queries.limit = 12;
    if (title) queries.name = title;
    else delete queries.name;
    if (createdAt) queries.order = ["createdAt", "DESC"];
    else queries.order = ["createdAt", "ASC"];
    handelUserAll(queries);
    window.scrollTo(0, 0);
  }, [params, update, title, createdAt]);

  return (
    <div className="w-full flex flex-col gap-0 py-5 pr-5">
      <PageHeader
        category={"Quản trị viên"}
        header={"Quản lý người dùng"}
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
          className="w-2/5 input input-bordered"
          placeholder="Nhập tên người dùng..."
        />
      </div>
      <div className="w-full pt-5">
        {userAll?.count > 0 ? (
          <table className="table table-zebra bg-white shadow-md">
            <thead className="table-header-group capitalize text-black">
              <tr>
                <th>Avatar</th>
                <th>tên</th>
                <th>SĐT</th>
                <th>zalo</th>
                <th>email</th>
                <th>facebook</th>
                <th>role</th>
                <th>active</th>
                <th>ngày tạo</th>
                <th>trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {userAll?.rows?.map((el) => (
                <tr key={el.id}>
                  <td>
                    <img
                      src={el.avatar || Avatar}
                      alt={el?.name}
                      className="w-[60px] h-[60px] rounded-md object-contain border"
                    />
                  </td>
                  <td>
                    <span className="capitalize line-clamp-1 whitespace-nowrap">
                      {el?.name}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`tel:${el?.phone}`}
                      className="whitespace-nowrap line-clamp-1 hover:underline hover:text-main-blue transition-all"
                    >
                      {el?.phone}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`https://zalo.me/${el?.zalo}`}
                      target="_blank"
                      className="whitespace-nowrap line-clamp-1 hover:underline hover:text-main-blue transition-all"
                    >
                      {el?.phone}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`mailto:${el?.email}`}
                      className="whitespace-nowrap line-clamp-1 hover:underline hover:text-main-blue transition-all"
                    >
                      {el?.email}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={el?.fbUrl}
                      target="_blank"
                      className="whitespace-nowrap w-[200px] line-clamp-1 hover:underline hover:text-main-blue transition-all"
                    >
                      {el?.fbUrl}
                    </Link>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {+el?.role === 2002 ? "Admin" : "User"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`whitespace-nowrap line-clamp-1 font-bold ${
                        el?.isBlocked ? "text-main-red" : "text-green-500"
                      }`}
                    >
                      {el?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <span className="whitespace-nowrap line-clamp-1">
                      {moment(el?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className="p-2 bg-yellow-400 shadow-lg text-white rounded-md cursor-pointer"
                        title="Sửa tài khoản"
                        onClick={() =>
                          dispatch(
                            showModal({
                              isShowModal: true,
                              modalChildren: (
                                <UpdateUserByAdmin
                                  dataUser={el}
                                  rerender={rerender}
                                />
                              ),
                            })
                          )
                        }
                      >
                        <BiSolidMessageSquareEdit />
                      </span>
                      <span
                        className="p-2 bg-main-red shadow-lg text-white rounded-md cursor-pointer"
                        title="Xóa tài khoản"
                        onClick={() => handelDeleteUser(el?.id)}
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
          <div className="w-full h-[755px] p-3 shadow-sm rounded-md bg-white">
            <img
              src={NoUser}
              alt="No Post"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        {userAll?.count > 12 && (
          <div className="bg-white shadow-sm mt-5 w-full p-2 rounded-full">
            <Pagination limit={12} totalCount={userAll?.count} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withBase(ManageUser);
