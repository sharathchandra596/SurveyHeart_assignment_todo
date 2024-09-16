import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const FetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/todos');
      setData(response.data.todos);
    //   console.log(response.data.todos);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <h2 className='text-xl w-screen p-2 m-4 '>this data is fetched from https://dummyjson.com/todos  with axios</h2>
    <div className=' '>
        {data.map((todo) => (
            <>
            <p>todo:{todo.id}</p>
            <p className='p-2 border bg-gray-400 text-white m-1'>{todo.todo}</p>
            </>
        ))}
    </div>
        </>
  );
};

export default FetchData;
