import React from 'react'
import Button from '../shared/components/FormElements/Button'

function Success({sessionId}) {
  return (
    <div>
        <h1>Success</h1>
      <div className="product Box-root">
        
        <div className="description Box-root">
          <h3>Subscription to  plan successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />

        <Button to="/manageSubscription" id="checkout-and-portal-button" type="submit">
          Manage your subscription
        </Button>
      </form>
    </div>
  )
}

export default Success