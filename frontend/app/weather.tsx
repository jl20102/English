import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Weather() {
  const router = useRouter();
  const hourly = [
    { h: "Now", t: "61°", icon: "weather-night" as const, c: "#B388FF" },
    { h: "12 AM", t: "59°", icon: "weather-fog" as const, c: "#A1A4BA" },
    { h: "1 AM", t: "58°", icon: "auto-fix" as const, c: "#FFD700" },
    { h: "2 AM", t: "57°", icon: "weather-night" as const, c: "#B388FF" },
    { h: "3 AM", t: "60°", icon: "flower" as const, c: "#00E676" },
    { h: "4 AM", t: "63°", icon: "weather-sunset" as const, c: "#FFC107" },
    { h: "5 AM", t: "68°", icon: "weather-sunset-up" as const, c: "#FF5252" },
  ];

  return (
    <View style={styles.container} testID="weather-screen">
      <LinearGradient colors={["#1A0B2E", "#0D0E1A", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} testID="weather-back" style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="#B388FF" />
            <Text style={styles.backText}>Cities</Text>
          </TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.hero}>
            <Text style={styles.city}>Athenian Wood</Text>
            <Text style={styles.bigTemp}>61°</Text>
            <Text style={styles.cond}>Enchanted · Spells in the air</Text>
            <Text style={styles.range}>H: 72°  L: 55°</Text>
          </View>

          <LinearGradient colors={["rgba(179,136,255,0.12)", "rgba(179,136,255,0.02)"]} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="auto-fix" size={14} color="#FFD700" />
              <Text style={styles.cardLabel}>Fairy Advisory</Text>
            </View>
            <Text style={styles.cardBody}>
              Mischief Index is high tonight. Mortals lost in this wood may experience unexpected affections.
              Carry a love-juice antidote (Dian&apos;s bud).
            </Text>
          </LinearGradient>

          <LinearGradient colors={["rgba(255,255,255,0.04)", "rgba(255,255,255,0.01)"]} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="time-outline" size={14} color="#B388FF" />
              <Text style={styles.cardLabel}>Hourly Forecast</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hourly.map((h, i) => (
                <View key={i} style={styles.hourCol}>
                  <Text style={styles.hourLabel}>{h.h}</Text>
                  <MaterialCommunityIcons name={h.icon} size={26} color={h.c} />
                  <Text style={styles.hourTemp}>{h.t}</Text>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>

          <View style={styles.grid}>
            <LinearGradient colors={["rgba(0,230,118,0.1)", "rgba(0,230,118,0.02)"]} style={styles.smallCard}>
              <Text style={styles.smallLabel}>POLLEN</Text>
              <Text style={styles.smallValue}>Cupid&apos;s Bolt</Text>
              <Text style={styles.smallSub}>Beware — causes love at first sight</Text>
            </LinearGradient>
            <LinearGradient colors={["rgba(255,215,0,0.1)", "rgba(255,215,0,0.02)"]} style={styles.smallCard}>
              <Text style={styles.smallLabel}>MOON</Text>
              <Text style={styles.smallValue}>Full · Waning</Text>
              <Text style={styles.smallSub}>Peak fairy activity</Text>
            </LinearGradient>
            <LinearGradient colors={["rgba(179,136,255,0.1)", "rgba(179,136,255,0.02)"]} style={styles.smallCard}>
              <Text style={styles.smallLabel}>VISIBILITY</Text>
              <Text style={styles.smallValue}>Misty</Text>
              <Text style={styles.smallSub}>Easy to lose your suitor</Text>
            </LinearGradient>
            <LinearGradient colors={["rgba(255,82,82,0.1)", "rgba(255,82,82,0.02)"]} style={styles.smallCard}>
              <Text style={styles.smallLabel}>DRAMA</Text>
              <Text style={styles.smallValue}>Extreme</Text>
              <Text style={styles.smallSub}>Two suitors, one Helena</Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 6 },
  back: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#B388FF", fontFamily: "Outfit_500Medium", fontSize: 15 },
  hero: { alignItems: "center", paddingTop: 16, paddingBottom: 24 },
  city: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 28 },
  bigTemp: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 88, lineHeight: 100 },
  cond: { color: "#FFD700", fontFamily: "Outfit_500Medium", fontSize: 14, letterSpacing: 1 },
  range: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 13, marginTop: 4 },
  card: { marginHorizontal: 16, marginBottom: 12, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  cardLabel: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  cardBody: { color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 13.5, lineHeight: 20 },
  hourCol: { alignItems: "center", gap: 6, paddingHorizontal: 11, paddingVertical: 4 },
  hourLabel: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 11 },
  hourTemp: { color: "#F4F4F6", fontFamily: "Outfit_500Medium", fontSize: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, gap: 8 },
  smallCard: { width: "47%", padding: 14, borderRadius: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", marginBottom: 8 },
  smallLabel: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 10, letterSpacing: 1.5 },
  smallValue: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 16, marginTop: 6 },
  smallSub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11, marginTop: 4 },
});
