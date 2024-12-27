# Post Management Application Team Exercise

## Overview
In this exercise, your team will collaboratively develop a **Post Management Application** using React, React Native, and the JSONPlaceholder API.

### Objective
The application should allow users to:
1. List posts
2. Create a new post
3. Update an existing post
4. Delete a post

Your goal is to implement all core features, ensuring the application's local state updates correctly for each operation. The application must include:
- **Web Interface**: Built with React.
- **Mobile Interface**: Built with React Native.
- **Reusable Utility Functions**: For API communication with JSONPlaceholder.

---

## Requirements

### 1. List Posts
- Fetch and display a list of 20 posts from the JSONPlaceholder API.
- Display each post's title and body.

### 2. Create a Post
- Provide a form to create a new post with a title and body.
- On form submission, send a `POST` request to the API.
- Update the local state to include the newly created post.

### 3. Delete a Post
- Include a delete button for each post.
- On clicking delete, send a `DELETE` request to the API.
- Update the local state to remove the deleted post.

### 4. Update a Post
- Provide an option to edit an existing post (title and body).
- On form submission, send a `PUT` request to the API.
- Update the local state with the updated post information.

---

## Collaboration Guidelines

- **Time Management**: You have 2 hours to complete the exercise. Prioritize collaboration and communication.

- **Expected Deliverables**:
  - A single-page web application with CRUD functionality.
  - A basic mobile application with similar functionality.
  - Reusable utility functions for API calls.
  - Clean, readable code and a functional application.

---

## Resources
- [JSONPlaceholder API Guide](https://jsonplaceholder.typicode.com/guide/)
- [React Documentation](https://reactjs.org/)
- [React Native Documentation](https://reactnative.dev/)