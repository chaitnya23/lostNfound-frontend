const url = "http://localhost:8080";

const User = {

    login:`${url}/api/user/login`,
    signup:`${url}/api/user/signup`,
    sessionAuth:`${url}/api/user/session/auth`
}

const LostItem = {

    register:`${url}/api/lost-obj/create`,
    getAll:`${url}/api/lost-obj/get/all`,
    claim:`${url}/api/lost-obj/mark/claimed`,
    search:`${url}/api/lost-obj/search`
}

const FoundItem = {

    register:`${url}/api/found-obj/create`,
    getAll:`${url}/api/found-obj/get/all`,
    claim:`${url}/api/found-obj/mark/claimed`,
    search:`${url}/api/found-obj/search`
}

const FeedBackReq = {
    add:`${url}/api/feedback/add`
}
export {User, url, LostItem, FoundItem, FeedBackReq};