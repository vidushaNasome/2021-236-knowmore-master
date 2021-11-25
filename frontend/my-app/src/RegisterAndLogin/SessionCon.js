import React from 'react';

class SessionCon extends React.Component {
    constructor(props){
        super(props);
        console.log("check session");
        window.addEventListener('storage', (event) => {

            const credentials1 = JSON.parse(JSON.stringify(window.sessionStorage.getItem('studentId')));
            const credentials2 = JSON.parse(JSON.stringify(window.sessionStorage.getItem('image')));
            const credentials3 = JSON.parse(JSON.stringify(window.sessionStorage.getItem('Username')));

            const credentials4 = JSON.parse(JSON.stringify(window.sessionStorage.getItem('teacherId')));
            const credentials5 = JSON.parse(JSON.stringify(window.sessionStorage.getItem('schoolId')));

            //for logged in tab
            //student
            if(event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials1 !== null ) {
                window.localStorage.setItem('CREDENTIALS_SHARING1', JSON.stringify({  credentials1 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING1');

                window.localStorage.setItem('CREDENTIALS_SHARING2', JSON.stringify({ credentials2 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING2');

                window.localStorage.setItem('CREDENTIALS_SHARING3', JSON.stringify({ credentials3 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING3');


            }
            //teacher
            if(event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials4 !== null ) {

                window.localStorage.setItem('CREDENTIALS_SHARING2', JSON.stringify({ credentials2 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING2');

                window.localStorage.setItem('CREDENTIALS_SHARING3', JSON.stringify({ credentials3 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING3');

                window.localStorage.setItem('CREDENTIALS_SHARING4', JSON.stringify({ credentials4 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING4');

            }
            //school
            if(event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials5 !== null ) {

                window.localStorage.setItem('CREDENTIALS_SHARING2', JSON.stringify({ credentials2 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING2');

                window.localStorage.setItem('CREDENTIALS_SHARING3', JSON.stringify({ credentials3 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING3');

                window.localStorage.setItem('CREDENTIALS_SHARING5', JSON.stringify({ credentials5 }));
                window.localStorage.removeItem('CREDENTIALS_SHARING5');

            }


            //for newly opened tab
            if(event.key === 'CREDENTIALS_SHARING1' && credentials1 === null){
                console.log("if 3"+credentials1);

                var obj = JSON.parse(event.newValue);
                window.sessionStorage.setItem('studentId', obj.credentials1);

            }
            if(event.key === 'CREDENTIALS_SHARING2' && credentials2 === null){
                //console.log("if 4"+credentials2);
                var obj1 = JSON.parse(event.newValue);
                window.sessionStorage.setItem('image', obj1.credentials2);
                window.location.reload(false);
            }
            if(event.key === 'CREDENTIALS_SHARING3' && credentials3 === null){
                //console.log("if 4"+credentials2);
                var obj1 = JSON.parse(event.newValue);
                window.sessionStorage.setItem('Username', obj1.credentials3);
                window.location.reload(false);
            }
            if(event.key === 'CREDENTIALS_SHARING4' && credentials4 === null){
                //console.log("if 4"+credentials2);
                var obj1 = JSON.parse(event.newValue);
                window.sessionStorage.setItem('teacherId', obj1.credentials4);
                window.location.reload(false);
            }
            if(event.key === 'CREDENTIALS_SHARING5' && credentials5 === null){
                //console.log("if 4"+credentials2);
                var obj1 = JSON.parse(event.newValue);
                window.sessionStorage.setItem('schoolId', obj1.credentials5);
                window.location.reload(false);
            }


            //Removing Sessions
            //student
            if(event.key === 'CREDENTIALS_FLUSH' && credentials1 !==null){
                console.log("logout session");
                window.sessionStorage.removeItem('studentId');
                window.sessionStorage.removeItem('image');
                window.sessionStorage.removeItem('Username');
                window.location.reload(false);

            }
            //teacher
            if(event.key === 'CREDENTIALS_FLUSH' && credentials4 !==null){
                console.log("logout session");
                window.sessionStorage.removeItem('image');
                window.sessionStorage.removeItem('Username');
                window.sessionStorage.removeItem('teacherId');
                window.location.reload(false);

            }

            //school
            if(event.key === 'CREDENTIALS_FLUSH' && credentials5 !==null){
                console.log("logout session");
                window.sessionStorage.removeItem('image');
                window.sessionStorage.removeItem('Username');
                window.sessionStorage.removeItem('schoolId');
                window.location.reload(false);

            }

        })
    }

    componentDidMount() {
        window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString())
        window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS')
    }
    render() {
        return <div></div>;
    }
}
export default SessionCon;