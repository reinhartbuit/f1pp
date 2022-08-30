import React, { useState } from 'react';
import Races from './Races';

import DropDownSeasons from '../DropDownSeasons';

const RacesPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(
    new Date().getFullYear()
  );

  return (
    <div>
      <DropDownSeasons onSeasonSelect={setSelectedSeason}></DropDownSeasons>
      <Races selectedSeason={selectedSeason}></Races>
    </div>
  );
};

export default RacesPage;
