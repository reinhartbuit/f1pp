import React, { useEffect, useState } from 'react';
import apiSports from '../apis/apiSports';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Drivers = ({ selectedSeason }) => {
  const [drivers, setDrivers] = useState([]);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetchRankings(selectedSeason).catch(console.error);
  }, [selectedSeason]);

  useEffect(() => {
    fetchDrivers(selectedSeason);
  }, [rankings]);
  const fetchRankings = async (season) => {
    const response = await apiSports.get('/rankings/drivers', {
      params: { season: season },
    });
    setRankings(response.data.response);
  };

  const fetchDrivers = async () => {
    if (rankings) {
      const promises = rankings.map(async (rank) => {
        try {
          const response = await apiSports.get('/drivers', {
            params: { id: rank.driver.id },
          });

          return response.data.response[0];
        } catch {
          return;
        }
      });

      await Promise.all(promises)
        .then(function (driverList) {
          setDrivers(driverList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    //theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const renderList = drivers.map((driver) => {
    const age = Math.floor(
      (new Date() - new Date(driver.birthdate).getTime()) / 3.15576e10
    );

    return (
      <Grid key={driver.id} xs={2}>
        <Item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image={driver.image}
                alt="Driver"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {driver.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nationality: {driver.nationality} <br />
                  Rece Number: {driver.number} <br />
                  Age: {age}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={`/drivers/${driver.id}`}
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
    </div>
  );
};

export default Drivers;
