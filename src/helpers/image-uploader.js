import axios from "axios";

const uploadImage = async(fileData) =>{
    
    if(!fileData) return "";
    try {
     
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/drq4mkrvp/image/upload",
                fileData
            );
 
            if(res.data) return res.data.url;
           
    } catch (error) {

        console.log("error :", error.message);

    }
}

export default uploadImage;
