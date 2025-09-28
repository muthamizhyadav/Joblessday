import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import SvgIcon from '../shared/Svg';
import {useNavigation} from '@react-navigation/native';
import {FontFamily} from '../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';

// RoleCard Component - Complete Redesign
const RoleCard = ({
  id,
  title,
  icon,
  route,
  params,
  description,
  selected,
  onSelect,
  navigation,
}: {
  id: number;
  title: string;
  icon: string;
  route: string;
  params?: any;
  description: string;
  selected: number;
  onSelect: (id: number) => void;
  navigation: any;
}) => {
  const isSelected = selected === id;
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    onSelect(id);
    setTimeout(() => {
      navigation.navigate(route, params);
    }, 300);
  };

  return (
    <Animated.View
      style={[
        styles.roleCardContainer,
        {
          transform: [{scale: scaleAnim}],
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[
          styles.roleCardTouchable,
          isSelected && styles.roleCardSelected,
        ]}>
        <View style={styles.roleCardContent}>
          {/* Icon Section */}
          <View style={styles.roleCardIconSection}>
            <View style={styles.roleCardIconContainer}>
              <SvgIcon
                name={icon}
                height={32}
                width={32}
                color="#fff"
              />
            </View>
          </View>

          {/* Text Section */}
          <View style={styles.roleCardTextSection}>
            <Text style={styles.roleCardTitle}>
              {title}
            </Text>
            <Text style={styles.roleCardDescription}>
              {description}
            </Text>
          </View>

          {/* Selection Indicator */}
          <View style={styles.roleCardSelectionContainer}>
            {isSelected && (
              <View style={styles.roleCardSelectionDot} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const OnboardScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number>(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleRoleSelect = (id: number) => {
    setSelected(id);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f8f9ff', '#e8f2ff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.backgroundGradient}
      />

      {/* Premium Background Elements */}
      <View style={styles.backgroundDecoration}>
        <View style={styles.decorationCircle1} />
        <View style={styles.decorationCircle2} />
        <View style={styles.decorationCircle3} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          {/* Header Section */}
          <View style={styles.headerContainer} />

          {/* Role Selection */}
          <View style={styles.selectionContainer}>
            <View style={styles.selectionHeader}>
              <Text style={styles.selectionTitle}>
                Choose Your Role
              </Text>
              <View style={styles.titleAccent} />
            </View>

            <Text style={styles.selectionSubtitle}>
              Select how you'd like to use our platform
            </Text>

            <View style={styles.cardsContainer}>
              <RoleCard
                id={1}
                title="I'm a Recruiter"
                icon="recruiter"
                route="Signup"
                params={{id: 1}}
                description="Post jobs, find talent, and build your dream team"
                selected={selected}
                onSelect={handleRoleSelect}
                navigation={navigation}
              />

              <RoleCard
                id={2}
                title="I'm a Job Seeker"
                icon="jobseaker"
                route="NewPassword"
                params={{id: 2}}
                description="Discover opportunities and advance your career"
                selected={selected}
                onSelect={handleRoleSelect}
                navigation={navigation}
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.footerGradient}
        />
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('signin' as never)}
            style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const Onboard = OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorationCircle1: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(105, 75, 195, 0.08)',
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },
  decorationCircle2: {
    position: 'absolute',
    top: '60%',
    left: '5%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(105, 75, 195, 0.06)',
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  decorationCircle3: {
    position: 'absolute',
    bottom: '20%',
    right: '15%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(105, 75, 195, 0.05)',
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 36,
    fontFamily: FontFamily.Inter.Bold,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(105, 75, 195, 0.08)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 320,
    letterSpacing: 0.2,
  },
  divider: {
    width: 80,
    height: 6,
    backgroundColor: '#694bc3',
    borderRadius: 3,
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dividerContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  dividerAccent: {
    position: 'absolute',
    width: 120,
    height: 2,
    backgroundColor: 'rgba(105, 75, 195, 0.3)',
    borderRadius: 1,
    top: 2,
  },
  selectionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  selectionTitle: {
    fontSize: 32,
    fontFamily: FontFamily.Inter.Bold,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(105, 75, 195, 0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  selectionHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleAccent: {
    width: 60,
    height: 4,
    backgroundColor: '#694bc3',
    borderRadius: 2,
    marginTop: 8,
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  selectionSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  footerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    letterSpacing: 0.2,
  },
  signInButton: {
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  signInText: {
    fontSize: 16,
    fontFamily: FontFamily.Inter.Bold,
    color: '#694bc3',
    textDecorationLine: 'underline',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(105, 75, 195, 0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  roleCardTouchable: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  roleCardSelected: {
    shadowColor: '#694bc3',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
    borderColor: 'rgba(105, 75, 195, 0.2)',
  },
  roleCardContent: {
    padding: 24,
    alignItems: 'center',
    minHeight: 200,
  },
  roleCardIconSection: {
    marginBottom: 16,
  },
  roleCardIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#694bc3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  roleCardTextSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  roleCardTitle: {
    fontSize: 20,
    fontFamily: FontFamily.Inter.Bold,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  roleCardDescription: {
    fontSize: 15,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 140,
  },
  roleCardSelectionContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  roleCardSelectionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#694bc3',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  animatedContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roleCardContainer: {
    flex: 1,
    marginHorizontal: 2,
  },
});
