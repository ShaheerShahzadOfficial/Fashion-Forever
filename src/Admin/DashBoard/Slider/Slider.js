import "./slider.css"
import React from 'react'
import { Link } from "react-router-dom"
import { TreeView, TreeItem } from "@material-ui/lab"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
// import RateReviewIcon from "@mui/icons-material/RateReview";
import logo from "../../../Components/Image/Forever fashion.png"


const Slider = () => {
    return (
        <div className="sidebar">
            <Link to={"/"}>
                <img src={logo} alt="Logo" />
            </Link>

            <Link to={"/admin/DashBoard"}>
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>

            <ul className="Tree">
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to={"/admin/Products"}>
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>
                        <Link to={"/admin/product"}>
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </ul>

            <Link to={"/admin/orders"}>
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to={"/admin/AllUsers"}>
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            {/* <Link to={"/admin/reviews"}>
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link> */}
        </div>)
}

export default Slider