import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main';
import User from './pages/User';
import WebView from './pages/WebView';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      WebView,
    },
    {
      headerTitleAlign: 'center',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#FE5000',
        },
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
      },
    },
  ),
);

export default Routes;
