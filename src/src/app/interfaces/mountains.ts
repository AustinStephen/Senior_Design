import { Mountain } from './interfaces';

const GrandTeton: Mountain = {
  Name: 'Grand Teton',
  PhotoSource: 'assets/gallery-images/Grand_Teton.jpg',
  Location: 'Teton County, Wyoming, US',
  Elevation: '13,775 ft',
  Coordinates: {
    Latitude: 43.738,
    Longitude: -110.8015,
  },
};

const MaroonPeak: Mountain = {
  Name: 'Maroon Peak',
  PhotoSource: 'assets/gallery-images/Maroon_Peak.jpg',
  Location: 'Gunnison and Pitkin Counties, Colorado, US',
  Elevation: '14,163 ft',
  Coordinates: {
    Latitude: 39.071,
    Longitude: -106.989,
  },
};

const MedicineBowPeak: Mountain = {
  Name: 'Medicine Bow Peak',
  PhotoSource: 'assets/gallery-images/Medicine_Bow_Peak.jpg',
  Location: 'Albany and Carbon Counties, Wyoming, US',
  Elevation: '12,018 ft',
  Coordinates: {
    Latitude: 41.3605,
    Longitude: -106.3181,
  },
};

const HalfDome: Mountain = {
  Name: 'Half Dome',
  PhotoSource: 'assets/gallery-images/half-dome.jpg',
  Location: 'Half Dome Mariposa County, California, US',
  Elevation: '8,839 ft',
  Coordinates: {
    Latitude: 37.745956,
    Longitude: -119.533279,
  },
};

const MountRainier: Mountain = {
  Name: 'Mount Rainier',
  PhotoSource: 'assets/gallery-images/mount-rainier.jpg',
  Location: 'Pierce County, Washington, US',
  Elevation: '14,411 ft',
  Coordinates: {
    Latitude: 46.879967,
    Longitude: -121.726906,
  },
};

const PoleMountain: Mountain = {
  Name: 'Pole Mountain',
  PhotoSource: 'assets/gallery-images/pole-mountain.jpg',
  Location: 'Albany County, Wyoming, US',
  Elevation: '9,055 ft',
  Coordinates: {
    Latitude: 41.232025,
    Longitude: -105.390215,
  },
};

// Rearrage this array to match Austin's ouputted array
export const ClassifiableMountains: Array<Mountain> = [
  GrandTeton,
  HalfDome,
  MaroonPeak,
  MedicineBowPeak,
  MountRainier,
  PoleMountain,
];
