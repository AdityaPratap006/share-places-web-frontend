export interface Place {
    id: string;
    imageURL: string;
    title: string;
    description: string;
    address: string;
    creatorId: string;
    location: {
        lat: number | string;
        lng: number | string;
    };
}