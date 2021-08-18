import React, { useState ,useRef} from "react";
import classes from "./teacher.module.css"

const AttendenceForm = (props) => {
  const [students, setStudents] = useState([]);

  const inputValue = useRef();
  let attendenceData = [];
  const checkChangeHandler = (event) => {
    attendenceData.push(event.target.value)
    
  }




  let selectClass;
  const getClassDataHandler = (event) => {
    selectClass = event.target.value;
    let url = "http://localhost:8080/attendence";
    let method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ classNumber: selectClass }),
    })
      .then((res) => {
        return res.json();
      })
      .then((responseData) => {
        
          let loadedData = [];

        for (let i = 0; i < responseData.students.length; i++) {
          let oneStudent = {
            _id: responseData.students[i]._id,
            firstName: responseData.students[i].firstName,
            lastName: responseData.students[i].lastName,
            email: responseData.students[i].email,
            phone: responseData.students[i].phone,
          };
          loadedData.push(oneStudent);
        }
       
        setStudents(loadedData);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
    dd='0'+dd;
    } 

    if(mm<10) 
    {
    mm='0'+mm;
    } 
    today = dd + '-' + mm + '-' + yyyy;
    const selectedClass = inputValue.current.value;
    props.getAttendenceData(attendenceData, today,selectedClass);
    
  }
  const tableContent = students.map((d) => (
    <div key={d._id}>
      <p className={classes.b}>
        {d.firstName} {" "} {d.lastName} {" "}{d.email} {" "} {d.phone}
      </p>
      <label htmlFor="check">Present</label>
      <input
          type="checkbox"
          onChange={checkChangeHandler}
          id={d._id}
          value={d._id}
        />
    </div>
  ));
console.log(students)
  return (
    <div>
      <div>
        <h2>Attendence</h2>
        <h3>Select Class</h3>
      </div>
      <div>
        <select className={classes.select} onChange={getClassDataHandler} ref={inputValue}>
          <option value="1">Std:1</option>
          <option value="2">Std:2</option>
          <option value="3">Std:3</option>
          <option value="4">Std:4</option>
          <option value="5">Std:5</option>
        </select>
      </div>

      <form onSubmit={formSubmitHandler}>
        <div>
        {tableContent}
        </div>
        <button type="submit">Submit</button>
      </form>
     
    </div>
  );
};

export default AttendenceForm;
