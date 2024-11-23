import React, { useContext } from 'react';
import {
    Dimensions,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleRateApp = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/yourappid',
      android: 'https://play.google.com/store/apps/details?id=yourappid'
    });
    Linking.openURL(storeUrl || '');
  };

  const renderSettingItem = (
    icon: string, 
    title: string, 
    subtitle?: string,
    action?: () => void,
    hasSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity 
      style={[
        styles.settingItem, 
        { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
        }
      ]}
      onPress={action}
      disabled={!action && !hasSwitch}
    >
      <View style={styles.settingContent}>
        <View style={[
          styles.iconContainer, 
          { 
            backgroundColor: theme.dark 
              ? `${theme.colors.primary}30`
              : `${theme.colors.primary}15` 
          }
        ]}>
          <Icon name={icon} size={isSmallDevice ? 20 : 22} color={theme.colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[
            styles.settingText, 
            { 
              color: theme.colors.text,
              fontSize: isSmallDevice ? 15 : 16 
            }
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[
              styles.settingSubtext, 
              { 
                color: `${theme.colors.text}80`,
                fontSize: isSmallDevice ? 12 : 14
              }
            ]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {hasSwitch ? (
        <View style={styles.switchContainer}>
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ 
              false: theme.dark ? '#4A5568' : '#CBD5E0',
              true: theme.colors.primary 
            }}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : switchValue ? theme.colors.primary : '#F0F0F0'}
            ios_backgroundColor={theme.dark ? '#4A5568' : '#CBD5E0'}
            style={[
              styles.switch,
              Platform.OS === 'ios' && styles.iosSwitch
            ]}
          />
        </View>
      ) : action && (
        <Icon 
          name="chevron-forward" 
          size={isSmallDevice ? 18 : 20} 
          color={`${theme.colors.text}60`} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
        {renderSettingItem(
          theme.dark ? 'moon' : 'sunny',
          'Dark Mode',
          'Switch between light and dark themes',
          undefined,
          true,
          theme.dark,
          toggleTheme
        )}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferences</Text>
        {renderSettingItem(
          'notifications',
          'Daily Reminder',
          'Get reminded to log your mood',
          undefined,
          true,
          false,
          () => {}
        )}
        {renderSettingItem(
          'language',
          'Language',
          'Change app language',
          () => {}
        )}
        {renderSettingItem(
          'time',
          'Reminder Time',
          'Set your preferred reminder time',
          () => {}
        )}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Support & About</Text>
        {renderSettingItem(
          'star',
          'Rate App',
          'Share your experience with others',
          handleRateApp
        )}
        {renderSettingItem(
          'mail',
          'Contact Support',
          'Get help or share feedback',
          () => Linking.openURL('mailto:jay8460568088@gmail.com')
        )}
        {renderSettingItem(
          'document-text',
          'Privacy Policy',
          'Read our privacy policy',
          () => Linking.openURL('https://yourapp.com/privacy')
        )}
        {renderSettingItem(
          'information-circle',
          'About',
          'Learn more about MoodTracker AI',
          () => {}
        )}

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: `${theme.colors.text}60` }]}>
            Version 1.0.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: width * 0.04, // Responsive padding
    paddingTop: Platform.OS === 'ios' ? 0 : width * 0.02,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 13 : 14,
    fontWeight: '600',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    marginLeft: width * 0.02,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.04,
    borderRadius: 16,
    marginBottom: height * 0.012,
    marginHorizontal: width * 0.01,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: width * 0.02,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  iconContainer: {
    width: width * 0.1,
    height: width * 0.1,
    minWidth: 36,
    minHeight: 36,
    maxWidth: 44,
    maxHeight: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  textContainer: {
    flex: 1,
    marginRight: width * 0.03,
  },
  settingSubtext: {
    fontSize: 14,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 51, // minimum width for switch
    height: 31, // standard height for switch
  },
  switch: {
    transform: Platform.select({
      ios: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
      android: [{ scaleX: 1 }, { scaleY: 1 }],
    }),
  },
  iosSwitch: {
    marginRight: -8, // iOS specific adjustment
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  versionText: {
    fontSize: 16,
  },
});

export default SettingsScreen; 