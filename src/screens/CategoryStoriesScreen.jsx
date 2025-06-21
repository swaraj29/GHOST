import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  LinearGradient
} from 'react-native';
import Header from '../components/Header';
import { stories } from '../data/stories';

const { width: screenWidth } = Dimensions.get('window');

function CategoryStoriesScreen({ route, navigation }) {
  const { category } = route.params;
  
  const categoryStories = stories.filter(story => story.categoryId === category.id);

  const handleStoryPress = (story) => {
    navigation.navigate('StoryDetail', { story });
  };

  const getCategoryTheme = () => {
    const themes = {
      ghost: { 
        primary: '#FF3333',
        secondary: '#CC1A1A', 
        accent: '#FF6666',
        dark: '#0D0606',
        darker: '#080303',
        light: '#FFE6E6',
        shadow: 'rgba(255, 51, 51, 0.3)',
        gradient: ['rgba(13, 6, 6, 0.95)', 'rgba(8, 3, 3, 1)']
      },
      witch: { 
        primary: '#9966FF',
        secondary: '#7733CC', 
        accent: '#BB88FF',
        dark: '#0A0515',
        darker: '#050208',
        light: '#F0E6FF',
        shadow: 'rgba(153, 102, 255, 0.3)',
        gradient: ['rgba(10, 5, 21, 0.95)', 'rgba(5, 2, 8, 1)']
      },
      haunted: { 
        primary: '#33FF66',
        secondary: '#1ACC44', 
        accent: '#66FF88',
        dark: '#051505',
        darker: '#020802',
        light: '#E6FFE6',
        shadow: 'rgba(51, 255, 102, 0.3)',
        gradient: ['rgba(5, 21, 5, 0.95)', 'rgba(2, 8, 2, 1)']
      },
      demon: { 
        primary: '#FF1493',
        secondary: '#CC1077', 
        accent: '#FF44AA',
        dark: '#150510',
        darker: '#080208',
        light: '#FFE6F7',
        shadow: 'rgba(255, 20, 147, 0.3)',
        gradient: ['rgba(21, 5, 16, 0.95)', 'rgba(8, 2, 8, 1)']
      },
      cursed: { 
        primary: '#FF6600',
        secondary: '#CC4400', 
        accent: '#FF8833',
        dark: '#150A05',
        darker: '#080402',
        light: '#FFEDE6',
        shadow: 'rgba(255, 102, 0, 0.3)',
        gradient: ['rgba(21, 10, 5, 0.95)', 'rgba(8, 4, 2, 1)']
      },
    };
    return themes[category.type] || themes.ghost;
  };

  const theme = getCategoryTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.darker }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.darker} />
      
      {/* Subtle atmospheric background */}
      <View style={[styles.backgroundOverlay, { backgroundColor: theme.shadow }]} />
      
      {/* Subtle corner shadows for depth */}
      <View style={styles.cornerShadows}>
        <View style={[styles.cornerShadow, styles.topLeft, { backgroundColor: theme.shadow }]} />
        <View style={[styles.cornerShadow, styles.topRight, { backgroundColor: theme.shadow }]} />
        <View style={[styles.cornerShadow, styles.bottomLeft, { backgroundColor: theme.shadow }]} />
        <View style={[styles.cornerShadow, styles.bottomRight, { backgroundColor: theme.shadow }]} />
      </View>

      <Header showBack={true} onBackPress={() => navigation.goBack()} />

      <ScrollView 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        {/* ELEGANT CATEGORY HEADER */}
        <View 
          style={[
            styles.categoryHeader, 
            { 
              backgroundColor: theme.dark,
              borderColor: theme.primary,
              shadowColor: theme.shadow,
            }
          ]}
        >
          {/* Elegant border frame */}
          <View style={[styles.headerFrame, { borderColor: theme.primary }]} />
          
          {/* Icon section */}
          <View style={styles.iconSection}>
            <View style={[styles.iconGlow, { backgroundColor: theme.shadow }]} />
            <View style={[styles.iconBorder, { borderColor: theme.accent }]} />
            <Text style={[styles.categoryIcon, { textShadowColor: theme.primary }]}>
              {category.icon}
            </Text>
          </View>

          {/* Title section */}
          <Text style={[styles.categoryTitle, { color: theme.primary }]}>
            {category.title}
          </Text>
          
          <View style={[styles.titleUnderline, { backgroundColor: theme.primary }]} />

          <Text style={[styles.categoryDescription, { color: theme.light }]}>
            {category.description}
          </Text>

          {/* Stats section */}
          <View style={[styles.statsContainer, { backgroundColor: theme.darker }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.accent }]}>
                {categoryStories.length}
              </Text>
              <Text style={styles.statLabel}>कहानियां</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.primary }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statEmoji, { color: theme.accent }]}>💀</Text>
              <Text style={styles.statLabel}>डरावनी</Text>
            </View>
          </View>
        </View>

        {/* STORIES SECTION HEADER */}
        <View style={styles.storiesHeader}>
          <Text style={[styles.storiesHeaderText, { color: theme.primary }]}>
            📚 कहानियों का संग्रह
          </Text>
          <Text style={[styles.storiesSubtext, { color: theme.accent }]}>
            अपनी पसंदीदा कहानी चुनें
          </Text>
          <View style={[styles.sectionDivider, { backgroundColor: theme.primary }]} />
        </View>

        {/* BEAUTIFUL STORY CARDS */}
        {categoryStories.map((story, index) => (
          <TouchableOpacity
            key={story.id}
            style={[
              styles.storyCard, 
              { 
                borderColor: theme.primary,
                backgroundColor: theme.dark,
                shadowColor: theme.shadow,
              }
            ]}
            onPress={() => handleStoryPress(story)}
            activeOpacity={0.9}
          >
            {/* Card frame decoration */}
            <View style={[styles.cardFrame, { borderColor: theme.accent }]} />
            
            {/* Story number badge */}
            <View style={[styles.storyBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.badgeNumber}>{index + 1}</Text>
            </View>

            {/* Story content */}
            <View style={styles.storyContent}>
              <View style={styles.storyHeader}>
                <Text 
                  style={[styles.storyTitle, { color: theme.primary }]} 
                  numberOfLines={2}
                >
                  {story.title}
                </Text>
                <Text style={[styles.horrorIcon, { color: theme.accent }]}>👻</Text>
              </View>

              <Text style={[styles.storyDescription, { color: theme.light }]} numberOfLines={3}>
                {story.description}
              </Text>

              {/* Story metadata */}
              <View style={styles.storyMeta}>
                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <Text style={[styles.metaIcon, { color: theme.accent }]}>⏱️</Text>
                    <Text style={[styles.metaText, { color: theme.accent }]}>
                      {story.readingTime}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={[styles.metaIcon, { color: '#FFD700' }]}>⭐</Text>
                    <Text style={[styles.metaText, { color: '#FFD700' }]}>
                      {story.rating}
                    </Text>
                  </View>
                </View>

                <View style={[styles.readButton, { backgroundColor: theme.primary }]}>
                  <Text style={styles.readButtonText}>पढ़ें</Text>
                </View>
              </View>
            </View>

            {/* Decorative corner elements */}
            <View style={styles.cardCorners}>
              <View style={[styles.cardCorner, styles.cornerTL, { borderColor: theme.accent }]} />
              <View style={[styles.cardCorner, styles.cornerTR, { borderColor: theme.accent }]} />
              <View style={[styles.cardCorner, styles.cornerBL, { borderColor: theme.accent }]} />
              <View style={[styles.cardCorner, styles.cornerBR, { borderColor: theme.accent }]} />
            </View>

            {/* Side decoration */}
            <Text style={[styles.sideDecoration, { color: theme.accent }]}>🕯️</Text>
          </TouchableOpacity>
        ))}

        {/* EMPTY STATE */}
        {categoryStories.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: theme.dark }]}>
            <Text style={[styles.emptyIcon, { color: theme.primary }]}>📖</Text>
            <Text style={[styles.emptyTitle, { color: theme.primary }]}>
              कोई कहानी नहीं मिली
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.light }]}>
              इस श्रेणी में अभी तक कोई कहानी उपलब्ध नहीं है।{'\n'}
              जल्द ही नई डरावनी कहानियां आएंगी।
            </Text>
          </View>
        )}

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={[styles.footerDivider, { backgroundColor: theme.primary }]} />
          <Text style={[styles.footerText, { color: theme.accent }]}>
            🌙 अंधेरे में छुपी है सच्चाई 🌙
          </Text>
          <Text style={[styles.footerSubtext, { color: theme.light }]}>
            डरने के लिए तैयार हैं?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
  },
  container: { 
    padding: 20, 
    paddingBottom: 40 
  },

  // ATMOSPHERIC BACKGROUND
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  cornerShadows: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  cornerShadow: {
    position: 'absolute',
    opacity: 0.3,
  },
  topLeft: {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderBottomRightRadius: 100,
  },
  topRight: {
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    borderBottomLeftRadius: 100,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
    borderTopRightRadius: 100,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderTopLeftRadius: 100,
  },

  // ELEGANT HEADER SECTION
  categoryHeader: {
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
    position: 'relative',
  },
  headerFrame: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    opacity: 0.5,
  },
  iconSection: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -25,
    left: -25,
    opacity: 0.6,
  },
  iconBorder: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    top: -15,
    left: -15,
    opacity: 0.8,
  },
  categoryIcon: {
    fontSize: 50,
    textShadowOffset: { width: 0, height: 0 },
    textShadowOpacity: 0.8,
    textShadowRadius: 10,
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  titleUnderline: {
    width: 80,
    height: 3,
    borderRadius: 2,
    marginBottom: 16,
    opacity: 0.8,
  },
  categoryDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statEmoji: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 5,
    fontWeight: '500',
  },
  statDivider: {
    width: 2,
    height: 30,
    opacity: 0.6,
  },

  // SECTION HEADERS
  storiesHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  storiesHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storiesSubtext: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 15,
    opacity: 0.8,
  },
  sectionDivider: {
    width: 60,
    height: 2,
    opacity: 0.6,
  },

  // BEAUTIFUL STORY CARDS
  storyCard: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  cardFrame: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderRadius: 16,
    borderWidth: 1,
    opacity: 0.3,
  },
  storyBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  storyContent: { 
    marginTop: 10 
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    lineHeight: 26,
  },
  horrorIcon: {
    fontSize: 20,
    opacity: 0.8,
  },
  storyDescription: {
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
    opacity: 0.9,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  readButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // CARD DECORATIONS
  cardCorners: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  cardCorner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 2,
    opacity: 0.4,
  },
  cornerTL: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTR: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBL: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBR: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  sideDecoration: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 16,
    opacity: 0.6,
  },

  // EMPTY STATE
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },

  // FOOTER
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 20,
  },
  footerDivider: {
    width: 100,
    height: 2,
    marginBottom: 15,
    opacity: 0.6,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

export default CategoryStoriesScreen;