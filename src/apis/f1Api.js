import axios from 'axios';

// export default axios.create({
//   baseURL: 'https://v1.formula-1.api-sports.io/',
//   headers: {
//     'x-rapidapi-key': '906149e10195470842d5b6f2d860f89e',
//     'x-rapidapi-host': 'v1.formula-1.api-sports.io',
//   },
// });

// const fetchData = async () => {
//   const response = await f1Api.get('/drivers.', {
//     params: { search: '' },
//   });
//   console.log(response);
// };
// fetchData().catch(console.error);
// });

export default axios.create({ baseURL: 'http://ergast.com/api/f1/' });

// const fetchData = async () => {
//   const response = await f1Api.get('/2022/drivers');
//   const parser = new XMLParser({
//     ignoreAttributes: false,
//     attributeNamePrefix: '__',
//   });
//   const { MRData } = parser.parse(response.data);
//   console.log(MRData.DriverTable.Driver[0]);
// };
// fetchData().catch(console.error);
