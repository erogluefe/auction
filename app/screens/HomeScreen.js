import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground , Dimensions, RefreshControl, Alert, Button } from 'react-native';
import AuctionList from "../components/AuctionList";
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../context/AuthContext';
import { useRequest } from '../hooks/useRequest';

//         UNSORTED,
//         BY_EXPIRATION_TIME_ASC,
//         BY_EXPIRATION_TIME_DESC,
//         BY_STARTING_TIME_ASC,
//         BY_STARTING_TIME_DESC,
//         BY_PRICE_ASC,
//         BY_PRICE_DESC
//         ?sort=UNSORTED vs



const HomeScreen = ({navigation}) => {
  const {
    auth: {signOut},
    user,
  } = React.useContext(AuthContext);

  if(!user){
    return <View></View>
  }

  const [auctionList, setAuctionList] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const refresh = () => {
    console.log('refresh')
    setRefreshing(true);
    useRequest('GET','/auctions/all?status=ACTIVE', user.token,{setState:setAuctionList});
    useRequest('GET',`/favorites/${user.id}`, user.token,{setState:setFavorites});
    setRefreshing(false);
  }

  const addFav = (auction) => {
    const body = {
        userID: user.id,
        auctionID: auction.id
    }
    useRequest('POST',`/favorites`,user.token, {body:body})
    const newFavorites = [auction, ...favorites]
    setFavorites(newFavorites)
  }

  const deleteFav = (auction) => {
      useRequest('DELETE',`/favorites/${user.id}/${auction.id}`, user.token)
      const newFavorites = favorites.filter((item) => item.id != auction.id)
      setFavorites(newFavorites)
  }

  React.useEffect(() => {
    refresh()
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode= "cover" source={require('../../assets/bckgrnd.jpg')} style={styles.image}>
        <AuctionList 
        
          refreshing={refreshing}
          onRefresh={refresh}
          navigation={navigation} 
          auctions={auctionList}
          favoriteIds={favorites.map(favorites=>favorites.id)}
          addFav={(auction) => addFav(auction)}
          deleteFav={(auction) => deleteFav(auction)}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
  },
  image: {
    flex: 1, 
    justifyContent: "center",    
  },
});

export default HomeScreen;