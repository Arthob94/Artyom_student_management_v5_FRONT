import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStudents, selectUpdate, getStudentsAsync, addStudentAsync, getStudentsGradeAsync, addGradeAsync, getSpecificStudentGradeAsync,selectSpecificStudents } from './studentSlice';


const Student = () => {
  const students = useAppSelector(selectStudents);
  const specificStudents = useAppSelector(selectSpecificStudents);
  const studentUpdate = useAppSelector(selectUpdate);
  const dispatch = useAppDispatch();
  const [sname, setsname] = useState("")
  const [semail, setsemail] = useState("")
  const [gmathematics, setgmathematics] = useState(-1)
  const [gcomputers, setgcomputers] = useState(-1)
  const [genglish, setgenglish] = useState(-1)
  const [showGrades, setShowGrades] = useState(false)
  const [showAllGradesButton, setshowAllGradesButton] = useState(false);
  const [hideAllGradesButton, sethideAllGradesButton] = useState(true);
  const [showSpecificGrades, setShowSpecificGrades] = useState(false)
  const [showSpecificGradesButton, setshowSpecificGradesButton] = useState(false);
  const [hideSpecificGradesButton, sethideSpecificGradesButton] = useState(true);
  const [specificEmail, setspecificEmail] = useState("")


  useEffect(() => {
    console.table(students)
  }, [students])


  useEffect(() => {
    dispatch(getStudentsAsync())
  }, [studentUpdate])

  return (
    <div>
      <h1>add new student</h1>
  
      name:<input  onChange={(e) => setsname(e.target.value)} />
      email:<input type={'email'} onChange={(e) => setsemail(e.target.value)} />
      <button onClick={() => dispatch(addStudentAsync({ sname, semail, gmathematics: -1, gcomputers: -1, genglish: -1 }))}>add new student</button> <hr />
      
    
      <button disabled={showAllGradesButton} onClick={() => {
        setshowAllGradesButton(true);
        sethideAllGradesButton(false);
        dispatch(getStudentsGradeAsync());
        setShowGrades(true);
      }}>get all students grades</button>
      

      <button disabled={hideAllGradesButton} onClick={() => {
        setShowGrades(false);
        setshowAllGradesButton(false)
        sethideAllGradesButton(true);
      }}>hide all students grades</button>


      {showGrades && students.map((stud, i) =>
        <div key={i}>
          Student name: {stud.sname}<br />
          Student email:{stud.semail}<br />
          methematics grade:{stud.gmathematics}<br />
          computers grade:{stud.gcomputers}<br />
          english grade:{stud.genglish}
          <hr />

        </div>

      )}<hr></hr><br/>
      enter email to get the student by:<input onChange={(e) => setspecificEmail(e.target.value)}/>
      
<button disabled={showSpecificGradesButton} onClick={() => {
        setShowSpecificGrades(true);
        sethideSpecificGradesButton(false);
        dispatch(getSpecificStudentGradeAsync(specificEmail));
        setShowSpecificGrades(true);
      }}>get specific students grades by email</button>
      

      <button disabled={hideSpecificGradesButton} onClick={() => {
        setShowSpecificGrades(false);
        setshowSpecificGradesButton(false)
        sethideSpecificGradesButton(true);
      }}>hide the students</button>


      {showSpecificGrades && specificStudents.map((stud, i) =>
      
        <div key={i}>
          Student name: {stud.sname}<br />
          Student email:{stud.semail}<br />
          methematics grade:{stud.gmathematics}<br />
          computers grade:{stud.gcomputers}<br />
          english grade:{stud.genglish}
          <hr />

        </div>

      )}<hr></hr><br/>

      
      Amount of students in the system: {students.length}<hr />
      <h1>the students are:</h1><hr />
      {students.map((stud, i) =>
        <div key={i}>
          Student name: {stud.sname}<br />
          Student email:{stud.semail}<br />
           methematics grade(current:{stud.gmathematics})<input onChange={(e) => setgmathematics(+e.target.value)} /><br />
          computers grade(current:{stud.gcomputers})<input onChange={(e) => setgcomputers(+e.target.value)}></input><br />
          english grade(current:{stud.genglish})<input onChange={(e) => setgenglish(+e.target.value)} /><br />
          <button onClick={() => dispatch(addGradeAsync({ sname: stud.sname, semail: stud.semail, gmathematics, gcomputers, genglish }))}>add grades</button>

      

          <hr />
        </div>)}


    </div>
  )
}

export default Student