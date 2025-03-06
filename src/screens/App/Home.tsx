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
import {useSelector} from 'react-redux';
import GradientView from '../../shared/gradient';

const HomeScreen: React.FC = () => {
  const {user, tokens} = useSelector((state: any) => state.app.data);
  return (
    <ScrollView style={styles.container}>
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
              {user?.name}
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <SvgIcon name="bell" width={24} height={24} strokeColor="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '100%', height: 200, marginTop: 10}}>
        <GradientView
          colors={['#faf5ff', '#a855f7']}
          style={styles.Gradientcontainer}>
          <View
            style={{
              width: '90%',
              margin: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Text></Text>
          </View>
          <Text style={styles.text}>Hello, Gradient!</Text>
        </GradientView>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '48%',
            height: 180,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#e2e8f0',
            backgroundColor: '#9333ea',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              width: 30,
              alignSelf: 'flex-end',
              margin: 7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View style={{padding: 4}}>
              <SvgIcon
                name="redirect"
                height={22}
                width={22}
                strokeColor="#9333ea"
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              textAlign: 'center',
              fontWeight: '700',
              color: 'white',
            }}>
            Received Profiles
          </Text>

          <Text
            style={{
              fontSize: 38,
              textAlign: 'center',
              fontWeight: '700',
              color: 'white',
              marginTop: 10,
            }}>
            56
          </Text>
        </View>
        <View
          style={{
            width: '48%',
            height: 180,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#e2e8f0',
            backgroundColor: '#eff6ff',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0284c7',
              width: 30,
              alignSelf: 'flex-end',
              margin: 7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View style={{padding: 4}}>
              <SvgIcon
                name="redirect"
                height={22}
                width={22}
                strokeColor="white"
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontWeight: '700',
              color: '#0369a1',
              width: '90%',
              alignSelf: 'center',
            }}>
            Viewed Profiles
          </Text>
          <Text
            style={{
              fontSize: 38,
              textAlign: 'center',
              fontWeight: '700',
              color: '#0369a1',
              marginTop: 10,
            }}>
            50
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '48%',
            height: 180,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#e2e8f0',
            backgroundColor: '#fff7ed',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f97316',
              width: 30,
              alignSelf: 'flex-end',
              margin: 7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View style={{padding: 4}}>
              <SvgIcon
                name="redirect"
                height={22}
                width={22}
                strokeColor="white"
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontWeight: '700',
              color: '#f97316',
              width: '90%',
              alignSelf: 'center',
            }}>
            Shorlisted Profiles
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '700',
              color: '#f97316',
              marginTop: 10,
            }}>
            45
          </Text>
        </View>

        <View
          style={{
            width: '48%',
            height: 180,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#e2e8f0',
            backgroundColor: '#f0fdf4',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#22c55e',
              width: 30,
              alignSelf: 'flex-end',
              margin: 7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View style={{padding: 4}}>
              <SvgIcon
                name="redirect"
                height={22}
                width={22}
                strokeColor="white"
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontWeight: '700',
              color: '#16a34a',
              width: '90%',
              alignSelf: 'center',
            }}>
            Scheduled Profiles
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '700',
              color: '#16a34a',
              marginTop: 10,
            }}>
            40
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <SvgIcon name="location" strokeColor="#9333ea" width={20} height={20} />
        <Text style={{fontSize: 20, fontWeight: '700', color: '#9333ea'}}>
          Profile locations
        </Text>
      </View>

      <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#fff',
            alignContent: 'center',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 3,
          }}>
          <View
            style={{
              height: '100%',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{paddingLeft: 5}}>
              <SvgIcon name="locationround" strokeColor="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, paddingLeft: 5, fontWeight: 700}}>
              Chennai, Tamilnadu
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#fff',
            alignContent: 'center',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 3,
          }}>
          <View
            style={{
              height: '100%',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{paddingLeft: 5}}>
              <SvgIcon name="locationround" strokeColor="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, paddingLeft: 5, fontWeight: 700}}>
              Hydrabad, Telungana
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#fff',
            alignContent: 'center',
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 3,
          }}>
          <View
            style={{
              height: '100%',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={{paddingLeft: 5}}>
              <SvgIcon name="locationround" strokeColor="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, paddingLeft: 5, fontWeight: 700}}>
              Banglore, Karntaka
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  Gradientcontainer: {
    flex: 1,
    width: '95%',
    margin: 'auto',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export const Home = HomeScreen;
