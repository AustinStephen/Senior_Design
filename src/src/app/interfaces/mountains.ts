import { Mountain } from './interfaces';

const GrandTeton: Mountain = {
  Name: 'Grand Teton',
  PhotoSource: 'assets/gallery-images/Grand_Teton.jpg',
  Coordinates: {
    Latitude: 43.738,
    Longitude: -110.8015,
  },
};

const MaroonPeak: Mountain = {
  Name: 'Maroon Peak',
  PhotoSource: 'assets/gallery-images/Maroon_Peak.jpg',
  Coordinates: {
    Latitude: 39.071,
    Longitude: -106.989,
  },
};

const MedicineBowPeak: Mountain = {
  Name: 'Medicine Bow Peak',
  PhotoSource: 'assets/gallery-images/Medicine_Bow_Peak.jpg',
  Coordinates: {
    Latitude: 41.3605,
    Longitude: -106.3181,
  },
};

// const HalfDome: Mountain = {
//   Name: 'Half Dome',
//   Coordinates: {
//     Latitude: 37.745956,
//     Longitude: -119.533279,
//   },
// };

// const MountRainier: Mountain = {
//   Name: 'Mount Rainier',
//   Coordinates: {
//     Latitude: 46.879967,
//     Longitude: -121.726906,
//   },
// };

// const PoleMountain: Mountain = {
//   Name: 'Pole Mountain',
//   Coordinates: {
//     Latitude: 41.232025,
//     Longitude: -105.390215,
//   },
// };

// Rearrage this array to match Austin's ouputted array
export const ClassifiableMountains: Array<Mountain> = [
  GrandTeton,
  //HalfDome,
  MaroonPeak,
  //MedicineBowPeak,
  //MountRainier,
  //PoleMountain
];
