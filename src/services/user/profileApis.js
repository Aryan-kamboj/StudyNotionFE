import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnection";
//const login = document.cookie.split("=")[1];
const login = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
export const getProfileApi = async () => {
  try {
    const request = {
      method: "GET",
      url: `${baseUrl}api/user/myProfile`,
      creds: true,
      headers: {
        'Authorization': `Bearer ${login}`,
      }
    }
    toast.loading("Getting profile details");
    const { data } = await apiConnector(request);
    toast.dismiss();
    toast.success("User profile fetched");
    console.log(data);
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error("Could not get profile details");
  }
}
export const updateProfileApi = async (phoneNo, fname, lname, bio, DOB, gender, countryCode) => {
  try {
    const bodyData = {
      phoneNo, fname, lname, bio, DOB, gender, countryCode
    }
    const request = {
      method: "POST",
      url: `${baseUrl}api/user/updateProfile`,
      creds: true,
      headers: {
        'Authorization': `Bearer ${login}`
      },
      bodyData: bodyData
    }
    toast.loading("Updating user profile");
    const { data } = await apiConnector(request);
    toast.dismiss();
    toast.success("Profile data updated ");
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error("Could not update profile");
    console.log(error);
  }
}
export const updatePorfilePhotoApi = async (photo) => {
  try {
    const bodyData = new FormData();
    console.log(photo)
    bodyData.append("newPicture", photo)
    const request = {
      url: `${baseUrl}api/user/changeDP`,
      method: "POST",
      bodyData,
      creds: true,
      headers: {
        'Authorization': `Bearer ${login}`,
        'Content-Type': 'multipart/form-data'
      },
    }
    toast.loading("Changing profile photo");
    const { data } = await apiConnector(request);
    toast.dismiss();
    toast.success("Profile photo changed");
    return data;
  } catch (error) {
    toast.dismiss();
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
}
