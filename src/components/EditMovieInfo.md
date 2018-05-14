EditMovieInfo example:

```js
const film={
    "_id" : "5af369c899de722ecc00f47f",
    "duration" : {
           "hour" : 2,
           "minute" : 19
    },
    "startDate" : {
           "year" : 2018,
           "month" : 3,
           "day" : 1
    },
    "screenshots" : [
           "Cinema Project/jp4qjm88k0x5kwejkfas",
           "Cinema Project/ccibyqtkshuevstojwbo",
           "Cinema Project/ssiwpffjj6yrlqhpgmz5"
    ],
    "Schedule" : [
           "22-05-2018 10:15",
           "22-05-2018 11:00",
           "22-03-2018 12:50",
           "22-03-2018 13:40",
           "22-03-2018 15:25",
           "22-03-2018 16:20",
           "22-03-2018 18:00",
           "22-03-2018 19:00",
           "22-03-2018 21:40",
           "22-03-2018 22:30"
    ],
    "cast" : [
           "5af369c999de722ecc00f499",
           "5af369c999de722ecc00f49b",
           "5af369c999de722ecc00f49a"
    ],
    "name" : "Red Sparrow",
    "slugName" : "Red_Sparrow",
    "image" : "Cinema Project/ymgt4tyhaqkhybywwkut",
    "rating" : "6.7",
    "description" : "Ballerina Dominika Egorova is recruited to 'Sparrow School,' a Russian intelligence service where she is forced to use her body as a weapon. Her first mission, targeting a C.I.A. agent, threatens to unravel the security of both nations.",
    "trailer" : "https://www.youtube.com/embed/PmUL6wMpMWw?autoplay=0",
    "genre" : "Mystery, Thriller",
    "format" : "2D",
    "technology" : "Cinetech+",
    "label" : "popular",
    "__v" : 3
};

func = () => {};

const oldCast = [
    {name: 'A0', _id: "5af369c999de722ecc00f499", movies: []},
    {name: 'A1', _id: "5af369c999de722ecc00f49b", movies: []},
    {name: 'A2', _id: "5af369c999de722ecc00f49a", movies: []}
];

<EditMovieInfo film={film} actors={oldCast} callback={func} /> 

```