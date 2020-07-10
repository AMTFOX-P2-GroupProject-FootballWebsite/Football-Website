**FOOTBAL WEBSITE**
----
> REAL TIME FOOTBAL NEWS WEBSITE

* **URL**

  >To Login into the app <br />
  `/login`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "token": [string]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "email and password required for login"
      }
    ```
    OR
    ```json
      {
        "msg": "Username or Password Invalid"
      }
    ```

<br />

* **URL**

  >To register a user <br />
  `/google`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `id_token = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "token": [string]
    }
    ```
 
* **Error Response:**

  **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error }`

<br />

* **URL**

  >To register a user <br />
  `/register`

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `name = [string]`<br />
   `email = [string]`<br />
   `password = [string]`

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    {
      "msg": "[register.name] successfully registered!"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "name cannot be empty,Use the right email format,Password cannot be empty"
      }
    ```

<br />

* **URL**

  >To see the videos <br />
  `/football-video`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
  **Content:** 
    ```json
    [
    {
        "title": "Aston Villa - Manchester United",
        "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:calc(56.25% + 335px);' class='scorebatEmbeddedPlayerW'><iframe src='https://www.scorebat.com/embed/g/821182/?s=2' frameborder='0' width='560' height='650' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;' class='scorebatEmbeddedPlayer'></iframe></div>",
        "url": "https://www.scorebat.com/aston-villa-vs-manchester-united-live-stream/",
        "thumbnail": "https://www.scorebat.com/og/m/og821182.jpeg",
        "date": "2020-07-09T19:15:00+0000",
        "side1": {
            "name": "Aston Villa",
            "url": "https://www.scorebat.com/live-stream/aston-villa/"
        },
        "side2": {
            "name": "Manchester United",
            "url": "https://www.scorebat.com/live-stream/manchester-united/"
        },
        "competition": {
            "name": "ENGLAND: Premier League",
            "id": 15,
            "url": "https://www.scorebat.com/england-premier-league-live-scores/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https://www.scorebat.com/embed/v/5f07df898071a/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
            }
        ]
    }
    ]
    ```
 
* **Error Response:**

  **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
  OR

  **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ error }`

<br />

* **URL**

  >To lastest version <br />
  `/news/premierleague`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
    ```

* **Success Response:**
  
  **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "data": {
        "status": "ok",
        "totalResults": 2341,
        "articles": [
            {
                "source": {
                    "id": null,
                    "name": "Sky Sports"
                },
                "author": "Sky Sports",
                "title": "How to play tonight's Sky Sports News Quiz",
                "description": "Sky Sports News is set to host another interactive quiz on Friday evening as we build up to Sunday's north London derby.",
            }
        ]
        }
    }
    ```
 
* **Error Response:**

  **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
  
  OR

  **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`

<br />

* **URL**

  >To Get The Latest Standing Table <br />
  `/matchdata/standings`

* **Method:**

  `GET`

* **Request Header:**

  ```json
    {
      "token": < user token >
    }
  ```

* **Success Response:**
  
  **Code:** 200 OK <br />
    **Content:** 
    ```json
    {
        "data": {
        "success": true,
        "data": {
            "table": [
                {
                    "league_id": "25",
                    "season_id": "4",
                    "name": "Liverpool",
                    "rank": "1",
                    "points": "92",
                    "matches": "34",
                    "goal_diff": "49",
                    "goals_scored": "75",
                    "goals_conceded": "26",
                    "lost": "2",
                    "drawn": "2",
                    "won": "30",
                    "team_id": "7",
                    "competition_id": "2"
                }
            ]
        }
    }
    ```
 
* **Error Response:**

  **Code:** 400 Bad Request<br />
    **Content:**
    ```json
      {
        "msg": "token invalid!"
      }
    ```
  
  OR

  **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:** `{ msg }`