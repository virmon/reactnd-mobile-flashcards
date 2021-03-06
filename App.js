import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { black, white } from './utils/colors'
import { Fontawesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import Answer from './components/Answer'
import Score from './components/Score'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

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
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
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
        backgroundColor: black,
        height: 40,
        paddingBottom: 10
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        paddingBottom: 10
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        paddingBottom: 10
      }
    }
  },
  Answer: {
    screen: Answer,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        paddingBottom: 10
      }
    }
  },
  Score: {
    screen: Score,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
        height: 40,
        paddingBottom: 10
      }
    }
  }
})

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container}>
          <MainStatusBar backgroundColor={black} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});