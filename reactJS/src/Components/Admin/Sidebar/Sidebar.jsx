import React from "react";
import './Sidebar.css'
import {
  ChatBubbleOutline,
  AttachMoney,
  Leaderboard,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
  PersonAddAlt,
  AddBusiness,
  List,
  CreditCard,
  FormatAlignJustify,
  Article,
  EditNote

} from "@mui/icons-material";
import { Link } from  'react-router-dom';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/Admin" className="link-admin">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Thống kê
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Menu</h3>
          <ul className="sidebarList">
            <Link to="/Admin/Users" className="link-admin">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/Admin/NewUser" className="link-admin">
              <li className="sidebarListItem">
                <PersonAddAlt className="sidebarIcon" />
                Thêm người dùng
              </li>
            </Link>
            <Link to="/Admin/Products" className="link-admin">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/Admin/NewProduct" className="link-admin">
              <li className="sidebarListItem">
                <AddBusiness className="sidebarIcon" />
                Thêm sản phẩm
              </li>
            </Link>
            <Link to="/Admin/Products" className="link-admin">
              <li className="sidebarListItem">
                <CreditCard className="sidebarIcon" />
                Order
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Catagory</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <List className="sidebarIcon" />
              Danh mục
            </li>
            <li className="sidebarListItem">
              <FormatAlignJustify className="sidebarIcon" />
              Loại
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitile">Blog</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Article className="sidebarIcon" />
              Bài viết
            </li>
            <li className="sidebarListItem">
              <EditNote className="sidebarIcon" />
              Thêm bài viết
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
