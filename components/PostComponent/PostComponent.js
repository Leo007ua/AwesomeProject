import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "./PostComponentStyled";
import {
  CommentIcon,
  CommentOrangeIcon,
  LikesIcon,
  MapIcon,
} from "../SvgIcons/SvgIcons";
import { addLike } from "../../redux/posts/postsOperations";
import { selectUserId } from "../../redux/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";

const PostComponentn = ({ item }) => {
  const navigation = useNavigation();
  let { img, description, comments, likes, locationName, geoLocation } = item;
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const likesCount = likes ? Object.values(likes).length : 0;
  const isLiked = Object.values(likes ? likes : []).filter(
    (item) => item.author === userId
  );

  const hadndlePressLike = () => {
    dispatch(addLike([item.id, { author: userId, count: 1 }]));
  };

  const hadleLiked = () => {
    return;
  };

  return (
    <View style={{ position: "relative", marginBottom: 32 }}>
      <Image
        source={{ uri: img }}
        style={{
          width: "100%",
          height: 240,
          marginBottom: 8,
          borderRadius: 8,
        }}
      />
      <Text style={{ marginBottom: 8 }}>{description}</Text>
      <View style={styles.componentsContainer}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CommentsScreen", {
                params: { comments, img },
              })
            }
          >
            {comments.length === 0 ? <CommentIcon /> : <CommentOrangeIcon />}
          </TouchableOpacity>
          <Text>{comments.length}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
          <TouchableOpacity
            onPress={isLiked.length === 0 ? hadndlePressLike : hadleLiked}
          >
            <LikesIcon />
          </TouchableOpacity>
          <Text>{likesCount}</Text>
        </View>
        <View
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MapScreen", {
                params: geoLocation,
              })
            }
          >
            <MapIcon />
          </TouchableOpacity>
          <Text>{locationName}</Text>
        </View>
      </View>
    </View>
  );
};

export default PostComponentn;
