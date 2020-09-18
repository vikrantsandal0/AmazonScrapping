# scrapping-amazon-urls
* A simple scrapper written in node.js to scrap amazon web pages.
### Tech-stack used
* express.js - a back end web application framework for Node.js.
* redis - In-memory caching solution used for fast access to API responses.
* chai.js - JavaScript testing framework for writing unit test cases.
* axios - Promise based HTTP client for the browser and node.js.
* cheerio -  jQuery for Node.js which makes it easy to select, edit, and view DOM elements.
* joi - powerful schema description language and data validator for JavaScript.



### The whole functionality of web scraping can be broken down into two main steps:

* Fetching the HTML source code of the website through an HTTP request or by using a headless browser.
* Parsing the raw data to extract just the information we are interested in.


### API RESPONSE EXAMPLES
   * **API results after we post an URL through /scrapurl API**
```{
  "message": "Successful",
  "status": 200,
  "data": {
    "title": "Apple iPhone 11 (64GB) - Purple",
    "canonical": "https://www.amazon.in/Apple-iPhone-11-64GB-Purple/dp/B07XVL4P83",
    "rating": "4.5 out of 5 stars",
    "og_description": "Apple iPhone 11 (64GB) - Purple: Amazon.in: Electronics",
    "price": "₹ 61,990.00",
    "og_title":  Apple iPhone 11 (64GB),
    "og_url": https://www.amazon.in/Apple-iPhone-11-64GB-Purple/dp/B07XVL4P83,
    "og_img" : img url,
    "og_type" : type of your object,
    "images" : [url1, url2, url3...]
  }
}
```
####  Response data parameters explaination
* title - title of the product extracted from unique html span with a id **productTitle**.
* rating - rating of the product extracted using css selector.
* price - price of the product extracted from unique html span with a id **priceblock_ourprice**.
* images - images of the product extracted from web page using img tag.

**extracting metadata from web pages.Adding Open Graph tags to your website influence the performance of your links on internet or social media and makes it worth looking into**
* og_description - extracting description from <meta> tags in the <head> of web page.
* og_title - extracting title from <meta> tags in the <head> of web page as it should appear within the graph.
* og_url - extracting canonical URL used as permanent ID in the graph.
* og_type - extracting type used in graph.
* og_img - extracting image URL that represents object in the graph.

####  Caching implementation
* Redis is all about data structures. It's a key/value store so we'll make use of that to store our results. we store our API results into redis using Redis's SET using a time to live and let it manage how much memory it used for this and expire out the old data. 
* looking up the incoming request's url and check if theres already some data stored corresponding to it which hasnt expired yet, hence in this way Offloading responsibilities from the application’s main logic to the caching layer frees up compute resources to process more incoming requests.



 ### FOLDER STRUCTURE AND HOW TO INITIATE
 * the complete structure has been built using Node.js, other libs like bluebird, joi etc.
 * modules -> scrapping  contains the parent API for scrapping urls.
 * routes -> commonfunction.js contains API request body validation , setting and getting data from redis.
 * to run first -> npm install -> redis-server -> node server.js

### POSTMAN
[link](https://www.getpostman.com/collections/aea7a276e89f17e4886c)

### images for reference
![screenshot1](https://user-images.githubusercontent.com/38485799/95653531-facf2e80-0b16-11eb-90ea-520dfccbefc4.jpg)<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
![Screenshot2](https://user-images.githubusercontent.com/38485799/95653387-10902400-0b16-11eb-80e5-28cd5997fe42.png)<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
![Screenshot3](https://user-images.githubusercontent.com/38485799/95653392-1554d800-0b16-11eb-8eb8-3a97126a6486.png)


