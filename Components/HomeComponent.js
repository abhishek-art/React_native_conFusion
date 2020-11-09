import React, {Component} from 'react';
import { View, ScrollView, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {baseURL} from '../Shared/baseURL';
import {connect} from 'react-redux';
import { Loading } from './LoadingComponent';
import {DISHES} from '../Shared/dishes'
import {LEADERS} from '../Shared/leaders'
import {PROMOTIONS} from '../Shared/promotions'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

function RenderItem (props) {
    const item = props.item;

    if(props.isLoading){
        return <Loading></Loading>
    }
    else if(props.errMess){
        return(
        <View><Text>{props.errMess}</Text></View>
        )
    }
    else{
        if (item!=null) {
            return(
                <Card featuredTitle= {item.name} featuredSubtitle={item.designation}
                image={{uri: baseURL + item.image}}>
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            ) 
        }
        else{
            return <View>loading</View>
        }
    }
}

class Home extends Component {

    constructor(props){
        super(props)
        /*this.state = {
            leaders: LEADERS,
            dishes: DISHES,
            promotions: PROMOTIONS
        }*/
    }

   render() {
    return(
        <ScrollView>
            <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess} />
            <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
            isLoading={this.props.promotions.isLoading}
            errMess = {this.props.promotions.errMess} />
            <RenderItem item={this.props.leaders.leaders.filter((lead) => lead.featured)[0]} 
            isLoading={this.props.leaders.isLoading}
            errMess = {this.props.leaders.errMess} />
        </ScrollView>
    );
}
}


export default connect(mapStateToProps)(Home)