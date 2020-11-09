import React, { Component } from 'react';
import { FlatList, ScrollView, Text, Button, View, Modal , StyleSheet} from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import {baseURL} from '../Shared/baseURL'
import { connect } from 'react-redux'
import { postFavorite, postComment } from '../Redux/ActionCreators'
import {DISHES} from '../Shared/dishes'
import {COMMENTS} from '../Shared/comments'
import {Rating, AirbnbRating} from 'react-native-ratings'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => (
    {
    postFavorite: (dishId)=>dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment)=> dispatch(postComment(dishId, rating, author, comment))}
)

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseURL + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View>
                        <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'} type="font-awesome" color='#f50'
                        onPress={()=> props.favorite ? console.log('Already Favorite'): props.favoriteMarker()} />
                        <Icon raised reverse name='pencil' type="font-awesome" color="#512DA8" onPress = {props.modalToggler}/>
                    </View>
                    </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments (props) {

    const comments = props.comments
    
    const RenderCommentItem = ({item, index})=>{
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <View style={styles.commentRow}>
                <Rating showRating={false} imageSize={12} 
                readonly={true} ratingCount={5} startingValue = {item.rating} />
                </View>
                <Text style={{fontSize: 12}}>{'-- ' + item.author+ ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Card title="Comments">
            <FlatList data={comments} renderItem={RenderCommentItem}
            keyExtractor={item => item.id.toString()}></FlatList>
        </Card>
    )
}

class Dishdetail extends Component {

    constructor (props) {
        super(props)
        this.state ={
            /*favorites: [],
            dishes: DISHES ,
            comments : COMMENTS,*/
            showModal: false,
            rating: 1,
            comment: '',
            author: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setRating = this.setRating.bind(this)
        this.markFavorite = this.markFavorite.bind(this)
        this.submitComment = this.submitComment.bind(this)
    }

    markFavorite = (dishId) => {
        this.props.postFavorite(dishId)
    }

    setRating = (rating) => {
        this.setState({
            rating: rating
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    submitComment =(dishId, rating, author, comment) =>{
        this.props.postComment(dishId, rating, author, comment)
        this.toggleModal()
        this.setState({
            rating: 1,
            author: '',
            comment: ''
        })
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render() {
        const dishId = this.props.route.params.dishId;

        return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite= {this.props.favorites.some(el => el=== dishId)}
            modalToggler={this.toggleModal} favoriteMarker = {() => this.markFavorite(dishId)} />
            <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)}/> 
            <View>
                <Modal animationType='fade' presentationStyle='fullScreen' visible={this.state.showModal} style={{display: 'flex'}}>
                    <View style={{flex: 1, display: 'flex'}}>
                        <View style={styles.moadlRow}>
                            <Rating showRating fractions ={1}
                             startingValue={1} onFinishRating={(rat) => this.setRating(rat)}/>
                        </View>
                        <View style={styles.moadlRow}>
                            <Input placeholder="Author" leftIcon={{type: "font-awesome", name: 'user-o'}} 
                            value={this.state.author} 
                            onChangeText={(val)=> this.setState({ author: val})}/>
                        </View>
                        <View style={styles.moadlRow}>
                            <Input placeholder="Comment" leftIcon={{type: "font-awesome", name: 'comment-o'}}
                            value={this.state.comment} 
                            onChangeText={(val)=> this.setState({comment: val})} />
                        </View>
                        <View style={styles.moadlRow}>
                            <Button title='SUBMIT' onPress = {() => this.submitComment(dishId, this.state.rating, this.state.author, this.state.comment)} color = '#512DA8'/>
                        </View>
                        <View style={styles.moadlRow}>    
                            <Button title='CANCEL' onPress = {this.toggleModal} color='gray' />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>);
    }
    
}

const styles = StyleSheet.create({
    moadlRow: {
        padding: 10,
    },
    commentRow: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);