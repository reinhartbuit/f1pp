import React, { useEffect, useState } from 'react';
import apiSports from '../apis/apiSports';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const DropDownSeasons = ({ selectedSeason, onSeasonSelect }) => {
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['year']}
        label="Select Season"
        value={startDate}
        minDate={moment(`01-01-${minValue}`, 'DD-MM-YYYY').toDate()}
        maxDate={moment(`01-01-${maxValue}`, 'DD-MM-YYYY').toDate()}
        onChange={(newValue) => {
          onDateChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

export default DropDownSeasons;
