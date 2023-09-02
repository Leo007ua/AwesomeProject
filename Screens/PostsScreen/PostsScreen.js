import React from "react";
import { ScrollView, View } from "react-native";

import { styles } from "./PostsScreenStyled";

import UserInfo from "../../components/UserInfo/UserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";

import { posts } from "../../posts";

const PostsScreen = () => {
  return (
    <View style={styles.postsScreenContainer}>
      <UserInfo />
      <ScrollView
        style={{ margin: 0, padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {posts.map(
          ({
            img,
            description,
            likes,
            comments,
            locationName,
            geoLocation,
          }) => {
            return (
              <PostComponent
                key={description}
                image={img}
                description={description}
                likes={likes}
                comments={comments}
                locationName={locationName}
                geoLocation={geoLocation}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
};

export default PostsScreen;
