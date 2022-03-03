# Node.js blog app

## Description

This is Node.js blog app using MongoDB, Express, EJS, and Node.js
You can create, edit, delete, update a blog post which means this is a CRUD app

## API

**posts**

1. /posts **GET**, to get post and post post
2. /posts/create-post **GET** to get the create post page
3. /posts/create **POST** to post a new blog post
4. /posts/:postId/edit-post **GET** to get the edit post page
5. /posts/:postId/delete **POST** to delete the post
6. /posts/:postId/like **POST** to post like the blog post
7. /posts/:postId/dislike **POST** to post dislike the blog post

**comments**

1. /posts/:postId/comment **GET**, **POST** to get all posts comments and post a comment
2. /posts/:postId/delete-comment **POST** to delete post comment

## Site images

### View all posts page

![view posts](https://user-images.githubusercontent.com/82295664/155460272-9431a4fb-4cda-4c85-8b7f-6a2c0d82690c.png)

### Create a post page

![create post page](https://user-images.githubusercontent.com/82295664/155460269-a6406ca4-2d05-4617-ac56-e82a2973b777.png)
