# Frontend Mentor - Product Feedback App Solution

This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Learnings](#learnings)
  - [Continued development](#continued-development)
  - [Resources](#resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![Screenshot](./screenshot.png)

### Links

- GitHub Repository: [https://github.com/TedJenkler/feedback-app-MERN-tailwind](https://github.com/TedJenkler/feedback-app-MERN-tailwind)
- Live Site: [https://feedback-app-mern-tailwind.onrender.com](https://feedback-app-mern-tailwind.onrender.com)

## My process

### Built with

- Flexbox for layout design
- Mobile-first workflow
- [React](https://reactjs.org/) JavaScript library
- [Tailwind CSS](https://tailwindcss.com/) for styling with utility-first CSS
- [Vite](https://vitejs.dev/) frontend build tool for fast development
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient state management
- [Express.js](https://expressjs.com/) for backend API development
- [MongoDB](https://www.mongodb.com/) for database storage

### Features

Users can:

- **Add Post:** Create new posts to share ideas or feedback.
- **Edit Post:** Modify existing posts to update information or details.
- **Remove Post:** Delete posts that are no longer relevant or needed.
- **Comment:** Add comments to posts to provide feedback or engage in discussions.
- **Reply to Comments:** Reply to comments to continue conversations or address specific points.
- **Reply to Replies:** Comment on replies to further expand discussions or respond to feedback.
- **Select Different Statuses:** Choose from various statuses for ideas, such as "Under Review," "In Progress," or "Completed."
- **View in Roadmap Mode:** Visualize posts and their statuses in a roadmap mode to track progress and prioritize tasks.
- **Login and Register:** Authenticate users with login and registration functionality to access personalized features and maintain security.
- **Filter and Sort:** Filter posts based on categories or other criteria, and sort posts by most upvotes, most comments, or other relevant metrics.
- **Upvote:** Users can upvote posts to express agreement or support for particular ideas or feedback.

These features enable users to actively participate in discussions, manage posts effectively, and track the progress of ideas through different stages. The app functions similarly to a social media platform, facilitating interaction and collaboration among users while organizing and categorizing feedback and ideas.

### Learnings

During this project, I concentrated on enhancing my proficiency in several key areas:

- **Redux:** I leveraged Redux Toolkit for efficient state management in complex applications.
- **Responsive Design:** Utilizing Flexbox, I implemented responsive design strategies to ensure optimal user experiences across devices.
- **Form Handling and Validation:** I improved my skills in handling forms and implementing robust validation techniques to enhance data integrity.
- **Node.js and Express.js:** I deepened my understanding of Node.js and Express.js, focusing on best practices for structuring Express applications.
- **Animation:** I experimented with adding animations to the menu and select elements, enhancing user interaction and visual appeal.
- **MongoDB:** I utilized MongoDB for backups and gained introductory experience in database management.
- **Testing:** I began exploring testing methodologies but didn't implement them in this project.

These learnings have significantly contributed to my growth as a developer, equipping me with valuable skills applicable to future projects.

### Continued development

In future development, I plan to expand the app's functionality to include:

- Implementing full authentication so only the owner of posts can edit/delete.
- Creating a user dashboard where users can manage their profiles and feedback submissions.
- Allowing users to browse and explore projects, and provide feedback on various features.

### Resources

Helpful resources I used during this project:

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - For styling with utility-first CSS
- [React Router v6 Documentation](https://reactrouter.com/docs/en/v6/getting-started/introduction) - For navigation and routing in React applications
- [Stack Overflow](https://stackoverflow.com/) - For community support and troubleshooting

### Author

- Frontend Mentor - [@TedJenkler](https://www.frontendmentor.io/profile/TedJenkler)
- Linkedin - [Teodor Jenkler](https://www.linkedin.com/in/tedjenklerwebdeveloper/)
