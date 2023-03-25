import React from "react";
import { FakeData } from "../fakedata";
import { Link } from "react-router-dom";

function ListTypeProduct(props)
{   
    return(
        <Link to={"/Products/Type/" + props.matype}>
            <li className="each-type-product">
                {props.name}
                <ul className="detail-product">
                    {
                        FakeData[3].map((item) => item.matype === props.matype && (
                            <Link to={"/Products/TypeDetail/" + item.matd}>
                                <li>{item.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </li>
        </Link>
        
    );
}
export default ListTypeProduct;