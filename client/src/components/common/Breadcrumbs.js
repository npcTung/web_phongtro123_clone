import React, { memo } from "react";
import { Link } from "react-router-dom";
import icons from "ultils/icons";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const { MdOutlineKeyboardArrowRight } = icons;

const Breadcrumbs = ({ title, category }) => {
  const routes = [
    { path: "/", breadcrumb: "home" },
    {
      path: "/:category",
      breadcrumb: category?.toLowerCase(),
    },
    // {
    //   path: "/:category/:pid/:title",
    //   breadcrumb: title?.toLowerCase(),
    // },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className="flex items-center gap-1"
          >
            <span className="capitalize text-main-blue hover:text-main-orange transition-all">
              {breadcrumb}
            </span>
            {index !== self.length - 1 && <MdOutlineKeyboardArrowRight />}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumbs);
