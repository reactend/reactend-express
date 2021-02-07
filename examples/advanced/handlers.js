import React from "react";
import axios from "axios";

import { PostItem } from "./components";

export const postHandler = async (req, res, _, renderPage) => {
  const { id } = req.params;
  try {
    const { data } = await axios(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    renderPage(() => <PostItem {...data} />);
  } catch (error) {
    res.status(500).end("Error");
  }
};

export const postsHandler = async (req, res, _, renderPage) => {
  try {
    const { data } = await axios("https://jsonplaceholder.typicode.com/posts");
    renderPage(() => data.map((post) => <PostItem key={post.id} {...post} />));
  } catch (error) {
    res.status(500).end("Error");
  }
};
