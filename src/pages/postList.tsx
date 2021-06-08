import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import Card from "../components/card";
import { IPost } from "../interfaces/post";
import postService from "../services/postService";
import theme from "../../src/theme/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/core";
interface PostListProps {}

const PostList = (props: PostListProps) => {
  const [postList, setPostList] = React.useState<IPost[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<string>("");

  const navigator = useNavigation();

  let currentPage = 0;
  let isLastPage = React.useRef(false);

  const loadPosts = () => {
    setLoading(true);
    isLastPage.current = false;
    postService.getPosts().then((res) => {
      setPostList(res?.data.data);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadPosts();
  }, []);

  const loadMoreComments = () => {
    currentPage = currentPage + 1;
    if (!isLastPage.current) {
      setLoading(true);
      postService.getPosts(currentPage).then((res) => {
        setPostList((previous) => [...previous, ...res?.data.data]);
        isLastPage.current = res.data.metadata.lastpage;
        console.log(isLastPage);
        setLoading(false);
      });
    }
  };

  const handleDelete = () => {
    setLoading(true);
    setMenuOpen(false);
    postService.deletePost(selectedId).then((res) => {
      loadPosts();
      setLoading(false);
    });
  };

  if (loading && postList.length == 0)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={24} color={"purple"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Modal
        visible={menuOpen}
        animationType={"fade"}
        onRequestClose={() => {
          setMenuOpen(false);
          setSelectedId("");
        }}
        style={styles.menu}
        transparent={true}
      >
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text
              onPress={() => {
                navigator.navigate("NewPost", { _id: selectedId });
                setMenuOpen(false);
              }}
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.menuItem}>
            <Text style={{ fontFamily: "Poppins_400Regular" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {postList.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={loading}
              onRefresh={loadPosts}
            />
          }
          style={{ width: "100%" }}
          keyExtractor={(_, index) => `card#${index}`}
          onEndReached={loadMoreComments}
          onEndReachedThreshold={0.5}
          data={postList}
          renderItem={({ item }) => (
            <Card
              info={item}
              setId={setSelectedId}
              toggleModal={() => setMenuOpen(true)}
            />
          )}
        />
      ) : (
        <Text style={{ fontFamily: "Poppins_400Regular" }}>
          Sorry we didn't find any posts
        </Text>
      )}
      <TouchableOpacity
        onPress={() => navigator.navigate("NewPost")}
        style={styles.addButton}
      >
        <Icon name="plus" color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "'rgba(0, 0, 0, 0.6)'",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
  addButton: {
    backgroundColor: theme.lightTheme.secondary,
    borderRadius: 50,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
