# Project 3: Around The U.S.

### Overview  

* Intro  
* Figma  
* Images
* Link
* TODO

**Intro**
  
This project is made so all the elements are displayed correctly on popular screen sizes. We recommend investing more time in completing this project, since it's more difficult than previous ones.  
  
**Figma**  
  
* [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)  
  
**Images**  
  
The way you'll do this at work is by exporting images directly from Figma — we recommend doing that to practice more. Don't forget to optimize them [here](https://tinypng.com/), so your project loads faster. 
  
Good luck and have fun!

**Link**
* [Link to the project on Github Pages](https://meidoragon.github.io/se_project_aroundtheus/)

**TODO** *currently it's more of a prediction of what's to come,but if it never comes to be then it's a proper TODO.*

* Make operating the images load the full image for proper use of Right Click > Save As. Perhaps even hook it up with a proper CDN.
  *will likely require newer, better images, because these have had the corners cut off for some* mysterious *reason.*
* Using the spacing values from the brief, determine if any of them can be represented by a simple calc(Xvw - Ypx) to allow meeting the design requirements for some of them without using media queries. Not because it should be done, but because I want to know. Main example that interested me was the copywrite text in the footer. 
* Pull the initialCards const out of index.js and have it be its own file that gets imported. Probably set it up as JSON or something. Would need to include some variety of sorting so that the elements get created in the correct order. But this would allow it to scale for more cards in the gallery.