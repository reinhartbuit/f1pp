import React, { useEffect, useState } from 'react';
import apiSports from '../apis/apiSports';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DropDownSeasons = ({ onSeasonSelect }) => {
  const [minValue, setMinValue] = useState(new Date());
  const [maxValue, setMaxValue] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    const response = await apiSports.get('/seasons');

    const data = response.data.response;
    setMinValue(Math.min(...data));
    setMaxValue(Math.max(...data));
  };

  const onDateChange = (date) => {
    setStartDate(date);
    onSeasonSelect(date.getFullYear());
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onDateChange}
      showYearPicker
      dateFormat={'yyyy'}
      minDate={new Date(`${minValue}-01-01`)}
      maxDate={new Date(`${maxValue}-01-01`)}
      onSeasonSelect={onSeasonSelect}
    ></DatePicker>
  );
};

export default DropDownSeasons;
