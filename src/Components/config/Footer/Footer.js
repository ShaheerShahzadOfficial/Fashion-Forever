import React from 'react'
import "./footer.css"
const Footer = () => {
    return (
        <footer>
            <div className="leftFooter">
                <h4>  Forever Fashion  </h4>
                <h5> Selling A Quality Product is our First Priority </h5>
            </div>

            <div className="rightFooter" id='rightFooter'>
                <h5>  Follow Us On </h5>
                <div className='Section2'>
                    <a href="https://www.instagram.com/shaheershahaan2022/" target={"_blank"} rel="noreferrer">          <i className="fa fa-instagram" id="instagram">   </i> </a>
                    <a href="https://wa.me/message/RVVZMCKQGHOCG1" target={"_blank"} rel="noreferrer" > <i className="fa fa-whatsapp" id="whatsapp">   </i>  </a>
                    <a href="https://www.facebook.com/shahsscollection" target={"_blank"} rel="noreferrer" >    <i className="fa fa-facebook-square" id="facebook">  </i> </a>
                </div>
            </div>


        </footer>
    )
}

export default Footer