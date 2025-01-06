import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../../firebase-config";

export default function EditInfo({ userInfo, closeEditModal, updateInfo }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [sex, setSex] = useState(true);
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [bio, setBio] = useState(userInfo.bio);

  // Handle background image upload and preview
  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  // Handle avatar image upload and preview
  const handleAvatarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
    }
  };

  // Handle sex change
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  // Handle fullname change
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  // Handle bio change
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  // Upload image to Firebase and get URL
  const uploadImage = (image, path) => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref(path).put(image);
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSave = async () => {
    try {
      let avatarUrl = "";
      // let backgroundUrl = "";

      // // Upload avatar image if selected
      // if (avatarImage) {
      //   const avatarFile = avatarImage;
      //   avatarUrl = await uploadImage(
      //     avatarFile,
      //     `avatars/${Date.now()}_${avatarFile.name}`
      //   );
      // }

      // // Upload background image if selected
      // if (backgroundImage) {
      //   const backgroundFile = backgroundImage;
      //   backgroundUrl = await uploadImage(
      //     backgroundFile,
      //     `backgrounds/${Date.now()}_${backgroundFile.name}`
      //   );
      // }

      // Create the updated userInfo object
      // const updatedUserInfo = {
      //   ...userInfo,
      //   fullName: fullName,
      //   bio: bio,
      //   sex: sex,
      //   urlAvt: avatarUrl,
      //   urlBackground: backgroundUrl,
      // };

      const payload = {
         id: parseInt(localStorage.getItem("id"), 10),
         fullName: fullName,
         sex: sex,
         bio: bio,
         location: userInfo.location
        //  urlAvt: avatarUrl,
        //  urlBackground: backgroundUrl
      }
      await updateInfo(payload);
      // Close modal after successful save
      closeEditModal();
      
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* Avatar Image Section */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Avatar Image</label>
          <div className="mb-2">
            {avatarImage ? (
              <img
                src={avatarImage}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Background Image Section */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Background Image</label>
          <div className="mb-2">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="Background Preview"
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        {/* bio */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Bio</label>
          <input
            type="text"
            value={bio}
            onChange={handleBioChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        </div>

        {/* Sex */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Sex</label>
          <select
            value={sex} // set value to the current state of sex
            onChange={handleSexChange} // update state when sex changes
            className="w-full p-2 border border-gray-500 rounded text-black"
          >
            <option value={true}>Male</option>
            <option value={false}>Female</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={closeEditModal}
            className="px-4 py-2 border border-gray-600 rounded text-gray-600"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
