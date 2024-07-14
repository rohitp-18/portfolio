import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLEAR_ERRORS } from "../../redux/constants/userConstants";
import { getUserAction } from "../../redux/actions/userActions";

function ProtectRoute({ children }) {
  const { user, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !user) {
      return navigate("/");
    }

    if (error) {
      dispatch({ type: CLEAR_ERRORS });
      return navigate("/");
    }

    if (!user) {
      dispatch(getUserAction());
    }
  }, [navigate, user, loading, error]);
  return <>{user && <main className="main-dashboard">{children}</main>}</>;
}

export default ProtectRoute;
