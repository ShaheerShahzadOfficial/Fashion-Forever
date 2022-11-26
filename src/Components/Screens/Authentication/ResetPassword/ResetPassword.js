import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loader from "../../../config/Loader/loader";
import { useHistory } from "react-router-dom";
import { ResetPassword } from "../../../Redux/Actions/UserActions";
import { useParams } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MetaData from "../../../../MetaData";

const ResetUsersPassword = () => {
  const dispatch = useDispatch();

  const { loading, isUpdated, error } = useSelector(
    (state) => state.updatePassword
  );

  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Password, setPassword] = useState("");

  let { token } = useParams();

  let history = useHistory();
  useEffect(() => {
    if (isUpdated) {
      Swal.fire("Success", "Your Password is Updated", "success");
      // dispatch({
      //     type: UPDATE_PASSWORD_RESET
      // })

      history.push("/Account");
    }

    // if (error) {
    //     dispatch(ClearError())
    // }
  }, [dispatch, error, history, isUpdated, loading]);

  const handleResetPassword = () => {
    const Pass =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    if (Password !== "" && ConfirmPassword !== "") {
      if (Pass.test(Password) === true) {
        if (Password === ConfirmPassword) {
          dispatch(ResetPassword(token, Password, ConfirmPassword));
        } else {
          Swal.fire(
            "Password Verification Failed",
            "Password and ResetPassword Must be same",
            "error"
          );
        }
      } else {
        Swal.fire(
          "Password Validation Failed",
          "Password Must contain letter Number and Symbols and Capital Letter",
          "warning"
        );
      }
    } else {
      Swal.fire(
        "Presence Alert",
        "Enter Password And Confirm Password",
        "warning"
      );
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="mainContainers">
          <MetaData title={"Password Reset"} />
          <div className="subContainers">
            <h2>Reset Password</h2>
            <div className="Form">
              <div>
                <VpnKeyIcon />
                <input
                  className="Input"
                  type={"password"}
                  placeholder="New Password"
                  value={Password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <br />

              <div>
                <VpnKeyIcon />
                <input
                  className="Input"
                  type={"password"}
                  placeholder="Confirm Password"
                  value={ConfirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <br />

              <br />
              <button onClick={handleResetPassword}>Reset Password</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default ResetUsersPassword;
