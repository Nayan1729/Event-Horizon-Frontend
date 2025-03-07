import { myAxios } from "../utils/user-service";
export const loginApi = async(values)=>{
    try {
        console.log("loginApi:",values);
        const res = await myAxios.post('/login',values);
        const token = res.headers['authorization'];
        console.log(token);
        
        if(res.data.statusCode==200 && token){
            localStorage.setItem("authToken",token)
            localStorage.setItem("email",values.email)
            localStorage.setItem("userId",res.data.data.id)
            localStorage.setItem("userRole" , res.data.data.role)
            console.log(res.data.data.role,"res.role");
            console.log(res.data);
            console.log(token);
            myAxios.defaults.headers.common['authorization'] = token;
        }
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const signUpApi = async(values)=>{
    try {
        
        const res = await myAxios.post('/register',values);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export const verifyEmailApi = async(token)=>{
        try {
            console.log("in verify email api : ", typeof token);
            const res = await myAxios.post(`/verify`,{otp:token});
            if(res.data.statusCode==200 && token){
                localStorage.setItem("authToken",token)
                // Add the userRole and email
                myAxios.defaults.headers.common['authorization'] = token;
            }
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error.response.data
        }
}

export const resendEmail = async()=>{
    try {
        const res = await myAxios.post('/resend-email',{email:JSON.parse(localStorage.getItem("userEmail"))})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllClubs =  async()=>{
    try {
        const res = await myAxios.get('/clubs');
        console.log(res);
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getAllEvents =  async()=>{
    try {
        const res = await myAxios.get('/events');
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const authorizeAndAuthenticateApi = async(userAcceptedRole)=>{
    try {
        const res = await myAxios.get(`/verify/${userAcceptedRole}`);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const isAuthenticatedUser = async()=>{
    try {
        const res = await myAxios.get('/isAuthenticated');
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const registerForEvent = async(eventId,values)=>{
    try {
        const res =  await myAxios.post(`/events/registrations/${parseInt(eventId)}`,values);
        console.log("registerForEvent: ",res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export const getClubDetailsApi = async(clubId)=>{
    try {
        const res = await myAxios.get(`/clubs/${clubId}`);
        return res.data
    } catch (error) {
        return error.response.data;
    }
}

export const getAllPolls= async ()=>{

}

export const getAllRegistrations = async()=>{
    try {
        const res = await myAxios.get(`/clubs/${clubId}`);
        return res.data
    } catch (error) {
        return error.response.data;
    }
}

export const getEventDetailsApi = async(id)=>{
    try {
        const res = await myAxios.get(`/events/${id}`)
        console.log(res.data);
        return res.data ;

    } catch (error) {
        return error.response.data;
    }
}

export const eventRegistrationsApi = async()=>{
    try {
        const res = await myAxios.get(`/clubs/pending-registrations`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptEventRegistrationsApi = async(registrationId)=>{
    try {
        const res = await myAxios.get(`/events/registrations/${registrationId}/approve`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectEventRegistrationsApi = async(registrationId)=>{
    try {
        const res = await myAxios.get(`/events/registrations/${registrationId}/reject`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const createEvent = async(values)=>{
    try {
        const formData = new FormData();
        console.log(values);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("date", values.date);
        formData.append("startTime", values.startTime);
        formData.append("endTime", values.endTime);
        formData.append("location", values.location);
        formData.append("status", values.status);
        formData.append("totalRegistrations", values.totalRegistrations);
        console.log(formData);
        
        // Append image separately (only if it exists)
        if (values.imageUrl){
            formData.append("image", values.imageUrl); // In reality this is a image
        }
        // Append speakers array (if it exists)
        if (Array.isArray(values.speakers)) {
            values.speakers.forEach((speaker, index) => {
                formData.append(`speakers[${index}].name`, speaker.name);
                formData.append(`speakers[${index}].position`, speaker.position);
                formData.append(`speakers[${index}].company`, speaker.company);
            });
        }
        console.log(formData);
        const res = await myAxios.post(`/events` , formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteEventApi = async(eventId)=>{
    try {
        const res = await myAxios.delete(`/events/${eventId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateEventApi = async(values)=>{
    try {
        const formData = new FormData();
        console.log(values);
        
        formData.append("id", values.id); // if required for update
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("date", values.date);
        formData.append("startTime", values.startTime);
        formData.append("endTime", values.endTime);
        formData.append("location", values.location);
        formData.append("status", values.status);
        formData.append("totalRegistrations", values.totalRegistrations);

        // Append image if a new file is provided
        if (values.imageUrl instanceof File) {
            formData.append("image", values.imageUrl);
        }
        
        // Append speakers array if needed:
        if (Array.isArray(values.speakers)) {
            values.speakers.forEach((speaker, index) => {
                formData.append(`speakers[${index}].name`, speaker.name);
                formData.append(`speakers[${index}].position`, speaker.position);
                formData.append(`speakers[${index}].company`, speaker.company);
            });
        }
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
        
        const res = await myAxios.patch(`/events` ,formData,
            {headers : (prev)=>({...prev , "Content-Type": "multipart/form-data" })}
        );  
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const registerClubApi = async(values)=>{
    try {
        /*
            Problem is that we cant directly send the entire form as values as the data contains plain text and binary data(file)
            Spring cant deserialize that data . So we pass it in the formData which sends data in a key value pair like map
            
            Also @RequestBody can only deserialize(json to object) json data  so we cant use that on the backend so we use @ModelAttribute
        */ 
        const formData = new FormData();
        formData.append("name" , values.name)
        formData.append("description" , values.description)
        formData.append("icon",values.icon)
        const res = await myAxios.post("/clubs/register", formData,{headers : (prev)=>({...prev , "Content-Type": "multipart/form-data" })});
        return res.data;
    } catch (error) {
        return error.response.data
    }
}


export const getAllClubsRegistrationsApi = async()=>{
    try {
        const res = await myAxios.get(`/admin/club-request`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptClubRegistrationApi = async(id)=>{
    try {
        const res = await myAxios.get(`/admin/club-request/${id}/approve`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectClubRegistrationApi = async(id)=>{
    try {
        const res = await myAxios.get(`/admin/club-request/${id}/reject`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}



export const updateClubDetailsApi = async(values,clubId)=>{
    try {
        console.log(values);
        
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        // Append image if a new file is provided
        if (values.icon instanceof File) {
            formData.append("icon", values.icon);
        }
        const id = Number(clubId)
        const res = await myAxios.patch(`/clubs/${id}`,formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteClubApi = async(clubId)=>{
    try {
        const res = await myAxios.delete(`/clubs/${clubId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}


export const addMembersApi = async(clubId,values)=>{
    try {
        const res = await myAxios.post(`/clubs/${clubId}/members`,values);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteMemberApi = async(id)=>{
    try {
        const res = await myAxios.delete(`/clubs/members/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}


export const editMemberApi = async(values)=>{
    try {
        const res = await myAxios.patch(`/clubs/members`,values);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}



export const getAllOngoingEventsApi = async()=>{
    try {
        const res = await myAxios.get(`/clubs/ongoing-club-events`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}




export const getAllApprovedRegistrationsApi = async(eventId)=>{
    try {
          console.log(eventId);
          
        const res = await myAxios.get(`/events/registrations/${parseInt(eventId)}/not-attended`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptAttendanceApi = async(id)=>{
    try {
        console.log(id);
      const res = await myAxios.get(`/events/registrations/accept-registrations/${parseInt(id)}`);
      console.log(res.data);
      return res.data;
  } catch (error) {
      return error.response.data;
  }
}

export const getPollsApi = async()=>{
    try {
      const res = await myAxios.get(`/polls`);
      console.log(res.data);
      return res.data;
  } catch (error) {
      return error.response.data;
  }
}


export const registerFeedback  = async(eventId,values)=>{
    try {
        console.log(values);
        
        const res =  await myAxios.post(`/feedbacks?eventId=${eventId}`,values);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}


export const getAllEventsFeedbackApi = async(eventId)=>{
    try {
        const res =  await myAxios.get(`/feedbacks/events/${eventId}`);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}

export const getAllClubsPastEventsApi = async ()=>{
    try {
        const res = await myAxios.get(`/events/club/past-events`);
        return res.data;       
    } catch (error) {
        return error.response.data
    }
}


export const createPollApi = async (values)=>{
    try {
        console.log(values);
        const res = await myAxios.post(`/polls`,values);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}

export const castVoteApi = async (pollId , eventName )=>{
    try {
        console.log("eventName: ",eventName);
        const res = await myAxios.post(`/polls/${pollId}/vote`,eventName,{
            headers: { "Content-Type": "application/text"   }, // 👈 Explicitly set JSON
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}

export const deletePollApi = async ( pollId )=>{
    try {
        const res = await myAxios.delete(`/polls/${pollId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}

export const editPollApi = async (values) =>{
    try {
        const res = await myAxios.patch("/polls",values)
        return res.data;
    } catch (error) {
        return error.response.data
    }
}

export const getUserProfileApi = async (userId) =>{
    try {
        const res = await myAxios.get(`/users/${parseInt(userId)}`)
        return res.data;
    } catch (error) {
        console.log(error);
        
        return error.response.data
    }
}

export const editUserProfileApi = async (values) =>{
    try {
        const res = await myAxios.put(`/users/edit-profile`,values)
        return res.data;
    } catch (error) {
        console.log(error);
        
        return error.response.data
    }
}

export const updateImageUrlApi = async(file)=>{
    try {
        const formData = new FormData()
        formData.append("image",file)
        const res = await myAxios.put("/users/upload-image",formData)
        return res.data;
    } catch (error) {
        return error.response.data
    }
}