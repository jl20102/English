import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ALBUM_ART =
  "https://images.unsplash.com/photo-1751891237516-bc0368fd9842?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxnbG93aW5nJTIwbWFnaWNhbCUyMHBsYW50cyUyMG5pZ2h0fGVufDB8fHx8MTc3ODUxNzI1MXww&ixlib=rb-4.1.0&q=85";

type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  why: string;
  playing?: boolean;
};

const SONGS: Song[] = [
  {
    id: "1",
    title: "I Put a Spell on You",
    artist: "Screamin' Jay Hawkins",
    duration: "2:38",
    why: "My anthem. Love-juice on the eyelids, anyone?",
    playing: true,
  },
  {
    id: "2",
    title: "Sympathy for the Devil",
    artist: "The Rolling Stones",
    duration: "6:18",
    why: "Pleased to meet you. Hope you guess my name.",
  },
  {
    id: "3",
    title: "Midnight City",
    artist: "M83",
    duration: "4:01",
    why: "Soundtrack for stealing donkey-heads at dusk.",
  },
  {
    id: "4",
    title: "Bad Guy",
    artist: "Billie Eilish",
    duration: "3:14",
    why: "Duh.",
  },
  {
    id: "5",
    title: "A Little Less Conversation",
    artist: "Elvis Presley",
    duration: "2:35",
    why: "For when Oberon is monologuing again.",
  },
];

export default function Spotify() {
  const router = useRouter();
  return (
    <View style={styles.container} testID="spotify-screen">
      <LinearGradient
        colors={["#2A1B3D", "#1A1226", "#05050A"]}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.iconBtn}
            testID="spotify-back"
          >
            <Ionicons name="chevron-down" size={24} color="#F4F4F6" />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.headerLabel}>PLAYING FROM PLAYLIST</Text>
            <Text style={styles.headerTitle}>Midsummer Mischief</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#F4F4F6" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Album art */}
          <View style={styles.albumWrap}>
            <Image source={{ uri: ALBUM_ART }} style={styles.album} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={styles.albumOverlay}
            />
          </View>

          {/* Now playing info */}
          <View style={styles.nowPlaying}>
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle}>I Put a Spell on You</Text>
              <Text style={styles.songArtist}>Screamin&apos; Jay Hawkins</Text>
            </View>
            <TouchableOpacity testID="spotify-like">
              <Ionicons name="heart" size={26} color="#00E676" />
            </TouchableOpacity>
          </View>

          {/* Progress bar */}
          <View style={styles.progressWrap}>
            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
              <View style={styles.progressKnob} />
            </View>
            <View style={styles.progressTimes}>
              <Text style={styles.timeText}>1:12</Text>
              <Text style={styles.timeText}>2:38</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity testID="spotify-shuffle">
              <Ionicons name="shuffle" size={22} color="#00E676" />
            </TouchableOpacity>
            <TouchableOpacity testID="spotify-prev">
              <Ionicons name="play-skip-back" size={32} color="#F4F4F6" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtn} testID="spotify-play">
              <Ionicons name="pause" size={32} color="#05050A" />
            </TouchableOpacity>
            <TouchableOpacity testID="spotify-next">
              <Ionicons name="play-skip-forward" size={32} color="#F4F4F6" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="repeat" size={22} color="#F4F4F6" />
            </TouchableOpacity>
          </View>

          {/* Playlist label */}
          <View style={styles.upNextHeader}>
            <MaterialCommunityIcons name="playlist-music" size={18} color="#FFD700" />
            <Text style={styles.upNextTitle}>Puck&apos;s Playlist</Text>
            <Text style={styles.upNextCount}>{SONGS.length} songs · 18 min</Text>
          </View>

          {/* Song list */}
          {SONGS.map((song, idx) => (
            <View key={song.id} style={styles.songRow} testID={`song-${song.id}`}>
              <Text style={[styles.songIdx, song.playing && { color: "#00E676" }]}>
                {song.playing ? <Ionicons name="volume-high" size={14} color="#00E676" /> : idx + 1}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowTitle, song.playing && { color: "#00E676" }]} numberOfLines={1}>
                  {song.title}
                </Text>
                <Text style={styles.rowArtist} numberOfLines={1}>
                  {song.artist} · {song.why}
                </Text>
              </View>
              <Text style={styles.rowDur}>{song.duration}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    color: "#A1A4BA",
    fontFamily: "Outfit_500Medium",
    fontSize: 10,
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: "#F4F4F6",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 14,
    marginTop: 2,
  },
  albumWrap: {
    marginHorizontal: 32,
    marginTop: 12,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#B388FF",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  album: { width: "100%", aspectRatio: 1 },
  albumOverlay: { ...StyleSheet.absoluteFillObject as object },
  nowPlaying: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 24,
    gap: 12,
  },
  songTitle: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 24,
  },
  songArtist: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 15,
    marginTop: 2,
  },
  progressWrap: { paddingHorizontal: 32, marginTop: 18 },
  progressBg: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 2,
    position: "relative",
  },
  progressFill: {
    width: "42%",
    height: 4,
    backgroundColor: "#00E676",
    borderRadius: 2,
  },
  progressKnob: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00E676",
    position: "absolute",
    left: "41%",
    top: -4,
  },
  progressTimes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  timeText: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 11,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginTop: 22,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFD700",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  upNextHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 12,
  },
  upNextTitle: {
    color: "#F4F4F6",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 15,
  },
  upNextCount: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 11,
    marginLeft: "auto",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 14,
  },
  songIdx: {
    color: "#A1A4BA",
    fontFamily: "Outfit_500Medium",
    fontSize: 14,
    width: 18,
    textAlign: "center",
  },
  rowTitle: {
    color: "#F4F4F6",
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
  },
  rowArtist: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 11,
    marginTop: 2,
  },
  rowDur: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 12,
  },
});
