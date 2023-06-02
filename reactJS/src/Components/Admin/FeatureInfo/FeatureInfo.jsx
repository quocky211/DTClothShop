import React from 'react'
import './FeatureInfo.css'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'

export default function FeatureInfo() {
  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="featuredTitle">Doanh thu</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">101.438.000 đ</span>
            <span className="featuredMoneyRate">
                -11.4 <ArrowDownward className='featuredIcon negative'/>
            </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Lợi nhuận</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">65.998.000 đ</span>
            <span className="featuredMoneyRate">
                -1.4 <ArrowDownward className='featuredIcon negative'/>
            </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Tỷ lệ chuyển đổi</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">76%</span>
            <span className="featuredMoneyRate">
                +2.4 <ArrowUpward className='featuredIcon'/>
            </span>
        </div>
        <span className="featuredSub">So sánh với tháng trước</span>
      </div>
    </div>
  )
}
