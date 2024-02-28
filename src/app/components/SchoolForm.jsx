// components/MyForm.js
import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    image: null,
    email_id: ''
  });
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0] // Set the file object
    }));
  };

  const uploadImageAndGetId = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.image);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageId; // Return the ID of the uploaded image
      } else {
        throw new Error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the entered value for the contact field is numeric
    if (name === 'contact' && !isNaN(value)) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (name !== 'contact') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleEmailBlur = () => {
    setTouchedEmail(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageId = await uploadImageAndGetId(); // Upload image and get its ID
      if (!imageId) {
        throw new Error('Failed to get image ID.');
      }
      const data={
        ...formData,
        ['image']:imageId
      }
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(data),
      });
 
      if (response.ok) {
        alert('Data sent successfully!');
        setFormData({
          name: '',
          address: '',
          city: '',
          state: '',
          contact: '',
          image: null,
          email_id: ''
        });
      } else {
        alert('Failed to send data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input type="file" id="fileInput" name="image" onChange={handleImageChange} className="mt-1 p-2 border rounded-md w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="email_id" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input type="email" id="email_id" name="email_id" value={formData.email_id} onChange={handleChange} onBlur={handleEmailBlur} className="mt-1 p-2 border rounded-md w-full" />
        {(touchedEmail || formData.email_id) && !validateEmail(formData.email_id) && <span className="text-red-500">Please enter a valid email address</span>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {loading ? 'Submitting...' : 'Submit'} {/* Show Submitting... when loading is true */}
      </button>
    </form>
  );
};

export default MyForm;
