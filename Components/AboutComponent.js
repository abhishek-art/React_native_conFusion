import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import {baseURL} from '../Shared/baseURL'
import { connect } from 'react-redux'
import { Loading } from './LoadingComponent';
//import {LEADERS} from '../Shared/leaders'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History () {
    return (
        <Card title="Our History">
            <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.

            </Text>
        </Card>
    )
}

const renderleadItem = ({item, index}) => {

    return (
        <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar= {{ source: {uri: baseURL + item.image}}} />
    );
};

class AboutUs extends Component{

    constructor(props){
        super(props)
        /*this.state = {
            leaders: LEADERS
        }*/
    }

    render() {

            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                        <History />
                        <Card title="Corporate Leadership">
                        <FlatList 
                        data={this.props.leaders.leaders} 
                        renderItem={renderleadItem} 
                        keyExtractor={item => item.id.toString()} />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            )
    }
}

export default connect(mapStateToProps)(AboutUs)