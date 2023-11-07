import React, { memo } from "react";
import { Breadcrumbs } from "components";

const PageHeader = ({ header, subheader, category, title }) => {
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <Breadcrumbs category={category} title={title} />
      <div className="w-full flex flex-col gap-2">
        {header && (
          <>
            <h1 className="text-3xl font-bold">{header}</h1>
            <span className="text-overlay50">{subheader}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(PageHeader);
