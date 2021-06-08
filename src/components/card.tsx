import axios from "axios";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IPost } from "../interfaces/post";
import Icon from "react-native-vector-icons/FontAwesome5";
import theme from "../theme/colors";

interface IProps {
  info: IPost;
  setId: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

const Card = (props: IProps) => {
  const photoURL = axios.defaults.baseURL + "public/" + props.info.photo;
  const photoSize = Dimensions.get("screen").width;
  const [expand, setExpand] = React.useState<boolean>(true);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setExpand((previousState) => !previousState)}
      style={styles.container}
    >
      <View style={styles.titleInfo}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.title}>{props.info.name}</Text>
          <TouchableOpacity
            onPress={() => {
              props.setId(props.info._id);
              props.toggleModal();
            }}
            style={{ width: 50, height: 20, alignItems: "flex-end" }}
          >
            <Icon
              name={"ellipsis-v"}
              color={theme.lightTheme.secondary}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text style={[styles.title, styles.subTitle, { marginRight: 5 }]}>
            {props.info.theme} |
          </Text>
          <Text style={[styles.title, styles.subTitle, { color: "purple" }]}>
            {props.info.address}
          </Text>
        </View>
      </View>
      <Image
        source={{
          uri: photoURL,
          width: photoSize,
          height: photoSize,
        }}
        style={{
          marginVertical: 20,
          resizeMode: expand ? "cover" : "contain",
        }}
      />
      <Text style={[styles.title, styles.subTitle, { paddingHorizontal: 15 }]}>
        {props.info.description}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
  },
  titleInfo: {
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 15,
  },
  subTitle: {
    fontFamily: "Poppins_300Light",
    fontSize: 13,
    marginTop: -5,
    alignSelf: "flex-start",
  },
});
