import photo1 from './assets/img/zahid.jpg';
import photo2 from './assets/img/Goru.jpg';
import photo3 from './assets/img/Venetsia.jpg';

export const posts = [
    {
        img: photo1,
        description: "1",
        comments: [
            {
                author: "user1",
                text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
                date: "02 червня, 2020 | 08:40",
            },
            {
                author: "user2",
                text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
                date: "09 червня, 2020 | 09:14",
            },
            {
                author: "user1",
                text: "Thank you! That was very helpful!",
                date: "09 червня, 2020 | 09:20",
            },
        ],
        likes: 200,
        locationName: "Ukraine",
        geoLocation: { latitude: 50.4501, longitude: 30.5234 },
    },
    {
        img: photo2,
        description: "2",
        comments: [],
        likes: 153,
        locationName: "Ukraine",
        geoLocation: { latitude: 50.4501, longitude: 30.5234 },
    },
    {
        img: photo3,
        description: "3",
        comments: [
            {
                author: "user1",
                text: "hello world",
                date: "02 вересня, 2023 | 14:40",
            },
            {
                author: "user2",
                text: "hello world",
                date: "02 вересняня, 2023 | 15:01",
            },
            
        ],
        likes: 200,
        locationName: "Italy",
        geoLocation: { latitude: 32.721292, longitude: -117.169947 },
    },
   
];