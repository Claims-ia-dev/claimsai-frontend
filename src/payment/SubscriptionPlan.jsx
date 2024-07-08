import React, { useState, useContext, useEffect } from "react";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import bullet from "../images/bulletpoint.svg";
import Success from "./Success";
import "./SubscriptionPlan.css";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

function SubscriptionPlan() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');
  const [products, setProducts] = useState([]); 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/listproducts`,
          'GET',
          null,
          { 'Content-Type': 'application/json' },
          auth.token
        );
        setProducts(response); // update products state with API response
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [sendRequest, auth.token]);

 



  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

 

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan);
    //const requestBody = { price, customerId: userId };
    try {
      const formData = new URLSearchParams();
    formData.append('plan_id', plan.default_price);
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/create-checkout-session`,
        "POST",
        formData.toString(),
            { 'Content-Type': 'application/x-www-form-urlencoded' },
        auth.token
      );   
      window.location =response.url; 
     // window.open(response.url, '_blank');
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);
  return (
    <>
    <div className="subscription_page">
    <ErrorModal error={error} onClear={clearError}></ErrorModal>
      <Card className="subscriptions">
      {isLoading && <LoadingSpinner asOverlay />}
        <h4>Choose a plan that suits your business needs</h4> <br/>
        <h2>Ready to get started?</h2>
        <div className="subscriptions__cards">
          {products.map((plan) => (
            <Card className="plan_card" key={plan.id}>
              <div className="name_description">
              <h2>{plan?.name}</h2> <br/>
              <p>{plan?.description}</p> <br/>
              </div>
              <span>
                <br/>
                <h2>${plan.metadata.price? plan.metadata.price:"??"}</h2>
                <p>/month</p>
              </span>
              <ul className="feature_list">
                  <li><img src={bullet} alt="bullet"/>{plan.metadata.users? plan.metadata.users:"up to ?? users"} </li>
                  <li><img src={bullet} alt="bullet"/>{plan.metadata.estimates? plan.metadata.estimates:"up to ?? estimates"} </li>
             
              </ul>
              <Button className="center" onClick={() => handlePlanSelect(plan)}>
                Select Plan
              </Button>
            </Card>
          ))}
        </div>
        {selectedPlan && (
          <div>
            <h3>You have selected: {selectedPlan.name}</h3>
          </div>
        )}

    {success && sessionId !== '' ? (
      <Success sessionId={sessionId} />
    ) : (
      <Message message={message} />
    )}
      </Card>
      </div>
    </>
  );
}

export default SubscriptionPlan;