import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import {View, ScrollView, Image, Text, StyleSheet, ToastAndroid} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';
import Favorites from './FavoriteComponent'
import Reservation from './ReservationComponent'
import Login from './LoginComponent'
import {Icon} from 'react-native-elements';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../Redux/ActionCreators'
import {connect} from 'react-redux'
import NetInfo from '@react-native-community/netinfo'

const mapDispatchToProps = dispatch => {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: ()=> dispatch(fetchComments()),
    fetchPromos: ()=> dispatch(fetchPromos()),
    fetchLeaders: ()=> dispatch(fetchLeaders())
  }
}

const StackNavigatorIcon = ({ navigation }) => {
  return (
      <Icon
          iconStyle={{ padding: 15 }}
          name='menu'
          size={24}
          color='white'
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
  )
}

const MenuNavigator = createStackNavigator();

const CustomDrawerContentComponent = (props) => (
  <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
              <Image 
                  source={require('./images/logo.png')}
                  style={styles.drawerImage}
              />
          </View>
          <View style={{flex: 2}}>
              <Text style={styles.drawerHeaderText}>
                  Ristorante Con Fusion
              </Text>
          </View>
      </View>
      <DrawerItemList  {...props}/>
  </DrawerContentScrollView>
);

function MenuNavigatorScreen () {
  return (
    <MenuNavigator.Navigator initialRouteName="Menu"
    screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
    } >
      <MenuNavigator.Screen name="Menu" component={Menu} options={
                    ({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })
                 } />
      <MenuNavigator.Screen name="Dishdetail" component={Dishdetail} options={{ headerTitle: "Dish Detail"}} />
    </MenuNavigator.Navigator>
  )
}

const AboutNavigator = createStackNavigator();

function AboutScreen () {
  return (
    <AboutNavigator.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }}>
      <AboutNavigator.Screen name="AboutUs" component={AboutUs} option={({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })}/>
    </AboutNavigator.Navigator>
  )
}

const ContactNavigator = createStackNavigator();

function ContactScreen () {
  return(
    <ContactNavigator.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }} >
    <ContactNavigator.Screen name="ContactUs" component={ContactUs} option={({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })} />
    </ContactNavigator.Navigator>
  )
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen () {
  return (
    <HomeNavigator.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }}>
      <HomeNavigator.Screen name="Home" component={Home} option={({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })} />
    </HomeNavigator.Navigator>
  )
}

const FavoriteNavigator = createStackNavigator();

function FavoriteScreen () {
  return (
    <FavoriteNavigator.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }}>
      <FavoriteNavigator.Screen name="Favorites" component={Favorites} option={({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })}/>
    </FavoriteNavigator.Navigator>
  )
}

const LoginNavigator = createStackNavigator();

function LoginScreen () {
  return (
    <LoginNavigator.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#512DA8'
      },
      headerTintColor : '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }}>
      <LoginNavigator.Screen name="Login" component={Login} option={({navigation}) => ({
                        headerLeft: () => 
                            <StackNavigatorIcon navigation={navigation}/>
                    })}/>
    </LoginNavigator.Navigator>
  )
}

const ReservationNavigator = createStackNavigator()

function ReserveScreen() {
return(
  <ReservationNavigator.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#512DA8'
    },
    headerTintColor : '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }}>
    <ReservationNavigator.Screen name='Reserve Table' component={Reservation} 
    option={({navigation}) => ({
      headerLeft: () => 
          <StackNavigatorIcon navigation={navigation}/>
  })}/>

  </ReservationNavigator.Navigator>
)
}

const MainNavigator = createDrawerNavigator();

class Main extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchLeaders()
    this.props.fetchPromos()

    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show('Initial Network Connectivity Type: '
          + connectionInfo.type, ToastAndroid.LONG)
    });
  
  NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
}

  componentWillUnmount(){
    NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
  }

  handleConnectivityChange = (connectionInfo) => {
    switch(connectionInfo.type){
      case 'none':
        ToastAndroid.show('You are now offline', ToastAndroid.LONG)
        break
      case 'wifi':
        ToastAndroid.show('You are now connected to wifi', ToastAndroid.LONG)
        break
      case 'cellular':
        ToastAndroid.show('You are now connected to cellular', ToastAndroid.LONG)
        break
      case 'unknown':
        ToastAndroid.show('You now have an unknown connection', ToastAndroid.LONG)
        break
      default:
        break
    }
  }

  render() {
 
    return (
      <NavigationContainer >
        <MainNavigator.Navigator initialRouteName="Home" drawerStyle={{
                backgroundColor:'#D1C4E9'
            }} drawerContent={props=> <CustomDrawerContentComponent {...props} />}>
          <MainNavigator.Screen name="Login" component={LoginScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="sign-in" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="Home" component={HomeNavigatorScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="home" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="Menu" component={MenuNavigatorScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="list" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="Contact Us" component={ContactScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="address-card" type="font-awesome" 
              size={22} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="About Us" component={AboutScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="info-circle" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="Favorites" component={FavoriteScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="heart" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
          <MainNavigator.Screen name="Reserve Table" component={ReserveScreen} options={{
            drawerIcon: ({tintColor}) => (<Icon 
              name="cutlery" type="font-awesome" 
              size={24} color={tintColor}  />)
          }}/>
        </MainNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

  
export default connect(null, mapDispatchToProps)(Main);