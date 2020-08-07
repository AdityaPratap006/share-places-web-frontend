import { Place } from '../models';

export const PLACES: Place[] = [
    {
        id: '1',
        title: 'Times Square',
        address: 'New York',
        description: 'Beautiful New York',
        creatorId: '2',
        imageURL: `https://akm-img-a-in.tosshub.com/sites/btmt/images/stories/times_square_505_040820090248.jpg?size=1200:675`,
        location: {
            lat: 40.758896,
            lng: -73.985130,
        }
    },
    {
        id: '2',
        title: 'Burj Khalifa',
        address: 'Dubai',
        description: 'Beautiful Dubai',
        creatorId: '2',
        imageURL: `https://media.tacdn.com/media/attractions-splice-spp-674x446/07/be/ec/eb.jpg`,
        location: {
            lat: 25.197525,
            lng: 55.274288,
        }
    },
];