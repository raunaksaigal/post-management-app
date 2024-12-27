import { Alert } from 'react-native';

// Function to create or update a post
export const createOrUpdatePost = async (data) => {
  try {
    const formData = new FormData();

    // If there's a file (image or video), append it to the form data
    if (data.file) {
      formData.append('file', {
        uri: data.file.uri,
        type: data.file.type, // 'image/jpeg', 'video/mp4', etc.
        name: data.file.name, // File name
      });
    }

    // Append other post data
    formData.append("title", data.title);      // Post Title
    formData.append('body', data.body);        // Post body content
    formData.append('userId', data.userId);    // User ID (use actual user context or state)
    formData.append('timestamp', data.timestamp);  // Timestamp (optional)

    // Convert FormData to a plain object for logging
    const formDataObject = {};
    formData.forEach((value, key) => {
      if (value instanceof Object) {
        // If the value is an object (e.g., file object), log it as a string for better clarity
        formDataObject[key] = JSON.stringify(value);
      } else {
        formDataObject[key] = value;
      }
    });

    // Log the plain object for easy inspection
    console.log("FormData Contents: ", formDataObject);

    // API endpoint (update this to match your backend URL)
    // const apiUrl = 'https://your-api-url.com/api/posts'; 

    // Send POST request to backend server
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formData,
    // });

    // Parse response from the server
    // const result = await response.json();

    // Handle server response
    // if (response.ok) {
    //   // Success: Return the response data
    //   return {
    //     success: true,
    //     msg: 'Post created/updated successfully',
    //   };
    // } else {
    //   // Error: Return the error message
    //   return {
    //     success: false,
    //     msg: result.msg || 'An error occurred while creating/updating the post',
    //   };
    // }

    return {success: true, data: formData};

  } catch (error) {
    // Handle any unexpected errors
    console.error('Error in createOrUpdatePost:', error);
    return {
      success: false,
      msg: 'An error occurred while creating/updating the post. Please try again later.',
    };
  }
};


