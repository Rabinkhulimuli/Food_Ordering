import { useGetMyProfile } from "../api/apiList";
import { Link } from "react-router-dom";
import ProfileForm, { profileFormType } from "./profileForm";
export default function UserProfileForm() {
  const { response, isLoading } = useGetMyProfile();
  const checkOut = (userFormData: profileFormType) => {
    console.log(userFormData);
  };
  if (!response) {
    return (
      <div>
        log in to checkout<Link to="/login">Login</Link>
      </div>
    );
  }
  return (
    <>
    <div className=' -my-8' >
      <ProfileForm
        currentUser={response}
        isLoading={isLoading}
        onSave={checkOut}
        title="confirm delivery details"
        buttonText="continue to payment"
      />
    </div>
      
    </>
  );
}
