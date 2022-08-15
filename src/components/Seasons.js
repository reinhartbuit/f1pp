import React, { useEffect, useState } from 'react';
import f1Api from '../apis/f1Api';

const Seasons = () => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    const response = await f1Api.get('/seasons.json');
    setSeasons(response.data.MRData.SeasonTable.Seasons);
  };

  const renderList = seasons.map((season) => {
    return <li key={season.season}>{season.season}</li>;
  });

  return <div>{renderList}</div>;
};

export default Seasons;
