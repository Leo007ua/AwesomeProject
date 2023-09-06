import React from "react";
import { styles } from "./ImageRemoveButtonStyled";
import { TouchableOpacity } from "react-native";
import { RemoveIcon } from "../../SvgIcons/SvgIcons";


const ImageRemoveButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.removeImageButton} onPress={onPress}>
      <RemoveIcon />
    </TouchableOpacity>
  );
};

export default ImageRemoveButton;
