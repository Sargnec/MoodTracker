import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { theme } from '../theme';

export const AppTextLight: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text {...props} style={[fontStyles.light, style]}>
      {children}
    </Text>
  );
};
export const AppTextRegular: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text {...props} style={[fontStyles.regular, style]}>
      {children}
    </Text>
  );
};
export const AppTextBold: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Text {...props} style={[fontStyles.bold, style]}>
      {children}
    </Text>
  );
};

const fontStyles = StyleSheet.create({
  light: {
    fontFamily: theme.fontFamilyLight,
  },
  regular: {
    fontFamily: theme.fontFamilyRegular,
  },
  bold: {
    fontFamily: theme.fontFamilyBold,
  },
});
