import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import theme from "../../src/theme/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFormik } from "formik";
import { IPost } from "../interfaces/post";
import * as ImagePicker from "expo-image-picker";
import postService from "../services/postService";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import * as yup from "yup";

type PostParamList = {
  Post: {
    _id: string;
  };
};

interface IPostProps {
  navigation: StackNavigationProp<PostParamList, "Post">;
}

const validationSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
  theme: yup.string().required(),
  photo: yup.string().required(),
});

const CreatePost = () => {
  const [photo, setPhoto] =
    React.useState<{ uri: string; name: string; type: string } | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const navigator = useNavigation();
  const { params } = useRoute<RouteProp<PostParamList, "Post">>();

  const formik = useFormik<Partial<IPost>>({
    initialValues: {
      name: "",
      address: "",
      description: "",
      theme: "",
      photo: "",
    },
    validationSchema,
    onSubmit: (data, { resetForm }) => {
      const request = new FormData();

      const keys = Object.keys(data);

      for (let item of keys) {
        const i = data[item as keyof IPost];
        if (i) request.append(item, i);
      }

      if (photo)
        request.append("file", {
          //@ts-ignore
          uri: photo.uri,
          name: "image.jpg",
          type: "image/jpeg",
        });

      setLoading(true);

      if (params?._id) {
        postService.updatePost(request, params._id).then((res) => {
          setLoading(false);
          resetForm();
          setPhoto(undefined);
          Alert.alert(
            "Post updated with success!",
            "Everything went right, you're post will be up in a minute"
          );
          navigator.navigate("PostList");
        });
        return;
      }

      postService.savePost(request).then((res) => {
        setLoading(false);
        resetForm();
        setPhoto(undefined);
        Alert.alert(
          "Post created with success!",
          "Everything went right, you're post will be up in a minute"
        );
        navigator.navigate("PostList");
      });
    },
  });

  const handlePhotoPick = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      exif: true,
    });

    if (!photo.cancelled) {
      setPhoto({
        uri: photo.uri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      formik.setFieldValue("photo", "choosen");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <View style={styles.inputWrapper}>
        <Text style={styles.inputTitle}>Full Name</Text>
        <View style={styles.input}>
          <TextInput
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            style={styles.textInput}
          />
        </View>
      </View>
      {formik.errors.name && (
        <Text style={styles.inputError}>{formik.errors.name}</Text>
      )}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputTitle}>Subject</Text>
        <View style={styles.input}>
          <Text style={{ color: "gray" }}>r/</Text>
          <TextInput
            value={formik.values.theme}
            onChangeText={formik.handleChange("theme")}
            style={styles.textInput}
          />
        </View>
      </View>
      {formik.errors.theme && (
        <Text style={styles.inputError}>{formik.errors.theme}</Text>
      )}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputTitle}>Address</Text>
        <View style={styles.input}>
          <TextInput
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
            style={styles.textInput}
          />
        </View>
      </View>
      {formik.errors.address && (
        <Text style={styles.inputError}>{formik.errors.address}</Text>
      )}
      <View style={styles.inputWrapper}>
        <Text style={styles.inputTitle}>Description</Text>
        <View style={styles.input}>
          <TextInput
            value={formik.values.description}
            onChangeText={formik.handleChange("description")}
            textAlignVertical={"top"}
            style={styles.textInput}
            multiline={true}
            numberOfLines={5}
          />
        </View>
      </View>
      {formik.errors.description && (
        <Text style={styles.inputError}>{formik.errors.description}</Text>
      )}
      {!photo && (
        <View>
          <Text style={styles.inputTitle}>Photo</Text>
          <TouchableOpacity
            onPress={() => handlePhotoPick()}
            style={[styles.input, styles.photoInput]}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 13 }}>
              From Device
            </Text>
            <Icon size={24} color={theme.lightTheme.secondary} name="file" />
          </TouchableOpacity>
        </View>
      )}
      {formik.errors.photo && (
        <Text style={styles.inputError}>{formik.errors.photo}</Text>
      )}
      {photo && <Image source={{ uri: photo.uri }} style={styles.preview} />}
      <TouchableOpacity
        onPress={() => formik.handleSubmit()}
        style={styles.button}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_400Regular",
            alignItems: "center",
          }}
        >
          Submit
          {!loading && <ActivityIndicator size={14} color={"white"} />}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  preview: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 25,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.lightTheme.primary,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputTitle: {
    fontFamily: "Poppins_400Regular",
  },
  textInput: {
    width: "100%",
  },
  button: {
    backgroundColor: theme.lightTheme.primary,
    width: "100%",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginTop: 30,
  },
  photoInput: {
    width: "100%",
    height: 130,
    // marginVertical: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  inputError: {
    color: "red",
    fontFamily: "Poppins_400Regular",
    marginTop: -10,
    marginBottom: 10,
  },
});
