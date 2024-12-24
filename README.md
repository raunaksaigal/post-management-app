# Post Management Application (Live Coding Problem)

In this exercise, you will develop a **Post Management Application** using React and the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/guide/). The application should allow users to list, create, update, and delete posts, focusing on core functionality and local state updates.

## Requirements

### 1. List Posts
- Fetch and display a list of 20 posts from the JSONPlaceholder API.
- Each post should display the title and body.
- Include a "Reload" button to manually refresh the list.

### 2. Create a Post
- Implement a form to create a new post (title and body).
- On form submission, send a `POST` request and update the local state.

### 3. Delete a Post
- Add a delete button for each post.
- On click, send a `DELETE` request and update the local state.

### 4. Update a Post
- Add an edit button for each post to allow editing of the title and body.
- Populate the form fields with existing data for editing.
- Send a `PUT` request on submission and update the local state.

## Guidelines
- Use React's `useState` and `useEffect` for state management.
- Handle API errors gracefully (e.g., display error messages).
- Focus on functionality, not styling.
- Optional: Add pagination, search, or toast notifications for additional polish.

## Collaboration
- Suggested team roles: API Integration, UI/UX, State Management, Error Handling.

## API Guide
Refer to the [JSONPlaceholder API guide](https://jsonplaceholder.typicode.com/guide/) for details on endpoints.

## Deliverable
A functional single-page React app meeting the above requirements.
