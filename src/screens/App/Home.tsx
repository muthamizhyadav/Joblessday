import * as React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.imageContainer}>
            {/* {imageLoaded == true ? (
              <SkeletonLoader height={50} width={50} borderRadius={100} />
            ) : ( */}
            <Image
              source={{
                uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1738906399~exp=1738909999~hmac=539b1f69853d77427d021c2c96e31693395f5dde2eb0226270813036929392b8&w=1380',
              }}
              style={styles.image}
            />
            {/* )} */}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                paddingLeft: 4,
              }}>
              Marcus
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <SvgIcon name="bell" width={24} height={24} strokeColor="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: '95%',
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  headerLeft: {
    display: 'flex',
    gap: 5,
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 700,
    fontSize: 16,
  },
  headerRight: {
    width: 'auto',
    height: 'auto',
    marginRight: 10,
  },
});

export const Home = HomeScreen;
