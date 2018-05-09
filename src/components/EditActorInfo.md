```js
func = () => {};
const actor = {
    "_id" : "5af3477c0938e303289b7dd5",
    "movies" : [
        "5af3477c0938e303289b7d9c"
    ],
    "nominations" : [ ],
    "name" : "Sabrina Ouazani",
    "slugName" : "Sabrina_Ouazani",
    "info" : "Walton Sanders Goggins Jr. (born November 10, 1971) is an American actor. He co_produced and starred in the 2001 short film The Accountant, which won an Academy Award for Best Live Action Short Film.[2] He was nominated for the Primetime Emmy Award for Outst anding Supporting Actor in a Drama Series in the FX series Justified.", 
    "date" : "November 10, 1971",
    "city" : "Бірмінгем, Алабама, США",
    "image" : "Cinema Project/jea0aa1nnurgaffkfndz",
    "oldId" : "48",
    "__v" : 1
};

const films = {
  "_id" : "5af3477c0938e303289b7d9c",
  "duration" : {
      "hour" : 1,
      "minute" : 40
  },
  "startDate" : {
      "year" : 2018,
      "month" : 4,
      "day" : 19
  },
  "screenshots" : [
      "Cinema Project/t6inftshdbs89tacj0gy",
      "Cinema Project/cakhvrm9vfo6c9r0s7yc",
      "Cinema Project/ys1dtahrgbsynk9rajfl"
  ],
  "Schedule" : [ ],
  "cast" : [
      "5af3477c0938e303289b7dd4",
      "5af3477c0938e303289b7dd6",
      "5af3477c0938e303289b7dd5"
  ],
  "name" : "Taxi 5",
  "slugName" : "Taxi_5",
  "image" : "Cinema Project/xu9pvugvftgqxa96zyqb",
  "rating" : "-.-",
  "description" : "A police officer who's transfered in the police of Marseille gets a ssigned to take down a group of Italian robbers who drive the powerfull Ferrari's with the older niece of Daniel, a terrible driver who gets the legendary white taxi.",
  "trailer" : "",
  "genre" : "Action, Adventure, Comedy",
  "format" : "",
  "technology" : "",
  "label" : "soon",
  "__v" : 3
};


<EditActorInfo actor={actor} films={films} callback={func}/>
```