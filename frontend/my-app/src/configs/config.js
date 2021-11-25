const apiBaseUrl = "http://127.0.0.1:8000/";

// APIs

//Categories Management.
const categoriesAPI = `${apiBaseUrl}cluster/cluster/1/`;
const videosAPI = `${apiBaseUrl}cluster/Video/`;

//Knowledgebase
const knowledgebaseAPI = `${apiBaseUrl}knowledgebase_add/knowledgebase/`;
const knowledgebasePostParaAPI = `${apiBaseUrl}knowledgebase_add/knowledge/`;
const topicmapscore = `${apiBaseUrl}knowledgebase_add/knowledgetopicmapkeywords/`;

//Students
const DisplayStudentsAPI = `${apiBaseUrl}students/StudentsAsUser/`;
const myclassmatesAPI = `${apiBaseUrl}students/Myclassmates/`;
const commentsAPI = `${apiBaseUrl}students/ModelOutput/`;
const addsessioncommentsAPI = `${apiBaseUrl}students/AddComments/`;
const additionallinkAPI = `${apiBaseUrl}students/AdditionalLink/`;

const userreactionAPI = `${apiBaseUrl}students/Reaction/`;


//teachers
const DisplayTeachersAPI = `${apiBaseUrl}teachers/teachers/`;

//School
const DisplaySchoolAPI = `${apiBaseUrl}school/School/`;


//Repositary
const repositaryclustercreationAPI = `${apiBaseUrl}repository/clustercreated/`;
const repositarytopiccreationAPI = `${apiBaseUrl}repository/createdtopic/`;
const repositarysessioncreationAPI = `${apiBaseUrl}repository/createdsession/`;

//active
const activestatusAPI = `${apiBaseUrl}repository/createdsession/`;

///students/mostactive
const mostactiveAPI = `${apiBaseUrl}students/mostactive`;
const mostactive_modeloutput_API = `${apiBaseUrl}students/ModelOutput/`;


//key frames extract
const genaratekeyframesAPI = `${apiBaseUrl}cluster/videoextract`;
const displayAPI = `${apiBaseUrl}media/`;

//TEXT EXTRACT
const genaratekeyframes_text_API = `${apiBaseUrl}cluster/callvideoe_text_extraction`;

//Search
const searchAPI= `${apiBaseUrl}search/searchdb/`;
const searchContent= `${apiBaseUrl}search/searchresults`;
const rankAPI= `${apiBaseUrl}search/rank`;
const search_all= `${apiBaseUrl}search/ksearch`;

//bookmarkshowing search/bookmarks
const display_bookmarks= `${apiBaseUrl}search/bookmarks`;

//search/ksearchBookmarking
const search_bookmarking= `${apiBaseUrl}search/ksearchBookmarking`;
const all_bookmarks= `${apiBaseUrl}search/bookmarked`;

const dispalydatafile=`${apiBaseUrl}media/videos/`;

export{
    categoriesAPI,
    knowledgebaseAPI,
    knowledgebasePostParaAPI,
    DisplayStudentsAPI,
    myclassmatesAPI,
    repositaryclustercreationAPI,
    repositarytopiccreationAPI,
    repositarysessioncreationAPI,
    commentsAPI,
    activestatusAPI,
    videosAPI,
    genaratekeyframesAPI,
    displayAPI,
    addsessioncommentsAPI,
    searchAPI,
    searchContent,
    additionallinkAPI,
    mostactiveAPI,
    DisplayTeachersAPI,
    DisplaySchoolAPI,
    mostactive_modeloutput_API,
    topicmapscore,
    genaratekeyframes_text_API,
    dispalydatafile,
    userreactionAPI,
    rankAPI,
    search_all,
    search_bookmarking,
    all_bookmarks,
    display_bookmarks
}
