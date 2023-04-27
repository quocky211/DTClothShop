import React from 'react'
import './WidgetSm.css'
import {Visibility} from '@mui/icons-material'
import { Link } from 'react-router-dom';
import avatar from '../Images/avatar.jpeg';


export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Halland</span>
            <span className="widgetSmUserTitle">Backend Dev</span>
          </div>
          <Link to={"/Admin/User/" + 1} className="link-admin">
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </Link>
        </li>
        <li className="widgetSmListItem">
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Halland</span>
            <span className="widgetSmUserTitle">Backend Dev</span>
          </div>
          <Link to={"/Admin/User/" + 1} className="link-admin">
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </Link>
        </li>
        <li className="widgetSmListItem">
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Halland</span>
            <span className="widgetSmUserTitle">Backend Dev</span>
          </div>
          <Link to={"/Admin/User/" + 1} className="link-admin">
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </Link>
        </li>
        <li className="widgetSmListItem">
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Halland</span>
            <span className="widgetSmUserTitle">Backend Dev</span>
          </div>
          <Link to={"/Admin/User/" + 1} className="link-admin">
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </Link>
        </li>
        <li className="widgetSmListItem">
          <img
            src={avatar}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Halland</span>
            <span className="widgetSmUserTitle">Backend Dev</span>
          </div>
          <Link to={"/Admin/User/" + 1} className="link-admin">
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
