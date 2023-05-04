# Intelligent Discussion Board - CS Project
## Description
__This is a school project.__ Intelligent Discussion Board, a.k.a IDB, is a group CS Project.
The objective of the project is to develop an IDB using Python and Natrual Language processing skills that is able to respond to a wide range of queries. 
More information about the project is found below  in the "Background" section. 

## Project Background
Students use discussion board on elearning to their post queries. 
The queries can be answered by the instructor, TA, or other students.
Most often the queries are repetitive or trivial. 
Many students don’t follow the discussions, so they do not know that the query has already been answered. 
Many do not read the syllabus, project specs properly and post queries for which answers can easily be found in those documents. 
The purpose of IDB is remove the burden of answering these types of queries from the instructor. 
For any such types trivial queries, IDB should automatically post a response.
IDB will be developed in Python and deployed on a server. 
The UI could bean app or web-based. 
If time permits, IDN should be linked to elearning.
The project should use NLP tool kits extensively to give a human like interaction with students. 
IDB chatbot should be trained for a particular course like Systems Programming in UNIX. 
IDB should have very low error rate as we do not want to provide incorrect replies.



## Getting Started with the Backend

1. Clone this repository, *recommended IDE is VisualStudio*
2. Setup a Python Virtual Environment, *recommend version 3.10*
    * For simplicity, you can run the powershell venv command to create a venv. `.\venv.ps1` *for windows*
3. Install dependencies with `pip install -r requirements.txt`
4. Migrate database models with `py manage.py migrate`
5. Update enviorment variables (.env) to include your openai key
6. Run server with `py manage.py runserver`


## Getting Started with the Frontend

1. Check out the README.md in the frontend folder


# Final Project Report
Below is the final project report for this app. Some information was redacted for privacy reasons.

## Introduction

### 1. Project Proposal
As students engage in online discussions on eLearning platforms, they often ask repetitive or trivial questions that could easily be addressed by referring to existing resources, such as the syllabus or project specifications. However, many students fail to read through previous discussions or consult these documents before posting their queries. This creates a burden on instructors who must repeatedly respond to similar questions. 
To address this issue, our project aims to develop an intelligent discussion board (IDB) that automates the process of answering such queries. By utilizing a Next.js frontend, Django backend, and leveraging GPT-3 as our natural language processor, we will create a user-friendly and efficient platform. The IDB will alleviate the burden on instructors by automatically posting possible answers to these queries, thereby promoting a less-cluttered and more streamlines forum for student discussions.

### 2. Project Objective
Our app employs sophisticated text processing techniques to evaluate the complexity of each student's question. Upon receiving a new post, our code first compares it to existing posts to identify any similar discussions. If no matches are found, the post is then compared to class files containing relevant information.
To guide students in their queries, we have implemented an alert popup feature. When a student attempts to post a simple query, the popup is triggered. It provides valuable information about the similarity of the question to existing posts or files. If the question closely resembles a previous post, the popup displays recommended threads that should be reviewed before proceeding. Alternatively, if the question aligns with a file, the popup leverages completion complexity to attempt an answer using the relevant information from the similar file.
While the popup provides guidance, it can be skipped if the recommended material did not address the student's question adequately. This flexibility allows students to proceed with their query if they feel the recommended resources did not provide a satisfactory answer. By utilizing these mechanisms, we streamline the question-answering process, empowering students with relevant information and promoting efficient knowledge sharing within the discussion board.

### 3. Project Distinction
In comparison to traditional school discussion boards, our project stands out with its innovative integration of AI technology. While text processing is not a novel concept in the realm of AI, what sets us apart is the seamless integration of our app with the specific context of students' academic environments. While there are numerous web resources available that can answer questions, they lack the integration with individual classes and fail to provide a comprehensive solution. 
Our app takes a unique approach by incorporating AI-powered text processing capabilities and scanning documents from the students' classes, alongside analyzing other student queries. This integration allows us to deliver more tailored and contextually relevant responses, enhancing the efficiency and effectiveness of the classroom discussion experience. By providing a solution that is directly integrated into the educational ecosystem, our project offers a distinct advantage over conventional school threads and promotes a more efficient and personalized learning environment.

### 4. Project Source Code
Our project source code is hosted on Github, where you can access a similar detailed report in the readme file. Both the frontend and backend components of our application can be found in the repository. The frontend is located within the frontend folder, while the backend code is situated at the root level. The ‘qanow’ folder contains the majority of the backend information. Initially, we named our app ‘qanow’ but later decide to rebrand it as “Intelligent Discussion Board” for better clarity and representation. Our repository can be found here: https://github.com/CodedRedGIT/IDB 

## Implementation Details

### 1. Overview
Our Intelligent Discussion Board App was built with Next.js and Django. Choosing Django as the backend framework for our app offered numerous advantages, with its Python compatibility being a primary driver in our decision-making process. The seamless integration between Django and Python played a pivotal role, as Python is widely recognized for its simplicity, readability, and extensive library support, making it the language of choice for AI development. By harnessing Django's Python compatibility, we seamlessly leverage the existing AI ecosystem, including machine learning models and AI libraries, without encountering any friction. Additionally, Django's adherence to the Model-View-Controller (MVC) architectural pattern provides a well-structured and organized model architecture, which simplifies the development process, enhances code maintainability, and fosters effective collaboration among team members.
We opted to use Next.js as the frontend framework for our Intelligent Discussion Board App due to its compelling features and benefits. Next.js is a powerful React framework that provides server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR) capabilities, all within a single framework. This versatility enables us to optimize the user experience by delivering pre-rendered content for improved performance and SEO. Next.js also offers excellent developer experience with its built-in automatic code splitting and hot module reloading, allowing for rapid development and efficient collaboration among our team members. Additionally, Next.js seamlessly integrates with the React ecosystem, enabling us to leverage a vast library of existing React components and utilities. With Next.js, we have achieved a modern, performant, and scalable frontend solution that perfectly complements our AI-powered backend.

### 2. Technologies Used
The project utilizes a combination of Next.js, TypeScript, React, Tailwind CSS, and Django to achieve its objectives. TypeScript was incorporated to enhance code quality and maintainability by providing static typing and improved tooling capabilities. React, a widely adopted JavaScript library, enables the creation of reusable and interactive user interfaces through its component-based architecture and virtual DOM. Tailwind CSS, a utility-first CSS framework, offers a customizable and efficient approach to styling by providing pre-defined classes. On the backend, Django, a robust Python web framework, ensures scalability and rapid development with its comprehensive feature set, including an ORM, authentication, routing, and admin interfaces. 
This tech stack collectively contributes to improved performance, development productivity, code maintainability, scalability, and an enhanced user experience, aligning with the project's objectives and ensuring a successful implementation of both the frontend and backend components.
In addition to the aforementioned technologies, the project also leverages several libraries to enhance its AI capabilities. These libraries include OpenAI, NLTK (Natural Language Toolkit), docx2txt, and pypdf. OpenAI is a powerful library for natural language processing (NLP) and machine learning. It offers advanced tools and models for tasks such as text generation, sentiment analysis, and language translation. By incorporating OpenAI, the project gains access to cutting-edge AI capabilities, allowing it to integrate sophisticated language processing functionalities into its AI features. NLTK, a comprehensive NLP library, provides a wide range of tools and resources for text processing and analysis. It enables tasks such as tokenization, stemming, lemmatization, and part-of-speech tagging. By utilizing NLTK, the project can perform various NLP operations, extract meaningful insights from textual data, and enhance its AI algorithms with linguistic features. To extract text from Microsoft Word files, the project utilizes docx2txt. This library enables seamless extraction of textual data from Word documents, allowing the AI components to process and analyze the extracted content. Furthermore, pypdf, a Python library for working with PDF files, is utilized to extract text or perform operations on PDF files within the AI processing pipeline. This integration enables the project to work with PDF documents and incorporate them into its AI algorithms.
By incorporating these libraries, the project strengthens its AI capabilities by accessing advanced NLP functionalities, efficient numerical computing, seamless file handling, and the ability to extract and process textual data from diverse sources.

### 3. UML Diagram
The UML chart depicts the relationships between our model classes. It includes classes such as Member, File, ParentReply, Reply, TextData, Post, and Class. The chart illustrates the associations and dependencies between these classes, showcasing how they interact within the system.
![UML Diagram](/research/diagrams/uml.png)


### 4. Backend Code Documentation
Our backend implementation, built using Django, plays a crucial role in supporting core functionalities and managing data flow. It provides user authentication and authorization, ensuring secure access to the app's features such as creating posts, submitting replies, and upvoting content. Django's ORM enables seamless data management with model classes representing entities like Member, File, Reply, Post, and Class, facilitating efficient storage and retrieval of information.
To enhance the user experience and offer intelligent features, the backend incorporates AI functionalities. Leveraging the OpenAI API, the system generates AI-powered responses based on user queries and available resources through context completion. Preprocessing text with nltk enables the extraction of syllabus information, facilitating content recommendations based on student needs. Embedding creation and similarity scoring allow matching and suggesting relevant posts to users based on semantic meaning.
Moreover, the backend encompasses API endpoints defined in views.py to facilitate communication between the frontend and backend. These endpoints handle requests, such as creating posts, retrieving lists, submitting replies, and upvoting content. Authentication and authorization mechanisms ensure secure access, granting permissions only to authenticated users for specific actions.
By implementing these API endpoints, seamless communication is established, enabling the frontend to consume necessary data and perform actions while maintaining a clear separation between the presentation layer and backend logic. This architecture promotes modularity, scalability, and flexibility, enhancing the overall functionality and user experience of the Intelligent Discussion Board App.


### 5. Text-Processing Code Documentation
The text-processing functionality of the IDB makes use of two features that are part of the OpenAI API, text embeddings and text completion. A text embedding is a list/vector containing 1536 floating points that represents the numerical representation of the text’s semantic meaning. Getting the cosine similarity between two of these vectors (achieved through calculating the dot product) results in a number between 0 and 1. The closer to 1 the result is, the more similar the texts are, meaning wise. 
Whenever a new post is created or a document is uploaded a new embedding is created from the text it contains using OpenAI’s text-embedding-ada-002 model. These embeddings are vital when searching through the database to find applicable posts and documents.
When a user clicks post, the IDB creates an embedding of the text in their post, and gets the cosine similarity between it and all other posts in the class, taking note of those that are above .85. Once the database has been searched, these similar posts are presented to the user, and allows them to check the posts over before posting to the discussion board. 
If no applicable posts are found, then the IDB will search through the uploaded documents. If any fitting documents with a similarity score over .70 are found, we then switch to using text completion. During text completion we take the text stripped from the document and feed it along with the user’s question to the text-davinci-003 model, and present the model’s response to the user.


### 6. Frontend Code Documentation
The frontend codebase of our Intelligent Discussion Board App follows a structured organization, promoting maintainability and modularity. The codebase is divided into several major modules and components, each serving a specific purpose and offering essential functionality.
The components directory contains reusable UI components that can be easily composed to build the user interface. These components, such as buttons, input fields, and cards, encapsulate their own logic and styling, enabling easy reuse throughout the application.
The pages directory houses top-level pages that represent distinct views or routes in the application. Each page is responsible for fetching data, handling user interactions, and rendering the UI. For example, the Dashboard page serves as the landing page, while the ClassPage and PostPage display specific class or post details.
Layout components in the layouts directory define the overall structure and organization of the application's pages. They include common components like headers, footers, and navigation bars, ensuring a consistent layout and styling across different pages.
Custom hooks in the hooks directory facilitate communication between the frontend and backend. Hooks like useMember handle data fetching from the backend, retrieving member-related information such as user profiles, posts, and replies. The useSessionData hook manages user authentication and session data, interacting with the backend API for login, logout, and session management. These hooks promote code reuse and modularity, enabling components to easily access backend functionalities and ensuring efficient communication between the frontend and backend of the application.
This organized structure of the frontend codebase allows for better code maintenance, reuse of components, separation of concerns, and promotes scalability. It facilitates the development of a user-friendly interface, efficient data retrieval, and seamless interaction with the backend API, resulting in an enhanced user experience within the Intelligent Discussion Board App.

### 7. User Flow Diagram
Our user flow is meticulously crafted to offer a seamless navigation experience, prioritizing simplicity and efficiency. With a focus on essential features and a streamlined interface, our design aims to empower users to effortlessly find the information they seek. By eliminating unnecessary clutter, we create a user-friendly app that optimizes user engagement. The result is an intuitive user experience that enhances usability and ensures a positive interaction with our application.
![Flowchart](/research/diagrams/user_flow_portrait.png)


### 8. Wireframes and UI design
We provided a side-by-side comparison of our original wireframe design and the final website design in the following images. Further information about our UI design can be found in the Future Work section. These visuals showcase the evolution of our user interface and highlight the meticulous effort invested in creating an engaging and user-friendly website.

![Wireframe](/research/wireframes/threads.png)
![Final Product](/research/screenshots/threads.png)

![Wireframe](/research/wireframes/thread.png)
![Final Product](/research/screenshots/thread.png)

![Wireframe](/research/wireframes/create_post.png)
![Final Product](/research/screenshots/create_post.png)

![Wireframe](/research/wireframes/alert.png)
![Final Product](/research/screenshots/alert.png)

## Future Work
In considering future developments and improvements for our project, there are several features and updates that we would recommend:
Firstly, while our chosen tech stack, including Django as the backend framework, provided numerous advantages for our project's requirements, it would be worthwhile to conduct further research on alternative tech stacks. Exploring different backend frameworks could offer new insights and potentially better-suited solutions. While we opted for Django due to its built-in models and Python compatibility, considering other options may reveal additional benefits and improved functionalities.
Furthermore, we recognize the importance of enhancing the user interface (UI) and user experience (UX) of our application. Throughout the development process, we encountered challenges that limited our ability to fully refine the UI. Investing more time and effort into polishing the UI and addressing obstacles would result in a more intuitive and visually appealing application. Specifically, we aimed to improve the nested replies flow for more efficient navigation and streamline the page redirects for a smoother user experience.
In terms of functionality, we envision a more comprehensive admin section tailored specifically for instructors. While we have implemented an admin page that enables professors to upload files and create classes, we see potential for expansion. For example, incorporating an invite feature would allow professors to invite their students to join the platform, fostering better collaboration. Additionally, implementing an enhanced roles system would enable professors to promote users to teaching assistants (TAs), granting them specific privileges and responsibilities within the app.
Integration with the school's Single Sign-On (SSO) system was initially planned; however, due to time constraints and prioritization of frontend development, it was not implemented. Integrating our project with the school's SSO system would offer seamless authentication for users, enhancing convenience and security.
By addressing these areas for future improvement, such as exploring alternative tech stacks, enhancing the UI/UX, expanding the admin section, and integrating with the school's SSO system, we can further elevate the functionality and user experience of our application. These updates would contribute to a more comprehensive and efficient solution, benefiting both students and instructors alike.
