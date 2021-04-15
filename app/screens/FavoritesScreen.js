import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image,  TouchableOpacity } from 'react-native';
import AuctionCard from "../components/AuctionCard";
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScreenContainer } from 'react-native-screens';
import {Heading} from '../components/Heading';
import {AuthContext} from '../context/AuthContext';
import {useGet} from '../hooks/useGet';

const FavoritesScreen = ({navigation}) => {

    const {
      auth: {signOut},
      user,
    } = React.useContext(AuthContext);
    const auctionList = useGet(`/favorites/${user.id}`);
    var auctions = [];
    for(const item of auctionList){
      auctions.push(item.auctionID);
    }
    console.log(auctions)
    let auctionCards = auctionList.map((auction, index) => {
        return (
        <AuctionCard
            isFavourite={false}
            key = {index}
            //uri={auction.uri} 
            title={auction.title} 
            initialPrice={auction.initialPrice}
            //bids={auction.bids}
            highestBid={auction.highestBid} 
            expirationTime={auction.expirationTime}
            navigation={navigation}
            id={auction.auctionID}
        />
    );

  });

  return (
    <ScreenContainer style={styles.container}>
      <Heading style={styles.title}>Favorites</Heading>
      <ScrollView style={styles.scroll}>
        <View style={styles.cardsWrapper}>
        
        <View style={{alignItems:"center"}}>
          {auctionCards}
        </View>
      </View>
        
      </ScrollView>
    </ScreenContainer>
    );
};


const styles = StyleSheet.create({
    title: {
      marginBottom: 20,
    },
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      alignItems: 'center',
    },
    main: {
      paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
      alignItems: "center",
      backgroundColor: "#ffffff",
      flex: 1
    },
    header:{
      fontSize: 30,
      fontWeight: "700",
    },
    headerContainer: {
      alignItems: "center",
      width : "90%",
      padding: 10,
      margin:5,
      borderBottomWidth: 1,
      borderColor: "#8c8c8c"
    },
    scroll:{
      width: "100%",
    },
    wrapper: {},
    cardsWrapper: {
      marginTop: 20,
      width: '90%',
      alignSelf: 'center',
  },
  card: {
      height: 100,
      marginVertical: 10,
      flexDirection: 'row',
      shadowColor: '#999',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
  },
  cardImgWrapper: {
      flex: 1,
  },
});

export default FavoritesScreen;