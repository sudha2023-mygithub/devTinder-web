import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, gender, age, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!!");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 mx-10">
        <div className="mx-10">
          <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="input"
            />

            <label className="label">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="input"
            />
            <label className="label">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className="input"
            />
            <label className="label">Gender</label>
            <input
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              type="text"
              className="input"
            />
            <label className="label">PhotoUrl</label>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              type="text"
              className="input"
            />
            <label className="label">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              className="input"
            ></textarea>
            <p className="text-red-500">{error}</p>
            <button onClick={saveProfile} className="btn btn-primary mt-4">
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, gender, age, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
