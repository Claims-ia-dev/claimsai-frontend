import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import CategoryClaimItem from './CategoryClaimItem';

const CategoryClaimList = props => { //Component that receives props expected from EstimateCategoryClaims 
  if (props.items.length === 0) { //checks if the array is empty
    return (
      <div className="category-list center">
        <Card>
          <h2>No questions found.</h2>
        </Card>
      </div>
    );
  }

  //returns list of CategoryClaimItems components with the attributes of each question
  return (
    <ul className="category-list">
      {/* maps items array and renders a  CategoryClaiItem for each item */}
      {props.items.map(category => (
        <CategoryClaimItem
        // unique key
          key={category.id}
          //Claim ID
          id={category.id}
          question={category.question}
          description={category.description}
          selected={category.selected}
          estimateId={category.estimate} //estimate
        />
      ))}
    </ul>
  );
};

export default CategoryClaimList;
