// import React from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Image, ScrollView, Text, View } from "react-native";
// import { styles } from "./CommentsScreenStyled";

// import userPhoto from "../../assets/img/User.jpg";
// import commentatorPhoto from "../../assets/img/comentator.png";
// import ReturnBtn from "../../components/Button/ReturnBtn/ReturnBtn";
// import CommentComponent from "../../components/CommentComponent/CommentComponent";

// const CommentsScreen = () => {
//   const navigation = useNavigation();
//   const {
//     params: {
//       params: { comments, image },
//     },
//   } = useRoute();

//   const handleReturnPress = () => {
//     navigation.navigate("Home", {
//       screen: "PostsScreen",
//       params: {
//         user: "123",
//       },
//     });
//   };

//   return (
//     <View style={styles.commentsScreenContainer}>
//       <View style={styles.commentsHeaderContainer}>
//         <ReturnBtn onPress={handleReturnPress}></ReturnBtn>
//         <Text style={styles.commentsHeader}>Коментарі</Text>
//       </View>
//       <View
//         style={{
//           paddingLeft: 16,
//           paddingRight: 16,
//           marginBottom: 20,
//         }}
//       >
//         <View style={styles.postPhotoContainer}>
//           <Image
//             source={{ uri: image }}
//             style={{
//               width: "100%",
//               height: 240,
//               borderRadius: 8,
//             }}
//           />
//         </View>
//       </View>
//       <ScrollView
//         style={{ margin: 0, padding: 0 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {comments.map(({ author, text, date }) => {
//           return (
//             <CommentComponent
//               key={text}
//               author={author}
//               text={text}
//               date={date}
//               userIcon={author === "owner" ? userPhoto : commentatorPhoto}
//             />
//           );
//         })}
//       </ScrollView>
//       <View style={styles.container}>
//         <TextInput style={styles.input} placeholder="Коментувати..." />
//         <TouchableOpacity style={styles.button}>
//           <Svg
//             width="12"
//             height="16"
//             viewBox="0 0 12 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <Path
//               d="M6 1L6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447L6 1ZM10.6464 6.35355C10.8417 6.54882 11.1583 6.54882 11.3536 6.35355C11.5488 6.15829 11.5488 5.84171 11.3536 5.64645L10.6464 6.35355ZM0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646447 6.35355C0.841709 6.54882 1.15829 6.54882 1.35355 6.35355L0.646447 5.64645ZM5.5 15C5.5 15.2761 5.72386 15.5 6 15.5C6.27614 15.5 6.5 15.2761 6.5 15H5.5ZM5.64645 1.35355L10.6464 6.35355L11.3536 5.64645L6.35355 0.646447L5.64645 1.35355ZM5.64645 0.646447L0.646447 5.64645L1.35355 6.35355L6.35355 1.35355L5.64645 0.646447ZM5.5 1V8H6.5V1H5.5ZM5.5 8V15H6.5V8H5.5Z"
//               fill="white"
//             />
//           </Svg>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CommentsScreen;

// import React, { useState } from "react";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { View, Text, Image, ScrollView } from "react-native";

// import { styles } from "./CommentsScreenStyles";
// import ReturnButton from "../../components/ReturnButton";
// import commentatorPhoto from "../../assets/images/comentator.png";
// import userPhoto from "../../assets/images/User.jpg";
// import CommentComponent from "../../components/CommentComponent";
// import CommentInput from "../../components/CommentInput/CommentInput";

import { Image, ScrollView, View } from "react-native";
import ReturnBtn from "../../components/Button/ReturnBtn/ReturnBtn";
import { styles } from "./CommentsScreenStyled";
import CommentComponent from "../../components/CommentComponent/CommentComponent";
import { useNavigation, useRoute } from "@react-navigation/native";

import userPhoto from "../../assets/img/User.jpg";
import commentatorPhoto from "../../assets/img/comentator.png";

const CommentsScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      params: { comments, image },
    },
  } = useRoute();

  const handleReturnPress = () => {
    navigation.navigate("Home", {
      screen: "PostScreen",
      params: {
        user: "123",
      },
    });
  };

  return (
    <View style={styles.commentsScreenContainer}>
      <View style={styles.commentsHeaderContainer}>
        <ReturnBtn onPress={handleReturnPress}></ReturnBtn>
        <Text style={styles.commentsHeader}>Коментарі</Text>
      </View>
      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 20,
        }}
      >
        <View style={styles.postPhotoContainer}>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{ margin: 0, padding: 0 }}
        showsVerticalScrollIndicator={false}
      >
        {comments.map(({ author, text, date }) => {
          return (
            <CommentComponent
              key={text}
              author={author}
              text={text}
              date={date}
              userIcon={author === "owner" ? userPhoto : commentatorPhoto}
            />
          );
        })}
      </ScrollView>
      <CommentInput />
    </View>
  );
};

export default CommentsScreen;
