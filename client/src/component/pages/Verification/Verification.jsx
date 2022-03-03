import { useEffect, useState, useMemo } from "react";
import { USER_VERIFY_EMAIL } from "../../../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const Verification = () => {
  let [message, setMessage] = useState("");
  let { token } = useParams();

  const [
    userVerifyEmail,
    { error: userVerifyEmailError, data: userVerifyEmailData },
  ] = useMutation(USER_VERIFY_EMAIL, {
    onError: (err) => {},
  });

  useMemo(
    () =>
      userVerifyEmail({
        variables: {
          token: token,
        },
      }),
    []
  );

  useEffect(() => {
    if (userVerifyEmailError) {
      let errorMessage = JSON.parse(
        JSON.stringify(userVerifyEmailError.message)
      );
      console.log(JSON.stringify(userVerifyEmailError.message));
      setMessage(errorMessage);
    } else if (userVerifyEmailData) {
      setMessage("Your email has been verified");
    }
  }, [userVerifyEmailData, userVerifyEmailError]);

  return (
    <div className="container-fluid main-background vh-100 p-5">
      <div className="row justify-content-center align-items-center h-100 text-center">
        <div className="col-md-6">
          <h1>{message}</h1>
          <Link to="/">
            <button className="btn btn-primary" hr>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification;
