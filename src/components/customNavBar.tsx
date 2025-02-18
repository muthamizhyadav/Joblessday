'use strict';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import SvgIcon from '../shared/Svg';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = '#6d28d9';
const SECONDARY_COLOR = '#fff';

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              {backgroundColor: isFocused ? SECONDARY_COLOR : 'transparent'},
            ]}>
            {getIconByRouteName(
              route.name,
              isFocused ? PRIMARY_COLOR : SECONDARY_COLOR,
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}>
                {label as string}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName: string, color: string): JSX.Element {
    switch (routeName) {
      case 'Home':
        return (
          <SvgIcon name="home" height={20} width={20} strokeColor={color} />
        );
      case 'Settings':
        return (
          <SvgIcon name="setting" height={20} width={20} strokeColor={color} />
        );
      case 'Jobs':
        return (
          <SvgIcon name="job" height={20} width={20} strokeColor={color} />
        );
      case 'Profile':
        return (
          <SvgIcon name="profile" height={20} width={20} strokeColor={color} />
        );
      default:
        return (
          <SvgIcon name="home" height={20} width={20} strokeColor={color} />
        );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    alignSelf: 'center',
    bottom: 0,
    borderRadius: 0,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: 8,
    fontWeight: '700',
  },
});

export default CustomNavBar;
