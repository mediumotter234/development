# Development

### Link to Deployed Website
If you used the stencil code, this is `https://mediumotter234.github.io/development`

### Goal and Value of the Application

The goal of this application is to provide the starting point for a site where users can browse movies and add them to a watchlist. They are able to filter by genre and rating, sort by recency, and add to and remove from a watchlist which aggregates a total runtime. Other values and information about the films are also available in each film card item including a description.

### Usability Principles Considered

I felt that for usability, having the filter, sort, and 'view watchlist' options at the top of the screen made most sense. This way the user can always return to the top of the site when they want to edit these parameters (even though currently, with only 12 items, the site doesn't scroll very much anyway). Furthermore, the hierarchy I used to display info in each film card item follows that which I've seen many times before in similar settings, with the title and year of the film highest, then runtime, ratings, and description last. I put the add/remove buttons directly under each image poster as I felt like the image poster was going to be the most recognizable/familiar aspect of each film card item on a user's second, third, etc. passes through the cards. 

### Organization of Components

I have two main components, a MovieItem component and a FilterOption component. The MovieItem component represents everything in each movie card item that's shown, and the FilterOption component describes each filter option provided.

### How Data is Passed Down Through Components

The MovieItem component receives a movie item, watchlist, and onclick function as its props. The movie item contains all the movie data for a movie, including its image path. The watchlist contains the current set of films in the watchlist, and the component uses this list to determine what the state of the add/remove button should be for that movie. The onclick function handles what should happen when the user adds/removes the film to/from the watchlist.

The FilterOption component receives a type, id, name, onChange function, and checked boolean as its props. The first three just represent the basic info of the filtering option - its id, the name of it, and the type of filter option (checkbox or radio). The onchange function handles what should happen when the user checks or unchecks the filtering option, and the checked boolean represents whether or not the filtering option should be rendered as selected or not.

### How the User Triggers State Changes

I useState() twice. The first state contains movieData, the state of the genre filters, which rating filter is selected, and which sorting option is selected. The second state contains the films in the watchlist and the total runtime of them.

When the user selects or unselects any of the filtering options or sorting dropdowns, my app has onchange functions to handle these changes. In each of these functions, the result of the user's action is taken into account in setting the new state, whether it's unchecking a genre filter or selecting a sort option. Thus at any state, the app should know which genre filters are selected, which rating filter is selected, which sorting option is selected, and whether or not the watchlist option is selected.

Once these changes are handled, every time the site is rendered, the app uses the new state to determine precisely which movies should be rendered based on the current state of the genre filters, rating filters, sort option, and watchlist option.
