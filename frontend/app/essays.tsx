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
      "This song is about putting a love spell on someone, which is exactly what Puck does in the play. " +
      "In Act 2 Scene 2, Oberon gives him the love-in-idleness flower and tells him to place it on people's eyes so they fall in love with whoever they see first. " +
      "The lyric \"I put a spell on you, because you're mine\" sounds controlling, and that fits Puck because he forces people to feel love they did not choose. " +
      "Hawkins also sings the song in a dramatic way, and Puck enjoys showing off his magic in a similar manner. " +
      "The song treats love as something that can be forced, which matches the entire love-juice storyline in the play. " +
      "If Puck made a playlist, this song would likely be the first track.",
  },
  {
    id: "song2",
    title: "Sympathy for the Devil",
    subtitle: "The Rolling Stones · 5–7 sentence analysis",
    body:
      "Mick Jagger sings as a trickster who has existed for centuries and quietly caused chaos throughout history. " +
      "That description fits Puck, who says \"I am that merry wanderer of the night\" in Act 2 Scene 1 and boasts about frightening milkmaids and tripping old women. " +
      "The lyric \"pleased to meet you, hope you guess my name\" connects to Puck because he has many different names. " +
      "The fairy in 2.1 lists them: Robin Goodfellow, Hobgoblin, and sweet Puck. " +
      "Both the narrator of the song and Puck cause problems, yet people still find them charming. " +
      "The song also has a calm, steady rhythm, which matches how Puck never panics when something goes wrong. He simply moves on to the next task.",
  },
  {
    id: "song3",
    title: "Midnight City",
    subtitle: "M83 · 5–7 sentence analysis",
    body:
      "Puck completes all of his work at night, so a song called \"Midnight City\" already matches his character. " +
      "In Act 3 Scene 2 he tells Oberon \"this must be done with haste, for night's swift dragons cut the clouds full fast\" because they must finish before sunrise. " +
      "M83's song is dark and electronic, and it sounds like a magical forest after dark. " +
      "The song has very few lyrics and is mostly atmosphere, which works for Puck because he moves so quickly that he is hard to see. " +
      "The saxophone solo at the end sounds like a fairy darting between trees. " +
      "The song is about being awake while everyone else is asleep, which describes Puck's job perfectly.",
  },
  {
    id: "song4",
    title: "Bad Guy",
    subtitle: "Billie Eilish · 5–7 sentence analysis",
    body:
      "Billie Eilish whispers \"I'm the bad guy\" in a sarcastic way, and Puck is a similar type of self-aware troublemaker. " +
      "In Act 3 Scene 2, after he places the love juice on the wrong Athenian and causes chaos, he does not apologize. " +
      "Instead he says \"Lord, what fools these mortals be!\" " +
      "The song sounds slightly threatening but also playful, which matches Puck because he frightens people without truly harming them. " +
      "The fairy in Act 2 Scene 1 says he \"misleads night-wanderers, laughing at their harm.\" " +
      "Both Eilish and Puck understand that the audience secretly enjoys the troublemaker more than the well-behaved characters.",
  },
  {
    id: "song5",
    title: "A Little Less Conversation",
    subtitle: "Elvis Presley · 5–7 sentence analysis",
    body:
      "Elvis demands \"a little more action\" and less talking, which describes how Puck feels about Oberon. " +
      "Oberon delivers long speeches, such as the \"I know a bank where the wild thyme blows\" speech in Act 2 Scene 1, which lasts over twenty lines. " +
      "Puck's lines are shorter and focused on action, such as \"I'll put a girdle round about the earth in forty minutes\" or \"I go, I go; look how I go.\" " +
      "The fast tempo of the song also matches how quickly events spiral once Puck becomes involved. " +
      "In a single night he turns a man's head into a donkey's, mixes up all four lovers, and breaks up the Fairy Queen's marriage. " +
      "\"A little less conversation\" describes Puck's entire attitude.",
  },
];

const PROFILE_ESSAY =
  "I built Puck's dating profile around three main traits that appear throughout the play. " +
  "He loves mischief, he works for Oberon, and he believes mortals are foolish. " +
  "His bio calls him a hobgoblin because in Act 2 Scene 1 a fairy actually identifies him by saying \"those that Hobgoblin call you, and sweet Puck.\" " +
  "The bio mentions running errands, making love potions, and switching heads because those are exactly the tasks he performs in the play. " +
  "He fetches the love-juice flower in 2.1, places it on the lovers' eyes in 2.2, and transforms Bottom's head into a donkey's head in 3.1. " +
  "The \"go around the whole world in forty minutes\" line is nearly a direct quote from his boast \"I'll put a girdle round about the earth in forty minutes.\" " +
  "His interests, such as Shape-shifting and Practical Jokes, are based on real moments in the play. " +
  "He turns himself into a stool to trick an old woman in 2.1, and he speaks in poetry throughout the entire play. " +
  "I made him \"looking for someone who can keep up\" because Puck values speed and wit, and Oberon depends on him for important tasks. " +
  "For his matches, I chose Titania first because their match percentage is ironically high. " +
  "Puck ruined her marriage by making her fall in love with a donkey, yet they are both fairies, so they share a similar world. " +
  "I added a red flag noting that she is married to Puck's boss, because that detail is important. " +
  "Helena has a much lower match because Puck only knows her as someone he accidentally caused trouble for in 3.2. " +
  "Including both a fairy match and a mortal match shows that Puck moves between two worlds, which is his role throughout the play. " +
  "I wrote the profile in his sarcastic voice because Puck is the one character who speaks directly to the audience at the end of the play, saying \"if we shadows have offended.\" " +
  "Shakespeare writes him as funny but somewhat harsh, which is the same tone I used.";

const MESSAGES_ESSAY =
  "I chose Messages because most of the plot in Acts 2 and 3 happens because Oberon keeps giving Puck orders. " +
  "The texts I wrote follow what actually occurs in the play. " +
  "Oberon sends Puck to fetch the \"little western flower\" in 2.1, then instructs him to place the love juice on \"a sweet Athenian lady\" and the man who ignores her (around lines 2.1.260–266). " +
  "Puck's text \"I'll put a girdle round about the earth in forty minutes\" is a direct quote from 2.1.175. " +
  "The texts also show his major mistake in Act 3 Scene 2, where he places the juice on the wrong Athenian. " +
  "In the play he defends himself by saying \"did not you tell me I should know the man by the Athenian garments he had on?\" (3.2.348–349). " +
  "I ended the conversation with \"Lord, what fools these mortals be!\" because it is his most famous line (3.2.115). " +
  "Messages also shows the power difference, since Oberon sends short orders and Puck sends longer, more playful replies. " +
  "The Messages app fits Puck because being a messenger is exactly his job in the play.";

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
