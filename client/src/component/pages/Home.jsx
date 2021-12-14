import React, {useEffect} from "react";
import "./css/home.css";
import { useQuery,gql } from "@apollo/client";
import {GET_USERS} from "../../graphql/Queries";
import background from "../img/background.svg";

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    if (data) {
      console.log(data);
      setUsers(data.getUsers);
    }
  }, [data,error]);
  return (
    <div className="Home-box ">
      <div className="Home ">
        <div class="mission-flex d-flex justify-content-center  ">
          <div class="container text-center mt-md-5">
            <h1 class="ms-sm-1">Our mission</h1>
            <p class="ms-sm-1 mt-sm-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel
              mauris mattis tempor elementum eget tortor mi nec auctor.
              Vulputate enim tortor augue et est vulputate etiam ut magna. Et
              donec ultricies semper maecenas risus sed. Commodo vitae faucibus
              gravida nulla. Phasellus mauris duis turpis dolor aliquam
              porttitor. In tincidunt et nulla odio nec consectetur. Diam,
              tempus erat hendrerit dictumst sed a tincidunt. Aliquet gravida
              condimentum donec ipsum.
            </p>
          </div>
          <div class="container con1">
            {loading ? ( <div>Loading...</div> ) : (
              <div class="row">
                {users.map((user) => (
                  <div class="col-md-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{user.first_name}</h5>
                        <p class="card-text">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <img class="me-4" src={background} alt="background" />
          </div>

          <div class="container con1"></div>
        </div>
      </div>
    </div>
  );
}
