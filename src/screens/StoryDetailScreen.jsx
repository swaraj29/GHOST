import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import Header from '../components/Header';
import RNFS from 'react-native-fs';

function StoryDetailScreen({ route }) {
  const navigation = useNavigation();
  const story = route.params?.story || {
    title: 'कहानी नहीं मिली',
    description: 'कृपया कहानी चुनें',
    categoryType: 'ghost',
    readingTime: '0 मिनट',
    rating: '0.0',
    author: 'अज्ञात',
    date: 'अज्ञात',
    contentFile: ''
  };

  const [storyContent, setStoryContent] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animated values for candle burning effect
  const candleOpacity = useRef(new Animated.Value(1)).current;
  const flameScale = useRef(new Animated.Value(1)).current;

  const loadStoryContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (story.contentFile) {
        const content = await RNFS.readFileAssets(
          `stories/${story.contentFile}`,
          'utf8'
        );
        setStoryContent(content);
      } else {
        setError('कहानी फ़ाइल नहीं मिली');
      }
    } catch (err) {
      console.error('Error loading story:', err);
      setError('कहानी लोड करने में समस्या हुई। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  }, [story.contentFile]);

  useEffect(() => {
    loadStoryContent();

    // Animation loop for candle burning effect
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(candleOpacity, {
            toValue: 0.7,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(candleOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),
      { iterations: -1 } // Infinite loop
    ).start();
  }, [loadStoryContent, candleOpacity, flameScale]);

  const handleShare = async () => {
    try {
      const shareMessage = `🎃 *${story.title}* 🎃\n\n` +
        `एक डरावनी कहानी जो आपको रात में सोने नहीं देगी!\n\n` +
        `📱 भूत प्रेत कहानी ऐप डाउनलोड करें और पढ़ें हजारों डरावनी कहानियां!\n\n` +
        `⬇️ डाउनलोड करें: [Play Store Link]\n\n` +
        `👻 डरना मना है!`;

      const shareOptions = {
        message: shareMessage,
        social: Share.Social.WHATSAPP,
        title: 'भूत प्रेत कहानी शेयर करें',
        whatsAppNumber: "",  // Leave empty to let user choose contact
      };

      await Share.shareSingle(shareOptions);
    } catch (err) {
      console.error('Error sharing:', err);
      // If WhatsApp is not installed, open Play Store
      if (err.message.includes('not installed')) {
        const whatsappUrl = 'market://details?id=com.whatsapp';
        try {
          await Linking.openURL(whatsappUrl);
        } catch {
          // If Play Store fails, open web URL
          await Linking.openURL('https://play.google.com/store/apps/details?id=com.whatsapp');
        }
      }
    }
  };

  const getCategoryTheme = () => {
    const themes = {
      ghost: { 
        primary: '#FF3366',
        secondary: '#FF6B9D', 
        background: 'linear-gradient(135deg, #1a0611 0%, #2d1B69 100%)',
        cardBg: 'rgba(255, 51, 102, 0.08)',
        border: '#FF3366',
        text: '#FFFFFF',
        textSecondary: '#E8D5F2',
        accent: '#FFD700',
        shadow: 'rgba(255, 51, 102, 0.3)'
      },
      witch: { 
        primary: '#9D4EDD',
        secondary: '#C77DFF', 
        background: 'linear-gradient(135deg, #240046 0%, #3C096C 100%)',
        cardBg: 'rgba(157, 78, 221, 0.08)',
        border: '#9D4EDD',
        text: '#FFFFFF',
        textSecondary: '#E0AAFF',
        accent: '#F72585',
        shadow: 'rgba(157, 78, 221, 0.3)'
      },
      haunted: { 
        primary: '#06FFA5',
        secondary: '#4ECDC4', 
        background: 'linear-gradient(135deg, #0B1426 0%, #1E3A5F 100%)',
        cardBg: 'rgba(6, 255, 165, 0.08)',
        border: '#06FFA5',
        text: '#FFFFFF',
        textSecondary: '#B8E6B8',
        accent: '#FFE66D',
        shadow: 'rgba(6, 255, 165, 0.3)'
      },
      demon: { 
        primary: '#FF006E',
        secondary: '#FB5607', 
        background: 'linear-gradient(135deg, #220A3D 0%, #4A0E4E 100%)',
        cardBg: 'rgba(255, 0, 110, 0.08)',
        border: '#FF006E',
        text: '#FFFFFF',
        textSecondary: '#FFB3E6',
        accent: '#FFBE0B',
        shadow: 'rgba(255, 0, 110, 0.3)'
      },
      cursed: { 
        primary: '#FF5722',
        secondary: '#FF9800', 
        background: 'linear-gradient(135deg, #2E1917 0%, #5D2F28 100%)',
        cardBg: 'rgba(255, 87, 34, 0.08)',
        border: '#FF5722',
        text: '#FFFFFF',
        textSecondary: '#FFE0B2',
        accent: '#4CAF50',
        shadow: 'rgba(255, 87, 34, 0.3)'
      },
    };
    
    return themes[story.categoryType] || themes.ghost;
  };

  const theme = getCategoryTheme();

  // Split content by pages (look for ## पेज markers)
  const paginatedContent = useMemo(() => {
    if (!storyContent) return [];
    
    const parts = storyContent.split(/## पेज \d+/);
    const titlePart = parts[0].trim();
    const contentParts = parts.slice(1).map(part => part.trim()).filter(part => part.length > 0);
    
    if (contentParts.length > 0) {
      contentParts[0] = titlePart + '\n\n' + contentParts[0];
    }
    
    return contentParts;
  }, [storyContent]);

  const totalPages = paginatedContent.length;
  const currentContent = paginatedContent[currentPage] || '';

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <View style={[styles.loadingOrb, { borderColor: theme.primary }]}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
          <Text style={[styles.loadingTitle, { color: theme.primary }]}>कहानी की दुनिया में प्रवेश</Text>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>कृपया प्रतीक्षा करें...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorEmoji}>😱</Text>
          </View>
          <Text style={[styles.errorTitle, { color: theme.primary }]}>ओह नहीं!</Text>
          <Text style={[styles.errorMessage, { color: theme.textSecondary }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={loadStoryContent}
          >
            <Text style={styles.retryText}>🔄 दोबारा कोशिश करें</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header showBack={true} onBackPress={() => navigation.goBack()} />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Story Header */}
        <View style={[styles.storyHeader, { backgroundColor: theme.cardBg, borderColor: theme.border, shadowColor: theme.shadow }]}>
          {/* Mystical Top Decoration */}
          <View style={styles.mysticalHeader}>
            <View style={styles.orbLine}>
              <View style={[styles.glowOrb, { backgroundColor: theme.primary }]} />
              <View style={[styles.energyLine, { backgroundColor: theme.secondary }]} />
              <View style={[styles.centerOrb, { backgroundColor: theme.accent }]}>
                <Text style={styles.centerOrbIcon}>👁</Text>
              </View>
              <View style={[styles.energyLine, { backgroundColor: theme.secondary }]} />
              <View style={[styles.glowOrb, { backgroundColor: theme.primary }]} />
            </View>
          </View>
          
          <Text style={[styles.storyTitle, { color: theme.primary }]}>{story.title}</Text>
          <View style={[styles.titleGlow, { backgroundColor: theme.primary }]} />
          
          {/* Elegant Stats Grid */}
          <View style={styles.storyMeta}>
            <View style={[styles.metaItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={[styles.metaIconWrapper, { backgroundColor: theme.primary }]}>
                <Text style={styles.metaIcon}>⏱️</Text>
              </View>
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>{story.readingTime || '10 मिनट'}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={[styles.metaItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={[styles.metaIconWrapper, { backgroundColor: theme.secondary }]}>
                <Text style={styles.metaIcon}>📄</Text>
              </View>
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>{totalPages} पृष्ठ</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={[styles.metaItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={[styles.metaIconWrapper, { backgroundColor: theme.accent }]}>
                <Text style={styles.metaIcon}>👻</Text>
              </View>
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>डरावनी</Text>
            </View>
          </View>
          
          {/* Premium Author Card */}
          <View style={[styles.authorInfo, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={[styles.authorAvatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>✍️</Text>
            </View>
            <View style={styles.authorDetails}>
              <Text style={[styles.authorText, { color: theme.primary }]}>{story.author || 'अज्ञात लेखक'}</Text>
              <Text style={[styles.dateText, { color: theme.textSecondary }]}>{story.date || 'एक अंधेरी रात'}</Text>
            </View>
          </View>

          {/* Horror Quote */}
          <View style={styles.quoteContainer}>
            <Text style={[styles.quoteText, { color: theme.accent }]}>
              "अंधेरे में छुपे हैं सच्चाई के राज"
            </Text>
          </View>
        </View>

        {/* Stylish Warning */}
        <View style={[styles.warningSection, { backgroundColor: theme.cardBg, borderColor: theme.primary }]}>
          <View style={[styles.warningIcon, { backgroundColor: theme.primary }]}>
            <Text style={styles.warningEmoji}>⚠️</Text>
          </View>
          <Text style={[styles.warningText, { color: theme.textSecondary }]}>
            यह कहानी दिल के कमजोर लोगों के लिए नहीं है
          </Text>
          <View style={[styles.warningIcon, { backgroundColor: theme.primary }]}>
            <Text style={styles.warningEmoji}>⚠️</Text>
          </View>
        </View>

        {/* Beautiful Progress Tracker */}
        <View style={[styles.pageIndicator, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.pageText, { color: theme.primary }]}>पढ़ने की प्रगति</Text>
            <Text style={[styles.currentPage, { color: theme.accent }]}>{Math.round((currentPage / (totalPages - 1)) * 100)}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: theme.primary,
                    width: `${(currentPage / (totalPages - 1)) * 100}%`
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Enhanced Story Content */}
        <View style={[styles.storyContent, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          {/* Chapter Header */}
          <View style={styles.contentHeader}>
            <View style={[styles.chapterBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.contentTitle}>📖 पृष्ठ {currentPage + 1}</Text>
            </View>
            <View style={styles.candleRow}>
              <Animated.Text style={[styles.candleEmoji, { color: theme.accent, opacity: candleOpacity }]}>
                🕯️
              </Animated.Text>
              <Animated.Text style={[styles.flameIcon, { color: theme.secondary, transform: [{ scale: flameScale }] }]}>
                🔥
              </Animated.Text>
              <Animated.Text style={[styles.candleEmoji, { color: theme.accent, opacity: candleOpacity }]}>
                🕯️
              </Animated.Text>
            </View>
          </View>
          
          {/* Story Text */}
          <Text style={[styles.contentText, { color: theme.text }]}>
            {currentContent}
          </Text>
          
          {/* Chapter Footer */}
          <View style={[styles.contentFooter, { borderTopColor: theme.border }]}>
            <Text style={[styles.footerEmoji, { color: theme.secondary }]}>💀</Text>
            <Text style={[styles.footerText, { color: theme.primary }]}>
              {currentPage < totalPages - 1 ? 'कहानी जारी है...' : 'कहानी समाप्त'}
            </Text>
            <Text style={[styles.footerEmoji, { color: theme.secondary }]}>💀</Text>
          </View>
        </View>

        {/* Sleek Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[
              styles.navButton, 
              { 
                backgroundColor: currentPage > 0 ? theme.primary : 'rgba(255,255,255,0.1)',
                borderColor: theme.border,
                opacity: currentPage > 0 ? 1 : 0.3
              }
            ]}
            onPress={handlePrevPage}
            disabled={currentPage === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>◀</Text>
            <Text style={styles.navText}>पिछला</Text>
          </TouchableOpacity>

          <View style={[styles.pageCounter, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <Text style={[styles.pageCounterText, { color: theme.primary }]}>
              {currentPage + 1} / {totalPages}
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.navButton,
              { 
                backgroundColor: currentPage < totalPages - 1 ? theme.primary : 'rgba(255,255,255,0.1)',
                borderColor: theme.border,
                opacity: currentPage < totalPages - 1 ? 1 : 0.3
              }
            ]}
            onPress={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            activeOpacity={0.7}
          >
            <Text style={styles.navText}>अगला</Text>
            <Text style={styles.navIcon}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Gorgeous Share Button */}
        <TouchableOpacity 
          style={[styles.shareButton, { backgroundColor: theme.primary, borderColor: theme.border }]}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <View style={styles.shareContent}>
            <View style={[styles.shareIconWrapper, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.shareIcon}>🚀</Text>
            </View>
            <Text style={styles.shareText}>मित्रों के साथ साझा करें</Text>
            <Text style={styles.shareEmoji}>👻</Text>
          </View>
        </TouchableOpacity>

        {/* Elegant Footer */}
        <View style={[styles.horrorFooter, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.skullRow}>
            <Text style={[styles.skullEmoji, { color: theme.secondary }]}>💀</Text>
            <Text style={[styles.skullEmoji, { color: theme.accent }]}>👻</Text>
            <Text style={[styles.skullEmoji, { color: theme.secondary }]}>💀</Text>
          </View>
          <Text style={[styles.horrorFooterText, { color: theme.textSecondary }]}>
            🌙 रात के अंधेरे में और भी कहानियां छुपी हैं 🌙
          </Text>
          <Text style={[styles.endText, { color: theme.textSecondary }]}>
            "सच्चाई हमेशा डरावनी होती है"
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0B0F',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 50,
  },
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0F',
    padding: 32,
  },
  loadingOrb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0B0F',
    padding: 32,
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 51, 102, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorEmoji: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Story Header
  storyHeader: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    elevation: 12,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  mysticalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  orbLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.8,
  },
  energyLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
    opacity: 0.6,
  },
  centerOrb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  centerOrbIcon: {
    fontSize: 16,
    color: '#000',
  },
  storyTitle: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
    letterSpacing: 1,
  },
  titleGlow: {
    width: 100,
    height: 3,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    elevation: 4,
  },
  metaIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metaIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  metaText: {
    fontSize: 14,
    textAlign: 'center',
  },
  metaDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#666',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    elevation: 6,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  authorDetails: {
    flex: 1,
  },
  authorText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
  },
  quoteContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Warning Section
  warningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    elevation: 6,
  },
  warningIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningEmoji: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  warningText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    lineHeight: 22,
  },

  // Page Indicator
  pageIndicator: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    elevation: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageText: {
    fontSize: 18,
    fontWeight: '800',
  },
  currentPage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Story Content
  storyContent: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    elevation: 8,
  },
  contentHeader: {
    alignItems: 'center',
    marginBottom: 20, // Reduced from 20 to 8
  },
  chapterBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 12,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  candleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  candleEmoji: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  flameIcon: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'justify',
    marginBottom: 20,
  },
  contentFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerEmoji: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Navigation Container
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    elevation: 4,
  },
  navIcon: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  navText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pageCounter: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    elevation: 2,
  },
  pageCounterText: {
    fontSize: 16,
    fontWeight: '800',
  },

  // Share Button
  shareButton: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    alignItems: 'center',
    elevation: 8,
    marginBottom: 24,
  },
  shareContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  shareIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  shareText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  shareEmoji: {
    fontSize: 18,
    marginLeft: 12,
  },

  // Horror Footer
  horrorFooter: {
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 4,
  },
  skullRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  skullEmoji: {
    fontSize: 24,
    marginHorizontal: 10,
  },
  horrorFooterText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  endText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default StoryDetailScreen;