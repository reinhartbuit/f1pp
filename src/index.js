import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import f1Api from './apis/f1Api';
import { XMLParser } from 'fast-xml-parser';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await f1Api.get('/2022/drivers');
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '__',
      });
      const { MRData } = parser.parse(response.data);
      console.log(MRData.DriverTable.Driver[0]);
    };
    fetchData().catch(console.error);
  });

  return <div>App</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
