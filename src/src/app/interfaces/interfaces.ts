export interface Coordinate {
  Latitude: number;
  Longitude: number;
}

export interface Mountain {
  Name: string;
  PhotoSource: string;
  Coordinates: Coordinate;
}
