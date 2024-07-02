import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../shared/components/UIElements/Card";
import CardList from './components/CardList'
import CardForm from "./components/CardForm";
import Button from "../shared/components/FormElements/Button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthContext } from "../shared/context/auth-context";
import "./Autorenewal.css";

const AutoRenewal = () => {
  const stripePromise = loadStripe("pk_test_51OkHwgBLOHppKdDMjufNvCfjFXrO3Aj8Bqdwl0iGqoAEk3A98FKYIzF4iJtkAG8XPlAg3BOJF12wx5kg167CU3PE00qmLZYk62");


  
  const auth = useContext(AuthContext);

  return (
    <Card className="autorenewal">
      <div className="cards">
        <section>
        <p>
          Your subscription will automatically renew on {auth.userinfo.subscription_end} for $
          {}9 dollars, and will be debited from this payment method:
        </p>    
         
      


        <Elements stripe={stripePromise}>
          <CardList/>   
           <CardForm/>
        </Elements>

       
       
        
        </section>
        <Button>
          Save changes
        </Button>
      </div>
      <hr />
      <div className="plan">
        <section>
        <h1>Plan: </h1>
        <p>Start with our first and most groundbreaking product</p>
        <ul>
          <li>Create instant estimates with AI</li>
          <li>Early access to new features</li>
        </ul>

        <div className="check">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <p>Automatic renewal</p></div>
        <p className="">
          You have <a href='/workteam'>3 members</a> in your team
        </p>
        </section>
        <Link to='/workteam'>
        <Button inverse>
          Manage team
        </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AutoRenewal;
