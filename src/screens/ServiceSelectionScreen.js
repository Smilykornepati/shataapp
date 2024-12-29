import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  Image,
  Platform,
  AccessibilityInfo,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

// Theme colors with darker orange
const theme = {
  light: {
    primary: '#e86b15', // Slightly darker orange
    secondary: '#247BA0',
    accent: '#1B998B',
    background: '#F7F9FC',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    subtext: '#4A5568',
    border: '#E2E8F0',
    inactive: '#D1D5DB',
  },
  dark: {
    primary: '#e86b15', // Matching darker orange
    secondary: '#2B6CB0',
    accent: '#2C7A7B',
    background: '#1A202C',
    surface: '#2D3748',
    text: '#F7FAFC',
    subtext: '#A0AEC0',
    border: '#4A5568',
    inactive: '#4B5563',
  },
};

// Preload all images
const images = {
  events: require('../assets/icons/events-icon.png'),
  photography: require('../assets/icons/photography-icon.png'),
  catering: require('../assets/icons/catering-icon.png'),
  rightArrow: require('../assets/icons/right-arrow.png'),
  logo: require('../assets/logo.png'),
};

const ServiceSelectionScreen = () => {
  // ... [Previous ServiceSelectionScreen code remains the same] ...
};

const DetailedServiceScreen = ({ route }) => {
  const { serviceType } = route.params;
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme] || theme.light;

  const [selectedService, setSelectedService] = useState(serviceType);

  const serviceOptions = {
    events: [
      'Wedding',
      'Engagement',
      'Surprise',
      'Proposals',
      'Family Functions',
      'Corporate Events'
    ],
    photography: [
      'Self Portraits',
      'Professional Portraits',
      'Wedding Photography',
      'Baby Shower'
    ],
    catering: [
      'Food Counters',
      'Plated Meal',
      'Live Counters',
      'Buffet'
    ]
  };

  const serviceDescriptions = {
    events: {
      'Wedding': 'Create your perfect day with our comprehensive wedding planning services',
      'Engagement': 'Celebrate your special moment with elegantly designed engagement ceremonies',
      'Surprise': 'Plan unforgettable surprise events that leave lasting memories',
      'Proposals': 'Create magical proposal moments with our expert planning',
      'Family Functions': 'Bring families together with perfectly orchestrated gatherings',
      'Corporate Events': 'Professional corporate event management for impactful business gatherings'
    },
    photography: {
      'Self Portraits': 'Capture your authentic self with professional self-portrait sessions',
      'Professional Portraits': 'Stand out with high-quality professional headshots',
      'Wedding Photography': 'Document your special day with artistic wedding photography',
      'Baby Shower': 'Preserve precious moments with beautiful baby shower photography'
    },
    catering: {
      'Food Counters': 'Interactive food stations featuring diverse culinary experiences',
      'Plated Meal': 'Elegant plated dining experiences with premium service',
      'Live Counters': 'Dynamic live cooking stations for an interactive dining experience',
      'Buffet': 'Extensive buffet selections with international and local cuisines'
    }
  };

  const ServiceIcon = ({ type, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedService(type)}
      style={[
        styles.serviceIcon,
        { backgroundColor: isSelected ? colors.primary : colors.inactive }
      ]}
    >
      <Image
        source={images[type]}
        style={[styles.iconSmall, { tintColor: isSelected ? '#FFFFFF' : '#000000' }]}
      />
    </TouchableOpacity>
  );

  const ServiceButton = ({ title }) => (
    <TouchableOpacity
      style={[styles.serviceButton, { backgroundColor: colors.surface }]}
      activeOpacity={0.8}
    >
      <View style={styles.serviceButtonContent}>
        <Text style={[styles.serviceButtonText, { color: colors.primary }]}>
          {title}
        </Text>
        <Text style={[styles.serviceButtonDescription, { color: colors.subtext }]}>
          {serviceDescriptions[selectedService][title]}
        </Text>
        <View style={styles.buttonFooter}>
          <Image 
            source={images.rightArrow}
            style={[styles.buttonArrow, { tintColor: colors.primary }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.serviceIconsContainer}>
        <ServiceIcon type="events" isSelected={selectedService === 'events'} />
        <ServiceIcon type="photography" isSelected={selectedService === 'photography'} />
        <ServiceIcon type="catering" isSelected={selectedService === 'catering'} />
      </View>

      <ScrollView style={styles.optionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}
        </Text>
        <View style={styles.buttonGrid}>
          {serviceOptions[selectedService].map((option, index) => (
            <ServiceButton key={index} title={option} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Service Icons Section
  serviceIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 24,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconSmall: {
    width: 32,
    height: 32,
  },
  // Options Section
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  buttonGrid: {
    paddingBottom: 24,
  },
  // Service Button Styles
  serviceButton: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  serviceButtonContent: {
    padding: 20,
  },
  serviceButtonText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  serviceButtonDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  buttonFooter: {
    alignItems: 'flex-end',
  },
  buttonArrow: {
    width: 20,
    height: 20,
  },
});

export { ServiceSelectionScreen, DetailedServiceScreen };