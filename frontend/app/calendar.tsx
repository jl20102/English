import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Ev = { id: string; time: string; title: string; color: string; sub?: string };
const EVENTS: Ev[] = [
  { id: "1", time: "9:00 PM", title: "Quarrel w/ Oberon over the changeling boy", color: "#FF5252", sub: "Titania &amp; Oberon · Forest Glade" },
  { id: "2", time: "10:30 PM", title: "Fetch the love-juice flower 🌸", color: "#FFC107", sub: "ASAP. Cupid's bolt, western corner." },
  { id: "3", time: "11:15 PM", title: "Drop love-juice on Demetrius (allegedly)", color: "#FF4081" },
  { id: "4", time: "12:00 AM", title: "Bottom's Rude Mechanicals rehearsal", color: "#B388FF", sub: "Pyramus and Thisbe · open mic" },
  { id: "5", time: "12:30 AM", title: "Transform Bottom's head into an ass", color: "#00E676", sub: "...for the lols. Just a personal goal." },
  { id: "6", time: "1:00 AM", title: "Titania falls for Bottom (donkey-head)", color: "#FF4081", sub: "She has no idea. We don't tell." },
  { id: "7", time: "3:00 AM", title: "Untangle the Athenian lovers", color: "#00B0FF", sub: "Lysander ↔ Hermia, Demetrius ↔ Helena" },
  { id: "8", time: "5:30 AM", title: "Reverse all enchantments before dawn", color: "#FFD700" },
  { id: "9", time: "6:00 AM", title: "Closing soliloquy. Bow. Disappear.", color: "#3949AB" },
];

export default function Calendar() {
  const router = useRouter();
  return (
    <View style={styles.container} testID="calendar-screen">
      <LinearGradient colors={["#0D0E1A", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} testID="cal-back" style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="#FF5252" />
            <Text style={styles.backText}>Months</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="cal-add">
            <Ionicons name="add" size={24} color="#FF5252" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.todayLabel}>TONIGHT</Text>
          <Text style={styles.dateBig}>Friday, June 21</Text>
          <Text style={styles.dateSub}>Midsummer&apos;s Eve · 9 events · 1 catastrophe</Text>
        </View>

        <View style={styles.weekStrip}>
          {["S","M","T","W","T","F","S"].map((d, i) => {
            const isToday = i === 5;
            const date = 16 + i;
            return (
              <View key={i} style={[styles.weekDay, isToday && styles.weekDayToday]}>
                <Text style={[styles.weekLabel, isToday && { color: "#fff" }]}>{d}</Text>
                <Text style={[styles.weekNum, isToday && { color: "#fff" }]}>{date}</Text>
              </View>
            );
          })}
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          {EVENTS.map((e) => (
            <View key={e.id} style={styles.eventRow} testID={`event-${e.id}`}>
              <View style={{ width: 60 }}>
                <Text style={styles.eventTime}>{e.time}</Text>
              </View>
              <View style={[styles.eventBar, { backgroundColor: e.color }]} />
              <View style={{ flex: 1, paddingVertical: 8 }}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                {e.sub && <Text style={styles.eventSub}>{e.sub}</Text>}
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <MaterialCommunityIcons name="auto-fix" size={14} color="#FFD700" />
            <Text style={styles.footerText}>
              &ldquo;Jack shall have Jill; nought shall go ill.&rdquo;
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingBottom: 4 },
  back: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#FF5252", fontFamily: "Outfit_500Medium", fontSize: 15 },
  header: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 14 },
  todayLabel: { color: "#FF5252", fontFamily: "Outfit_600SemiBold", fontSize: 12, letterSpacing: 2 },
  dateBig: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 30, marginTop: 4 },
  dateSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 12, marginTop: 2 },
  weekStrip: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.06)", marginBottom: 6 },
  weekDay: { alignItems: "center", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14 },
  weekDayToday: { backgroundColor: "#FF5252" },
  weekLabel: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 11 },
  weekNum: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 16, marginTop: 2 },
  eventRow: { flexDirection: "row", alignItems: "stretch", marginVertical: 3 },
  eventTime: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 11, paddingTop: 10 },
  eventBar: { width: 3, borderRadius: 2, marginRight: 12 },
  eventTitle: { color: "#F4F4F6", fontFamily: "Outfit_500Medium", fontSize: 14 },
  eventSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11, marginTop: 2 },
  footer: { flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 24, paddingHorizontal: 12 },
  footerText: { color: "#FFD700", fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 13, fontStyle: "italic" },
});
