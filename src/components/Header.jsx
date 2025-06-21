import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ showBack = false, onBackPress }) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>भूत प्रेत कहानी</Text>
          </View>
          {showBack && (
            <TouchableOpacity 
              onPress={handleBackPress} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Icon name="arrow-back" size={24} color="#FF4444" />
              <Text style={styles.backText}>वापस जाएं</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
  },
  safeArea: {
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    color: '#FF4444',
    marginLeft: 4,
    fontSize: 16,
  },
  title: {
    color: '#FF4444',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Header; 