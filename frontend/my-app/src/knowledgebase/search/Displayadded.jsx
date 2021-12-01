import React, {Component} from 'react';
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import "../../navigation/notify.css"
import {
    FaComment,
    FaFacebookMessenger, FaShare,
    FaSkype,
} from "react-icons/fa";
import {my_knowledge_own} from "../../configs/config3";
import {Sharemyknowledgebase} from "../../knowledgebase/search/sharemyknowledgebase";

class Displayadded extends Component {
    constructor(props) {
         super(props);
         this.state = {
             dataList: [],
         }
     }

     componentDidMount() {
         axios.get(my_knowledge_own+'?student_id='+sessionStorage.getItem('studentId'))
             .then(response => {
                 console.log('success')
                 console.log(response)
                 const myObject86 = JSON.parse(response.data.contents);

                 this.setState({dataList: myObject86});

             })
             .catch(function (error) {
                 console.log(error);
             })
     }


     render() {
         const {dataList}=this.state;
         return (
             <div>
              <div className="notice">
             <div align='center'>
                 <h2 style={{color: "white"}} className="text-center"><img src="https://img.icons8.com/color-glass/40/000000/repository.png"/>  My Knowledgebase   </h2>
                 <br/>
                 {dataList.map((dList) => (
                     <Card style={{ width: '50rem'}}>
                         <Card.Body>
                             <p>{dList.fields.details}</p>
                             <hr/>
                             <Button variant=""><FaFacebookMessenger fontSize="1.5em"/></Button>
                             <Button variant=""><FaShare fontSize="1.5em"/></Button>
                             <Button variant=""><FaSkype fontSize="1.5em"/></Button>
                             <Button variant=""><FaComment fontSize="1.5em"/></Button>
                         </Card.Body>
                     </Card>
                 ))}
             </div>
              </div>
             </div>
         );
     }
}
export default Displayadded;