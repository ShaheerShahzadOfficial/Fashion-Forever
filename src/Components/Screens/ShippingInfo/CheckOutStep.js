import "./CheckOutStep.css"
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const CheckOutStep = ({ activeStep }) => {
    const step = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        }
    ]


    const stepStyles = {
        boxSizing: "border-box"
    }

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >

                {
                    step.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}>
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.649)",
                                    fontSize: "2vmax"
                                }}
                                icon={item.icon}>
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))
                }

            </Stepper>
        </Fragment>
    )
}

export default CheckOutStep