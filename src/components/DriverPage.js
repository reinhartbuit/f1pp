import React, { useState } from 'react';
import Drivers from './Drivers';
import DropDownSeasons from './DropDownSeasons';

const DriverPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(
    new Date().getFullYear()
  );

  return (
    <div>
      <DropDownSeasons onSeasonSelect={setSelectedSeason}>Test</DropDownSeasons>
      <Drivers selectedSeason={selectedSeason}></Drivers>
    </div>
  );
};

export default DriverPage;
