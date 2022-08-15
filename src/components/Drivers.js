import React, { useEffect, useState } from 'react';
import f1Api from '../apis/f1Api';
import Seasons from './Seasons';

const Drivers = () => {
  const [drivers, setDrivers] = useState({});

  useEffect(() => {
    fetchData().catch(console.error);
    console.log(drivers);
  }, []);

  const fetchData = async () => {
    const response = await f1Api.get('/2022/drivers.json');
    setDrivers(response.data.MRData.DriverTable.Drivers);
  };

  return <div></div>;
};

export default Drivers;
