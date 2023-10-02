import axios from 'axios';
import { User, url } from '../api/requests';
import { toast } from 'react-toastify';

const loginUser  = async(user,setuser)=>{
    try {
        
        const res = await axios.post(User.signin, {...user});
         console.log(" result",res);
 
        if(res){
            setuser({...user, _id:res.data.data._id});
            toast.success("logged in successfully!!!");
            localStorage.setItem("_id", res.data.data._id);

        }

    } catch (error) {
        
        console.log(error);
    }
}

const signupUser  = async(user,setuser)=>{
    try {
        
        const res = await axios.post(User.signup, {...user});

        if(res.status==401){
            toast.error("user already exist!! ");
        }
        if(res){
            setuser({...user, _id:res.data.data._id});
            toast.success("signed in successfully!!!");

            localStorage.setItem("_id", res.data.data._id);
        }

    } catch (error) {
        
        console.log(error);
    }
}

export {loginUser, signupUser};