import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Settings = () => {
  const settings = useSelector((store) => store.service.settings)
  const [formData, setFormData] = useState(settings[0]);

  //  fields disabled
  const readOnlyFields = ['id','created_at','service_name'];

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
    const handleSubmit = (e) => {
    e.preventDefault();
    postApi()

  };

  const postApi = async () => {
        // Exclude read-only fields from the payload
  const dataToSend = Object.fromEntries(
          Object.entries(formData).filter(([key]) => !readOnlyFields.includes(key))
        );
    
    try {
      const result = await axios.post("http://192.168.151.19:5017/settings", dataToSend);
      alert(result.data.message);
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };


  return (
    <div className="min-h-screen text-white p-8 items-center justify-center px-70">
      {settings.length > 0 ? (
       <div>
          <h1 className="text-3xl text-black font-bold mb-8">Settings</h1>
         <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
           {Object.entries(formData).filter(([key, value]) => !readOnlyFields.includes(key)).map(([key, value]) => (
             <div key={key}>
               <label className="block text-black mb-2">{key.replace('_', ' ').toUpperCase()}:</label>
               <input
                 type={typeof value === 'number' ? 'number' : 'text'}
                 value={value}
                 disabled={readOnlyFields.includes(key)}
                 onChange={(e) => handleChange(key, e.target.value)}
                 className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
           ))}
   
           <button
             type="submit"
             className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
           >
             Submit
           </button>
         </form>
        </div>
      ):(
        <div className="mt-8 text-center">
      <p className="mb-4 text-gray-600">No Users Found! Add Users to start building the User List.</p>
      <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700">+ Add User</button>
    </div>

      )}
     
    </div>
  );
};

export default Settings;



