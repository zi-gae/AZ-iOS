import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginStackParams } from '@types';

import Home from '~/Screens/Home';
import Detail from '~/Screens/Detail';
import { Image } from '~/Components/Atoms';
import { HomeHeaderStyle, NotiHeaderStyle } from './stackNaviOptions';
import logo_png from '@png/logo.png';
import bell_png from '@png/bell_notification.png';
import level_one_profile_png from '@png/level_one_profile.png';
import { HeaderWrapper } from '~/Components/Templates';
import Notification from '~/Screens/Notification';
import { BackNaviate } from '~/Components/Molcules';
import Profile from '~/Screens/Login/Profile';

const CreateStack = createStackNavigator<LoginStackParams>();

const LoggedInStack = () => (
  <CreateStack.Navigator mode="card">
    <CreateStack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderWrapper>
              <Image imgSrc={logo_png} />
            </HeaderWrapper>
          ),
          headerRight: () => (
            <HeaderWrapper>
              <Image
                onPress={() => {
                  navigation.navigate('Notification');
                }}
                imgSrc={bell_png}
                marginRight={'7px'}
              />
              <Image
                onPress={() => {
                  navigation.navigate('Profile');
                }}
                imgSrc={level_one_profile_png}
              />
            </HeaderWrapper>
          ),
          headerTitle: '',
          headerStyle: HomeHeaderStyle,
        };
      }}
    />
    <CreateStack.Screen name="Detail" component={Detail} />
    <CreateStack.Screen
      name="Notification"
      component={Notification}
      options={({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderWrapper>
              <BackNaviate title="" navigation={navigation} />
            </HeaderWrapper>
          ),
          headerTitle: '알림',
          headerStyle: NotiHeaderStyle,
        };
      }}
    />
    <CreateStack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => {
        return {
          headerLeft: () => (
            <HeaderWrapper>
              <BackNaviate title="" navigation={navigation} />
            </HeaderWrapper>
          ),
          headerTitle: '마이페이지',
          headerStyle: HomeHeaderStyle,
        };
      }}
    />
  </CreateStack.Navigator>
);

export default LoggedInStack;
