const { sequelize } = require('../models/index.js');
const { QueryTypes } = require('sequelize');

function getUserByIdQuery(userId) {
  return sequelize.query(`
    SELECT 
      id,
      description,
      email,
      photo_url as "photoUrl",
      username,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users
    WHERE id = :userId
  `, {
    replacements: {
      userId,
    },
    type: QueryTypes.SELECT,
  });
}

function getUserByBlogIdQuery(blogId) {
  return sequelize.query(`
    SELECT 
      id,
      description,
      email,
      photo_url as "photoUrl",
      username,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users
    WHERE users.id = (
        SELECT
          author_id
        FROM blogs
        WHERE blogs.id = :blogId
      )
  `, {
    replacements: {
      blogId,
    },
    type: QueryTypes.SELECT,
  });
}

function getUserListQuery() {
  return sequelize.query(`
    SELECT 
      id,
      description,
      email,
      photo_url as "photoUrl",
      username,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM users
  `);
}

function getBlogByIdQuery(blogId) {
  return sequelize.query(`
    SELECT 
      id,
      name,
      author_id as "authorId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM blogs
    WHERE id = :blogId
  `, {
    replacements: {
      blogId,
    },
    type: QueryTypes.SELECT,
  });
}

function getBlogListQuery(authorId) {
  if (typeof authorId !== 'undefined') {
    return sequelize.query(`
      SELECT
        id,
        author_id as "authorId",
        name,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM blogs
      WHERE author_id = :authorId
    `, {
      replacements: {
        authorId,
      },
      type: QueryTypes.SELECT
    });
  }

  return sequelize.query(`
    SELECT
      id,
      author_id as "authorId",
      name,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM blogs
  `);
}

function getArticleListQuery(blogId) {
  if (typeof blogId !== 'undefined') {
    return sequelize.query(`
      SELECT
        id,
        blog_id as "blogId",
        name,
        content,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM articles
      WHERE blog_id = :blogId
    `, {
      replacements: {
        blogId,
      },
      type: QueryTypes.SELECT
    });
  }

  return sequelize.query(`
    SELECT
      id,
      blog_id as "blogId",
      name,
      content,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM articles
  `);
}

function createUserMutation(newUserMap) {
  return sequelize.query(`
    INSERT INTO users (username, password, email, description, photo_url)
    VALUES (
      :username,
      :password,
      :email,
      :description,
      :photoUrl
    )
    RETURNING *
  `, {
    replacements: {
      ...newUserMap,
    },
    type: QueryTypes.INSERT,
  });
}

function updateUserMutation(alteredUserMap) {
  return sequelize.query(`
    UPDATE users
    SET
      username = COALESCE(:username, username),
      password = COALESCE(:password, password),
      email = COALESCE(:email, email),
      description = COALESCE(:description, description),
      photo_url = COALESCE(:photoUrl, photo_url)
    WHERE id = :id
    RETURNING *
  `, {
    replacements: {
      ...alteredUserMap,
    },
    type: QueryTypes.UPDATE,
  });
}

function deleteUserMutation(userId) {
  return sequelize.query(`
      DELETE FROM users
      WHERE id = :userId
      RETURNING *
  `, {
    replacements: {
      userId,
    },
    type: QueryTypes.DELETE,
  });
}


module.exports = {
  getUserByIdQuery,
  getBlogByIdQuery,
  getUserByBlogIdQuery,
  getUserListQuery,
  getArticleListQuery,
  getBlogListQuery,
  createUserMutation,
  updateUserMutation,
  deleteUserMutation,
}