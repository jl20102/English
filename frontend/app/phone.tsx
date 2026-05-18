import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Contact = {
  id: string;
  name: string;
  role: string;
  faction: "fairy" | "noble" | "lover" | "mechanical";
  fav?: boolean;
  initials: string;
  color: [string, string];
  lastCall?: string;
  note: string;
};

const CONTACTS: Contact[] = [
  { id: "oberon", name: "Oberon", role: "King of the Fairies · BOSS", faction: "fairy", fav: true, initials: "O", color: ["#3949AB", "#1A1226"], lastCall: "missed · 12:02 AM", note: "Do not screen. He will know." },
  { id: "titania", name: "Titania", role: "Queen of the Fairies", faction: "fairy", fav: true, initials: "T", color: ["#B388FF", "#FF4081"], lastCall: "outgoing · yesterday", note: "Currently in love with a donkey. Long story." },
  { id: "hermia", name: "Hermia", role: "Daughter of Egeus", faction: "lover", initials: "H", color: ["#FF5252", "#FFC107"], lastCall: "—", note: "Short, fierce. Loves Lysander. Do NOT call her short." },
  { id: "helena", name: "Helena", role: "Friend of Hermia", faction: "lover", initials: "He", color: ["#FF4081", "#B388FF"], lastCall: "outgoing · 12:04 AM", note: "Tall, anxious. Currently being chased by TWO men thanks to me." },
  { id: "lysander", name: "Lysander", role: "Loves Hermia (mostly)", faction: "lover", initials: "L", color: ["#00B0FF", "#3949AB"], note: "Athenian youth #1. Anointed eye. Now loves Helena. Oops." },
  { id: "demetrius", name: "Demetrius", role: "Loves Helena (now)", faction: "lover", initials: "D", color: ["#00E676", "#00B0FF"], note: "Athenian youth #2. Allegedly the original target. Sorry, Oberon." },
  { id: "theseus", name: "Theseus", role: "Duke of Athens", faction: "noble", initials: "Th", color: ["#FFD700", "#FFA000"], note: "Marrying Hippolyta. Likes hunting and rules. Avoid." },
  { id: "hippolyta", name: "Hippolyta", role: "Queen of Amazons", faction: "noble", initials: "Hp", color: ["#FFC107", "#FF5252"], note: "Theseus's fiancée. Surprisingly chill about all this." },
  { id: "bottom", name: "Nick Bottom", role: "Weaver · Donkey-head", faction: "mechanical", fav: true, initials: "B", color: ["#A1A4BA", "#5D6076"], lastCall: "incoming · 1:14 AM", note: "Currently sporting an ass's head. Doesn't seem to mind. Iconic." },
  { id: "quince", name: "Peter Quince", role: "Carpenter · Director", faction: "mechanical", initials: "Q", color: ["#FFA000", "#5D6076"], note: "Running 'Pyramus and Thisbe' rehearsals in MY wood. Bold of him." },
];

const FACTIONS: { id: Contact["faction"] | "all" | "fav"; label: string }[] = [
  { id: "fav", label: "Favorites" },
  { id: "all", label: "All" },
  { id: "fairy", label: "Fairies" },
  { id: "lover", label: "Lovers" },
  { id: "noble", label: "Nobles" },
  { id: "mechanical", label: "Mechanicals" },
];

export default function Phone() {
  const router = useRouter();
  const [filter, setFilter] = useState<typeof FACTIONS[0]["id"]>("fav");
  const [calling, setCalling] = useState<Contact | null>(null);

  const filtered = CONTACTS.filter((c) => {
    if (filter === "all") return true;
    if (filter === "fav") return c.fav;
    return c.faction === filter;
  });

  if (calling) {
    return (
      <View style={styles.container} testID="phone-calling">
        <LinearGradient colors={calling.color} style={StyleSheet.absoluteFillObject} />
        <View style={styles.callOverlay} />
        <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
          <View style={styles.callTop}>
            <Text style={styles.callStatus}>calling…</Text>
            <Text style={styles.callName}>{calling.name}</Text>
            <Text style={styles.callRole}>{calling.role}</Text>
          </View>
          <View style={styles.callAvatarWrap}>
            <View style={styles.callAvatar}>
              <Text style={styles.callInitials}>{calling.initials}</Text>
            </View>
            <Text style={styles.callNote}>&ldquo;{calling.note}&rdquo;</Text>
          </View>
          <View style={styles.callActions}>
            <TouchableOpacity testID="end-call" onPress={() => setCalling(null)} style={styles.endBtn}>
              <Ionicons name="call" size={28} color="#fff" style={{ transform: [{ rotate: "135deg" }] }} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="phone-screen">
      <LinearGradient colors={["#0D0E1A", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} testID="phone-back" style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="#00E676" />
            <Text style={styles.backText}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.appTitle}>Contacts</Text>
          <TouchableOpacity><Ionicons name="add" size={24} color="#00E676" /></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FACTIONS.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[styles.chip, filter === f.id && styles.chipActive]}
              testID={`filter-${f.id}`}
            >
              <Text style={[styles.chipText, filter === f.id && { color: "#05050A" }]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {filtered.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={styles.row}
              onPress={() => setCalling(c)}
              activeOpacity={0.7}
              testID={`contact-${c.id}`}
            >
              <LinearGradient colors={c.color} style={styles.avatar}>
                <Text style={styles.initials}>{c.initials}</Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{c.name}{c.fav && " ⭐"}</Text>
                <Text style={styles.role}>{c.role}</Text>
                {c.lastCall && <Text style={styles.lastCall}>Last: {c.lastCall}</Text>}
              </View>
              <View style={styles.callIcon}>
                <Ionicons name="call" size={18} color="#00E676" />
              </View>
            </TouchableOpacity>
          ))}
          {filtered.length === 0 && (
            <Text style={styles.empty}>No one in this faction has a phone. Probably for the best.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 6 },
  back: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#00E676", fontFamily: "Outfit_500Medium", fontSize: 15 },
  appTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 20 },
  filters: { paddingHorizontal: 14, gap: 8, paddingVertical: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  chipActive: { backgroundColor: "#00E676", borderColor: "#00E676" },
  chipText: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 12 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingVertical: 10, gap: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  initials: { color: "#fff", fontFamily: "PlayfairDisplay_700Bold", fontSize: 18 },
  name: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 15 },
  role: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 12, marginTop: 1 },
  lastCall: { color: "#5D6076", fontFamily: "Outfit_400Regular", fontSize: 10, marginTop: 2 },
  callIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(0,230,118,0.12)", alignItems: "center", justifyContent: "center" },
  empty: { color: "#A1A4BA", textAlign: "center", paddingTop: 40, paddingHorizontal: 30, fontFamily: "Outfit_400Regular", fontStyle: "italic" },
  callOverlay: { ...(StyleSheet.absoluteFillObject as object), backgroundColor: "rgba(0,0,0,0.55)" },
  callTop: { alignItems: "center", paddingTop: 40 },
  callStatus: { color: "rgba(255,255,255,0.8)", fontFamily: "Outfit_500Medium", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" },
  callName: { color: "#fff", fontFamily: "PlayfairDisplay_700Bold", fontSize: 36, marginTop: 4 },
  callRole: { color: "rgba(255,255,255,0.7)", fontFamily: "Outfit_400Regular", fontSize: 13, marginTop: 4 },
  callAvatarWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 },
  callAvatar: { width: 140, height: 140, borderRadius: 70, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
  callInitials: { color: "#fff", fontFamily: "PlayfairDisplay_700Bold", fontSize: 56 },
  callNote: { color: "#fff", fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 15, fontStyle: "italic", textAlign: "center", marginTop: 26, lineHeight: 22 },
  callActions: { alignItems: "center", paddingBottom: 30 },
  endBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#FF5252", alignItems: "center", justifyContent: "center" },
});
