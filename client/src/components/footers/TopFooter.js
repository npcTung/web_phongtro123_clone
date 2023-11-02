import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSlug, renderStarFromNumber } from "ultils/helpers";
import { topFooter } from "ultils/constant";
import Button from "components/button/Button";

const TopFooter = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full py-10 bg-white border">
      <div className="w-main mx-auto px-20 flex flex-col gap-5 items-center">
        <h1 className="text-center text-2xl font-semibold">
          {topFooter.title}
        </h1>
        <div className="flex justify-center items-center">
          <span className="text-center">
            <span>{topFooter.description}</span>
            {categories?.map((el) => (
              <span key={el.id}>
                <Link
                  to={`/${createSlug(el.value)}`}
                  className="whitespace-nowrap font-bold text-main-blue hover:text-main-red transition-all"
                >
                  {el.value}
                </Link>
                ,
              </span>
            ))}
            <span>{topFooter.description2}</span>
          </span>
        </div>
        <ul className="flex gap-20">
          {topFooter.statistic.map((el, idx) => (
            <li key={idx} className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold">{el.value}</span>
              <span className="text-sm">{el.name}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-center text-2xl font-semibold">
          {topFooter.price}
        </h3>
        <span className="flex gap-1 text-yellow-500 justify-center">
          {renderStarFromNumber(5)}
        </span>
        <span className="text-sm text-center">{`"${topFooter.comment}"`}</span>
        <span className="text-sm">{topFooter.author}</span>
        <h2 className="text-center text-2xl font-semibold">
          {topFooter.question}
        </h2>
        <span>{topFooter.answer}</span>
        <Button
          name={"đăng tin ngay"}
          styles={"btn-error text-white bg-main-red shadow-md"}
        />
      </div>
    </div>
  );
};

export default memo(TopFooter);
