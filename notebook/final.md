## Synopsis of Project Goal(s) [15 pt]
Our project goal was to build a professional-looking web application that recognizes mountains based on a user-uploaded picture. Getting slightly more in-depth, our goal for our minimum viable product was to create a website hosted in a fashion that anyone can access permanently (that is remotely hosted). It would take uploaded photos of mountains around Laramie determined to be the valid set. The minimum performance of the classifier should be a prediction accuracy greater than 1/m where m is the number of valid mountains (hopefully much better).

## Link to all written status updates [5 pt]
[Status Update Folder](https://github.com/AustinStephen/Senior_Design/tree/main/status)  
[Status Update 1](https://github.com/AustinStephen/Senior_Design/blob/main/status/status1.md)  
[Status Update 2](https://github.com/AustinStephen/Senior_Design/blob/main/status/status2.md)  
[Status Update 3](https://github.com/AustinStephen/Senior_Design/blob/main/status/status3.md)  
[Status Update 4](https://github.com/AustinStephen/Senior_Design/blob/main/status/status4.md)

## Links to all videos created (see other assignments) [5 pt]
[Final Project Videos Assignment](https://www.youtube.com/watch?v=sIGszdQ9ujY)  
[Back-Up Video Demo for URID](https://drive.google.com/file/d/1BdWOpUfUigolvg_ECxcupuMMS9Z2JxYz/view?usp=sharing)

## Project Planning and Execution [15 pt]
### Link to (or markdown version of) Design Requirements & Specification  
Our design requirements and specification can best be summarized in this [system diagram](https://github.com/AustinStephen/Senior_Design/blob/main/notebook/System%20Diagram.png).  
### Finalized Plan of Work (including expected vs actual)  
Our finalized plan broke our project down into expected user interactions, the web application, and the mountain classifier components of our project as described below:  
#### User Interactions:  
Users navigate to our website (on their mobile phone most of the time, but occasionally on their computer) and navigate to our UI to upload an image. This will bring up a form asking them for the image and to fill in some data about the image (such as location and season). They will then submit the form and after a quick moment, our program will pop up with the name of the mountain we think their image is of.  
#### Web Application:  
Our web application’s main job is to tie our user to our mountain classifier. The web application will take in user input as described above, pass that user input to the mountain classifier, get data back from the classifier, and then pass that result to the user. The web application itself is composed of a back-end to interface with the classifier and for hosting the application itself. We plan on using AWS for hosting. We plan on using Angular to design and build the front-end of our website, which therefore means that we will need a collection of Angular Services and Components (made up of Typescript, HTML, and SCSS files) to build our final product and each page with the desired functionality of the website (such as a home page, form for the user to fill out, and classifier results page).  
#### Mountain Classifier:
A supervised deep learning model that takes in pixel values and predicts the class for the particular mountain. This model will be trained on a web scraped corpus of labeled mountain images. We will increase the scope of this model as we progress the project to recognize more mountains, however, the mountains will be around Laramie to start. We chose this subset of mountains because we can physically test it and not just rely on test set accuracy.  
We did essentially stick to this plan in terms of what we ended up executing over the course of Senior Design II.

## Summary of Final Implementation: [40 pt]

### Design

The final design contains a fully functioning mobile friendly website. It deploys both a convolutional neural network and a function that computes probabilities based on locations. It currently works for 6 mountains: Medicine Bow Peak, Pole Mountain, Mount Rainier, Half Dome, Maroon Peak, and Grand Teton.

### Limitations

The project has limited accuracy because of the models we use to predict the mountain you are looking at. 

### Future Direction

The vision model could probably see monotonic improvements if its training data was increased for thousands of images. Similarly, the location has lots of directions for potential improvement. For example, we’d like to alter the formulation to include the peak’s prominence and obstructing geography.

Another direction of future work is automatically extracting the location information from the  images. This would lower the burden for the user improving their overall experience.

## Statement of Work
### Austin 
I worked on the mountain classification models. I built the computer vision model in python and collected all of the necessary data for training this model.  I also, wrote out the formulation for the location model but did not put it into the website itself. 

### Addie 
I worked solely on the website side of things for the project. I managed our AWS account and build/deployment process via AWS Amplify hosting, worked on our site’s theming, and worked on the About Us, Mountain Gallery, and How it Works site pages.

### Dylan 
I worked on the data transformation that occurred on the front-end. I was also responsible for ensuring that the model was deployed on the front-end and the two probability models were implemented correctly. In terms of the web pages, I worked on the Home page, About Us page, and the mountain gallery page. I mainly designed the home page while laying out the html for the about us page. I only assisted slightly on the mountain gallery page

## Reflection on your team's ability to design, implement, and evaluate a solution. [20 pt]
Lessons Learned, 
"If you had to do it all over again", and
Advice for future teams

Austin: I learned that it is easy to build a simple computer vision model, but to get one that works well in practice is an entirely different challenge. I also learned if you will have to manually go through each of the observations for deep learning it is probably not worth it. It is just such a sample inefficient methodology that I will become a part time data annotator for months just to get the 10s of thousands of images that would make the best possible performing model. Future students I encourage to spend lots of time investigating how easy it is to get the data you want to use for deep learning. 

Austin: I also recommend for teams to start building the project in the last month of the first semester of senior design. I think doing a couple very small proof of concept implementations will help you make better big decisions for the whole project in the second semester. 

Addie: For any sort of user interface, I would recommend sitting down during Senior Design I at some point to not only discuss what the UI should do, but also how it should be laid out, what pages should exist (what should be separated into different pages), and essentially just form a master plan of what the end goal of the site is in terms of more than just functionality, but also organization. Over the course of this project, I learned that this is a harder task than I initially thought and requires a thoughtful design to create a final, polished, and professional look.

Dylan: For any type of project, it is always helpful to expand your knowledge on what's been done in the project scope and what is to be desired. You can never have too much background information on a topic. I would recommend using any and all pre-built tools such as coding libraries and frameworks. The less functionality you have to solely create, the faster you can implement your project into code or development.
