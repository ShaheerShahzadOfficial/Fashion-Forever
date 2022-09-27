import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import "./SaveShippingInfo.css"
import { State } from "country-state-city"
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import CheckOutStep from './CheckOutStep';
import { ShippingInfo } from '../../Redux/Actions/CartActions';
import MetaData from '../../../MetaData';
const SaveShippingInfo = ({ history }) => {

    const { shippingInfo } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingInfo.address)

    const [city, setCity] = useState(shippingInfo.city)

    const [state, setState] = useState(shippingInfo.state)

    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)

    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber)

    const shippingSubmit = (e) => {
        e.preventDefault()
        dispatch(ShippingInfo({ address, city, state, postalCode, phoneNumber }))
        history.push("/order/confirm")
    }



    return (
        <Fragment>
            <MetaData title={"Shipping Info"} />

            <div className='checkout'>
                <CheckOutStep activeStep={0} />
            </div>

            <div className="shippingContainer">
                <div className="shippingBox">
                    <br />
                    <h2 className="shippingHeading">Shipping Detail</h2>

                    <br />

                    <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>

                        <div>
                            <HomeIcon />
                            <input type={"text"} placeholder='Address' required value={address} onChange={e => setAddress(e.target.value)} />
                        </div>


                        <br />


                        <div>
                            <PinDropIcon />
                            <input type={"number"} placeholder='Postal Code' required value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                        </div>

                        <br />


                        <div>
                            <PhoneIcon />
                            <input type={"number"} placeholder='Phone Number' required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} maxLength={11}
                                minLength={11} />
                        </div>

                        <br />

                        <div>
                            <TransferWithinAStationIcon />
                            <select required
                                value={state} onChange={e => setState(e.target.value)}>
                                <option value="">State</option>
                                {
                                    State && State.getStatesOfCountry("PK").map((item) => (
                                        <option value={item.name} key={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <br />


                        <div>
                            <LocationCityIcon />
                            <input type={"text  "} placeholder='City' required value={city} onChange={e => setCity(e.target.value)} />
                        </div>


                        < input className='shippingBtn' value={"Continue"} type={"submit"} />

                    </form>


                </div>

            </div>

        </Fragment>
    )
}

export default SaveShippingInfo