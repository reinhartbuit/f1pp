import React, { useState } from 'react';

import DropDownSeasons from '../DropDownSeasons';

const RacesPage = () => {
  const [selectedSeason, setSelectedSeason] = useState(
    new Date().getFullYear()
  );

  return (
    <div>
      <DropDownSeasons onSeasonSelect={setSelectedSeason}></DropDownSeasons>
    </div>
  );
};

export default RacesPage;
