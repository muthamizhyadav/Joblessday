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
      // Handle role-based navigation with proper parameters
      if (id === 1) {
        // Recruiter role
        navigation.navigate('Signup', { 
          role: 'recruiter', 
          userType: 'recruiter',
          fromOnboard: true 
        });
      } else if (id === 2) {
        // Job Seeker role  
        navigation.navigate('Signup', { 
          role: 'candidate', 
          userType: 'jobseeker',
          fromOnboard: true 
        });
      }
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
          {/* Trending Design Background */}
          <LinearGradient
            colors={isSelected ? ['#694bc3', '#8b5fbf'] : ['#f8f9ff', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardGradientBackground}
          />

          {/* Highlighter Design Elements */}
          <View style={styles.highlighterContainer}>
            <View style={[styles.highlighterLine, isSelected && styles.highlighterLineSelected]} />
            <View style={[styles.highlighterDot, isSelected && styles.highlighterDotSelected]} />
          </View>

          {/* Modern Card Layout */}
          <View style={styles.modernCardLayout}>
            {/* Left Section - Icon */}
            <View style={styles.iconSection}>
              <View style={[
                styles.modernIconContainer,
                isSelected && styles.modernIconContainerSelected
              ]}>
                <SvgIcon
                  name={icon}
                  height={32}
                  width={32}
                  color={isSelected ? "#fff" : "#694bc3"}
                />
              </View>
            </View>

            {/* Right Section - Content */}
            <View style={styles.contentSection}>
              <Text style={[
                styles.modernCardTitle,
                isSelected && styles.modernCardTitleSelected
              ]}>
                {title}
              </Text>
              <Text style={[
                styles.modernCardDescription,
                isSelected && styles.modernCardDescriptionSelected
              ]}>
                {description}
              </Text>
            </View>

            {/* Selection Arrow */}
            <View style={styles.arrowSection}>
              <SvgIcon
                name="right"
                height={20}
                width={20}
                color={isSelected ? "#fff" : "#694bc3"}
              />
            </View>
          </View>

          {/* Floating Selection Indicator */}
          {isSelected && (
            <View style={styles.floatingIndicator}>
              <SvgIcon
                name="tick"
                height={16}
                width={16}
                color="#fff"
              />
            </View>
          )}
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
          {/* Role Selection */}
          <View style={styles.selectionContainer}>
            <View style={styles.selectionHeader}>
              <Text style={styles.selectionTitle}>
                Choose Your Role
              </Text>
              <View style={styles.titleAccent} />
            </View>

            <Text style={styles.selectionSubtitle}>
              Choose your path to get started
            </Text>

            <View style={styles.cardsContainer}>
              <RoleCard
                id={1}
                title="Hire Talent"
                icon="candidate"
                route="Signup"
                params={{id: 1}}
                description="Post jobs and find the perfect candidates for your company"
                selected={selected}
                onSelect={handleRoleSelect}
                navigation={navigation}
              />

              <RoleCard
                id={2}
                title="Find Jobs"
                icon="search"
                route="Signup"
                params={{id: 2}}
                description="Explore opportunities and grow your career"
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
            onPress={() => navigation.navigate('singin' as never)}
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
    paddingTop: 40,
    paddingBottom: 120,
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
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
    marginTop: 40,
  },
  cardsContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 20,
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
    shadowColor: '#694bc3',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(105, 75, 195, 0.15)',
  },
  roleCardSelected: {
    shadowColor: '#694bc3',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 28,
    elevation: 20,
    borderColor: '#694bc3',
    borderWidth: 3,
    transform: [{scale: 1.02}],
  },
  roleCardContent: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 80,
  },
  roleCardIconSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  roleCardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#694bc3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#694bc3',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 4,
  },
  roleCardTextSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  roleCardTitle: {
    fontSize: 22,
    fontFamily: FontFamily.Inter.Bold,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
    lineHeight: 26,
  },
  roleCardDescription: {
    fontSize: 14,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
    flexShrink: 1,
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
    paddingHorizontal: 4,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  roleCardContainer: {
    width: '100%',
    maxWidth: 600,
    minWidth: 320,
  },
  roleCardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  illustrationCircle1: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#694bc3',
    opacity: 0.3,
  },
  illustrationCircle2: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#694bc3',
    opacity: 0.2,
  },
  // Modern Trending Design Styles
  cardGradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modernCardLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 28,
    minHeight: 120,
  },
  iconSection: {
    marginRight: 16,
  },
  modernIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(105, 75, 195, 0.2)',
  },
  modernIconContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contentSection: {
    flex: 1,
    paddingRight: 12,
  },
  modernCardTitle: {
    fontSize: 18,
    fontFamily: FontFamily.Inter.Bold,
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  modernCardTitleSelected: {
    color: '#fff',
  },
  modernCardDescription: {
    fontSize: 14,
    fontFamily: FontFamily.Inter.Regular,
    color: '#666',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  modernCardDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  arrowSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
  },
  floatingIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  // Highlighter Design Styles
  highlighterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  highlighterLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'rgba(105, 75, 195, 0.3)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  highlighterLineSelected: {
    backgroundColor: '#FFD700',
    width: 6,
    shadowColor: '#FFD700',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  highlighterDot: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(105, 75, 195, 0.4)',
  },
  highlighterDotSelected: {
    backgroundColor: '#FFD700',
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: '#FFD700',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
});
