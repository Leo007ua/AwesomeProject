import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./UserInfoStyled";

const UserInfo = () => {
  return (
    <View style={styles.userContainer}>
      <Image
        source={require("../../assets/img/User.jpg")}
        style={{ width: 60, height: 60, borderRadius: 16 }}
      />
      <View>
        <Text style={{ fontSize: 13, fontWeight: 700 }}>Natali Romanova</Text>
        <Text style={{ fontSize: 11, fontWeight: 400 }}>
          e-mail@example.com
        </Text>
      </View>
    </View>
  );
};

export default UserInfo;
