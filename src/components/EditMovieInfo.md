EditMovieInfo example:

```js
<EditMovieInfo film={{
                           "id": 0,
                           "name": "Red Sparrow",
                           "image": "Cinema Project/ymgt4tyhaqkhybywwkut",
                           "rating": 6.7,
                           "cast": [
                             "Jennifer Lawrence",
                             "Joel Edgerton",
                             "Matthias Schoenaerts"
                           ],
                           "description": "Ballerina Dominika Egorova is recruited to 'Sparrow School,' a Russian intelligence service where she is forced to use her body as a weapon. Her first mission, targeting a C.I.A. agent, threatens to unravel the security of both nations.",
                           "screenshots": [
                             "Cinema Project/jp4qjm88k0x5kwejkfas",
                             "Cinema Project/ccibyqtkshuevstojwbo",
                             "Cinema Project/ssiwpffjj6yrlqhpgmz5"
                           ],
                           "trailer": "http://www.imdb.com/videoplayer/vi4237277209",
                           "genre": "Mystery, Thriller",
                           "Schedule": [
                             "22-03-2018 10:15",
                             "22-03-2018 11:00",
                             "22-03-2018 12:50",
                             "22-03-2018 13:40",
                             "22-03-2018 15:25",
                             "22-03-2018 16:20",
                             "22-03-2018 18:00",
                             "22-03-2018 19:00",
                             "22-03-2018 21:40",
                             "22-03-2018 22:30"
                           ],
                           "format": [
                             "2D"
                           ],
                           "technology": [
                             "Cinetech+"
                           ],
                           "duration": {
                             "hour": 2,
                             "minute": 19
                           },
                           "label": "popular",
                           "startDate": {
                             "year": 2018,
                             "month": 3,
                             "day": 1
                           }
                         }}
                                  callback={(first, second)=> console.log("ACTION")} />
```