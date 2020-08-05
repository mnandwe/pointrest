export interface Markedpoint {
    id: string;
    name: string;
    location: GeoField;
}

export interface GeoField {
    type: string;
    coordinates: number[];
}


export interface PointModelEvent {
    type: string;
    id?: string;
    point?: Markedpoint;
}


export interface AddPointRequest {
    name: string;
    location: GeoField;
}

export class User {
    id: string;
    username: string;
    password: string;
    token: string;
}