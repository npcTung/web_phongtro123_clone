import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const withBase = (Component) => (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      location={location}
    />
  );
};

export default withBase;
