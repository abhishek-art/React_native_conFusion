import React, {Component} from 'react'
import {Text, View, ScrollView, StyleSheet, Switch, Button, Picker, TouchableOpacity, Alert} from 'react-native'
//import {Picker} from '@react-native-community/picker'
import {Icon} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'
import * as Animatable from 'react-native-animatable'
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'
import {Notifications} from 'expo'

class Reservation extends Component {
    constructor(props){
        super(props)
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date,
            show: false,
            mode: 'date',
        }
    }

    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        });
    }

    async obtainCalendarPermission () {
        let permission = await Calendar.requestCalendarPermissionsAsync()
        if (permission.status === 'granted'){
            console.log('Calendar Access Granted')
        }
        return permission
    }

    async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if(permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if (permission.status !== 'granted'){
                Alert.alert('Permission Not Granted To Show Notifications')
            }
        }
        return permission
    }

    async presentLocalNotification(date){
        await this.obtainNotificationPermission()
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation For ' + date + ' requsted'
        })
    }

    async addReservationToCalendar(date){
        const _date = new Date(Date.parse(date))

        await this.obtainCalendarPermission()

        let event = await Calendar.createEventAsync( Calendar.DEFAULT, {
            title: 'Con Fusion Table Reservation',
            startDate: _date,
            endDate: _date + 7200000,
            timeZone:  'Asia/Hong_Kong',
            location:  '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })

        console.log('Calendar Id : '+ event)
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests} \n 
            Smoking? ${this.state.smoking} \n
            Date and Time: ${this.state.date}`,
            [
                {text: 'CANCEL',
                onPress: () => {console.log('cancel pressed')
                                this.resetForm()},
                style: 'cancel'},
                {
                    text: 'OK',
                    onPress: () =>{console.log('OK pressed')
                                    this.presentLocalNotification(this.state.date)
                                    this.addReservationToCalendar(this.state.date)
                                    this.resetForm()
                                    }
                }
            ]
        )
    }
    

    render(){
        return (

            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guests}
                    onValueChange={(itemValue,itemIndex)=> this.setState({
                        guests: itemValue
                    })}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' /> 
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking ?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking}
                    trackColor='#512DA8' onValueChange={(value)=> this.setState({smoking: value})}>

                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity style={styles.formItem}
            style={{
                padding: 7,
                borderColor: '#512DA8',
                borderWidth: 2,
                flexDirection: "row"
            }}
            onPress={() => this.setState({ show: true, mode: 'date' })}
      >
          <Icon type='font-awesome' name='calendar' color='#512DA8' />
          <Text >
              {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
          </Text>
      </TouchableOpacity>
      {/* Date Time Picker */}
      {this.state.show && (
          <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              minimumDate={new Date()}
              minuteInterval={30}
              onChange={(event, date) => {
                  if (date === undefined) {
                      this.setState({ show: false });
                  }
                  else {
                      this.setState({
                          show: this.state.mode === "time" ? false : true,
                          mode: "time",
                          date: new Date(date)
                      });
                        }
                    }}
            />
        )}
                </View>
                <View style={styles.formRow}>
                    <Button title='Reserve' color="#512AD8" onPress={()=>this.handleReservation()}/>
                </View>
                </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal:{
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation