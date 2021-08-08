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

status - http status code
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

ERROR 
    { "details": "no books on your request" }
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

ERROR 

    { "details": "no books on your request" }

####  Update record in elasticsearch 

request:

body [JSON]

    {
        "elastic_id": "T8zrIXsBHIgwzV8nUGDl",
        "body": {
        "rank": 1,
        "rank_last_week": 2,
        "weeks_on_list": 13,
        "asterisk": 0,
        "dagger": 0,
        "primary_isbn10": "1501171348",
        "primary_isbn13": "9781501171345",
        "publisher": "Simon & Schuster",
        "description": "11111111111111111111111111111111111",
        "price": "0.00",
        "title": "THE LAST THING HE TOLD ME",
        "author": "Laura Dave",
        "contributor": "by Laura Dave",
        "contributor_note": "",
        "book_image": "https://storage.googleapis.com/du-prd/books/images/9781501171345.jpg",
        "book_image_width": 331,
        "book_image_height": 500,
        "amazon_product_url": "https://www.amazon.com/dp/1501171348?tag=NYTBSREV-20",
        "age_group": "",
        "book_review_link": "",
        "first_chapter_link": "",
        "sunday_review_link": "",
        "article_chapter_link": "",
        "isbns": [
            {
            "isbn10": "1501171348",
            "isbn13": "9781501171345"
            },
            {
            "isbn10": "1501171364",
            "isbn13": "9781501171369"
            },
            {
            "isbn10": "1797124749",
            "isbn13": "9781797124742"
            }
        ],
        "buy_links": [
            {
            "name": "Amazon",
            "url": "https://www.amazon.com/dp/1501171348?tag=NYTBSREV-20"
            },
            {
            "name": "Apple Books",
            "url": "https://du-gae-books-dot-nyt-du-prd.appspot.com/buy?title=THE+LAST+THING+HE+TOLD+ME&author=Laura+Dave"
            },
            {
            "name": "Barnes and Noble",
            "url": "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781501171345"
            },
            {
            "name": "Books-A-Million",
            "url": "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BLAST%252BTHING%252BHE%252BTOLD%252BME%252FLaura%252BDave%252F9781501171345&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BLAST%252BTHING%252BHE%252BTOLD%252BME%252BLaura%252BDave"
            },
            {
            "name": "Bookshop",
            "url": "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781501171345&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Fkeywords%3DTHE%2BLAST%2BTHING%2BHE%2BTOLD%2BME"
            },
            {
            "name": "IndieBound",
            "url": "https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781501171345%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BLAST%2BTHING%2BHE%2BTOLD%2BME%2BLaura%2BDave%26aff%3DNYT"
            }
        ],
        "book_uri": "nyt://book/b38ae769-e873-5272-bb5a-c58a35162db1"
        }
    }

elastic_id - id of the record to be updated
body - new data for update

response:

    {
    "status": 200,
    "details": "updated"
    }

ERROR:

    { "details": "no books on your request" }

#### Delete record in elasticsearch

elastic_id - id of the record to be deleted

response:

    {
    "status": 200,
    "details": "delete"
    }

ERROR:

    { "details": "there are no records to delete for your request, you may have requested an invalid id" }

#### Get record by id from elasticsearch

elastic_id - id of the record to be deleted

response:

    {
    "status": 200,
    "details": "delete"
    }

ERROR:

    { "details": "there are no records to delete for your request, you may have requested an invalid id" }





