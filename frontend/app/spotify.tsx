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
  commentary: string;
  playing?: boolean;
};

const SONGS: Song[] = [
  {
    id: "1",
    title: "I Put a Spell on You",
    artist: "Screamin' Jay Hawkins",
    duration: "2:38",
    why: "My anthem. Love-juice on the eyelids, anyone?",
    commentary:
      "This song is literally Puck's job description set to music. Hawkins growls \"I put a spell on you / because you're mine,\" which is exactly what Puck does to mortals on Oberon's orders. In Act 2, Scene 2, Oberon hands Puck the love-in-idleness flower and commands him to \"anoint his eyes; / But do it when the next thing he espies / May be the lady\" — magically forcing affection just like the song's possessive curse. The song's dramatic, theatrical delivery matches Puck's flair: he doesn't just enchant people, he enjoys it. Hawkins's narrator refuses to let his target escape (\"you're mine\"), and Puck's enchantments similarly trap mortals in feelings they didn't choose. The song treats love as something that can be imposed by spell, which is the entire premise of the play's middle acts. For a fairy who weaponizes desire, this is basically his theme song.",
    playing: true,
  },
  {
    id: "2",
    title: "Sympathy for the Devil",
    artist: "The Rolling Stones",
    duration: "6:18",
    why: "Pleased to meet you. Hope you guess my name.",
    commentary:
      "Mick Jagger's narrator is a charming trickster who has \"been around for a long, long year\" and quietly orchestrated every catastrophe in human history — sound familiar? Puck introduces himself the exact same way: \"I am that merry wanderer of the night,\" boasting in Act 2, Scene 1 about scaring milkmaids, souring beer, and tripping old women. The song's famous refrain \"Pleased to meet you / Hope you guess my name\" mirrors Puck's many aliases — Robin Goodfellow, Hobgoblin, sweet Puck — which the fairy in Act 2.1 lists when she recognizes him. Both figures take credit for chaos while remaining likable; neither is purely evil, just gleefully meddlesome. The song's slow-burn groove fits Puck's patient, watchful mischief — he doesn't rush, he observes, then strikes. And the line \"every cop is a criminal and all the sinners saints\" matches Puck's blurring of the lovers' identities, where the \"right\" couple becomes \"wrong\" overnight.",
  },
  {
    id: "3",
    title: "Midnight City",
    artist: "M83",
    duration: "4:01",
    why: "Soundtrack for stealing donkey-heads at dusk.",
    commentary:
      "Puck is a creature of the night — he tells Oberon \"my fairy lord, this must be done with haste, / For night's swift dragons cut the clouds full fast\" in Act 3, Scene 2. M83's shimmering, after-dark synths capture exactly that magical urgency. The song has no clear lyrics, just an atmospheric pulse, which mirrors how Puck operates: in motion, half-seen, more vibe than voice. Oberon's whole plan depends on darkness — they must reverse every spell \"before the morning star\" — and \"Midnight City\" is built around that same nocturnal energy. The saxophone solo at the end feels like a fairy darting between trees, which is essentially Puck's whole physical existence. It's a song about being awake when the rest of the world sleeps, which is Puck's job in one sentence.",
  },
  {
    id: "4",
    title: "Bad Guy",
    artist: "Billie Eilish",
    duration: "3:14",
    why: "Duh.",
    commentary:
      "Eilish's whispered \"I'm the bad guy, duh\" is the most self-aware villain anthem ever recorded — and Puck is the most self-aware mischief-maker in Shakespeare. After accidentally enchanting the wrong Athenian and watching the entire forest erupt into chaos in Act 3, Scene 2, Puck doesn't apologize; he sighs \"Lord, what fools these mortals be!\" — full \"duh\" energy. The song is playful menace, not real evil, which matches the fairy's description of Puck in Act 2.1: he frightens villagers and \"misleads night-wanderers, laughing at their harm.\" He causes damage but doesn't cause death — he's chaotic, not cruel. Eilish flips between threatening and cute, just like Puck flips between \"knavish sprite\" and the gentle figure who finally restores all four lovers in Act 3.2. Both the song and the character know the audience secretly loves the troublemaker. \"Duh\" is, frankly, how Puck would describe almost anything.",
  },
  {
    id: "5",
    title: "A Little Less Conversation",
    artist: "Elvis Presley",
    duration: "2:35",
    why: "For when Oberon is monologuing again.",
    commentary:
      "Elvis demands \"a little more action\" and \"a little less fight\" — which is essentially Puck's relationship with his boss. Oberon delivers long, poetic speeches (the gorgeous \"I know a bank where the wild thyme blows\" monologue in Act 2.1 is over twenty lines), while Puck's replies are brisk and action-oriented: \"I'll put a girdle round about the earth / In forty minutes\" or simply \"I go, I go; look how I go.\" The song is impatient, restless, and pragmatic — three of Puck's defining traits. While Oberon plans, Puck moves. The track's snappy tempo also mirrors how quickly events spiral once Puck is involved: in roughly one night he transforms a man's head, mismatches every lover, and unravels the Fairy Queen's marriage. \"A little less conversation, a little more action\" is the unofficial motto of every errand Puck has ever run.",
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
            <View key={song.id} style={styles.songCard} testID={`song-${song.id}`}>
              <View style={styles.songRow}>
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
              <View style={styles.commentaryBox}>
                <View style={styles.commentaryHeader}>
                  <MaterialCommunityIcons name="format-quote-open" size={12} color="#FFD700" />
                  <Text style={styles.commentaryLabel}>Why this song fits Puck</Text>
                </View>
                <Text style={styles.commentaryText}>{song.commentary}</Text>
              </View>
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
  songCard: {
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.1)",
    overflow: "hidden",
  },
  commentaryBox: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 4,
  },
  commentaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  commentaryLabel: {
    color: "#FFD700",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  commentaryText: {
    color: "#F4F4F6",
    fontFamily: "Outfit_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },
});
