# FormPlus Assessment Test Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Yarn is my preffered package installer


## Assumption(s)

 - One assumption here is that the results can be filtered using either "order" or "date" not both
 In order words I'm saying filtering with "order" is "mutually exclusive" to filtering "date"

 - Assumption 2: search is using query string location in the names of each template (using indexOf method)

## Not Really Assumptions

 - I initially chose to use axios but later changed to "fetch" since the use case isn't complicated

 - I'm using the screen-model-components folder structure (no screen folder in this case in order to maintain code simplicity)

 - No Redux 