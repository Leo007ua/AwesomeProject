import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";

import { styles } from "./PostsScreenStyled";

import UserInfo from "../../components/UserInfo/UserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { selectAllPosts } from "../../redux/posts/postsSelectors";
import {
  getCommmentatorsPhoto,
  getPosts,
} from "../../redux/posts/postsOperations";

import { useDispatch, useSelector } from "react-redux";

const PostsScreen = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = Object.values(a)[0].date;
    const dateB = Object.values(b)[0].date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

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
          sortedPosts.map((item) => {
            const key = Object.keys(item)[0];
            const {
              img,
              description,
              likes,
              comments,
              locationName,
              geoLocation,
            } = item[key];
            return (
              <PostComponent
                key={key}
                id={key}
                image={img}
                description={description}
                likes={likes}
                comments={comments ? comments : []}
                locationName={locationName}
                geoLocation={geoLocation}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default PostsScreen;
