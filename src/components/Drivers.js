import React, { useEffect, useState } from 'react';
import DropDownSeasons from './DropDownSeasons';
import apiSports from '../apis/apiSports';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(
    new Date().getFullYear()
  );

  useEffect(() => {
    fetchData().catch(console.error);
  }, [selectedSeason]);

  const fetchData = async () => {
    const response = await apiSports.get('/rankings/drivers', {
      params: { season: selectedSeason },
    });
    setRankings(response.data.response);

    const driverList = await Promise.all(
      rankings.map(async (rank) => {
        const response = apiSports.get('/drivers', {
          params: { id: rank.driver.id },
        });
        return (await response).data.response[0];
      })
    );
    setDrivers(driverList);
  };

  const renderList = drivers.map((driver) => {
    const age = Math.floor(
      (new Date() - new Date(driver.birthdate).getTime()) / 3.15576e10
    );

    return (
      <Card key={driver.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{driver.name}</Card.Title>
          <Card.Text>Number: {driver.number}</Card.Text>
          <Card.Text>Nationality: {driver.nationality}</Card.Text>
          <Card.Text>Age: {age}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <DropDownSeasons onSeasonSelect={setSelectedSeason}></DropDownSeasons>
      <div>{renderList}</div>
    </div>
  );
};

export default Drivers;
