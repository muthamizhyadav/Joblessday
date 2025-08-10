# Inter Font Integration Guide

## Overview
The Inter font family has been successfully integrated into the React Native project. This document explains how to use the fonts throughout the application.

## Available Font Weights

### Font Family Constants
```typescript
import { FontFamily } from '../constants/fonts';

FontFamily.Inter.Light      // Inter-Light
FontFamily.Inter.Regular    // Inter-Regular  
FontFamily.Inter.Medium     // Inter-Medium
FontFamily.Inter.SemiBold   // Inter-SemiBold
FontFamily.Inter.Bold       // Inter-Bold
```

### Font Sizes
```typescript
import { FontSize } from '../constants/fonts';

FontSize.xs    // 12
FontSize.sm    // 14
FontSize.base  // 16
FontSize.lg    // 18
FontSize.xl    // 20
FontSize['2xl'] // 24
FontSize['3xl'] // 30
FontSize['4xl'] // 36
FontSize['5xl'] // 48
FontSize['6xl'] // 60
FontSize['7xl'] // 72
```

## Usage Examples

### Basic Text with Inter Font
```tsx
import { FontFamily } from '../constants/fonts';

<Text style={{
  fontFamily: FontFamily.Inter.Regular,
  fontSize: 16
}}>
  Regular text
</Text>

<Text style={{
  fontFamily: FontFamily.Inter.Bold,
  fontSize: 24
}}>
  Bold heading
</Text>
```

### Using Global Styles
```tsx
import { GlobalStyles } from '../constants/globalStyles';

<Text style={GlobalStyles.headingLarge}>Large Heading</Text>
<Text style={GlobalStyles.bodyMedium}>Body text</Text>
<Text style={GlobalStyles.caption}>Caption text</Text>
```

### Custom Styles with Inter
```tsx
const styles = StyleSheet.create({
  customTitle: {
    fontFamily: FontFamily.Inter.SemiBold,
    fontSize: FontSize['2xl'],
    color: '#333',
    lineHeight: FontSize['2xl'] * 1.2,
  },
  customBody: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.base,
    color: '#666',
    lineHeight: FontSize.base * 1.5,
  }
});
```

## Updated Components

The following components have been updated to use Inter font:

1. **App.tsx** - Splash screen title
2. **SharedButton.tsx** - Button text
3. **SharedInput.tsx** - Input labels and text
4. **OnboardScreen.tsx** - Heading text

## Global Style Classes

Pre-defined styles are available in `GlobalStyles`:

- `headingLarge` - Large page headings
- `headingMedium` - Section headings  
- `headingSmall` - Subsection headings
- `bodyLarge` - Main body text
- `bodyMedium` - Secondary text
- `bodySmall` - Small text
- `caption` - Caption text
- `buttonText` - Button text
- `labelText` - Form labels

## Best Practices

1. **Consistency**: Use the predefined FontFamily constants instead of hardcoding font names
2. **Line Height**: Always set appropriate line heights for better readability
3. **Font Weight**: Use semantic font weights (Light, Regular, Medium, SemiBold, Bold)
4. **Global Styles**: Prefer using GlobalStyles for common text patterns
5. **Performance**: Font files are bundled with the app for offline usage

## File Structure

```
src/
├── assets/
│   └── fonts/
│       ├── Inter-Light.ttf
│       ├── Inter-Regular.ttf
│       ├── Inter-Medium.ttf
│       ├── Inter-SemiBold.ttf
│       └── Inter-Bold.ttf
├── constants/
│   ├── fonts.ts
│   └── globalStyles.ts
└── ...

android/app/src/main/assets/fonts/
├── Inter-Light.ttf
├── Inter-Regular.ttf
├── Inter-Medium.ttf
├── Inter-SemiBold.ttf
└── Inter-Bold.ttf
```

## Platform Support

✅ **Android**: Fonts are copied to `android/app/src/main/assets/fonts/`
✅ **iOS**: Fonts need to be added to iOS project (if iOS support is needed)

The fonts are now ready to use throughout your React Native application!
