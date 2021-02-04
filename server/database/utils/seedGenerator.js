const fs = require('fs');
const c = require('casual');

const basePath = './seeders';

c.define('user', function() {
  return {
    id: c.uuid,
    username: c.username,
    password: "{\"salt\":\"9738bcbe95c8ae63a9becb0ddd10e76924f1d0fc8c3b1e6e16edee63b6e5e0ac\",\"hash\":\"bebae2c46e1b59f6155ecdbfc8c23a43c38f751429e47f100f1751767ed849f9b014b4143047db6b19af8fd11c6da6fdce12d1e837cd883d00e25b129d19117d\"}",
    photo_url: 'data:image/png;base64,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',
    email: c.email,
    first_name: c.first_name,
    last_name: c.last_name,
    birthdate: c.date('YYYY-MM-DD'),
    description: c.sentences(c.integer(3,10)),
  };
})

c.define('blog', function(author_id) {
  return {
    id: c.uuid,
    name: c.populate_one_of(["{{first_name}}", "{{last_name}}", "{{word}}"]),
    description: c.sentences(4,10),
    author_id,
  };
});

c.define('article', function(blog_id) {
  const content = c.sentences(10, 35);
  return {
    id: c.uuid,
    name: c.populate_one_of(["{{first_name}}", "{{last_name}}", "{{word}}"]),
    blog_id,
    is_published: true,
    allow_comments: Math.random() > 0.9 ? false : true,
    source: JSON.stringify({ ops: [{ insert: content }]}),
    html: `<div>${content}</div>`
  };
});

c.define('comment', function(parent_id, user_id, article_id) {
  return {
    id: c.uuid,
    article_id,
    user_id,
    parent_id,
    text: c.sentences(1,5),
  };
});

c.define('message', function(sender_id, receiver_id) {
  const isDeleted = Math.random() > 0.8 ? true : false;
  return {
    id: c.uuid,
    receiver_id,
    sender_id,
    subject: c.words(2),
    text: c.sentences(2,8),
    is_readed: Math.random() > 0.5 ? true : false,
    is_deleted: isDeleted,
    is_archived: !isDeleted && Math.random() > 0.8 ? true : false,
  };
});

c.define('view', function(article_id, user_id) {
  return {
    id: c.uuid,
    article_id,
    user_id,
  };
});

c.define('rating', function(article_id, user_id) {
  return {
    id: c.uuid,
    article_id,
    user_id,
    rating: c.random_element([0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5])
  };
});

const userList = Array.from({length:100}).map(() => c.user);
const userIdList = userList.map(u => u.id);

const blogList = userList
  .filter((_,i) => i % 2)
  .map(u => u.id)
  .map(id => (
    Array.from({
      length: c.random_element([1,1,1,1,2,3,5])
    }).map(
      () => c.blog(id))
    )
  )
  .flat(Infinity);

const articleList = blogList
  .map((blog) => blog.id)
  .map(id => (
    Array.from({
      length: c.random_element([1,2,3,4,5,6,7,8,9,10,55])
    }).map(
      () => c.article(id))
    )
  )
  .flat(Infinity);
const articleIdList = articleList.map(a => a.id);

const viewList = userIdList.map((userId) => 
    articleIdList.slice(0,Math.floor(Math.random() * articleIdList.length))
      .map(articleId => c.view(articleId, userId))
  )
  .flat(Infinity);

const ratingList = userIdList.map((userId) => 
  articleIdList.slice(0,Math.floor(Math.random() * articleIdList.length))
    .map(articleId => c.rating(articleId, userId))
)
.flat(Infinity);

const commentList = articleList.filter(a => a.allow_comments).map(a => {
  const isParent = Math.random() > 0.8;
  const blog = blogList.find(b => b.id === a.blog_id);
  
  const resultList = [
    c.comment('', blog.author_id, a.id),
  ];

  if (isParent) {
    resultList.push(c.comment(resultList[0].id, blog.author_id, a.id));
  }

  return resultList;
}).flat(Infinity);

const messageList = userIdList.map(u => {
  const messageList = [];

  function getReceiverId() {
    let rId = userIdList[Math.floor(Math.random() * userIdList.length)];
    if (rId === u.id) {
      return getReceiverId();
    }

    return rId;
  }

  for (let x = Math.ceil(Math.random() * 10); x > 0; x--) {
    messageList.push(c.message(u, getReceiverId()));
  }

  return messageList;
}).flat(Infinity);

const seedMap = {
  users: userList,
  blogs: blogList,
  articles: articleList,
  views: viewList,
  ratings: ratingList,
  comments: commentList,
  messages: messageList,
};

function createString(objectList) {
  let result = '[';
  objectList.forEach((o) => {
    result += '{';
    Object.entries(o).forEach(([key, value]) => {
      if (key === 'password' || key === 'source') {
        result += key + ': \'' + value + '\',';
      } else {
        result += `${key}: \"${value}\",`;
      }
    });
    result += '},';
  });
  result += ']';

  return result;
}
Object.entries(seedMap).forEach(function([name, seedList]) {
  fs.writeFile(`../seeders/create-${name}.js`,`
    module.exports = {
      up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
        '${name}',
        ${createString(seedList)},
        {},
      ),
    
      down: (queryInterface, Sequelize) => queryInterface.bulkDelete('${name}', null, {}),
    };
  `,(err) => console.log('ERR',err))
});