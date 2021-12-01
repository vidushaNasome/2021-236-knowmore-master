import React, {Component} from 'react';
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import "./notify.css"
import {
    FaComment,
    FaFacebookMessenger, FaShare,
    FaSkype,
} from "react-icons/fa";
import {my_knowledge_own} from "../configs/config3";
import {Sharemyknowledgebase} from "../knowledgebase/search/sharemyknowledgebase";

class Notifications extends Component {
    

     render() {
        
         return (
             <div>
              <div className="notice">
             <div align='center'>
                Notifications
             </div>
              </div>
             </div>
         );
     }
}
export default Notifications;