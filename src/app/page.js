'use client'
import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// export default function Home() {
//   const [formData, setFormData] = useState({
//     column1: '',
//     column2: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ title: formData.column1, bodyContent: formData.column2 })
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Response:', data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   return (
//     <div class="max-w-lg mx-auto bg-white p-6 rounded shadow">
//       <h2 class="text-2xl font-semibold mb-4">Enter School Information</h2>
//       <form>
//         <div class="mb-4">
//           <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
//           <input type="text" id="name" name="name" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter name">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="address" class="block text-gray-700 font-bold mb-2">Address:</label>
//           <input type="text" id="address" name="address" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter address">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="city" class="block text-gray-700 font-bold mb-2">City:</label>
//           <input type="text" id="city" name="city" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter city">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="state" class="block text-gray-700 font-bold mb-2">State:</label>
//           <input type="text" id="state" name="state" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter state">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="contact" class="block text-gray-700 font-bold mb-2">Contact:</label>
//           <input type="text" id="contact" name="contact" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter contact number">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="image" class="block text-gray-700 font-bold mb-2">Image:</label>
//           <input type="text" id="image" name="image" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter image URL">
//           </input>
//         </div>
//         <div class="mb-4">
//           <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
//           <input type="email" id="email" name="email" class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter email">
//           </input>
//         </div>
//         <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
//       </form>
//     </div>
//   );
// }
import SchoolForm from "./components/SchoolForm";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4g text-center">Enter School Data</h1>
      <Link href={'/Search'} ><h1 className="text-center pt-2 pb-0 text-blue-500">View all schools</h1></Link>
      <SchoolForm />
    </div>
  );
}