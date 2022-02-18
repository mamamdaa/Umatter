import "./css/contact.css";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Contact() {
  return (
    <div className="Contact-box">
      <div className="Contact">
        <div className="Contact-flex d-flex justify-content-center p-4 m-0">
          <div className="form-flex mt-5 col-lg-4 pt-5">
            <div className="contact-container me-auto ">
              <form className="p-4 ">
                <h1 class=" fw-bolder text-center mt-1 mb-5">
                  Connect with us
                </h1>
                <div class="mb-3 mt-4">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fw-bolder fs-6"
                  >
                    Name
                  </label>
                  <input
                    type="email"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputEmail1"
                    class="form-label fw-bolder fs-6"
                  >
                    Email
                  </label>
                  <input
                    type="Email"
                    class="form-control fw-bold border border-dark"
                    id="exampleInputEmail1"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label fw-bold fs-6"
                  >
                    Message
                  </label>
                  <textarea
                    class="form-control "
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>

                <div class="submit d-grid gap-2 mt-5">
                  <Link to="/User">
                    <button
                      class="btn create-btn fw-bold border border-dark"
                      type="button"
                    >
                      Submit
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>

    // <div className="contact-box">
    //   <div className="contact" id="contact">
    //     <div class="Contact-flex d-flex justify-content-center p-5 m-0 ">
    //       <div className="contact-flex col-sm-3 mt-5 ">
    //         <div className="contact-container  ">
    //           <form className="p-4 ">
    //             <h1 class=" fw-bolder text-center mt-1 mb-5">
    //               Connect with us
    //             </h1>
    //             <div class="mb-3 mt-4">
    //               <label
    //                 for="exampleInputEmail1"
    //                 class="form-label fw-bolder fs-6"
    //               >
    //                 Name
    //               </label>
    //               <input
    //                 type="email"
    //                 class="form-control fw-bold border border-dark"
    //                 id="exampleInputEmail1"
    //                 aria-describedby="emailHelp"
    //               />
    //             </div>
    //             <div class="mb-3">
    //               <label
    //                 for="exampleInputEmail1"
    //                 class="form-label fw-bolder fs-6"
    //               >
    //                 Email
    //               </label>
    //               <input
    //                 type="Email"
    //                 class="form-control fw-bold border border-dark"
    //                 id="exampleInputEmail1"
    //               />
    //             </div>
    //             <div class="mb-3">
    //               <label
    //                 for="exampleFormControlTextarea1"
    //                 class="form-label fw-bold fs-6"
    //               >
    //                 Message
    //               </label>
    //               <textarea
    //                 class="form-control "
    //                 id="exampleFormControlTextarea1"
    //                 rows="3"
    //               ></textarea>
    //             </div>

    //             <div class="submit d-grid gap-2 mt-5">
    //               <Link to="/User">
    //                 <button
    //                   class="btn create-btn fw-bold border border-dark"
    //                   type="button"
    //                 >
    //                   Submit
    //                 </button>
    //               </Link>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //     <Footer />
    //   </div>
    // </div>
  );
}
