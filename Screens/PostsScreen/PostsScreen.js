import React, { useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./PostsScreenStyled";
import UserInfo from "../../components/UserInfo/UserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { selectAllPosts } from "../../redux/posts/postsSelectors";
import {
  getCommmentatorsPhoto,
  getPosts,
} from "../../redux/posts/postsOperations";
import { useDispatch, useSelector } from "react-redux";
import { auth, signOut } from "firebase/auth";

const PostsScreen = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  let sortedPosts = [...posts].sort((a, b) => {
    const dateA = Object.values(a)[0].date;
    const dateB = Object.values(b)[0].date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  sortedPosts = sortedPosts.map((i) => Object.values(i)[0])

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommmentatorsPhoto());
  }, [dispatch]);

  

  return (
    <View style={styles.postsScreenContainer}>
      <UserInfo />
      <ScrollView
        style={{ margin: 0, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {sortedPosts.length === 0 ? (
          <View></View>
        ) : (
          sortedPosts.map((item, index) => (
            <PostComponent key={index} item={item} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default PostsScreen;
