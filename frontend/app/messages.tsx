import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Msg = { id: string; from: "puck" | "oberon"; text: string; time: string };

const THREAD: Msg[] = [
  { id: "1", from: "oberon", text: "Puck. The herb.", time: "11:14 PM" },
  { id: "2", from: "oberon", text: "Bring me the little western flower. Now.", time: "11:14 PM" },
  { id: "3", from: "puck", text: "On it, my lord. I'll put a girdle round about the earth in forty minutes 🌍✨", time: "11:15 PM" },
  { id: "4", from: "oberon", text: "Drop a bit on the eyelids of an Athenian youth in the wood.", time: "11:32 PM" },
  { id: "5", from: "puck", text: "Athenian youth. Got it.", time: "11:33 PM" },
  { id: "6", from: "puck", text: "...there are TWO Athenian youths in the wood.", time: "12:01 AM" },
  { id: "7", from: "oberon", text: "Puck.", time: "12:02 AM" },
  { id: "8", from: "puck", text: "I anointed both. Just to be safe 😇", time: "12:03 AM" },
  { id: "9", from: "oberon", text: "PUCK.", time: "12:03 AM" },
  { id: "10", from: "puck", text: "Lord, what fools these mortals be!", time: "12:04 AM" },
];

export default function Messages() {
  const router = useRouter();
  return (
    <View style={styles.container} testID="messages-screen">
      <LinearGradient colors={["#0D0E1A", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} testID="messages-back" style={styles.back}>
            <Ionicons name="chevron-back" size={24} color="#00B0FF" />
            <Text style={styles.backText}>Inbox</Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>O</Text>
            </View>
            <Text style={styles.contactName}>Oberon</Text>
            <Text style={styles.contactSub}>King of Shadows</Text>
          </View>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          <Text style={styles.dayLabel}>Tonight · Midsummer&apos;s Eve</Text>
          {THREAD.map((m) => (
            <View
              key={m.id}
              style={[styles.bubbleRow, m.from === "puck" ? styles.right : styles.left]}
            >
              <View
                style={[
                  styles.bubble,
                  m.from === "puck" ? styles.bubblePuck : styles.bubbleOther,
                ]}
              >
                <Text style={[styles.bubbleText, m.from === "puck" && { color: "#fff" }]}>
                  {m.text}
                </Text>
              </View>
              <Text style={styles.timeStamp}>{m.time}</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  back: { flexDirection: "row", alignItems: "center", width: 80 },
  backText: { color: "#00B0FF", fontFamily: "Outfit_500Medium", fontSize: 15, marginLeft: -3 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#3949AB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarTxt: { color: "#fff", fontFamily: "PlayfairDisplay_700Bold", fontSize: 18 },
  contactName: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 13 },
  contactSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 10 },
  dayLabel: {
    textAlign: "center",
    color: "#A1A4BA",
    fontFamily: "Outfit_500Medium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginVertical: 12,
  },
  bubbleRow: { marginVertical: 4, maxWidth: "78%" },
  left: { alignSelf: "flex-start" },
  right: { alignSelf: "flex-end", alignItems: "flex-end" },
  bubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  bubblePuck: {
    backgroundColor: "#FF4081",
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    color: "#F4F4F6",
    fontFamily: "Outfit_400Regular",
    fontSize: 14.5,
    lineHeight: 20,
  },
  timeStamp: {
    color: "#5D6076",
    fontFamily: "Outfit_400Regular",
    fontSize: 10,
    marginTop: 3,
    marginHorizontal: 6,
  },
});
