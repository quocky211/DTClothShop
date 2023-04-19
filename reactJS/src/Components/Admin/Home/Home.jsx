import React from 'react'
import './Home.css';
import FeatureInfo from '../FeatureInfo/FeatureInfo';
import Chart from '../Chart/Chart';
import WidgetSm from '../WidgetSm/WidgetSm';
import WidgetLg from '../WidgetLg/WidgetLg';
import { userData } from '../dummyData';

export default function Home() {
  return (
    <div className='home-admin'>
      <FeatureInfo/>
      <Chart  data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
}
