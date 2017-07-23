# Onerent coding challenge

We've recently added machine learning image tagging via the Google Cloud Vision API. Set up a simple app that allows people to search our available properties by image tags. Here's how it should look:

Simple backend that calls our endpoint (POST http://www.onerent.co/api/Property/availableProperties) and relays the available properties to the web app
Web app should show a simple list (property address and rent price) of all the properties loaded
Add a search box at the top that allows the user to filter by labels they care about (hardwood floor, dishwasher, etc.) and show the properties whose images match that filter
Allow the user to click on a property's name to expand its images
You can find the image labels on each property in the response payload at images[].labels along with the confidence rating for each label
Include any information or documentation that might help us understand your code
Any other features you think would be cool--creativity encouraged!
If you can build this simple app and get it to us within the next week, we can move to the next steps. Feel free to use any programming language or technologies that you prefer.

Let me know if you have any questions--we're excited about the potential of having you on the team!

## Technologies:
NodeJS 6.11.1
ReactJS via create-react-app
Express
Reactstrap

## Assumptions:
Was unable to find images[] and "rent price" property as mentioned so I used the defaultImages[] and targetRent properties instead as it was the closest I could find.

## Install dependencies:
$ npm install && cd client && npm install

## To run Development mode (slower due to caching):
$ npm run start

## To run Production mode:
$ npm run start-production