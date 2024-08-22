import ProfileForm from "./profileForm";
import { useGetMyProfile,useUpdateProfile } from "../api/apiList";
export default function ManageProfile(){
    const {response:currentUser,isLoading}= useGetMyProfile()
    const {response:isUpdatingProfile,isPending}=useUpdateProfile()
    if (isLoading){
        return <div>Loading ...</div>
    }
    if(!currentUser){
        return <div>Unable get Current user</div>
    }
    return <ProfileForm  currentUser={currentUser} isLoading={isPending} onSave={isUpdatingProfile}/>
}