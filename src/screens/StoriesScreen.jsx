import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Header from '../components/Header';
import { storyCategories, stories } from '../data/stories';

const { width, height } = Dimensions.get('window');

function StoriesScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryStories', { category });
  };

  const handleSpecialStoryPress = () => {
    const specialStory = stories.find(story => story.categoryId === 'ghost') || {
      title: 'भुतहा खंडहर की अंतिम रात',
      content: 'एक पुराने खंडहर में छुपे रहस्य की कहानी...',
      categoryType: 'ghost',
      readingTime: '15 मिनट',
      rating: '4.9',
      author: 'अज्ञात लेखक',
      date: 'आज'
    };
    navigation.navigate('StoryDetail', { story: specialStory });
  };

  const getCategoryColors = (index) => {
    const colorSchemes = [
      { bg: 'linear-gradient(145deg, #1a0000, #2d0000)', border: '#8B0000', title: '#FF4444', button: '#AA0000', glow: '#FF0000' },
      { bg: 'linear-gradient(145deg, #0a0015, #1a0030)', border: '#4B0082', title: '#9966FF', button: '#663399', glow: '#9966CC' },
      { bg: 'linear-gradient(145deg, #001a00, #003300)', border: '#228B22', title: '#32CD32', button: '#006400', glow: '#32CD32' },
      { bg: 'linear-gradient(145deg, #1a001a, #330033)', border: '#8B008B', title: '#FF69B4', button: '#8B008B', glow: '#FF69B4' },
      { bg: 'linear-gradient(145deg, #1a0f00, #332200)', border: '#FF4500', title: '#FF6347', button: '#CD5C5C', glow: '#FF6347' },
    ];
    return colorSchemes[index % colorSchemes.length];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEerieMessage = () => {
    const hour = currentTime.getHours();
    if (hour >= 0 && hour < 6) return "🌑 अमावस्या की रात... सावधान रहें";
    if (hour >= 18 && hour < 24) return "🌙 अंधेरा घिर रहा है... डरावनी कहानियों का समय";
    return "☀️ दिन में भी छुप जाते हैं राज... पढ़ने की हिम्मत है?";
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header showBack={true} onBackPress={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.cardsContainer} showsVerticalScrollIndicator={false}>
          {/* Enhanced Time Display */}
          <View style={styles.timeContainer}>
            <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
            <Text style={styles.eerieMessage}>{getEerieMessage()}</Text>
          </View>

          {/* Improved Header Section */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>डरावनी कहानियों की दुनिया</Text>
            <View style={styles.underline} />
            <Text style={styles.subheading}>💀 रहस्य और रोमांच से भरी कहानियां 💀</Text>
            <Text style={styles.warningText}>
              ⚠️ केवल साहसी पाठकों के लिए ⚠️
            </Text>
          </View>

          {/* Enhanced Story Categories */}
          {storyCategories.map((category, index) => {
            const colors = getCategoryColors(index);
            return (
              <View 
                key={category.id} 
                style={[
                  styles.card, 
                  { 
                    backgroundColor: colors.bg.includes('gradient') ? '#1a0000' : colors.bg, 
                    borderColor: colors.border
                  }
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>
                    {category.icon}
                  </Text>
                  <View 
                    style={[
                      styles.emojiGlow, 
                      { backgroundColor: colors.glow }
                    ]} 
                  />
                </View>
                
                <Text style={[styles.cardTitle, { color: colors.title }]}>{category.title}</Text>
                <Text style={styles.cardSubtitle}>{category.description}</Text>
                
                <View style={styles.storyStats}>
                <Text style={styles.storyCount}>📚 {Math.floor(Math.random() * 10) + 1} कहानियां</Text>

                  <Text style={styles.popularityBadge}>🔥 लोकप्रिय</Text>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.cardButton, 
                    { 
                      backgroundColor: colors.button,
                      shadowColor: colors.glow
                    }
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text style={styles.cardButtonText}>कहानियां पढ़ें</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* Featured Story Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>
              ⭐ विशेष कहानी ⭐
            </Text>
            <Text style={styles.sectionSubtext}>आज की सबसे डरावनी कहानी</Text>
          </View>

          {/* Featured Story Card */}
          <View style={styles.specialCard}>
            <View style={styles.specialCardInner}>
              <View style={styles.skullDecoration}>
                <Text style={styles.decorativeSkull}>👻</Text>
                <Text style={styles.decorativeSkull2}>🏚️</Text>
              </View>
              
              <Text style={styles.specialTitle}>भुतहा खंडहर की अंतिम रात</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.specialSubtitle}>
                एक पुराने खंडहर में छुपे रहस्य की कहानी, जहां रात के समय अजीब आवाजें आती हैं। 
                क्या आप इस रहस्य को सुलझाने की हिम्मत रखते हैं?
              </Text>
              
              <View style={styles.storyMeta}>
                <Text style={styles.readingTime}>⏱️ पढ़ने का समय: 15 मिनट</Text>
                <Text style={styles.rating}>⭐ रेटिंग: 4.8/5</Text>
              </View>
              
              <TouchableOpacity style={styles.specialButton} onPress={handleSpecialStoryPress}>
                <Text style={styles.specialButtonText}>📖 अभी पढ़ें</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.horrorQuote}>
              "सच्ची डरावनी कहानियां वो हैं जो हकीकत में घटी हों"
            </Text>
            <Text style={styles.footerEmoji}>📚 👻 🌙 👻 📚</Text>
            <Text style={styles.finalNote}>
              नई कहानियां रोज़ाना अपडेट होती रहती हैं
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  timeContainer: {
    alignItems: 'center',
    marginVertical: 15,
    padding: 20,
    backgroundColor: '#1a0000',
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8B0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  currentTime: {
    fontSize: 28,
    color: '#FF4444',
    fontWeight: 'bold',
    textShadowColor: '#8B0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  eerieMessage: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: '#8B0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  underline: {
    width: 120,
    height: 4,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    borderRadius: 2,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  subheading: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  warningText: {
    fontSize: 16,
    color: '#FFD700',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  cardsContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 25,
    borderWidth: 2,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  cardHeader: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 56,
    zIndex: 2,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  emojiGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    top: -17,
    left: -17,
    zIndex: 1,
    opacity: 0.2,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  storyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  storyCount: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  popularityBadge: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  cardButton: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionHeader: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 28,
    color: '#FF6B00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#8B0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  sectionSubtext: {
    fontSize: 16,
    color: '#B8860B',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  specialCard: {
    backgroundColor: '#330000',
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 30,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 3,
    borderColor: '#8B0000',
  },
  specialCardInner: {
    backgroundColor: '#1a0000',
    margin: 4,
    borderRadius: 21,
    padding: 30,
    alignItems: 'center',
    position: 'relative',
  },
  skullDecoration: {
    position: 'absolute',
    top: 20,
    right: 25,
    flexDirection: 'row',
  },
  decorativeSkull: {
    fontSize: 24,
    opacity: 0.7,
    marginRight: 5,
  },
  decorativeSkull2: {
    fontSize: 20,
    opacity: 0.6,
  },
  specialTitle: {
    fontSize: 28,
    color: '#FF4444',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#8B0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  divider: {
    width: 100,
    height: 3,
    backgroundColor: '#8B0000',
    marginBottom: 20,
    borderRadius: 2,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  specialSubtitle: {
    fontSize: 17,
    color: '#F0E68C',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  readingTime: {
    fontSize: 13,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  specialButton: {
    backgroundColor: '#8B0000',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  specialButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#0a0000',
    marginHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#330000',
  },
  horrorQuote: {
    fontSize: 18,
    color: '#8B0000',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
    fontWeight: '500',
    lineHeight: 24,
  },
  footerEmoji: {
    fontSize: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  finalNote: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default StoriesScreen;