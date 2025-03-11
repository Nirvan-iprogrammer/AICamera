import { useState, useEffect } from 'react';

const Analytics = () => {
  const [serviceName, setServiceName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [analyticData, setAnalyticData] = useState([]);

  // Validate and set start date
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate > today) {
      setError('Start date cannot be a future date.');
      return;
    }

    setStartDate(selectedDate);
    setError('');
  };

  // Validate and set end date
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate <= startDate) {
      setError('End date must be after the start date.');
      return;
    }

    setEndDate(selectedDate);
    setError('');
  };



  async function fetchData() {
    if (!serviceName || !startDate || !endDate) return; // Ensure all values are present

    try {
      const res = await fetch(`http://192.168.151.19:5017/analytics?service_name=${serviceName}&start_date=${startDate}&end_date=${endDate}`);
      const jsonRes = await res.json();
      console.log('jsonRes', jsonRes);
      // Dispatch your actions here
      setAnalyticData(jsonRes);
    } catch (error) {
      console.error('API call error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [serviceName, startDate, endDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceName || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    fetchData();

    alert(`Submitting: Service - ${serviceName}, Start Date - ${startDate}, End Date - ${endDate}`);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-black mb-4">Event Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="items-center gap-4">
          <div className='flex'>
          <div className='mx-2 w-[33%]'>
            <label className="block text-black mb-2">Service Name:</label>
            <select
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-3 rounded-lg border  focus:outline focus:outline-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Service</option>
              <option value="crowd">Crowd</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>

          <div className='mx-2 w-[33%]'>
            <label className="block text-black mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>

          <div className='mx-2 w-[33%]'>
            <label className="block text-black mb-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>

        </div></div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg self-start mt-4"
        >
          Submit
        </button>
      </form>
      {analyticData.length >0 && (
       <div>{analyticData.map((item) => <h1>{item.total_count}</h1>)}</div>
      )}
    </div>
  
  );
};

export default Analytics;