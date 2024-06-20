import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';

import UserClaims from './UserClaims';

const ProjectReceipt = () => { 
  
  

  return (
    <Card className="">
      <h2>The estimated amount for this project is:</h2>
      <h1>
        $4672.37
      </h1>   

        <Button type="submit" >
          Download PDF
        </Button>

        <table>
          <thead>
            <th>Name Room</th>
            <th>Room Type</th>
            <th>Category</th>
            <th>Cost</th>
            <th></th>
            <th></th>
          </thead>

     
        </table>
        <Button type="submit" >
          New estimate
        </Button>
        <Button type="submit" >
          Log out
        </Button>
      
    </Card>
  );
};

export default ProjectReceipt;
