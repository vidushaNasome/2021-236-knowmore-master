const apiBaseUrl = "http://127.0.0.1:8000/";

//Reactions status
const f_s_heart_count = `${apiBaseUrl}students/f_s_heart_count`;
const f_s_cry_count = `${apiBaseUrl}students/f_s_cry_count`;
const f_s_like_count = `${apiBaseUrl}students/f_s_like_count`;
const f_s_angry_count = `${apiBaseUrl}students/f_s_angry_count`;

//Model retieve data
const model_reaction = `${apiBaseUrl}students/user_reaction`;
const model_comments = `${apiBaseUrl}students/user_comments`;
const model_additionallinks = `${apiBaseUrl}students/user_additionallinks`;
//const model_sharing = `${apiBaseUrl}students/user_knowledgebase`;
const model_videoview = `${apiBaseUrl}students/user_videoview`;
const model_sharing_kb = `${apiBaseUrl}knowledgebase_add/know_score`;

//video full view
const video_fullview = `${apiBaseUrl}students/Fullvideo/`;



//badge
const badgenewsfeed = `${apiBaseUrl}students/badgenewfeed/`;

//All clusters
const allcluters = `${apiBaseUrl}repository/clustercreated/`;

//videos teacher
const teachervideo = `${apiBaseUrl}cluster/teachervideo/`;

//delete frames
const deleteframes=`${apiBaseUrl}cluster/deleteframes`;

export {
    f_s_heart_count,
    f_s_cry_count,
    f_s_like_count,
    f_s_angry_count,
    model_reaction,
    model_comments,
    model_additionallinks,
    //model_sharing,
    model_videoview,
    allcluters,
    badgenewsfeed,
    teachervideo,
    deleteframes,
    model_sharing_kb,
    video_fullview
}