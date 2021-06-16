
require('dotenv').config();
const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();

router.get("/", async (req, res) => {
  const tag = req.query.tags;
  const sortBy = req.query.sortBy || "id";
  const direction = req.query.direction || "asc";
  const result = { posts: [] };
  let postsHolder = {};

  const sortPosts = (posts, dire, sortedBy) => {
    if (dire === "asc") {
      posts.sort((firstItem, secondItem) => firstItem[`${sortedBy}`] - secondItem[`${sortedBy}`])
    } else if (direction === "desc") {
      result["posts"] = posts.sort((firstItem, secondItem) => firstItem[`${sortedBy}`] - secondItem[`${sortedBy}`]).reverse();
    }
    return posts;
  }
  if (tag) {
    const tags = tag.split(",");
    if ((sortBy === "id" || sortBy === "reads" || sortBy === "likes" || sortBy === "popularity") && (direction === "desc" || direction === "asc")) {
      for (const tag of tags) {
        try {
          await fetch(process.env.URL + tag)
            .then(response => response.json())
            .then(data => {
              postsHolder = data.posts;
              result.posts = result.posts.concat(postsHolder);
            }).catch(err => console.log("err", err));
        } catch (err) {
          res.status(400).json(err);
        }

      }
      result.posts = sortPosts(result.posts, direction, sortBy);
    } else {
      res.status(400).json({ error: "sortBy parameter is invalid" });
    }
  } else {
    res.status(400).json({ error: "Tags parameter is required" });
  }


  result.posts = result.posts.filter((post, index, self) =>// to remove the repeated posts
    index === self.findIndex((tem) => (
      tem.id === post.id
    ))
  );

  res.status(200).json(result);
})

module.exports = router;
