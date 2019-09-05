## Secret Family Recipes - API Documentation
---
#### Endpoint
https://ls-secret-family-recipes.herokuapp.com

#### ER Diagram
https://dbdesigner.page.link/tx7R

---
## Routes


#### Register
| Method | Endpoint        | Description                                                                                                                                               |
| ------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `auth/register` | Registers a new user with the system. Returns a JWT if successful. </br>~</br>Requires `family_name`, `first_name`, `last_name`, `email`, and `password`. |

</br>

#### Login
| Method | Endpoint     | Description                                                              |
| ------ | ------------ | ------------------------------------------------------------------------ |
| POST   | `auth/login` | Returns a JWT if successful. </br>~</br>Requires `email` and `password`. |

</br>

#### Users
| Method | Endpoint     | Description                                                                                                                     |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/users`     | Returns an array of objects representing all users in the database.                                                             |
| GET    | `/users/:id` | Returns an object of the user specified by the user id.                                                                         |
| PUT    | `/users/:id` | Updates a user specified by the user id. </br>~</br>Requires `family_name`, `first_name`, `last_name`, `email`, and `password`. |
| DELETE | `/users/:id` | Deletes a user specified by the user id.                                                                                        |

</br>

#### Recipes

| Method | Endpoint                | Description                                                                                                                                      |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET    | `/recipes`              | Returns an array of objects representing all recipes in the database                                                                             |
| GET    | `/recipes/:id`          | Returns a recipe specified by the recipe id.                                                                                                     |
| GET    | `/recipes/:category_id` | Returns an array of objects representing all recipes with the specified category id.                                                             |  |
| POST   | `/recipes`              | Adds a new recipe to database and returns the newly created recipe back. </br>~</br>Requires from `title`, `created_by`, `category_id`, `author` |
| PUT    | `/recipes/:id`          | Updates a recipe specified by the recipe id. </br>~</br>Requires `title`, `created_by`, `category_id`, `author`                                  |
| DELETE | `/recipes/:id`          | Deletes a recipe specified by the recipe id                                                                                                      |

</br>

#### Ingredients
****
| Method | Endpoint                              | Description                                                                                                                                          |
| ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/recipes/:recipe_id/ingredients`     | Returns an array of objects representing all ingredients referenced by the recipe_id                                                                 |
| POST   | `/recipes/:recipe_id/ingredients`     | Adds a new ingredient to the database.</br>~</br>Requires `recipe_id`, `name`, `quantity`, `measurement_id`, `preparation`                           |
| PUT    | `/recipes/:recipe_id/ingredients/:id` | Updates an ingredient specified by the recipe and ingredient id.</br>~</br>Requires `recipe_id`, `name`, `quantity`, `measurement_id`, `preparation` |
| DELETE | `/recipes/:recipe_id/ingredients/:id` | Deletes an ingredient specified by the recipe id                                                                                                     |

</br>

#### Steps

| Method | Endpoint                        | Description                                                                                       |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------- |
| GET    | `/recipes/:recipe_id/steps`     | Returns an array of objects representing all steps referenced by the recipe id                    |
| POST   | `/recipes/:recipe_id/steps`     | Adds a new step to the recipe.</br>~</br>Requires `recipe_id`, `description`                      |
| PUT    | `/recipes/:recipe_id/steps/:id` | Updates a step specified by the recipe and step id.</br>~</br>Requires `recipe_id`, `description` |
| DELETE | `/recipes/recipe_id/steps/:id`  | Deletes a step specified by the recipe and step id.                                               |

</br>

#### Measurements
| Method | Endpoint            | Description                                                                        |
| ------ | ------------------- | ---------------------------------------------------------------------------------- |
| GET    | `/measurements`     | Returns an array of objects representing all measurment types                      |
| POST   | `/measurements`     | Adds a new measurement to the database.</br>~</br> Requires `name`.                |
| PUT    | `/measurements/:id` | Updates a measurement specified by the measurement id.</br>~</br> Requires `name`. |
| DELETE | `/measurements/:id` | Deletes a measurement specified by the measurement id.                             |

</br>

#### Categories
| Method | Endpoint          | Description                                                                 |
| ------ | ----------------- | --------------------------------------------------------------------------- |
| GET    | `/categories`     | Returns an array of objects representing all categories.                    |
| POST   | `/categories`     | Adds a new category to the database.</br>~</br>Requires `name`.             |
| PUT    | `/categories/:id` | Updates a category specified by the category id.</br>~</br>Requires `name`. |
| DELETE | `/categories/:id` | Deletes a category specified by the category id.                            |

---

## Proposal

- What problem does your app solve?

	Creates a place to store treasured family recipes that’s secure and only viewable to the owner of the recipes. Recipes once written down in books and paper can be preserved over time without fear of them being lost or degraded.

- Be as specific as possible; how does your app solve the problem?

	Our app allows family members from young to old the ability to record and access recipes from anywhere via mobile or desktop online connection. Our app essentially converts treasured paper documents to digital files that will virtually last forever.

- What is the mission statement?

	Family history is invaluable. Paper crumbles and is one coffee spill away from being gone forever. Don’t take the risk! Secret Family Recipes Cookbook stores your family recipe secrets as long as the internet exists, so basically forever. 
	
#### Features

- What features are required for your minimum viable product?

1. A user should be able to register their username and password
2. A user should be able to login into a private account
3. A user should be able to logout of their account
4. A user should be sent to their personal homepage that lists all recipes when they log into their account
5. A user should be able to search for recipes by title
6. A user should be able to search for recipes by category (tag)
7. A user should be able to enter a new recipe with the following fields:
    - Title
    - Source
    - Ingredients
    - Instructions
    - Category
8. A user should be able to edit an existing recipe
9. A user should be able to delete an existing recipe

- What features may you wish to put in a future release?

1. A user should be able to upload a picture of the original recipe when creating new entries
1. A user should be able to update current entries with an image upload
1. A user should be able to add their email address to their account
1. A user should be able to click ‘forgot password’ and be sent a password reset link via email (if present)

- What do the top 3 similar apps do for their users?

https://www.home.organizeat.com/

Our main goal is to allow quick and easy creation of recipes. When it comes to mobile devices, the simplest way to save something is by taking a photo of it. What kind of photo? Anything. A cut out of a magazine, a recipe printed from the internet, handwritten recipe card, a page in your favorite cookbook, a screenshot of a web page with an interesting recipe. In the app those photos are organized by categories and tags, turning this messy recipes pile into a well structured, digital recipe collection.

https://www.bigoven.com

With BigOven, you can take your recipes anywhere, make grocery lists and easily share your favorite creations with your friends, family or even your future self when you need them. Our Kitchen Cloud platform enables new recipe, shopping and nutrition applications with our API, connecting home cooks with the foods they love, allowing developers, bloggers and webmasters to add recipes and shopping lists to their apps.



https://www.mycookbook-online.net/en/home/

My Cookbook offers some of the same features as BigOven, but it’s free in limited quantities. Choose to add a recipe manually or import one from the internet. Like BigOven, My Cookbook connects to your browser, allowing you to transfer recipes from a web page to the app.

You can also create a shopping list almost instantaneously based off your ingredients. There’s no need to write out a shopping list that you’ll forget to bring with you to the store (which happens to me every time). My Cookbook’s free meal planner even gives you the tools to create a menu for the entire week.
Frameworks - Libraries

- What 3rd party frameworks/libraries are you considering using?
- Do APIs require you to contact its maintainer to gain access?
- Are you required to pay to use the API?
- Have you considered using Apple Frameworks? (MapKit, Healthkit, ARKit?)
For Data Scientists


- Describe the Established data source with at least rough data able to be provided on day 1. 
- You can gather information about the data set you’ll be working with from the project description. Be sure to collaborate with your PM, and your Backend Architect to chat about the resources you have.
- Write a description for what the DS problem is (what uncertainty/prediction are we trying to do here? Sentiment analysis? Why is this a useful solution to a problem?)
- A target (e.g. JSON format or such) for output that DS students can deliver to web/other students for them to ingest and use in the app

#### Target Audience

- Who is your target audience? Be specific.

Our target audience is anyone with internet access as we aim to make the experience as accessible and user friendly as possible. If an age range must be defined, then our audience will range from adolescent to late adulthood. 

- What feedback have you gotten from potential users?

Our users would like to the most intuitive experience as possible. Many recipes sites/apps currently exist, but the biggest issue we’ve discovered is that many of them are overly complicated to use. We aim for our users to be able to login, store, and retrieve a recipe as quickly as possible. 

- Have you validated the problem and your solution with your target audience? How?

https://docs.google.com/forms/d/e/1FAIpQLSfHATVt2RAL7t3emlkqy40p-X8pGlDtoCSO4ZQwLYPDIM0Xkg/viewform?usp=sf_link

Form surveys were collected from 5 individuals ranging in age, sex, and location. From the research collected, we decided to move forward with creating a better, more intuitive cookbook app.

#### Research

- Research thoroughly before writing a single line of code. Solidify the features of your app conceptually before implementation. Spend the weekend researching so you can hit the ground running on Monday.
Prototype Key Feature(s)

- This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.



