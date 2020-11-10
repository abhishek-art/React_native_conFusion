import React , {Component} from 'react'
import { View, FlatList, Text, TouchableOpacity, Animated, Alert} from 'react-native'
import { ListItem } from 'react-native-elements'
import {baseURL} from '../Shared/baseURL'
import { connect} from 'react-redux'
import { Loading} from './LoadingComponent' 
import {deleteFavorite} from '../Redux/ActionCreators'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        dishes: state.dishes
    }
}

const mapDispatchToProps = dispatch =>({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
    render(){

        const {navigate} = this.props.navigation

        const renderMenuItem = ({item, index})=>{

        const rightButton = (progress, dragX) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [0.7, 0]
            })
            return(
                <>
                    <TouchableOpacity onPress={() =>{
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        )
                    }}>
                        <View style={{flex:1, backgroundColor: 'red', justifyContent: 'center'}}>
                            <Animated.Text style={{color: 'white', paddingHorizontal: 10,
                                    fontWeight:'600', transform: [{scale}]}}>
                                        Delete
                            </Animated.Text>
                        </View>
                    </TouchableOpacity>
                </>
            );
        }
        return(

            <Swipeable renderRightActions={rightButton}>
            <Animatable.View animation="fadeInRightBig" duration={2000}>
            <ListItem key={index} title={item.name} subtitle={item.description}
                hideChevron={true} onPress={() => navigate('DishDetail', {dishId: item.id})}
                leftAvatar={{source: {uri: baseURL + item.image}}}>

            </ListItem>
            </Animatable.View>
            </Swipeable>
        );
        }

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)