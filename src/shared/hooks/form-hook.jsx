import { useCallback, useReducer } from 'react';

/**
 * The formReducer function is a reducer function that manages the state of a form.
 * 
 * It takes two arguments: state and action.
 * 
 * The state object has two properties: inputs and isValid.
 *  - inputs: an object with input IDs as keys and objects with value and isValid properties as values.
 *  - isValid: a boolean indicating whether the entire form is valid.
 * 
 * The action object has three properties: type, value, and isValid.
 *  - type: a string indicating the type of action (either 'INPUT_CHANGE' or 'SET_DATA').
 *  - value: the new value of the input field.
 *  - isValid: a boolean indicating whether the input field is valid.
 *  - inputId: the ID of the input field.
 *  - inputs: an object with input IDs as keys and objects with value and isValid properties as values (only for 'SET_DATA' action).
 *  - formIsValid: a boolean indicating whether the entire form is valid (only for 'SET_DATA' action).
 */
const formReducer = (state, action) => {
  switch (action.type) {
    /**
     * Handle 'INPUT_CHANGE' action.
     * 
     * Update the value and isValid properties of the input field with the given ID.
     * 
     * Also, update the isValid property of the entire form based on the validity of all input fields.
     */
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    /**
     * Handle 'SET_DATA' action.
     * 
     * Update the inputs and isValid properties of the entire form.
     */
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

/**
 * The useForm hook returns an array with three elements: formState, inputHandler, and setFormData.
 * 
 * formState: an object with inputs and isValid properties, managed by the formReducer.
 * 
 * inputHandler: a function that dispatches an 'INPUT_CHANGE' action with the given ID, value, and isValid.
 * 
 * setFormData: a function that dispatches a 'SET_DATA' action with the given inputs and formIsValid.
 */
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  /**
   * The inputHandler function dispatches an 'INPUT_CHANGE' action with the given ID, value, and isValid.
   */
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  /**
   * The setFormData function dispatches a 'SET_DATA' action with the given inputs and formIsValid.
   */
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  

  return [formState, inputHandler, setFormData];
};