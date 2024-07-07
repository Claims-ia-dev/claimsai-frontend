import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../shared/components/UIElements/Card";
import Button from "../shared/components/FormElements/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./Autorenewal.css";

const AutoRenewal = () => {
  
  const { sendRequest,  isLoading } = useHttpClient(); 
  const auth = useContext(AuthContext);
  
  const [products, setProducts] = useState([]); 
  const [currentSubscription, setCurrentSubscription] = useState(null);  
  const [subscriptionId, setSubscriptionId] = useState(null);  
  const [noSubscription, setNoSubscription] = useState(false);
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [currentProduct, setCurrentProduct]=useState({});

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
          'GET',
          null,
          { 'Content-Type': 'application/json' },
          auth.token
        );
        const subscriptionData = await response;
        console.log(subscriptionData);
        if (subscriptionData.length > 0) {
          setSubscriptionId(subscriptionData[0].id);
          setCurrentSubscription(subscriptionData[0]);
          if (products.length > 0) { // <--- Add this check
            const matchingProduct = products.find((product) => product.default_price === subscriptionData[0].plan.id);
            console.log(matchingProduct);
            setCurrentProduct(matchingProduct);
          }

        }else{
          setNoSubscription(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubscriptionId();
  }, [products]);
 
  const handleCancel = async () => {
    console.log(currentSubscription);
    try {
      const formData = new URLSearchParams();
    formData.append('subscription_id', subscriptionId );
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/cancelusersubscription`,
        "POST",
        formData.toString(),
            { 'Content-Type': 'application/x-www-form-urlencoded' },
        auth.token
      );    
    //  console.log(response);
      setCancelSubscription(true);
     
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className="autorenewal-page">
    <Card className="autorenewal">
  
      <div className="plan">  
      {currentProduct && (<h1>Plan: {currentProduct.name} </h1>)}
      {currentProduct &&(<p>{currentProduct.description}</p>)}
        <section>
      
        <ul>
          <li>feature 1</li>
          <li>feature 2</li>
        </ul>
        </section>
        <div className="check">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <p>Automatic renewal</p></div>
        
        
        <Button inverse onClick={() => handleCancel() }>
          Cancel subscription
        </Button>
        {cancelSubscription&&<h4>Your subscription has been canceled</h4>}
      
      </div>
    </Card>
    </div>
  );
};

export default AutoRenewal;
