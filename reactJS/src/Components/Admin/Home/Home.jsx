import React, { useEffect } from "react";
import "./Home.css";
import FeatureInfo from "../FeatureInfo/FeatureInfo";
import Chart from "../Chart/Chart";
import WidgetSm from "../WidgetSm/WidgetSm";
import WidgetLg from "../WidgetLg/WidgetLg";
import { userData } from "../dummyData";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const tokens = JSON.parse(localStorage.getItem("JWT"));
  useEffect((_) => {
    if (!tokens) {
      navigate("/Login");
    } else if (!tokens.level) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <div className="home-admin">
          <FeatureInfo />
          <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </div>
  );
}
