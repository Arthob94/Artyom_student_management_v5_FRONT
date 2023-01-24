import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStudents, selectUpdate, getStudentsAsync, addStudentAsync, getStudentsGradeAsync, addGradeAsync, getSpecificStudentGradeAsync, selectSpecificStudents, archiveStudentAsync } from './studentSlice';


const Student = () => {
  const students = useAppSelector(selectStudents);
  const specificStudents = useAppSelector(selectSpecificStudents);
  const studentUpdate = useAppSelector(selectUpdate);
  const dispatch = useAppDispatch();
  const [sname, setsname] = useState("")
  const [semail, setsemail] = useState("")
  const [gmathematics, setgmathematics] = useState(0)
  const [gcomputers, setgcomputers] = useState(0)
  const [genglish, setgenglish] = useState(0)
  const [showGrades, setShowGrades] = useState(false)
  const [showAllGradesButton, setshowAllGradesButton] = useState(false);
  const [hideAllGradesButton, sethideAllGradesButton] = useState(true);
  // const [showSpecificGrades, setShowSpecificGrades] = useState(false)
  // const [showSpecificGradesButton, setshowSpecificGradesButton] = useState(false);
  // const [hideSpecificGradesButton, sethideSpecificGradesButton] = useState(true);
  // const [specificEmail, setspecificEmail] = useState("")
  const [filterValue, setFilterValue] = useState("");
  // const [showArchived, setShowArchived] = useState(false);



  useEffect(() => {
    console.table(students)
  }, [students])


  useEffect(() => {
    dispatch(getStudentsAsync())
  }, [studentUpdate])

  return (
    <div>
      <h1>Students Management</h1>



      {students.length} Students in the system<br /><hr />

      Name: <input onChange={(e) => setsname(e.target.value)} /><br />
      Email: <input type={'email'} onChange={(e) => setsemail(e.target.value)} />
      <br /><button onClick={() => dispatch(addStudentAsync({ sname, semail, gmathematics: 0, gcomputers: 0, genglish: 0 }))}>Add new student</button>

      <br /><br /><hr />


      <button disabled={showAllGradesButton} onClick={() => {
        setshowAllGradesButton(true);
        sethideAllGradesButton(false);
        dispatch(getStudentsGradeAsync());
        setShowGrades(true);
      }}>Show all students</button>

      <button disabled={hideAllGradesButton} onClick={() => {
        setShowGrades(false);
        setshowAllGradesButton(false)
        sethideAllGradesButton(true);
      }}>Hide all students</button>


      <br />


      Search: <input onChange={(e) => setFilterValue(e.target.value)} /> <br /><br /><br />
      {
        showGrades && students
          .filter((student) =>
            student.sname.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.semail.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((stud, i) => (
            <div key={i}>
              Student name: {stud.sname}<br />
              Student email: {stud.semail}<br />
              Mathematics grade: (current:{stud.gmathematics})<input onChange={(e) => setgmathematics(+e.target.value)} /><br />
              Computers grade: (current:{stud.gcomputers})<input onChange={(e) => setgcomputers(+e.target.value)}></input><br />
              English grade: (current:{stud.genglish})<input onChange={(e) => setgenglish(+e.target.value)} /><br />
              <button onClick={() => dispatch(addGradeAsync({ sname: stud.sname, semail: stud.semail, gmathematics, gcomputers, genglish }))}>Update grades</button>
              <button onClick={() => dispatch(archiveStudentAsync(stud.semail))}>Delete</button>

              <p></p>

            </div>
          ))
      }

    </div>
  )
}

export default Student