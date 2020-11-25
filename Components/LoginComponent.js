import React, {Component} from 'react'
import { View, StyleSheet, ScrollView, Image} from 'react-native'
import { Icon, Input, CheckBox, Button} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {baseURL} from '../Shared/baseURL'
import { NavigationContainer } from '@react-navigation/native'
import {Camera} from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import {Asset} from 'expo-asset'

class LoginTab extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    componentDidMount(){
        SecureStore.getItemAsync('userInfo')
        .then(userData => {
            let userInfo = JSON.parse(userData)
            if (userInfo){
                this.setState({
                    username: userInfo.username,
                    password: userInfo.password,
                    remember: true
                })
            }
        })
    }

    handleLogin(){
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync('userInfo',
            JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info', error));
        }
        else{
            SecureStore.deleteItemAsync('userInfo')
            .catch((error) => console.log('Could not delete user info', error))
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Input placeholder='Username'
                leftIcon={{type: 'font-awesome', name: 'user-o'}}
                value={this.state.username}
                onChangeText = {val => this.setState({username: val})}
                inputContainerStyle={styles.formInput} />
                <Input placeholder='Password'
                leftIcon={{type: 'font-awesome', name: 'key'}}
                value={this.state.password}
                onChangeText = {val => this.setState({password: val})}
                inputContainerStyle={styles.formInput} />
                <CheckBox title='Remember Me' center checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox} />
                <View style={styles.formButton}>
                <Button title='Login'
                    onPress = {()=> this.handleLogin()} 
                    icon={{type: 'font-awesome', name: 'sign-in', color: 'white'}}
                    buttonStyle={{backgroundColor: '#512DA8'}}/>
                </View>
                <View style={styles.formButton}>
                <Button title='Register' clear
                    onPress = {()=> this.props.navigation.navigate('Register')} 
                    icon={{type: 'font-awesome', name: 'user-plus', color: 'white'}}
                    titleStyle={{color: 'blue'}}/>
                </View>
            </View>
        )
    }
}

class RegisterTab extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageURL: baseURL + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        if (cameraPermission === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri );
            }
        }
        else{
            console.log('Camera permission not granted')
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: "png"}
        )
        console.log(processedImage)
        this.setState({imageURL: processedImage.uri})

    }

    handleRegister = () => {
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync('userInfo',
            JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((error) => console.log('Could not save user info', error));
        }
        else{
            SecureStore.deleteItemAsync('userInfo')
            .catch((error) => console.log('Could not delete user info', error))
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };

    getImageFromGallery = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)

        if (cameraPermission.status === 'granted') {
            let galleryImage = ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            console.log(galleryImage);

            if (!galleryImage.cancelled) {
                this.processImage(galleryImage.uri)
            }
            else{
                console.log('Gallery image not chosen')
            }
        }
        else{
            console.log('Gallery permission not granted')
        }
    }

    render(){
        return (
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageURL}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                    <Button 
                        title = 'Gallery'
                        onPress={this.getImageFromGallery}
                    />
                </View>
            <View style={styles.container}>
                <Input placeholder='Username'
                leftIcon={{type: 'font-awesome', name: 'user-o'}}
                value={this.state.username}
                onChangeText = {val => this.setState({username: val})}
                inputContainerStyle={styles.formInput} />
                <Input placeholder='Password'
                leftIcon={{type: 'font-awesome', name: 'key'}}
                value={this.state.password}
                onChangeText = {val => this.setState({password: val})}
                inputContainerStyle={styles.formInput} />
                <Input placeholder='First Name'
                leftIcon={{type: 'font-awesome', name: 'user-o'}}
                value={this.state.firstname}
                onChangeText = {val => this.setState({firstname: val})}
                inputContainerStyle={styles.formInput} />
                <Input placeholder='Last Name'
                leftIcon={{type: 'font-awesome', name: 'user-o'}}
                value={this.state.lastname}
                onChangeText = {val => this.setState({lastname: val})}
                inputContainerStyle={styles.formInput} />
                <Input placeholder='Email'
                leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                value={this.state.email}
                onChangeText = {val => this.setState({email: val})}
                inputContainerStyle={styles.formInput} />
                <CheckBox title='Remember Me' center checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox} />
                <View style={styles.formButton}>
                    <Button title='Register'
                    onPress = {()=> this.handleRegister()} 
                    icon={{type: 'font-awesome', name: 'user-plus', color: 'white'}}
                    buttonStyle={{backgroundColor: '#512DA8'}}/>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const tabNavigator = createBottomTabNavigator();

function Login() {
    return(
        <NavigationContainer independent={true}>
            <tabNavigator.Navigator
                initialRouteName='Login'
                tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'gray'
                }}>
                <tabNavigator.Screen 
                name='Login' 
                component={LoginTab}
                options={{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                          name='sign-in'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      )
                }}
                />
                <tabNavigator.Screen 
                    name='Register' 
                    component={RegisterTab}
                    options={{
                        title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon
                              name='user-plus'
                              type='font-awesome'            
                              size={24}
                              iconStyle={{ color: tintColor }}
                            />
                          )
                    }}
                />
            </tabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between'
    },
    image:{
        margin : 10,
        width: 80,
        height:60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})

export default Login