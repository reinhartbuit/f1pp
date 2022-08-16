import React, { useEffect, useState } from 'react';
import DropDownSeasons from './DropDownSeasons';
import apiSports from '../apis/apiSports';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CardGroup, Container } from 'react-bootstrap';

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
        const response = await apiSports.get('/drivers', {
          params: { id: rank.driver.id },
        });
        return response.data.response[0];
      })
    );
    setDrivers(driverList);
  };

  const renderList = drivers.map((driver) => {
    const age = Math.floor(
      (new Date() - new Date(driver.birthdate).getTime()) / 3.15576e10
    );

    return (
      <Col className="d-flex">
        <Card
          key={driver.id}
          style={{ width: '18rem', margin: '10px 2px 2px 10px' }}
        >
          <Card.Img variant="top" src={driver.image} />
          <Card.Body>
            <Card.Title>{driver.name}</Card.Title>
            <Card.Text>
              Number: {driver.number} <br></br>
              Nationality: {driver.nationality} <br></br>
              Age: {age}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <DropDownSeasons onSeasonSelect={setSelectedSeason}></DropDownSeasons>
      <Container fluid>
        <Row lg={8}>{renderList}</Row>
      </Container>
    </div>
  );
};

export default Drivers;
