# STIT API
API made to the specs of the nyu STIT application

## RUNNING THE APP
```
npm install
npm start
```
By default the app will start on port 3000 and reference the database stitDB(```mongodb://localhost/stitDB```)
This can be changed in the db.js file if needed 

## ACCEPTED REQUESTS
This API accepts ```POST``` (x-www-formurlencoded) requests to ```/login```,```/register```,```/setPrefrences```

and ```GET``` requests to ```/```,```/getEvents```

The possible fields accepted are ```username```,```password```,```genreId```,```classificationName```

### GENRE & CLASSIFICATION VALUES 
Possible classificationName values 

```Arts & Theatre```
```Film```
```Miscellaneous```
```Music```
```Sports```
```Undefined```
```Donation```
```Event Style```
```Group```
```Individual```
```Merchandise```
```Nonticket```
```Parking```
```Transportation```
```Upsell```
```Venue Based```

possible genreId values 

```R&B```
```Hip-Hop/Rap```
```Comedy```
```Classical```
```Jazz```
```Foreign```
```Dance/Electronic```
```Comedy```
```Animation```
```Music```
```Miscellaneous```
```Family```
```Miscellaneous Theatre```
```Theatre```




### /login
Requires ```username``` and ```password``` fields to be set

ex. ```username=admin```
    ```password=hunter1```

### /register
requires ```username```,```password```,```genreId```, and ```classificationName``` to be set

ex.```username=admin```
   ```password=hunter1```
   ```genreId="R&B"```
   ```classificationName="Music"```
   
### /setPrefrences
requires ```genreId``` and ```classificationName``` to be set

ex.```genreId = "R&B"```
   ```classificationName="Music"```
   
### /getEvents and /
```GET``` requests only, only requires that the client is authenticated
   
## LOGGING IN
To authenticate yourself send a ```POST``` to 

if you wish to create a new account (username,password,genreId,classificationName)
```
localhost:3000/register
```
if you have an account and wish to log in (username,password)
```
localhost:3000/login
```

## GETTING EVENTS 
once registered/logged in send a ```GET``` to ```/getEvents``` 
the response should be a parsed JSON string of all the events near the user

ex.
```
[
    {
        "name": "Rock on Film: Purple Rain",
        "type": "event",
        "dates": {
            "start": {
                "localDate": "2019-04-25",
                "localTime": "19:00:00",
                "dateTime": "2019-04-26T02:00:00Z",
                "dateTBD": false,
                "dateTBA": false,
                "timeTBA": false,
                "noSpecificTime": false
            },
            "timezone": "America/Los_Angeles",
            "status": {
                "code": "onsale"
            },
            "spanMultipleDays": false
        },
        "info": "Movie Night at the Wiltern is a General Admission Seated Event. Purchase your tickets at the Hollywood Palladium every Saturday from 10am-2pm without service charges for this event. This is subject to availability. Box Office is not open during holiday weekends. Check ticket availability by calling 213.531.0588",
        "classifications": [
            {
                "primary": true,
                "segment": {
                    "id": "KZFzniwnSyZfZ7v7nn",
                    "name": "Film"
                },
                "genre": {
                    "id": "KnvZfZ7vAkJ",
                    "name": "Music"
                },
                "subGenre": {
                    "id": "KZazBEonSMnZfZ7vave",
                    "name": "Music"
                },
                "type": {
                    "id": "KZAyXgnZfZ7v7nI",
                    "name": "Undefined"
                },
                "subType": {
                    "id": "KZFzBErXgnZfZ7v7lJ",
                    "name": "Undefined"
                },
                "family": false
            }
        ]
    },
    {}
]
```
## REASONING 
- Node.js because it was suggested by the specs
- Express because It seems like the most popular and lightweight way to route in Node
- MongoDB because it's lightweight, well supported and works well with Passport 
- Passport to authenticate users because it's easy to set up, requires minimal code, supports sessions and plays well with MongoDB & mongoose. It also seems like the most modern way to authenticate users using Node 
- node-bcrypt to hash passwords for security purposes 
- mongo-sanitize to sanitize DB input
- I left API credentials in version control because they're already avalable to the public, would've omitted if this were not the case
- created two new routes ```/``` and ```/failure```, ```/``` is used to quickly check user account information after a change is made, so you don't have to look through the database(this would be omitted in a real application but it's there to help you) ```/failure``` exists as an endpoint to route to when a Passport strategy/update fails in order to send back an error message to the client 
- Two genreIds were provided for Comedy, my app supports ```KnvZfZ7vAe1```
