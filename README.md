# Project 3: Around The U.S.

## Overview  

* Intro
* Technologies Used
* Figma  
* Images
* Link
* TODO

**Intro**
  
Around the US allows users to comfortably view, like, and add images, as well as change profile information, on any device they like, from desktop and laptop computers, down to tablets and mobile devices.

**Technologies Used**
* Media queries to fit all screen sizes
* HTML Forms to allow for changing profile information or adding new images
* Form validation to ensure all information added is applicable
* Grid layout in order to adapt layout and to allow the number of images to scale properly
* OOP to organize the script logic
  
**Figma**  
  
* [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)  
  
**Images**  
  
![Showcase of project features](../assets/around_US_showcase.gif?raw=true)

**Link**
* [Link to the project on Github Pages](https://meidoragon.github.cio/se_project_aroundtheus/)

**TODO** 

* Using the spacing values from the brief, determine if any of them can be represented by a simple calc(Xvw - Ypx) to allow meeting the design requirements for some of them without using media queries. Not because it should be done, but because I want to know. Main example that interested me was the copywrite text in the footer. 
* Pull the initialCards const out of index.js and have it be its own file that gets imported. Probably set it up as JSON or something. Would need to include some variety of sorting so that the elements get created in the correct order. But this would allow it to scale for more cards in the gallery.
* Save changes made by user for use between sessions.
