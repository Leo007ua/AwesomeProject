import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, update, get } from "firebase/database";
import { getDownloadURL, listAll, ref as storageRef } from "firebase/storage";
import urid from "urid";

import { database } from "../../firebase/config";
import { storage } from "../../firebase/config";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, thunkAPI) => {
    try {
      const newPostRef = ref(database, `posts/${urid()}`);
      await update(newPostRef, {
        ...data,
      });

      const dbRef = ref(database, "posts/");
      const queueSnapshot = await get(dbRef);
      const posts = queueSnapshot.val();
      const result = Object.keys(posts).map((key) => ({
        [key]: posts[key],
      }));
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const dbRef = ref(database, "posts/");
      const queueSnapshot = await get(dbRef);
      const posts = queueSnapshot.val();
      const result = Object.keys(posts).map((key) => ({
        [key]: posts[key],
      }));
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (data, thunkAPI) => {
    try {
      const newCommentRef = ref(
        database,
        `posts/${data[0]}/comments/${urid()}`
      );
      await update(newCommentRef, {
        ...data[1],
      });

      const dbRef = ref(database, `posts/${data[0]}/comments`);
      const queueSnapshot = await get(dbRef);
      const comments = queueSnapshot.val();
      const result = Object.keys(comments).map((key) => ({
        [key]: comments[key],
      }));
      return [data[0], result];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async (data, thunkAPI) => {
    try {
      const newLikeRef = ref(database, `posts/${data[0]}/likes/${urid()}`);
      await update(newLikeRef, {
        ...data[1],
      });

      const dbRef = ref(database, `posts/${data[0]}/likes`);
      const queueSnapshot = await get(dbRef);
      const likes = queueSnapshot.val();
      const result = Object.keys(likes).map((key) => ({
        [key]: likes[key],
      }));
      return [data[0], result];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCommmentatorsPhoto = createAsyncThunk(
  "posts/getCommmentatorsPhoto",
  async (_, thunkAPI) => {
    const folderRef = storageRef(storage, "profileAvatars");
    const photos = [];

    try {
      const { items } = await listAll(folderRef);
      for (const itemRef of items) {
        const url = await getDownloadURL(itemRef);
        const uidFromFileName = itemRef.name.split(".")[0];
        photos.push({ uid: uidFromFileName, url });
      }
      return photos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
