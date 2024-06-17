import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

//reducer function - returns a new state based on the action and current state
const inputReducer = (state, action) => {
  switch (action.type) { //switch based on action
    case 'CHANGE': //case for on change
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': { //case for touch
      //returns new state if is touched is true
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state; //returns current state
  }
};

const Input = props => {
  //uses use reducer hook to manage the input state
  const [inputState, dispatch] = useReducer(inputReducer, {
    //initial value
    value: props.initialValue || '',
    isTouched: false,
    //initial validity
    isValid: props.initialValid || false
  });

  //gets id, onInput and validators from props
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  //uses the useEffect hook to call the onInput function
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  //change handler function
  const changeHandler = event => {
    //dispatches a Change action with the new value and validators
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  //touch handler function
  const touchHandler = () => {
    //dispatches a Touch action
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

    //returns the input element with the label and error message
  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
