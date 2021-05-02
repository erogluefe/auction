import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import {shade1, shade2, shade3, shade4, shade5, shadeTrans} from "../config/color"
import moment from 'moment'

const NotificationCard = ({navigation, data}) => {
    return (
        <View style={styles.card} >
            <View style={styles.cardInfo}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.cardTitle}>{data.title}</Text>
                </View>
                <Text style={styles.cardDetails}>
                {data.content}
                </Text>
                <Text style={{alignSelf:'flex-end', fontSize: 15,color: shade5}}>
                    {moment((new Date(data.time))).format('DD.MM.YYYY')}    
                </Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        height: 83,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: shade3,
        borderRadius: 10

    },
    cardInfo: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: shade5
    },
    cardDetails: {
        fontSize: 15,
        color: shade5
    },
})

export default NotificationCard;
