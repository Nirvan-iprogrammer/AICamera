import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

   console.log(url)
   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log("Response:",json);
          setData(json);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [url]);

  return { data, error, loading };
};

export default useFetch;

