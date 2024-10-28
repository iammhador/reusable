import React, { useState } from "react";
import TextInput from "../textInput/TextInput"; // Adjust the import path accordingly
import SelectInput from "../selectInput/SelectInput"; // Adjust the import path accordingly
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon from React Icons

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalTitle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", String(age));
    formData.append("gender", gender);
    formData.append("country", country);
    formData.append("role", role);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("comments", comments);

    // Handle your form submission logic here
    console.log("Submitted Data:", Object.fromEntries(formData.entries()));
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold uppercase text-gray-400">
            {modalTitle}
          </h2>
          <button
            onClick={onClose}
            className="border-2 border-red-500 bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold p-3 rounded-full ease-in-out duration-300"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
        >
          <TextInput
            label="Name"
            value={name}
            onChange={setName}
            required
            placeholder="Enter your name"
          />
          <TextInput
            label="Email"
            value={email}
            onChange={setEmail}
            required
            type="email"
            placeholder="Enter your email"
          />
          <TextInput
            label="Age"
            value={String(age)}
            onChange={(value) => setAge(Number(value))}
            type="number"
            placeholder="Enter your age"
          />
          <SelectInput
            label="Gender"
            value={gender}
            onChange={setGender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            required
          />
          <SelectInput
            label="Country"
            value={country}
            onChange={setCountry}
            options={[
              { value: "usa", label: "USA" },
              { value: "canada", label: "Canada" },
              { value: "uk", label: "UK" },
              // Add more countries as needed
            ]}
            required
          />
          <SelectInput
            label="Role"
            value={role}
            onChange={setRole}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
              // Add more roles as needed
            ]}
            required
          />
          <TextInput
            label="Address"
            value={address}
            onChange={setAddress}
            placeholder="Enter your address"
          />
          <TextInput
            label="Phone"
            value={phone}
            onChange={setPhone}
            type="tel"
            placeholder="Enter your phone number"
          />
          <TextInput
            label="Comments"
            value={comments}
            onChange={setComments}
            type="textarea"
            placeholder="Enter your comments"
          />

          <div className="col-span-2 flex justify-start">
            <button
              type="submit"
              className="mt-4 px-10 py-2 bg-blue-600 border-2 border-blue-600 text-white rounded hover:bg-transparent hover:text-blue-600 transition ease-in-out duration-300 uppercase font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
