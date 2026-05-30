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
      "In Act 2 Scene 2, Oberon gives him the love-in-idleness flower and tells him to put it on people's eyes so they fall in love with whoever they see first. " +
      "The lyric \"I put a spell on you, because you're mine\" sounds controlling, and that fits Puck because he makes people feel love they didn't choose. " +
      "The way Hawkins sings it is really dramatic, and Puck likes showing off his magic the same way. " +
      "The song acts like love is something you can force, and that's what the whole love juice plot is about. " +
      "If Puck made a playlist, this would probably be his number one song.",
  },
  {
    id: "song2",
    title: "Sympathy for the Devil",
    subtitle: "The Rolling Stones · 5–7 sentence analysis",
    body:
      "Mick Jagger sings as a trickster who has been around forever and caused chaos throughout history. " +
      "That sounds a lot like Puck, who says \"I am that merry wanderer of the night\" in Act 2 Scene 1 and brags about scaring milkmaids and tripping old women. " +
      "The line \"pleased to meet you, hope you guess my name\" matches Puck because he has lots of names. " +
      "The fairy in 2.1 lists them: Robin Goodfellow, Hobgoblin, and sweet Puck. " +
      "Both the singer and Puck cause problems but somehow people still like them. " +
      "The song is also calm and chill, which fits how Puck never panics when things go wrong. He just shrugs and keeps going.",
  },
  {
    id: "song3",
    title: "Midnight City",
    subtitle: "M83 · 5–7 sentence analysis",
    body:
      "Puck does all his work at night, so a song called \"Midnight City\" already makes sense. " +
      "In Act 3 Scene 2 he tells Oberon \"this must be done with haste, for night's swift dragons cut the clouds full fast\" because they have to finish before sunrise. " +
      "M83's song is dark and electronic and sounds like a magical forest at night. " +
      "The song doesn't really have lyrics, just a vibe, which works for Puck because he moves so fast you can barely see him. " +
      "The saxophone solo at the end sounds like a fairy flying between trees. " +
      "It's a song about being awake while everyone else sleeps, which is Puck's whole life.",
  },
  {
    id: "song4",
    title: "Bad Guy",
    subtitle: "Billie Eilish · 5–7 sentence analysis",
    body:
      "Billie Eilish whispers \"I'm the bad guy, duh\" in a sarcastic way, and Puck is that exact kind of self-aware troublemaker. " +
      "In Act 3 Scene 2, after he puts the love juice on the wrong guy and ruins everything, he doesn't say sorry. " +
      "He just says \"Lord, what fools these mortals be!\" which is total \"duh\" energy. " +
      "The song sounds a little scary but also playful, and that matches Puck because he scares people without really hurting them. " +
      "The fairy in Act 2 Scene 1 says he \"misleads night-wanderers, laughing at their harm.\" " +
      "Both Eilish and Puck know that the audience secretly likes the troublemaker more than the good characters.",
  },
  {
    id: "song5",
    title: "A Little Less Conversation",
    subtitle: "Elvis Presley · 5–7 sentence analysis",
    body:
      "Elvis wants \"a little more action\" and less talking, which is how Puck feels about Oberon. " +
      "Oberon makes really long speeches, like the \"I know a bank where the wild thyme blows\" speech in Act 2 Scene 1, which goes on for like twenty lines. " +
      "Puck's lines are short and focused on doing stuff, like \"I'll put a girdle round about the earth in forty minutes\" or just \"I go, I go; look how I go.\" " +
      "The fast beat of the song matches how fast things go wrong when Puck is involved. " +
      "In one night he turns a guy's head into a donkey, mixes up all the lovers, and breaks up the Fairy Queen's marriage. " +
      "\"A little less conversation\" sums up Puck's whole attitude.",
  },
];

const PROFILE_ESSAY =
  "I made Puck's dating profile around three things that show up a lot in the play. " +
  "He loves mischief, he works for Oberon, and he thinks mortals are dumb. " +
  "His bio calls him a hobgoblin because in Act 2 Scene 1 a fairy actually says \"those that Hobgoblin call you, and sweet Puck.\" " +
  "The bio mentions running errands, making love potions, and switching heads, because that's what he does in the play. " +
  "He gets the love-juice flower in 2.1, puts it on the lovers' eyes in 2.2, and turns Bottom's head into a donkey head in 3.1. " +
  "The \"go around the whole world in 40 minutes\" part is almost a direct quote from his line \"I'll put a girdle round about the earth in forty minutes.\" " +
  "His interests like Shape-shifting and Practical Jokes come from real moments in the play. " +
  "He turns into a stool to prank an old woman in 2.1, and he speaks in poetry the whole time. " +
  "I made him \"looking for someone who can keep up\" because Puck is really fast, and Oberon depends on him a lot. " +
  "For his matches I picked Titania first because their match percent is really high, but in a funny way. " +
  "Puck ruined her marriage by making her fall in love with a donkey, but they are both fairies so they kind of fit. " +
  "I added a red flag that she is married to Puck's boss, because that part matters. " +
  "Helena has a way lower match because Puck only knows her as someone he accidentally caused drama for in 3.2. " +
  "Including both a fairy and a mortal match shows that Puck lives in two worlds, which is also his role in the play. " +
  "I wrote the profile in his sarcastic voice because Puck is the one character who talks straight to the audience at the end with \"if we shadows have offended.\" " +
  "Shakespeare writes him as funny but a little mean, which is the same tone I used.";

const MESSAGES_ESSAY =
  "I picked Messages because most of the plot in Acts 2 and 3 happens because Oberon keeps telling Puck what to do. " +
  "The texts I wrote follow what actually happens in the play. " +
  "Oberon sends Puck to get the \"little western flower\" in 2.1, then tells him to put the love juice on \"a sweet Athenian lady\" and the guy who ignores her (around lines 2.1.260–266). " +
  "Puck's text \"I'll put a girdle round about the earth in forty minutes\" is a direct quote from 2.1.175. " +
  "The texts also show his big mistake from Act 3 Scene 2 where he puts the juice on the wrong guy. " +
  "In the play he defends himself by saying \"did not you tell me I should know the man by the Athenian garments he had on?\" (3.2.348–349). " +
  "I ended with \"Lord, what fools these mortals be!\" because it's his most famous line (3.2.115). " +
  "Messages also shows the power difference, because Oberon sends short orders and Puck sends longer playful replies. " +
  "Messages just fit because being a messenger is literally Puck's job in the play.";

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

          <View style={styles.footerCard}>
            <Ionicons name="checkmark-circle" size={16} color="#00E676" />
            <Text style={styles.footerText}>
              Every section uses textual evidence (act/scene/line references) from A Midsummer Night&apos;s Dream.
            </Text>
          </View>
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
