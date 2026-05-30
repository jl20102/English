import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Section = { id: string; title: string; subtitle: string; body: string };

const SONGS: Section[] = [
  {
    id: "song1",
    title: "I Put a Spell on You",
    subtitle: "Screamin' Jay Hawkins · 5–7 sentence analysis",
    body:
      "This song focuses on placing a love spell on someone, which directly parallels Puck's actions in the play. " +
      "In Act 2, Scene 2, Oberon gives Puck the love-in-idleness flower and instructs him to place it on the sleepers' eyes so they fall in love with the first person they see. " +
      "The lyric \"I put a spell on you, because you're mine\" possesses a controlling tone, which fits Puck because he forces the characters to experience a love they did not choose. " +
      "Furthermore, Hawkins delivers a highly dramatic vocal performance, mirroring the way Puck enjoys showing off his magic. " +
      "Ultimately, the song treats love as something that can be forced, which matches the central love-juice plot of the play.",
  },
  {
    id: "song2",
    title: "Sympathy for the Devil",
    subtitle: "The Rolling Stones · 5–7 sentence analysis",
    body:
      "Mick Jagger sings from the perspective of a trickster who has existed for centuries and caused chaos throughout history. " +
      "This description strongly connects to Puck, who declares, \"I am that merry wanderer of the night\" in Act 2, Scene 1, and boasts about frightening milkmaids and tripping elderly women. " +
      "Additionally, the lyric \"pleased to meet you, hope you guess my name\" matches Puck because he operates under multiple identities. " +
      "As the fairy in Act 2, Scene 1 notes, he is known as Robin Goodfellow, Hobgoblin, and sweet Puck. " +
      "While both the song's narrator and Puck cause constant trouble, audiences still find both characters charming.",
  },
  {
    id: "song3",
    title: "Midnight City",
    subtitle: "M83 · 5–7 sentence analysis",
    body:
      "Because Puck completes all of his mischievous work at night, a song titled \"Midnight City\" matches his character perfectly. " +
      "In Act 3, Scene 2, he warns Oberon, \"this must be done with haste, for night's swift dragons cut the clouds full fast,\" emphasizing that their magic must be finished before sunrise. " +
      "M83's track is dark and electronic, successfully evoking the atmosphere of a magical forest after dark. " +
      "Because the song relies on musical atmosphere rather than lyrics, it reflects Puck's incredible speed and the way he moves too quickly to be seen. " +
      "Even the energetic saxophone solo at the end sounds like a fairy darting between trees, celebrating a character who is awake while the rest of the world sleeps.",
  },
  {
    id: "song4",
    title: "Bad Guy",
    subtitle: "Billie Eilish · 5–7 sentence analysis",
    body:
      "Billie Eilish delivers the lyric \"I'm the bad guy\" with a sarcastic demeanor, establishing herself as the same type of self-aware troublemaker that Puck is. " +
      "In Act 3, Scene 2, after Puck mistakenly applies the love juice to the wrong Athenian and causes mass chaos, he refuses to apologize. " +
      "Instead, he mockingly observes, \"Lord, what fools these mortals be!\" " +
      "The song's instrumentation sounds slightly threatening yet playful, which matches Puck's ability to frighten humans without causing them actual harm. " +
      "As the fairy points out in Act 2, Scene 1, Puck willingly \"misleads night-wanderers, laughing at their harm.\" " +
      "Both Eilish and Puck understand that audiences frequently prefer the troublemaker over the well-behaved characters.",
  },
  {
    id: "song5",
    title: "A Little Less Conversation",
    subtitle: "Elvis Presley · 5–7 sentence analysis",
    body:
      "Elvis Presley's demand for \"a little more action\" and less talking perfectly describes how Puck views the other characters. " +
      "While Oberon delivers lengthy monologues, such as his twenty-line speech in Act 2, Scene 1 that begins \"I know a bank where the wild thyme blows,\" Puck prefers brief, action-oriented dialogue. " +
      "This is evident when Puck declares, \"I'll put a girdle round about the earth in forty minutes,\" or when he eagerly states, \"I go, I go; look how I go.\" " +
      "The fast tempo of the song also mirrors how quickly events spiral out of control once Puck becomes involved. " +
      "In a single night, he transforms a man's head into a donkey's and disrupts the relationships of the four lovers, proving that Presley's lyrics capture Puck's energetic attitude.",
  },
];

const PROFILE_ESSAY =
  "I created Puck's dating profile based on three main traits from the play: his love of mischief, his loyalty to Oberon, and his belief that mortals are foolish. " +
  "His bio refers to him as a hobgoblin because a fairy uses that exact name for him in Act 2, Scene 1. " +
  "The bio also mentions running errands, making love potions, and changing heads, which are all tasks he performs in the play. " +
  "For instance, he fetches the magic flower in Act 2, Scene 1, misplaces the love juice in Act 2, Scene 2, and transforms Bottom's head into a donkey's head in Act 3, Scene 1. " +
  "His profile lists interests like shape-shifting and practical jokes, which are based on real moments, such as when he tricks an old woman by turning into a stool. " +
  "I noted that he is \"looking for someone who can keep up\" because Puck values speed, and Oberon relies on him for fast results. " +
  "For his matches, I chose Titania because it is ironic; Puck actually ruins her marriage, yet they are both part of the fairy world. " +
  "I also included Helena as a low-match mortal to show how Puck moves between the human and fairy kingdoms. " +
  "Finally, I wrote the profile in a sarcastic voice because Puck is a funny but harsh character who speaks directly to the audience at the end of the play.";

const MESSAGES_ESSAY =
  "I chose a text messaging format because most of the plot in Acts 2 and 3 happens because Oberon keeps giving Puck orders. " +
  "The text messages I wrote follow the exact events of the play. " +
  "Oberon sends Puck to fetch the magic flower in Act 2, Scene 1, and then instructs him to place the love juice on the Athenian man who is ignoring a lady. " +
  "Puck's text, \"I'll put a girdle round about the earth in forty minutes,\" is a direct quote from the text. " +
  "The messages also show his major mistake in Act 3, Scene 2, where he puts the juice on the wrong person. " +
  "In the play, he defends his mistake by pointing out that he followed Oberon's vague description of \"Athenian garments.\" " +
  "I ended the conversation with \"Lord, what fools these mortals be!\" because it is Puck's most famous line. " +
  "Using a messaging app also highlights their power difference, since Oberon sends brief commands while Puck sends longer, more playful replies. " +
  "Ultimately, this format fits Puck perfectly because being a messenger is his exact job in the play.";

type Tab = "songs" | "profile" | "messages";

export default function Essays() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("songs");

  return (
    <View style={styles.container} testID="essays-screen">
      <LinearGradient colors={["#1A1226", "#0D0414", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} style={styles.back} testID="essays-back">
            <Ionicons name="chevron-back" size={22} color="#FFD700" />
            <Text style={styles.backText}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.appTitle}>Essays</Text>
          <View style={{ width: 70 }} />
        </View>

        <View style={styles.heroBlock}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="book-open-variant" size={26} color="#FFD700" />
          </View>
          <Text style={styles.heroTitle}>Puck Project · Written Analysis</Text>
          <Text style={styles.heroSub}>A Midsummer Night&apos;s Dream · with textual evidence</Text>
        </View>

        <View style={styles.tabs}>
          {([
            { id: "songs" as Tab, label: "Songs (5)" },
            { id: "profile" as Tab, label: "Dating Profile" },
            { id: "messages" as Tab, label: "App Choice" },
          ]).map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.tab, tab === t.id && styles.tabActive]}
              onPress={() => setTab(t.id)}
              testID={`tab-${t.id}`}
            >
              <Text style={[styles.tabText, tab === t.id && { color: "#05050A" }]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          {tab === "songs" && SONGS.map((s, i) => (
            <View key={s.id} style={styles.card} testID={`song-essay-${s.id}`}>
              <View style={styles.cardHeader}>
                <View style={styles.numBadge}>
                  <Text style={styles.numText}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{s.title}</Text>
                  <Text style={styles.cardSub}>{s.subtitle}</Text>
                </View>
              </View>
              <Text style={styles.body}>{s.body}</Text>
            </View>
          ))}

          {tab === "profile" && (
            <View style={styles.card} testID="profile-essay">
              <View style={styles.cardHeader}>
                <View style={[styles.numBadge, { backgroundColor: "#FF4081" }]}>
                  <Ionicons name="flame" size={16} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Dating Profile · Thought Process</Text>
                  <Text style={styles.cardSub}>10–15 sentence explanation</Text>
                </View>
              </View>
              <Text style={styles.body}>{PROFILE_ESSAY}</Text>
            </View>
          )}

          {tab === "messages" && (
            <View style={styles.card} testID="messages-essay">
              <View style={styles.cardHeader}>
                <View style={[styles.numBadge, { backgroundColor: "#00B0FF" }]}>
                  <Ionicons name="chatbubble" size={16} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Messages App · Why I Chose It</Text>
                  <Text style={styles.cardSub}>5–7 sentence explanation</Text>
                </View>
              </View>
              <Text style={styles.body}>{MESSAGES_ESSAY}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 4 },
  back: { flexDirection: "row", alignItems: "center", width: 70 },
  backText: { color: "#FFD700", fontFamily: "Outfit_500Medium", fontSize: 15 },
  appTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 20 },
  heroBlock: { alignItems: "center", paddingTop: 8, paddingBottom: 14, paddingHorizontal: 20 },
  heroIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: "rgba(255,215,0,0.1)", borderWidth: 1, borderColor: "rgba(255,215,0,0.3)",
    alignItems: "center", justifyContent: "center", marginBottom: 8,
  },
  heroTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, textAlign: "center" },
  heroSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 12, marginTop: 3, textAlign: "center" },
  tabs: { flexDirection: "row", paddingHorizontal: 14, gap: 6, marginBottom: 12 },
  tab: {
    flex: 1, paddingVertical: 9, borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  tabActive: { backgroundColor: "#FFD700", borderColor: "#FFD700" },
  tabText: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 11 },
  card: {
    marginBottom: 14, padding: 16, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,215,0,0.15)",
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  numBadge: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#FFD700", alignItems: "center", justifyContent: "center" },
  numText: { color: "#05050A", fontFamily: "PlayfairDisplay_700Bold", fontSize: 16 },
  cardTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 16, lineHeight: 20 },
  cardSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11, marginTop: 2 },
  body: { color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 13.5, lineHeight: 21 },
  footerCard: {
    flexDirection: "row", alignItems: "center", gap: 8,
    padding: 12, borderRadius: 12, marginTop: 4,
    backgroundColor: "rgba(0,230,118,0.06)", borderWidth: 1, borderColor: "rgba(0,230,118,0.2)",
  },
  footerText: { flex: 1, color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 11.5 },
});
