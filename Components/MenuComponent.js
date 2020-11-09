import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';
import {connect} from 'react-redux'
import {baseURL} from '../Shared/baseURL'
import { DISHES } from '../Shared/dishes';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

class Menu extends Component {
    constructor(props){
        super(props)
        /*this.state = {
            dishes: DISHES
        }*/
    }

    render() {

        const {navigate} = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (
                <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{uri: baseURL + item.image}} />
            );
        };

        if(this.props.dishes.isLoading){
            return(
                <Loading />
            )
        }

        else if(this.props.dishes.errMess) {
            return(
            <View><Text>{this.props.dishes.errMess}</Text></View>
            )
        }

        else{
            return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
        );
        }
}
}


export default connect(mapStateToProps)(Menu);