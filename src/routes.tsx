import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PostList from "./pages/postList";
import CreatePost from "./pages/createPost";

const App = createStackNavigator();

const Routes: React.FC = () => {
  return (
    //@ts-ignore
    <NavigationContainer theme={{ colors: { background: "white" } }}>
      <App.Navigator headerMode={"none"}>
        <App.Screen name="PostList" component={PostList} />
        <App.Screen name="NewPost" component={CreatePost} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
