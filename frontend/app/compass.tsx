import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Landmark = { id: string; name: string; bearing: number; dist: string; desc: string };

const LANDMARKS: Landmark[] = [
  { id: "athens", name: "Athens", bearing: 90, dist: "2.4 mi", desc: "Duke Theseus rules. Mortal law. Boring weddings." },
  { id: "titania-bower", name: "Titania's Bower", bearing: 200, dist: "0.3 mi", desc: "Where the wild thyme blows. She's asleep with a donkey. Don't ask." },
  { id: "lovers", name: "The Lost Lovers", bearing: 315, dist: "0.7 mi", desc: "Four mortals running in circles. Currently my fault." },
  { id: "rehearsal", name: "Mechanicals' Rehearsal", bearing: 45, dist: "0.5 mi", desc: "'Pyramus & Thisbe.' Possibly the worst play ever written." },
  { id: "oberon", name: "Oberon's Throne", bearing: 0, dist: "1.0 mi", desc: "North. Always north. Try not to be late." },
];

export default function Compass() {
  const router = useRouter();
  // simulate "facing" direction: bounces between 340-20° for "facing North-ish"
  const [heading, setHeading] = useState(0);
  const [active, setActive] = useState(0);
  const rotate = useRef(new Animated.Value(0)).current;
  const target = LANDMARKS[active];

  useEffect(() => {
    let h = 0;
    const t = setInterval(() => {
      h = (h + 7) % 360;
      setHeading(h);
      Animated.timing(rotate, { toValue: h, duration: 700, easing: Easing.linear, useNativeDriver: true }).start();
    }, 700);
    return () => clearInterval(t);
  }, [rotate]);

  const cardinal = (deg: number) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(deg / 45) % 8];
  };

  const rotation = rotate.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "-360deg"] });
  const needleRot = (target.bearing - heading + 360) % 360;

  return (
    <View style={styles.container} testID="compass-screen">
      <LinearGradient colors={["#1A1226", "#0D0414", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} testID="compass-back" style={styles.back}>
            <Ionicons name="chevron-back" size={22} color="#FFD700" />
            <Text style={styles.backText}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.appTitle}>Fairy Compass</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.headingBlock}>
          <Text style={styles.headingNum}>{Math.round(heading)}°</Text>
          <Text style={styles.cardinal}>{cardinal(heading)}</Text>
          <Text style={styles.sub}>Facing the Athenian Wood</Text>
        </View>

        <View style={styles.compassWrap}>
          <Animated.View style={[styles.dial, { transform: [{ rotate: rotation }] }]}>
            <Text style={[styles.dialLetter, styles.n]}>N</Text>
            <Text style={[styles.dialLetter, styles.e]}>E</Text>
            <Text style={[styles.dialLetter, styles.s]}>S</Text>
            <Text style={[styles.dialLetter, styles.w]}>W</Text>
            {[...Array(24)].map((_, i) => (
              <View key={i} style={[styles.tick, { transform: [{ rotate: `${i * 15}deg` }, { translateY: -110 }] }]} />
            ))}
            <View style={{ position: "absolute", transform: [{ rotate: `${target.bearing}deg` }] }}>
              <View style={styles.needle} />
            </View>
          </Animated.View>
          <View style={styles.centerDot}>
            <MaterialCommunityIcons name="auto-fix" size={20} color="#FFD700" />
          </View>
        </View>

        <View style={styles.targetCard}>
          <Text style={styles.targetLabel}>POINTING TO</Text>
          <Text style={styles.targetName}>{target.name}</Text>
          <Text style={styles.targetMeta}>{target.dist} · bearing {target.bearing}° · {Math.round(needleRot)}° relative</Text>
          <Text style={styles.targetDesc}>{target.desc}</Text>
        </View>

        <View style={styles.dotsRow}>
          {LANDMARKS.map((l, i) => (
            <TouchableOpacity
              key={l.id}
              style={[styles.dot, active === i && styles.dotActive]}
              onPress={() => setActive(i)}
              testID={`landmark-${l.id}`}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingBottom: 6 },
  back: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#FFD700", fontFamily: "Outfit_500Medium", fontSize: 15 },
  appTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 18 },
  headingBlock: { alignItems: "center", paddingTop: 6, paddingBottom: 8 },
  headingNum: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 44, lineHeight: 50 },
  cardinal: { color: "#FFD700", fontFamily: "Outfit_600SemiBold", fontSize: 14, letterSpacing: 3 },
  sub: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11, marginTop: 2 },
  compassWrap: { width: 260, height: 260, alignSelf: "center", marginVertical: 20, alignItems: "center", justifyContent: "center" },
  dial: { width: 240, height: 240, borderRadius: 120, borderWidth: 2, borderColor: "rgba(255,215,0,0.25)", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.02)" },
  dialLetter: { position: "absolute", color: "#FFD700", fontFamily: "PlayfairDisplay_700Bold", fontSize: 22 },
  n: { top: 10 },
  s: { bottom: 10 },
  e: { right: 10, top: "47%" },
  w: { left: 10, top: "47%" },
  tick: { position: "absolute", width: 2, height: 8, backgroundColor: "rgba(255,215,0,0.4)", top: 110, left: 119 },
  needle: { width: 4, height: 100, backgroundColor: "#FF4081", borderRadius: 2, marginBottom: 100, shadowColor: "#FF4081", shadowOpacity: 0.8, shadowRadius: 8 },
  centerDot: { position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,215,0,0.1)", borderWidth: 1, borderColor: "rgba(255,215,0,0.4)", alignItems: "center", justifyContent: "center" },
  targetCard: { marginHorizontal: 20, padding: 16, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,215,0,0.15)" },
  targetLabel: { color: "#FFD700", fontFamily: "Outfit_600SemiBold", fontSize: 10, letterSpacing: 2 },
  targetName: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, marginTop: 2 },
  targetMeta: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11, marginTop: 4 },
  targetDesc: { color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 13, marginTop: 8, lineHeight: 19, fontStyle: "italic" },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 10, paddingVertical: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)" },
  dotActive: { backgroundColor: "#FFD700", width: 22 },
});
