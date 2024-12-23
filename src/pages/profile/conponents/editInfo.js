import React, { useEffect } from "react";
import { useState } from "react";

export default function EditInfo() {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Background Image URL
        </label>
        <input
          type="text"
          value={editInfo.backgroundUrl}
          onChange={(e) =>
            setEditInfo({ ...editInfo, backgroundUrl: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">
          Avatar Image URL
        </label>
        <input
          type="text"
          value={editInfo.avatarUrl}
          onChange={(e) =>
            setEditInfo({ ...editInfo, avatarUrl: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Full Name</label>
        <input
          type="text"
          value={editInfo.fullName}
          onChange={(e) =>
            setEditInfo({ ...editInfo, fullName: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Sex</label>
        <select
          value={editInfo.sex}
          onChange={(e) =>
            setEditInfo({ ...editInfo, sex: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          onClick={closeEditModal}
          className="px-4 py-2 border border-gray-600 rounded text-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Xử lý lưu thông tin ở đây
            setUserInfo(editInfo); // Lưu thông tin đã chỉnh sửa
            closeEditModal();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
  );
}
