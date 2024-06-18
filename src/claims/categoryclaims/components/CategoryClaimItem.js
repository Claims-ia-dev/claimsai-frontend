import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import "../../components/ClaimItem.css"; //to make one css for category claims

//CategorylaimItem component that receives props usually from CategoryClaimList to show each of the questions for the estimate
const CategoryClaimItem = (props) => {
  //Gets the authentication context (Sees if it's login or not)
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* Lists the item element, the questions in this case */}
      <li className="claim-item">
        <Card className="claim-item__content">
          <div className="claim-item__info">
            <h2>{props.question}</h2>
            <h3>{props.description}</h3>
            <p>{props.selected}</p>
            <label class="switch">
              <input type="checkbox" />              
              <span class="slider round"></span>
            </label>
          </div>

          {/* section for user actions */}
          <div className="claim-item__actions">
            {/**add button to change states true or false */}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default CategoryClaimItem;
