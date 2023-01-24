import axios from "axios";
import Student from '../../app/models/Student';
import{MY_SERVER} from '../../env'

export function getStudents() {
  return new Promise<{ data:Student[] }>((resolve) =>
  
    axios.get(MY_SERVER).then(res => resolve({data: res.data})))
}

export function getStudentsGrade() {
  return new Promise<{ data:Student[] }>((resolve) =>
  
    axios.get(MY_SERVER).then(res => resolve({data: res.data})))
}

export function getSpecificStudentGrade(semail: string) {
  return new Promise<{ data:Student[] }>((resolve) =>
  
    axios.get( MY_SERVER + "/" + semail).then(res => resolve({data: res.data})))
}
export function addStudent(stud:Student) {
  return new Promise<{ data: Student }>((resolve) =>
  
    axios.post(MY_SERVER, stud).then(res => resolve({data: res.data})))
}

export async function addGrade(stud: Student) {
  console.log("Api",stud )
  return await axios.put(MY_SERVER + "/" + stud.semail,stud).then(res => res.data)
}

export async function archiveStudent(semail:string) {
  const response = await axios.delete(MY_SERVER + "/" + semail);
  return response.data;
}