import React, { useRef } from "react";

import useInput from "../hooks/use-input";
const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isEmail = (value) => {
  var reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(value) === false) {
    return false;
  } else {
    return true;
  }
};

const validatePhoneNumber = (input_str) => {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
};

const BasicForm = (props) => {
  const selectionInputRef = useRef();

  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    valueCHangeHandler: FirstNameChangeHandler,
    inputBlurHandler: FirstNameBlurHandler,
    isValid: enteredFirstNameIsValid,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: phoneNumber,
    hasError: phoneInputHasError,
    valueCHangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    isValid: enteredphoneIsValid,
    reset: resetphoneInput,
  } = useInput(validatePhoneNumber);

  const {
    value: enteredLastName,
    hasError: LastNameInputHasError,
    valueCHangeHandler: LastNameChangeHandler,
    inputBlurHandler: LastNameBlurHandler,
    isValid: enteredLastNameIsValid,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueCHangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput(isEmail);

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredphoneIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const FormSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !enteredFirstNameIsValid &&
      !enteredLastNameIsValid &&
      !enteredEmailIsValid &&
      !enteredphoneIsValid
    ) {
      return;
    }
    const selectBoxValue = selectionInputRef.current.value;
    const studentData = {
      class: selectBoxValue,
      firstName: enteredFirstName,
      phone: phoneNumber,
      lastName: enteredLastName,
      email: enteredEmail,
    };
    props.getData(studentData);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetphoneInput();
  };

  const style = (errorState) => {
    if (errorState) {
      return "form-control invalid";
    } else {
      return "form-control";
    }
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <h3>Student Registration</h3>
      <div className="control-group">
        <div className={style(firstNameInputHasError)}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={FirstNameChangeHandler}
            onBlur={FirstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="valueInvalid"> First Name is Not Valid</p>
          )}
        </div>
      </div>
      <div className={style(LastNameInputHasError)}>
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          id="LastName"
          onChange={LastNameChangeHandler}
          onBlur={LastNameBlurHandler}
          value={enteredLastName}
        />
        {LastNameInputHasError && (
          <p className="valueInvalid"> Last Name is Not Valid</p>
        )}
      </div>

      <div className={style(emailInputHasError)}>
        <label htmlFor="name">E-Mail</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="valueInvalid"> Invalid Email</p>}
      </div>

      <div className={style(phoneInputHasError)}>
        <label htmlFor="name">Phone Number</label>
        <input
          type="text"
          id="phone"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          value={phoneNumber}
        />
        {phoneInputHasError && (
          <p className="valueInvalid"> Invalid Phone Number</p>
        )}
      </div>
      <div className={"form-control"}>
        <label htmlFor="class">Class</label>
        <select ref={selectionInputRef}>
          <option value="1">Std:1</option>
          <option value="2">Std:2</option>
          <option value="3">Std:3</option>
          <option value="4">Std:4</option>
          <option value="5">Std:5</option>
        </select>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Enroll</button>
      </div>
    </form>
  );
};

export { BasicForm, isNotEmpty, validatePhoneNumber };
