# Preschool Song Libary
![https://github.com/lizkavalski/PreschoolSong-backend/actions](https://github.com/lizkavalski/PreschoolSong-backend/actions/workflows/node.js.yml/badge.svg)

[Link to Server](https://preschool-library.onrender.com)

The back end of the Preschool Libary. The server will fetch information for the YouTube database and save it to a postgres SQL database.

## .env Requierment
- DATABASE_URL= link to postgres database
- PORT= for localhost
- API_KEY= Youtube API key
- SECRET= for authencation
- CLIENTID= Google authencation
- CLIENTSECRET= Google Authencation
- CALLBACKURL= Google Authencation

## Models
- theme
- song

## To start server

Once the .env is set up on the local machince type in the terminal `npm start `
should see an output like this:
```
"All at once everything looks different, now that I see you"-Tangled on port 3005'
```
## Routes

root url- `localhost:----`

There are two routes:`/v1/:model` and `/v2/:model`. The v1 route is the un-authincated and is for local testing, while the v2 route is the authincated routes and used for deployment.

### READ:
Input for no model __GET__ `/`

output:
```
{
  "message": "\"There no place like home\"- Dorothy(Wizard of Oz)"
}
```

Input for theme and song with no data in the database __GET__ `/v1/:model` or `/v2/:model`

Output 
```
{
  "message": "\"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)",
  "allRecords": []
}
```

With data from __theme__  database __GET__ `/v1/:theme` or `/v2/:theme`

output: 
```
{
  "message": "\"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)",
  "allRecords": [
    {
      "id": 1,
      "category": "greeting",
      "title": "Hello Songs",
      "description": "Songs related to greeting such as hello, or good moring",
      "createdAt": "2023-08-21T22:20:12.200Z",
      "updatedAt": "2023-08-21T22:20:12.200Z"
    }
  ]
}
```
To get one record `/v1/theme/:id`, or `/v2/theme/:id`

Output:
```
{
  "message": "\"Magic Mirror on the wall, who is the fairest one of all?”- Queen (Snow White and the Seven Drawfs)",
  "theRecord": {
    "id": 1,
    "category": "greeting",
    "title": "Hello Songs",
    "description": "Songs related to greeting such as hello, or good moring",
    "createdAt": "2023-08-21T22:20:12.200Z",
    "updatedAt": "2023-08-21T22:20:12.200Z"
  }
}
```

To look a all data for __song__ data base __GET__ `/v1/song/` or `/v2/song`

output Example:
```
{
  "message": "\"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)",
  "allRecords": [
    {
      "id": 1,
      "title": "How Do We Say Hello - THE KIBOOMERS Preschool Songs - Good Morning Circle Time Song",
      "by": "The Kiboomers - Kids Music Channel",
      "category": "Hello Songs",
      "url": "https://www.youtube.com/watch?v=p3XPRgf4qG4",
      "image": "https://i.ytimg.com/vi/p3XPRgf4qG4/default.jpg",
      "createdAt": "2023-08-21T22:28:07.025Z",
      "updatedAt": "2023-08-21T22:28:07.025Z"
    }
  ]
}
```
To look a one data for __song__ data base __GET__ `/v1/song/:id` or `/v2/song/:id`

Output:
```
{
  "message": "\"Magic Mirror on the wall, who is the fairest one of all?”- Queen (Snow White and the Seven Drawfs)",
  "theRecord": {
    "id": 1,
    "title": "How Do We Say Hello - THE KIBOOMERS Preschool Songs - Good Morning Circle Time Song",
    "by": "The Kiboomers - Kids Music Channel",
    "category": "greeting",
    "url": "https://www.youtube.com/watch?v=p3XPRgf4qG4",
    "image": "https://i.ytimg.com/vi/p3XPRgf4qG4/default.jpg",
    "createdAt": "2023-08-21T22:28:07.025Z",
    "updatedAt": "2023-08-21T22:28:07.025Z"
  }
}
```


### CREATE

  To create a __theme__ data use __POST__ `/v1/theme` or `/v2/theme` with the require input:
  ```
  {
    "category":"Name of Category",
    "title":"Title on Display on the front-end",
    "description":"a short description on what type of song are in this category"
  }
  ```
  Output Example:
  ```
  {
    "message": "\"“bippity boppity boo.”- Fairy Godmother (Cinderella.)",
    "newRecord": {
      "id": 1,
      "category": "greeting",
      "title": "Hello Songs",
      "description": "Songs related to greeting such as hello, or good moring",
      "updatedAt": "2023-08-21T21:41:26.812Z",
      "createdAt": "2023-08-21T21:41:26.812Z"
    }
  }
  ```

  To create a __song__ data use __POST__ `/v1/song` or `/v2/song` with the require input:
  ```
  {
	"category":"Name of category",
	"url":"a Youtube url"
  }
  ```
  Output Example:
  ```
  {
  "message": "\"“bippity boppity boo.”- Fairy Godmother (Cinderella.)",
    "newRecord": {
      "id": 1,
      "title": "How Do We Say Hello - THE KIBOOMERS Preschool Songs - Good Morning Circle Time Song",
      "by": "The Kiboomers - Kids Music Channel",
      "category": "greeting",
      "url": "https://www.youtube.com/watch?v=p3XPRgf4qG4",
      "image": "https://i.ytimg.com/vi/p3XPRgf4qG4/default.jpg",
      "updatedAt": "2023-08-21T21:46:58.612Z",
      "createdAt": "2023-08-21T21:46:58.612Z"
    }
}
  ```
### UPDATE

To update use data  __PUT__ `v1/:model/:id`, or `/v2/:model/:id` and change the information like creating new data. The exception is __songs__ the input can be: title, by(who did it), category, url and image. To tell if the changes took place the output should have a line look like this:
```
{
  "message": "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)",
  "updatedRecord": {
    the updated data is in here
  }
}
```

### Delete

To delete data use __DELETE__ `v1/:model/:id`, or `/v2/:model/:id`, To tell if the changes took place the output should have a line look like this:
```
{
	"message": "\"Danger Will Robinson\"--Robot (Lost in Space)",
	"deletedRecord": 1
}
```