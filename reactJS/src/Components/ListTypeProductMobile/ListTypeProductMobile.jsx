import { Link } from "react-router-dom";
import arrowbottom from '../Images/arrow-bottom.png';
import './ListTypeProductMobile.css'
import { FakeData } from "../fakedata";
import { useState } from "react";


function ListTypeProductMobile(props) {

const [open, setOpen] = useState(false);
function openDetail()
{
    setOpen(!open);
}
  return (
      <li className="each-type-product-mobile" >
        <Link to={"/Products/Type/" + props.matype}>{props.name}</Link>
        <img src={arrowbottom} alt="arrowbottom" onClick={openDetail} />
          <ul className="detail-product-mobile">
              {
                  FakeData[3].map((item) => item.matype === props.matype && open === true && (
                      <Link to={"/Products/TypeDetail/" + item.matd}>
                          <li>{item.name}</li>
                      </Link>
                  ))
              }
          </ul>
      </li>
  );
}

export default ListTypeProductMobile;