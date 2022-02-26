import { useState, useEffect } from "react";
import "./css/home.css";
import background from "../img/background.svg";
import { HashLink as Link } from "react-router-hash-link";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { ADD_TO_WAITLIST } from "../../graphql/Mutations";

export default function Home() {
  const [isInWaitlist, setisInWaitlist] = useState(false);

  const [
    addToWaitlist,
    { error: addToWaitlistError, data: addToWaitlistData },
  ] = useMutation(ADD_TO_WAITLIST, {
    onError: (err) => {},
  }); //refactor

  const joinWaitlist = async (e) => {
    e.preventDefault();
    addToWaitlist({
      variables: {
        email: e.target.elements.email.value,
      },
    });
  };

  useEffect(() => {
    if (addToWaitlistError) {
      const errorMessage = JSON.parse(
        JSON.stringify(addToWaitlistError.message)
      );
      toast.error(errorMessage);
    } else if (addToWaitlistData) {
      toast.success("You have been added to the waitlist");
      setisInWaitlist(true);
    }
  }, [addToWaitlistData, addToWaitlistError]);

  return (
    <div className="Home-box " id="home">
      <div className="Home ">
        <div class="Home-flex d-flex justify-content-center text-center text-lg-start">
          <div class="container-fluid container1  mt-md-3">
            <div class="row">
              <div class="col-12 col-lg-5">
                <h4 class="ms-sm-1 mt-5 fw-bold">Welcome to Umatter!</h4>
                <h1 class="mt-3 fw-bold ">We are here to hear.</h1>
                <p class="ms-sm-1 mt-sm-5">
                  We provide personalized resources, available peer facilitators
                  and professional counselors to attend to the welfare of our
                  students' mental well-being.
                </p>
                <span class="home-sign-up ">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      We are building your safe place, get notified when it’s
                      done*
                    </label>
                    {isInWaitlist ? (
                      <div class="col-12 ">
                        <div class="d-grid">
                          <a class="btn btn1 btn-light fw-bold text-nowrap">
                            You Are now in the Waitlist! Thank you!
                          </a>
                        </div>
                      </div>
                    ) : (
                      <form
                        class="row g-2 justify-content-center justify-content-lg-start"
                        onSubmit={joinWaitlist}
                      >
                        <div class="col-12 col-md-7 col-lg-7">
                          <input
                            type="email"
                            class="form-control border mw-10"
                            id="exampleFormControlInput1"
                            name="email"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div class="col-12 col-md-5 col-lg-5">
                          <div class="d-grid">
                            <button
                              type="submit"
                              class="btn btn1 btn-light fw-bold text-nowrap"
                            >
                              Join the waitlist
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                  <Link smooth to="#Home-works">
                    <a class="btn btn2 border " role="button">
                      How it works
                    </a>
                  </Link>
                </span>
              </div>
              <div class="col-12 col-lg-7">
                <img class="w-100 h-100" src={background} alt="background" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
