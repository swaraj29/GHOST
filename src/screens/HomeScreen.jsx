import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const spookyBackground = require('../assets/ghost.jpg');
const { width } = Dimensions.get('window');

function HomeScreen() {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const flickerAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const shadowAnim = useRef(new Animated.Value(0.3)).current;

  const [isPressed, setIsPressed] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('rgba(0,0,0,0.3)', true);
    StatusBar.setTranslucent(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
        Animated.timing(flickerAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(flickerAnim, { toValue: 0.9, duration: 80, useNativeDriver: true }),
        Animated.timing(flickerAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 3000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 10, duration: 3000, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shadowAnim, { toValue: 0.8, duration: 4000, useNativeDriver: true }),
        Animated.timing(shadowAnim, { toValue: 0.3, duration: 4000, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(() => setShowWarning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const startStory = () => {
    try {
      setIsPressed(true);
      setTimeout(() => {
        navigation.navigate('Stories');
        setIsPressed(false);
      }, 300);
    } catch (error) {
      Alert.alert('Error', 'Could not navigate to Stories screen');
      setIsPressed(false);
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground source={spookyBackground} style={styles.background}>
        <Animated.View style={[styles.overlay, { opacity: shadowAnim }]} />

        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.bloodDrip} />

          <View style={styles.headerSection}>
            <View style={styles.titleContainer}>
              <Animated.Text style={[styles.title, { transform: [{ scale: pulseAnim }] }]}>
                भूत प्रेत कहानी
              </Animated.Text>
              <View style={styles.titleUnderline} />
              <View style={styles.fireContainer}>
                <Text style={styles.fireEmoji}>🔥</Text>
                <Text style={styles.fireEmoji}>🔥</Text>
                <Text style={styles.fireEmoji}>🔥</Text>
              </View>
            </View>

            <Animated.Text style={[styles.subtitle, { transform: [{ translateY: floatAnim }] }]}>
              💀 डरावनी कहानियों का संसार आपका इंतजार कर रहा है 💀
            </Animated.Text>

            {showWarning && (
              <Animated.Text style={[styles.warningText, { opacity: flickerAnim }]}>
                ⚠️ क्या आप तैयार हैं? ⚠️
              </Animated.Text>
            )}
          </View>

          <View style={styles.decorativeSection}>
            <View style={styles.skullRow}>
              <Animated.Text style={[styles.decorativeEmoji, { opacity: flickerAnim }]}>🕯️</Animated.Text>
              <Animated.Text style={[styles.centerSkull, { transform: [{ scale: pulseAnim }] }]}>💀</Animated.Text>
              <Animated.Text style={[styles.decorativeEmoji, { opacity: flickerAnim }]}>🕯️</Animated.Text>
            </View>

            <Animated.Text style={[styles.mysteriousQuote, { transform: [{ translateY: floatAnim }] }]}>
              "अंधेरे में छुपे हैं रहस्य के राज"
            </Animated.Text>

            <View style={styles.spellCircle}>
              <Text style={styles.spellText}>🕸️</Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[styles.mainButton, isPressed && styles.mainButtonPressed]}
              onPress={startStory}
              activeOpacity={0.8}
            >
              <View style={styles.buttonInner}>
                <Animated.Text style={[styles.buttonEmoji, { transform: [{ scale: pulseAnim }] }]}>🔥</Animated.Text>
                <Text style={styles.buttonText}>कहानी शुरू करें</Text>
                <Animated.Text style={[styles.buttonEmoji, { transform: [{ scale: pulseAnim }] }]}>🔥</Animated.Text>
              </View>
            </TouchableOpacity>

            <View style={styles.secondaryButtonContainer}>
              <Animated.Text style={[styles.secondaryText, { opacity: flickerAnim }]}>
                तैयार हो जाइए डरने के लिए...
              </Animated.Text>
              <Animated.View style={[styles.ghostRow, { transform: [{ translateY: floatAnim }] }]}>
                <Text style={styles.ghostEmoji}>👻</Text>
                <Text style={styles.ghostEmoji}>👻</Text>
                <Text style={styles.ghostEmoji}>👻</Text>
              </Animated.View>
            </View>
          </View>

          <View style={styles.footerSection}>
            <Animated.Text style={[styles.footerText, { transform: [{ translateY: floatAnim }] }]}>
              🌙 रात के अंधेरे में सच्चाई का सामना करें 🌙
            </Animated.Text>
            <View style={styles.mistContainer}>
              <Text style={styles.mistEmoji}>🌫️</Text>
              <Text style={styles.mistEmoji}>🌫️</Text>
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
    paddingTop: 80,
  },
  bloodDrip: {
    position: 'absolute',
    top: 40,
    left: width * 0.2,
    width: 4,
    height: 60,
    backgroundColor: '#8B0000',
    borderRadius: 2,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  headerSection: { alignItems: 'center', flex: 2, justifyContent: 'center' },
  titleContainer: { alignItems: 'center', marginBottom: 30 },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 2,
    textShadowColor: '#8B0000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  },
  titleUnderline: {
    width: 140,
    height: 6,
    backgroundColor: '#FF4444',
    borderRadius: 3,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  fireContainer: { flexDirection: 'row', justifyContent: 'space-around', width: 120, position: 'absolute', top: -10 },
  fireEmoji: { fontSize: 16, opacity: 0.8 },
  subtitle: {
    fontSize: 18,
    color: '#FFDDDD',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
    lineHeight: 26,
    paddingHorizontal: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  warningText: {
    fontSize: 16,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textShadowColor: '#8B4513',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  decorativeSection: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  skullRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  decorativeEmoji: {
    fontSize: 26,
    marginHorizontal: 20,
    textShadowColor: '#FF4500',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  centerSkull: {
    fontSize: 45,
    marginHorizontal: 10,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  mysteriousQuote: {
    fontSize: 16,
    color: '#DAA520',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: 20,
    paddingHorizontal: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  spellCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#8B4513',
    backgroundColor: 'rgba(139, 69, 19, 0.2)',
  },
  spellText: { fontSize: 24, opacity: 0.7 },
  actionSection: { alignItems: 'center', flex: 1.5, justifyContent: 'center' },
  mainButton: {
    backgroundColor: '#8B0000',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FF4444',
    marginBottom: 30,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  mainButtonPressed: {
    backgroundColor: '#660000',
    transform: [{ scale: 0.95 }],
  },
  buttonInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 40 },
  buttonEmoji: { fontSize: 22, marginHorizontal: 12 },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  secondaryButtonContainer: { alignItems: 'center' },
  secondaryText: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ghostRow: { flexDirection: 'row', justifyContent: 'center' },
  ghostEmoji: {
    fontSize: 22,
    marginHorizontal: 12,
    textShadowColor: '#FFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  footerSection: { alignItems: 'center', flex: 0.8, justifyContent: 'flex-end' },
  footerText: {
    fontSize: 14,
    color: '#DAA520',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mistContainer: { flexDirection: 'row', justifyContent: 'center', opacity: 0.6 },
  mistEmoji: { fontSize: 18, marginHorizontal: 10 },
});

export default HomeScreen;
