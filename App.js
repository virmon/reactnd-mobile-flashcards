import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { blue, white } from './utils/colors'
import { Fontawesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function MainStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Fontawesome name='plus-square' size={30} color={tintColor} />
    },
  }
}

const options = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgb(0, 0, 0, 0.24)',
      shadowOffsetL: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Nav = createAppContainer(
  Platform.OS === 'ios' 
    ? createBottomTabNavigator(tabs, options) 
    : createMaterialTopTabNavigator(tabs, options)
)

const StackNavigator = createStackNavigator({
  Home: {
    screen: Nav,
    navigationOptions: {
      header: null
    } 
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
})

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainStatusBar backgroundColor={blue} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});