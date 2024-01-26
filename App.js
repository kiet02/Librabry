// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Signin from './_src/Auth/Signin';
import Signup from './_src/Auth/Signup';
import Home from './_src/Home/Home';
import Main from './_src/Home/Main';
import Book from './_src/Book/Book';
import Pagination from './_src/Pagination';
import Reading from './_src/Book/Reading';
import Search from './_src/Home/Search';
import Test from './_src/Test';
import Savebooks from './_src/Home/Savebooks';
import User from './_src/Home/User';
import DrawerCustom from './_src/DrawerCustom';
import Author from './_src/Home/Author';
import Genre from './_src/Book/Genre';



const Stack = createNativeStackNavigator();

const Drawe = createDrawerNavigator();

function App() {
 const Drawner=({route, navigation})=>{

  return (
    
        <Drawe.Navigator
         drawerContent={props => <DrawerCustom {...props} />}
          initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawe.Screen name="Home" initialParams={{ params: route.params }} component={Home}/>
        <Drawe.Screen name="Sách đã lưu" initialParams={{ params: route.params }} component={Savebooks} />
        <Drawe.Screen name="Tài khoản" component={User} initialParams={{ params: route.params }}/>
        


      </Drawe.Navigator>
  );
  }
    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Singin' screenOptions={{headerShown:false}}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      {/* <Stack.Screen name="Home" component={Home}/> */}
      <Stack.Screen name="Drawner" component={Drawner} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="Pagi" component={Pagination} />
      <Stack.Screen name="Reading" component={Reading} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Savebook" component={Savebooks} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Author" component={Author} />
      <Stack.Screen name="Genre" component={Genre} />


  </Stack.Navigator>
  </NavigationContainer>

    )
  

  
 
}

export default App;