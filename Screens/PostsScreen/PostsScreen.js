import React from "react";
import { View } from "react-native";

import { styles } from "./PostsScreenStyled";
import UserInfo from "../../components/UserInfo/UserInfo";


const PostsScreen = () => {
  return (
    <View style={styles.postsScreenContainer}>
        <UserInfo/>
    </View>
  );
};

export default PostsScreen;
