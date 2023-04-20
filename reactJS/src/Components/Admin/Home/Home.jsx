import React from 'react'
import './Home.css';
import FeatureInfo from '../FeatureInfo/FeatureInfo';
import Chart from '../Chart/Chart';
import WidgetSm from '../WidgetSm/WidgetSm';
import WidgetLg from '../WidgetLg/WidgetLg';
import { userData } from '../dummyData';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';

export default function Home() {
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
