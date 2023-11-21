# TABLES/ERD

*	User
  -	ID
  -	Name
  -	Email
  -	Password
  -	Location (stretch)
  -	Status(active/deactivated)
*	Category/Lists:
  -	Movies/Series (IMDB API - https://imdb-api.com/api#Title-header)
    +	ID
    +	Title
    +	Type (movie/series)
    +	Status (complete/incomplete)
    +	Timestamp for added
    +	Timestamp for completed
    + Genre (genreList)
    +	Rating (ratings)
    +	Priority
    +	Due date
  -	Restaurants/Food (Yelp API - https://docs.developer.yelp.com/reference/v3_business_search)
    +	ID
    +	Name (term)
    +	Type of cuisine
    +	Closest location (stretch)
    +	Status (complete/incomplete)
    +	Timestamp for added
    +	Timestamp for completed
    + Rating
    +	Priority
    +	Due date
  -	Books (Amazon API - https://developer-docs.amazon.com/amazon-business/docs/product-search-api-v1-reference)
    +	ID
    +	Title
    +	Author
    +	Publisher
    +	Status (complete/incomplete)
    +	Timestamp for added
    +	Timestamp for completed
    + Rating
    +	Priority
    +	Due date
  -	Products (Amazon API - https://developer-docs.amazon.com/amazon-business/docs/product-search-api-v1-reference)
    +	ID
    +	Name (use "keywords" amazon API)
    +	Price
    +	Category/type of product (use "category" amazon API)
    +	Status (complete/incomplete)
    +	Timestamp for added
    +	Timestamp for completed
    + Rating
    +	Priority
    +	Due date
  -	Other/Uncategorized
    +	ID
    +	Thing To Do
    +	Status (complete/incomplete)
    +	Timestamp for added
    +	Timestamp for completed
    +	Priority
    +	Due date