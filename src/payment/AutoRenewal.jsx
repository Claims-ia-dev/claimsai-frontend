import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bullet from "../images/bulletpoint.svg"
import SadFace from "../images/sadface.svg";
import Card from "../shared/components/UIElements/Card";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./Autorenewal.css";

const AutoRenewal = () => {
  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [changeAutorenewal, setChangeAutorenewal] = useState(true);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [charged, setCharged] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPeriodEnd, setCurrentPeriodEnd]=useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/listproducts`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          auth.token
        );
        setProducts(response); // update products state with API response
     
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [sendRequest, auth.token]);

  useEffect(() => {
    const fetchSubscriptionId = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/mysubscriptions`,
          "GET",
          null,
          { "Content-Type": "application/json" },
          auth.token
        );
        const subscriptionData = await response;
       // console.log(subscriptionData);
        if (subscriptionData.length > 0) {
          setSubscriptionId(subscriptionData[0].id);
          setCurrentSubscription(subscriptionData[0]);
          setChangeAutorenewal(!subscriptionData[0].cancel_at_period_end);
          const timestamp = subscriptionData[0].current_period_end;
          const date = new Date(timestamp * 1000); // convert seconds to milliseconds
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }); // format the date
          setCurrentPeriodEnd(formattedDate);
          if (products.length > 0) {
            setCharged(true);
            // <--- Add this check
            const matchingProduct = products.find(
              (product) => product.default_price === subscriptionData[0].plan.id
            );
         //   console.log(matchingProduct);
            setCurrentProduct(matchingProduct);
          }
          
        } else {
          if(products.length>0 ){
            setCharged(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubscriptionId();
    
  }, [auth.token, sendRequest,products]);

  const handleCancel = async () => {
    //console.log(currentSubscription);
    try {
      const formData = new URLSearchParams();
      formData.append("subscription_id", subscriptionId);
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/cancelusersubscription`,
        "POST",
        formData.toString(),
        { "Content-Type": "application/x-www-form-urlencoded" },
        auth.token
      );
        console.log(response);
      setCancelSubscription(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckChange = async (subscriptionId, autorenewal) => {
    console.log("on click");
    console.log(autorenewal);
    try {
      const formData = new URLSearchParams();
      formData.append("subscription_id", subscriptionId);
      formData.append("end_auto_renewal", autorenewal);
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/subscriptionautorenewal`,
        "POST",
        formData.toString(),
        { "Content-Type": "application/x-www-form-urlencoded" },
        auth.token
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setChangeAutorenewal(!autorenewal);
  };

  return (
    <div className="autorenewal-page">
      <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="autorenewal">
        {isLoading && <LoadingSpinner asOverlay />}

        {currentProduct && (
          <div className="plan">
            {currentProduct && <h1>Plan: {currentProduct.name} </h1>}
            <h3>
              The  current period of your subscription  ends:<br/> {currentPeriodEnd} 
              
            </h3>
            {currentProduct && <p>{currentProduct.description}</p>}
           <div className="renewal_container">
            
            <ul className="feature_list">
                  <li><img src={bullet} alt="bullet"/>{currentProduct.metadata?.users? currentProduct.metadata.users:"up to ?? users"} </li>
                  <li><img src={bullet} alt="bullet"/>{currentProduct.metadata?.estimates? currentProduct.metadata.estimates:"up to ?? estimates"} </li>
             
              </ul>
          
            <div className="check">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={changeAutorenewal}
                  onChange={(event) =>
                    handleCheckChange(
                      currentSubscription?.id,
                      changeAutorenewal
                    )
                  }
                />
                <span className="slider round"></span>
              </label>
              <p>Automatic renewal</p>
            </div></div>

            <Button inverse onClick={() => handleCancel()}>
              Cancel subscription
            </Button>
            {cancelSubscription && <h4>Your subscription has been canceled</h4>}
          </div>
        )}
        {!currentProduct && charged &&(
          <div className="plan">
            <h1>Your plan has been canceled </h1>
            <br />
            <img src={SadFace} alt="sad face"></img>
            <h2>
              <Link to="/subscription">Get a new plan</Link> before the{" "}
              {auth.userinfo.subscription_end?.slice(0, 10)}
            </h2>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AutoRenewal;
