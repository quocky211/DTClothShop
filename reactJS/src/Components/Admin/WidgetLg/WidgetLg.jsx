import React from 'react'
import './WidgetLg.css'

export default function WidgetLg() {


  const Button = ({type}) =>{
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest transaction</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/326711522_706011897851934_8382087031805852351_n.jpg?stp=dst-jpg_p240x240&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N-0Nwfv2VlQAX-MTwA5&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCuniTJrTBlQzD6NjLKnInIsYJ2nxUmC6mD4kagI95A0A&oe=6443B6A5" alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Quoc Ky</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Approved"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/326711522_706011897851934_8382087031805852351_n.jpg?stp=dst-jpg_p240x240&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N-0Nwfv2VlQAX-MTwA5&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCuniTJrTBlQzD6NjLKnInIsYJ2nxUmC6mD4kagI95A0A&oe=6443B6A5" alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Quoc Ky</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Declined"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/326711522_706011897851934_8382087031805852351_n.jpg?stp=dst-jpg_p240x240&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N-0Nwfv2VlQAX-MTwA5&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCuniTJrTBlQzD6NjLKnInIsYJ2nxUmC6mD4kagI95A0A&oe=6443B6A5" alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Quoc Ky</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Pending"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/326711522_706011897851934_8382087031805852351_n.jpg?stp=dst-jpg_p240x240&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N-0Nwfv2VlQAX-MTwA5&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCuniTJrTBlQzD6NjLKnInIsYJ2nxUmC6mD4kagI95A0A&oe=6443B6A5" alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Quoc Ky</span>
            </td>
            <td className="widgetLgDate">2 Jun 2023</td>
            <td className="widgetLgAmount">$122.0</td>
            <td className="widgetLgStatus">
              <Button type="Approved"/>
            </td>
         </tr>
         <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-1/326711522_706011897851934_8382087031805852351_n.jpg?stp=dst-jpg_p240x240&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=N-0Nwfv2VlQAX-MTwA5&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfCuniTJrTBlQzD6NjLKnInIsYJ2nxUmC6mD4kagI95A0A&oe=6443B6A5" alt="img" className="widgetLgImg" />
              <span className="widgetLgName">Quoc Ky</span>
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
