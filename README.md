# Prerequisites for Linux

### copy this project from github and install dependency 

Open your terminal from the project folder end copy this string to an open terminal

    git clone git@github.com:multicalor/express

    npm install

find the ".env copy" file in the project folder and rename to .env

### installation elasticsearch

execute instruction from [link](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-20-04-ru)

for start elastic search node enter to terminal from eny folder 

    sudo systemctl start elasticsearch

## Start serve 

open terminal from the root project folder and enter command line

    npm run dev


if everything was done correctly you should see in the terminal

    Server started on port 5000

## RESTapi endpoints

BASE_URL
    localhost:5000/api

#### Loading data from api book and loading it into elasticsearch

request:

POST /search/:size/:searchText

    //example
    localhost:5000/api/2/and

size - maximum number of results returned
searchText - the word to search for

response:

    {
    "status": 200,
    "data": [
        {
        "elastic_id": "gZIbJnsBLRRl-8y7LiGY",
        "body": {
            "title": "'ROCK OF AGES: ''ROLLING STONE'' HISTORY OF ROCK AND ROLL'",
            "description": null,
            "contributor": null,
            "author": "GEOFFREY STOKES, KEN TUCKER' 'ED WARD",
            "contributor_note": null,
            "price": "0.00",
            "age_group": null,
            "publisher": null,
            "isbns": [
            {
                "isbn10": "0671630687",
                "isbn13": "9780671630683"
            }
            ],
            "ranks_history": [],
            "reviews": [
            {
                "book_review_link": "",
                "first_chapter_link": null,
                "sunday_review_link": "https://www.nytimes.com/1986/12/28/books/three-chord-music-in-a-three-piece-suit.html",
                "article_chapter_link": null
            }
            ]
        }
        },
        {
        "elastic_id": "gpIbJnsBLRRl-8y7LiGY",
        "body": {
            "title": "'THE HIGH ROAD TO CHINA: GEORGE BOGLE, THE PANCHEN LAMA AND THE FIRST BRITISH EXPEDITION TO TIBET'",
            "description": null,
            "contributor": null,
            "author": "KATE TELTSCHER",
            "contributor_note": null,
            "price": "0.00",
            "age_group": null,
            "publisher": null,
            "isbns": [
            {
                "isbn10": "0374217009",
                "isbn13": "9780374217006"
            }
            ],
            "ranks_history": [],
            "reviews": [
            {
                "book_review_link": "",
                "first_chapter_link": null,
                "sunday_review_link": "https://www.nytimes.com/2007/04/22/books/review/Stuart.t.html",
                "article_chapter_link": null
            }
            ]
        }
        }
    ]
    }
#### main response fields 

elastic_id - id from manipulate data into elasticsearch

body - main data json object

#### finding data in elasticsearch
request:
GET /search/:size/:searchText

    //example
    localhost:5000/api/2/and

status - http status code
size - maximum number of results returned
searchText - the word to search for

response:

    {
    "status": 200,
    "data": [
        {
        "elasic_id": "DaeaG3sBdU6PEavMfozV",
        "body": {
            "title": "Ada: A Life And A Legacy (History of Computing)",
            "description": null,
            "contributor": null,
            "author": "Dorothy Stein",
            "contributor_note": null,
            "price": "0.00",
            "age_group": null,
            "publisher": null,
            "isbns": [
            {
                "isbn10": "0262691167",
                "isbn13": "9780262691161"
            }
            ],
            "ranks_history": [],
            "reviews": [
            {
                "book_review_link": "",
                "first_chapter_link": null,
                "sunday_review_link": "https://www.nytimes.com/1985/12/29/books/less-and-more-than-meets-the-eye.html",
                "article_chapter_link": null
            }
            ]
        }
        },
        {
        "elasic_id": "mvi9HHsBGooBqTwS-4f7",
        "body": {
            "title": "Ada: A Life And A Legacy (History of Computing)",
            "description": null,
            "contributor": null,
            "author": "Dorothy Stein",
            "contributor_note": null,
            "price": "0.00",
            "age_group": null,
            "publisher": null,
            "isbns": [
            {
                "isbn10": "0262691167",
                "isbn13": "9780262691161"
            }
            ],
            "ranks_history": [],
            "reviews": [
            {
                "book_review_link": "",
                "first_chapter_link": null,
                "sunday_review_link": "https://www.nytimes.com/1985/12/29/books/less-and-more-than-meets-the-eye.html",
                "article_chapter_link": null
            }
            ]
        }
        }
    ]
    }








