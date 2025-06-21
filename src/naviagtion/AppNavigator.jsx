import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen.jsx';
import StoriesScreen from '../screens/StoriesScreen';
import CategoryStoriesScreen from '../screens/CategoryStoriesScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: true,
        cardStyle: { backgroundColor: '#1E2A38' }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Stories" component={StoriesScreen} />
      <Stack.Screen name="CategoryStories" component={CategoryStoriesScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 