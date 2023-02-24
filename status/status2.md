## Recap of what was planned for the last 3 weeks [5pt]


Addie: My plan for the past three weeks was to implement a custom site color scheme and begin incorporating styling into the site.


Austin: My next steps were to improve the model, and prepare it for deployment with Dylan.


Dylan: The plan for the previous three weeks was to finish the data collection that is necessary from the UI. Also plan on meeting with Austin for implementing the model into the front end application.


## Tasks Completed What was done during the last 3 weeks (by whom) [5 pt]


Austin:  I implemented feature augmentation for the model that predicts what image of a mountain it was given.


Addie: I implemented a custom theme.scss stylesheet to set a unified color palette for us to use throughout the site (and easily incorporate into any Angular Material components). I additionally began playing with the look of the site by beginning to implement the custom color theme, and spiffing up various elements of the site (mainly the toolbar, mountain carousel, and site favicon).


Dylan: I implemented the data collection necessary for the model parameters that are to be supplied by the user. Now, the site takes in photos, a user crops the image, and the image is then transformed into its RGBA values. The site also collects the necessary geographical information on where the user was when they took the photo.


We all also met with Ward.  


## Successes [5pt]
The website made major progress and the model implementation made moderate progress. It’s a big win to have the majority of our minimum viable product complete with a classification model working on a limited set of mountains and a website that guides a user through the process of uploading their image.


## Roadblocks/Challenges [5pts]
Getting feature augmentation to both increase the training data and increase robustness to overfitting caused a lot of problems. Looking forward, it will still be a challenge to get our model working past our MVP, in terms of being able to quantify a meaningfully large set of mountains. Additionally, as we scale up, we need to consider how a larger quantity of data will be shared between our model and website and if a database will be needed (which will cause its own set of challenges).


## Changes/Deviation from Plan ​(if applicable - if not, say so!) [0 pts]


No major deviations from the plan.


## Details Description of Goals/ Plan for ​Next 3 Weeks [5pts]


Austin: I plan to get the model prepared for deployment, add more mountains, and add the weighted priors to incorporate the geographic data. 


Addie: During the next three weeks, I aim to get the website’s layout both mobile and web friendly. I additionally aim to edit the “About Us” page to get that essentially finalized.


Dylan: I plan on continuous formatting of the data collection form to ensure that it is user friendly on both desktop and mobile views. As the UI is starting to meet the MVP, I will continue to see what data we can collect on the mountains we will identify and see how we can add data visualizations of the mountain’s various geo data.


## Confidence on completion from each team member + team average [5 pts]
Scale of 1-5; 1 = not-confident; 3 = toss-up; 5 = confident  
Austin: 5  
Addie: 5  
Dylan: 5  
Team average: 5