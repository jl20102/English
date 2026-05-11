import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Item = { id: string; text: string; done: boolean };

const INITIAL: Item[] = [
  { id: "1", text: "Fetch love-juice flower (cupid's bolt, western corner)", done: true },
  { id: "2", text: "Anoint Titania's eyes (make her love something ridiculous)", done: true },
  { id: "3", text: "Find the Athenian youth in the wood", done: true },
  { id: "4", text: "Wait — there are TWO Athenian youths?? Just dose both.", done: true },
  { id: "5", text: "Turn Bottom's head into a donkey's. (this one's just for fun)", done: true },
  { id: "6", text: "Reverse spells before dawn so no one remembers", done: false },
  { id: "7", text: "Sweep behind the door so the audience forgives us", done: false },
  { id: "8", text: "Practice closing soliloquy. Try not to break the fourth wall.", done: false },
];

export default function Notes() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL);

  const toggle = (id: string) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  return (
    <View style={styles.container} testID="notes-screen">
      <LinearGradient colors={["#221A05", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} testID="notes-back" style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="#FFC107" />
            <Text style={styles.backText}>Folders</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mischief</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="auto-fix" size={20} color="#FFC107" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.noteDate}>Midsummer&apos;s Eve · 11:11 PM</Text>
          <Text style={styles.noteTitle}>Tonight&apos;s Mischief List</Text>
          <Text style={styles.noteSub}>
            Per orders of His Royal Highness King Oberon, etc. etc. (eye-roll mine).
          </Text>

          <View style={{ marginTop: 18 }}>
            {items.map((it) => (
              <TouchableOpacity
                key={it.id}
                onPress={() => toggle(it.id)}
                style={styles.row}
                activeOpacity={0.7}
                testID={`task-${it.id}`}
              >
                <View style={[styles.check, it.done && styles.checkDone]}>
                  {it.done && <Ionicons name="checkmark" size={14} color="#05050A" />}
                </View>
                <Text style={[styles.itemText, it.done && styles.itemDone]}>{it.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.signature}>
            <Text style={styles.sigQuote}>
              &ldquo;If we shadows have offended, think but this, and all is mended.&rdquo;
            </Text>
            <Text style={styles.sigName}>— R. Goodfellow</Text>
          </View>
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
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  back: { flexDirection: "row", alignItems: "center", width: 90 },
  backText: { color: "#FFC107", fontFamily: "Outfit_500Medium", fontSize: 14 },
  headerTitle: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 15 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  noteDate: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 12,
    letterSpacing: 1,
  },
  noteTitle: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 32,
    marginTop: 6,
    lineHeight: 38,
  },
  noteSub: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
    marginTop: 8,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkDone: { backgroundColor: "#FFC107" },
  itemText: {
    flex: 1,
    color: "#F4F4F6",
    fontFamily: "Outfit_400Regular",
    fontSize: 15,
    lineHeight: 22,
  },
  itemDone: {
    color: "#5D6076",
    textDecorationLine: "line-through",
  },
  signature: {
    marginTop: 32,
    padding: 18,
    borderLeftWidth: 3,
    borderLeftColor: "#FFC107",
    backgroundColor: "rgba(255,193,7,0.05)",
    borderRadius: 8,
  },
  sigQuote: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 17,
    lineHeight: 24,
    fontStyle: "italic",
  },
  sigName: {
    color: "#FFC107",
    fontFamily: "Outfit_500Medium",
    fontSize: 13,
    marginTop: 10,
  },
});
