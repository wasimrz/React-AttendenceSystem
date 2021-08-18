import { BasicForm } from "./components/BasicForm";
import TeacherForm from "./components/Teacher";
import AttendenceForm from "./components/Attendence";

function App() {
  const studentDataHandler = (studentData) => {
    let url = "http://localhost:8080/student";
    let method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ studentData }),
    }).then((res) => {
      console.log(res);
    });
  };
  const teacherDataHandler = (teacherData) => {
    let url = "http://localhost:8080/teacher";
    let method = "POST";
    console.log(teacherData);
    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ teacherData }),
    }).then((res) => {
      console.log(res);
    });
  };
  const attendendeDataHandler = (attArr, today,classData) => {
    
    let url = "http://localhost:8080/submit";
    let method = "POST";
   
    fetch(url, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ attendence:attArr,date:today ,selectClass:classData}),
    }).then((res) => {
      console.log(res);
    });
  
}
  return (
    <div className="app">
      <BasicForm getData={studentDataHandler} />
      <TeacherForm getTeacherData={teacherDataHandler} />
      <AttendenceForm getAttendenceData={attendendeDataHandler }/>
    </div>
  );
}

export default App;
