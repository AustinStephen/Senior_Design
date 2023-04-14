export interface Coordinate {
  Latitude: number;
  Longitude: number;
}

export interface Mountain {
  Name: string;
  Location: string;
  Elevation: string;
  PhotoSource: string;
  Coordinates: Coordinate;
}
