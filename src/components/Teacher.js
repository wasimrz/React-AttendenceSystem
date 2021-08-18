import React from "react";
import useInput from "../hooks/use-input";
import classes from "./teacher.module.css";
import { isNotEmpty, validatePhoneNumber } from "./BasicForm";

const TeacherForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    valueCHangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    isValid: enteredFirstNameIsValid,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    hasError: LastNameInputHasError,
    valueCHangeHandler: LastNameChangeHandler,
    inputBlurHandler: LastNameBlurHandler,
    isValid: enteredLastNameIsValid,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredPhone,
    hasError: phoneInputHasError,
    valueCHangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    isValid: enteredPhoneIsValid,
    reset: resetPhoneInput,
  } = useInput(validatePhoneNumber);

  let classArr = [];
  const check_1ChangeHandler = (event) => {
    const classValue = event.target.value;
    classArr.push(classValue);
  };

  const check_2ChangeHandler = (event) => {
    const classValue = event.target.value;
    classArr.push(classValue);
  };
  const check_3ChangeHandler = (event) => {
    const classValue = event.target.value;
    classArr.push(classValue);
  };
  const check_4ChangeHandler = (event) => {
    const classValue = event.target.value;
    classArr.push(classValue);
  };

  const check_5ChangeHandler = (event) => {
    const classValue = event.target.value;
    classArr.push(classValue);
  };
  const FormSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !enteredFirstNameIsValid &&
      !enteredLastNameIsValid &&
      !enteredPhoneIsValid
    ) {
      return;
    }
    const teacherClassData = {
      classValue: classArr,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      phone: enteredPhone,
    };
    props.getTeacherData(teacherClassData);
    resetFirstNameInput();
    resetLastNameInput();
    resetPhoneInput();
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <div className={classes.formControl}>
        <h3>Teacher Reg</h3>
        <div className={classes.m}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="valueInvalid"> Invalid First Name</p>
          )}
        </div>

        <div className={classes.m}>
          <label htmlFor="Lastname">Last Name</label>
          <input
            type="text"
            id="firstname"
            onChange={LastNameChangeHandler}
            onBlur={LastNameBlurHandler}
            value={enteredLastName}
          />
        </div>
        {LastNameInputHasError && (
          <p className="valueInvalid">Invalid Last Name</p>
        )}

        <div className={classes.m}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            value={enteredPhone}
          />
          {phoneInputHasError && (
            <p className="valueInvalid"> Invalid Phone Number</p>
          )}
        </div>
      </div>

      <div>
        <h4>Select Class</h4>
        <label htmlFor="classs_1">std:1</label>
        <input
          type="checkbox"
          onChange={check_1ChangeHandler}
          id="check_1"
          value="1"
        />

        <label htmlFor="classs_2">std:2</label>
        <input
          type="checkbox"
          id="check_2"
          value="2"
          onChange={check_2ChangeHandler}
        />
        <label htmlFor="classs_3">std:3</label>
        <input
          type="checkbox"
          id="check_3"
          value="3"
          onChange={check_3ChangeHandler}
        />

        <label htmlFor="classs_4">std:4</label>
        <input
          type="checkbox"
          id="check_4"
          value="4"
          onChange={check_4ChangeHandler}
        />

        <label htmlFor="classs_5">std:5</label>
        <input
          type="checkbox"
          id="check_5"
          value="5"
          onChange={check_5ChangeHandler}
        />
      </div>
      <div className="form-actions">
        <button className={classes.button}>Submit</button>
      </div>
    </form>
  );
};

export default TeacherForm;
