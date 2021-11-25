import React, {Component} from 'react';
import SchoolRepository from "./SchoolRepository";
import TeacherRepository from "./TeacherRepository";
import StudentRepository from "./StudentRepository";

class Repositary extends Component {
    render() {

        return (
           <div>
                {
                    (sessionStorage.getItem('schoolId') != null)
                        ? <div>
                        <SchoolRepository/>
                        </div>
                    :
                    null
                }
               {
                   (sessionStorage.getItem('teacherId') != null)
                       ? <div>
                           <TeacherRepository/>
                       </div>
                       :
                       null
               }
               {
                   (sessionStorage.getItem('studentId') != null)
                       ? <div>
                           <StudentRepository/>
                       </div>
                       :
                       null
               }
           </div>

        );
    }
}

export default Repositary;