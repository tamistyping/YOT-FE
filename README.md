<h1>You on Tonight?</h1>
<p>Built using Django, PostgreSQL and React; You on Tonight is a Social Media website for Gamers where users can post statuses and discover games to play.</p>

<h1>Deployment Link</h1>
<p>https://youontonight.netlify.app/</p>

<h1>Brief</h1>
<ul>
  <li>Build a full-stack application by making your backend and your front-end</li>
  <li>Use a Python Django API using Django REST Framework to serve your data from a Postgres database</li>
  <li>Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models</li>
  <li>Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut</li>
  <li>Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.</li>
  <li>Be deployed online so it's publicly accessible.</li>
</ul>

<h1>Plan</h1>
<h3>I created a wireframe using Figma, sticking to a slick, but simple design.</h3>
<img width="1009" alt="Screenshot 2024-02-22 at 15 26 20" src="https://github.com/tamistyping/YOT-FE/assets/114356636/0124a11b-497a-45c8-a968-ba11a748b942">
<img width="588" alt="Screenshot 2024-02-23 at 09 29 07" src="https://github.com/tamistyping/YOT-FE/assets/114356636/8542e142-d2fb-4e3a-b68f-ebd1f790576b">

<h3>After wireframing, I mapped out tasks into a Trello board to organize the project<h3>
<img width="588" alt="Screenshot 2024-02-23 at 09 29 07" src="https://github.com/tamistyping/YOT-FE/assets/114356636/054c5a83-faac-41c0-8bf5-07c644c7c0ba">


<h3>I also mapped out a simple Entity Relationship Diagram</h3>
<img width="588" alt="Screenshot 2024-02-23 at 09 34 33" src="https://github.com/tamistyping/YOT-FE/assets/114356636/446900e0-349b-4c17-8d3f-8b6e2a8c61b0">


<h1>Development Process</h1>

<h2>Back-End structure</h2>
<p>In the initial stages of the project, I focused on shaping the backend architecture by defining the core models that represent the data structure of the application. I also connected my project to postgresql and updated my settings.py to my new database</p>
<img width="404" alt="Screenshot 2024-03-06 at 14 42 03" src="https://github.com/tamistyping/YOT-FE/assets/114356636/d05e98bc-fbdb-4adb-8895-2e44b1eb0d28">

<h2>Djoser</h2>
<p>I opted to integrate Djoser into the project for user authentication, leveraging its robust features and simplicity to streamline the authentication process. Djoser provides a powerful set of tools for handling user authentication, including registration, login, password reset, and more. I tested the endpoints via Postman</p>

<img width="777" alt="Screenshot 2024-03-06 at 14 39 01" src="https://github.com/tamistyping/YOT-FE/assets/114356636/f356575c-94ca-43c1-8db1-f2d60b04a10f">
<img width="617" alt="Screenshot 2024-02-24 at 16 53 00" src="https://github.com/tamistyping/YOT-FE/assets/114356636/8bc86421-df88-4a28-8a40-b53b413492da">

<h2>Fetching API data</h2>
<p>During the planning phase, I determined that IGDB (Internet Game Database) would be the most suitable API for my project. Their well-structured documentation made it straightforward to identify and map out the necessary data for my application. To ensure the reliability and functionality of my API endpoints, I extensively tested them using Postman.</p>
<img width="775" alt="Screenshot 2024-02-23 at 09 08 16" src="https://github.com/tamistyping/YOT-FE/assets/114356636/2ea4c4c8-9a5d-4ca8-aaa7-44d780f7b0b4">

<h2>Displaying API</h2>
<p>Initially, the display of game cards on the discover page suffered from poor resolution and lacked proper margins.</p>
<img width="563" alt="Screenshot 2024-02-26 at 14 05 38" src="https://github.com/tamistyping/YOT-FE/assets/114356636/7c120a9a-73e7-42a5-8057-d6f222805134">
<p>By incorporating "t_cover_big_2x" into my API request, the resolution problem was resolved, resulting in a significant improvement in the quality of game card display on the discover page.</p>
<img width="563" alt="Screenshot 2024-02-26 at 14 05 38" src="https://github.com/tamistyping/YOT-FE/assets/114356636/172ae9e3-d36f-4c72-93df-f09ef6d2a0ad">


<h2>Statuses</h2>
<p>To accommodate the time constraints nearing the deadline, I opted to simplify the statuses feature by refining the model structure in the backend. Instead of implementing complex status options, I streamlined the model to include only essential content options. This decision allowed for quicker development and ensured timely delivery of the project.</p>

<img width="563" alt="Screenshot 2024-02-26 at 14 05 38" src="https://github.com/tamistyping/YOT-FE/assets/114356636/67ea5ada-1834-4413-a4c6-ede252df6f05">


<h2>Profile</h2>
<p>For enhancing user profiles with personalized profile pictures, I leveraged AWS S3 buckets to facilitate seamless image uploads. This integration empowered users to personalize their profiles and added an extra layer of customization to the platform.</p>
<img width="563" alt="Screenshot 2024-02-26 at 14 05 38" src="https://github.com/tamistyping/YOT-FE/assets/114356636/3fe908a3-93b6-476e-b7a7-1c1a0a45b627">

<h1>Challenges</h1>
<p>Time constraints posed challenges in implementing certain features like showcasing the current game being played and the user's collection. Due to limited development time, priorities were set, focusing on core functionalities to meet project deadlines</p>

<h1>Successes</h1>
<h4>Happy with the UI</h4>
<p>The UI design reflects the project's vision, enhancing usability and overall user experience.</p>
<h4>Learnt about djoser</h4>
<p>A significant learning milestone was reached through exploration of Djoser, a Django package for user authentication. This newfound understanding contributes to improved project efficiency and lays a strong foundation for future development endeavors.</p>

<h1>Future Improvements</h2>
<ul>
  <li>Implementation of friend requests functionality to enhance social interaction within the platform.</li>
  <li>Addition of features such as liking and commenting under user statuses to promote engagement and interaction.</li>
  <li>Additionally, integrating a user's collection into the platform was envisioned as part of future enhancements. However, due to time constraints, this feature remains pending and could be considered for implementation in subsequent iterations.</li>
</ul>
