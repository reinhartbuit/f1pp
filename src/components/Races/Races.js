import React, { useEffect, useState } from 'react';
import RaceDetails from './RaceDetails';
import apiSports from '../../apis/apiSports';

import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper,
  Grid,
  styled,
} from '@mui/material';

const Races = ({ selectedSeason }) => {
  const [selectedRaceId, setSelectedRaceId] = useState(null);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    fetchRaces(selectedSeason).catch(console.error);
  }, [selectedSeason]);

  const setRaceId = (race) => {
    setSelectedRaceId(race.circuit.id);
  };

  const fetchRaces = async (season) => {
    const response = await apiSports.get('/races', {
      params: { season, type: 'Race' },
    });
    setRaces(response.data.response);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    //theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const renderList = races.map((race) => {
    const raceDate = new Date(race.date);

    return (
      <Grid key={race.id}>
        <Item>
          <Card
            sx={{
              maxWidth: 250,
              border: 2,
              borderColor: race.status === 'Completed' ? 'green' : 'red',
              borderRadius: 2,
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={race.circuit.image}
                alt="Driver"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {race.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {race.status} <br />
                  Date: {raceDate.toDateString()} <br />
                  City: {race.competition.location.city} <br />
                  Country: {race.competition.location.country} <br />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => setRaceId(race)}
              >
                More info...
              </Button>
            </CardActions>
          </Card>
        </Item>
      </Grid>
    );
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}>
          {renderList}
        </Grid>
      </Box>
      <RaceDetails
        selectedRaceId={selectedRaceId}
        setSelectedRaceId={setSelectedRaceId}
      />
    </div>
  );
};

export default Races;
