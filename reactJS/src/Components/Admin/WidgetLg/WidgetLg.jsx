import React from 'react'
import './WidgetLg.css'
import avatar from '../Images/avatar.jpg';

export default function WidgetLg() {


  const Button = ({type}) =>{
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle"> Đơn hàng mới</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Khách hàng</th>
          <th className="widgetLgTh">Ngày</th>
          <th className="widgetLgTh">Tổng</th>
          <th className="widgetLgTh">Trạng thái</th>
        </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Halland</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Approved"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Halland</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Declined"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Halland</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Pending"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Halland</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Approved"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={avatar} alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Halland</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Approved"/>
            </td>
         </tr>
      </table>
    </div>
  )
}
