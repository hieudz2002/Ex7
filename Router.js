import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Home from './Home/Home';

import Service from './Home/Service';
import AddService from './Home/AddService';
import DetailService from './Home/DetailsService';
import EditService from './Home/EditService';
import Logout from './Home/Logout';
const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="DetailsService" component={DetailService} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

    </Stack.Navigator>


  );
}

const styles = StyleSheet.create({})

export default Router;
