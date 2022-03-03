import { useEffect, useState, useMemo } from "react";
import {
  USER_VERIFY_EMAIL,
  USER_CONFIRM_EMAIL,
} from "../../../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterVerification = () => {
  const { client } = useSelector((state) => state.client);
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("Resend email confirmation?");
  let [isSent, setIsSent] = useState(false);

  const [
    userConfirmEmail,
    { error: userConfirmEmailError, data: userConfirmEmailData },
  ] = useMutation(USER_CONFIRM_EMAIL, {
    onError: (err) => {},
  });

  const handleConfirmEmail = (e) => {
    e.preventDefault();
    userConfirmEmail({
      variables: {
        email: email,
      },
    });
  };

  useEffect(() => {
    if (userConfirmEmailError) {
      let errorMessage = JSON.parse(
        JSON.stringify(userConfirmEmailError.message)
      );
      console.log(JSON.stringify(userConfirmEmailError.message));
      setMessage(errorMessage);
    } else if (userConfirmEmailData) {
      setMessage("Your email verification has been sent");
    }
  }, [userConfirmEmailData, userConfirmEmailError]);

  return (
    <div className="container-fluid main-background vh-100 p-5">
      <div className="row justify-content-center align-items-center h-100 text-center">
        <div className="col-md-6">
          <h1>{message}</h1>
          <form onSubmit={handleConfirmEmail}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Enter your registered email address.
              </small>
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Send
            </button>
          </form>
          <Link to="/">
            <button className="btn btn-primary">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterVerification;
