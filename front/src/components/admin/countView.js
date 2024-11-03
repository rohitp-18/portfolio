import React, { useEffect, useState } from "react";
import LineChartD from "../home/components/lineChart";
import { useDispatch, useSelector } from "react-redux";
import { adminCount } from "../../redux/actions/allAction";
import { Card } from "@mui/material";

function CountView() {
  const { views } = useSelector((state) => state.adminView);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminCount());
    return () => {};
  }, [dispatch]);
  return (
    <main className="main-all-projects">
      <section style={{ height: "100%" }} className="section-projects">
        <div
          style={{
            padding: "20px",
            paddingBottom: "50px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 0 13px #aaa",
            height: "420px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ padding: "13px", textAlign: "center", opacity: "0.9" }}>
            Views Diagram
          </h2>
          <LineChartD data={views} />
        </div>
      </section>
    </main>
  );
}

export default CountView;
