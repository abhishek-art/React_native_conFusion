import React, { Component } from 'react';
import { FlatList, ScrollView, Text, Button, View } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import {baseURL} from '../Shared/baseURL'
import { connect } from 'react-redux'
import { postFavorite } from '../Redux/ActionCreators'
import {DISHES} from '../Shared/dishes'
import {COMMENTS} from '../Shared/comments'
import Modal from 'react-native-modal'
import {Rating, AirbnbRating} from 'react-native-ratings'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => (
    {postFavorite: (dishId)=>dispatch(postFavorite(dishId))}
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
                <View style={{display: 'flex' , justifyContent: 'flex-start'}}>
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
        this.setAuthor = this.setAuthor.bind(this)
        this.setComment = this.setComment.bind(this)
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

    setComment = (val) => {
        this.setState({
            comment: val
        })
    }

    setAuthor = (val) => {
        this.setState({
            author: val
        })
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    submitComment =() =>{
        this.toggleModal()
        console.log(this.state.author,this.state.comment, this.state.rating)
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
                <Modal isVisible={this.state.showModal}>
                    <View style={{backgroundColor: 'white', flex: 1}}>
                        <Rating showRating fractions ={1}
                         startingValue={1} onFinishRating={(rat) => this.setRating(rat)}/>
                        <View>
                            <Input placeholder="Author" leftIcon={{type: "font-awesome", name: 'user-o'}} 
                            value={this.state.author} onChange={(e)=> this.setAuthor(e.target.value)}/>
                        </View>
                        <View>
                            <Input placeholder="Comment" leftIcon={{type: "font-awesome", name: 'comment-o'}}
                            value={this.state.comment} onChange={(e)=> this.setComment(e.target.value)} />
                        </View>
                        <View>
                            <Button title='SUBMIT' onPress = {this.submitComment} color = '#512DA8'/>
                            <Button title='CANCEL' onPress = {this.toggleModal} color='gray' />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>);
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);