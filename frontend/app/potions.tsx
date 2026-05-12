import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Potion = {
  id: string;
  name: string;
  shake: string;
  effect: string;
  ingredients: string[];
  warning: string;
  color: [string, string];
};

const POTIONS: Potion[] = [
  {
    id: "loveJuice",
    name: "Love-in-Idleness",
    shake: "Cupid's Bolt",
    effect: "Causes the sleeper to fall madly in love with the first creature they see upon waking.",
    ingredients: ["Western flower (struck by Cupid's arrow)", "Drop of moonlight", "A sleeping eyelid"],
    warning: "Side effects may include: falling for donkeys, ass-headed weavers, or whoever is closest. Use sparingly. Or don't. Up to you.",
    color: ["#FF4081", "#FF5252"],
  },
  {
    id: "diansBud",
    name: "Dian's Bud",
    shake: "The Antidote",
    effect: "Reverses the effects of Love-in-Idleness. Restores rightful affections.",
    ingredients: ["Bud of Diana's herb", "A genuine apology", "First light of dawn"],
    warning: "Apply BEFORE mortals wake. Otherwise: awkward.",
    color: ["#00E676", "#00B0FF"],
  },
  {
    id: "transform",
    name: "Bottom's Brew",
    shake: "Head-Swap Special",
    effect: "Replaces the head of any rude mechanical with that of a donkey. For comedic purposes only.",
    ingredients: ["A weaver named Bottom", "One willing donkey (head only)", "An audience"],
    warning: "Will make a Fairy Queen fall in love with the result. This is, somehow, the funniest possible outcome.",
    color: ["#B388FF", "#3949AB"],
  },
  {
    id: "fog",
    name: "Athenian Fog",
    shake: "The Confuser",
    effect: "Disorients lovers in a forest, separating them just enough to spawn three acts of drama.",
    ingredients: ["Mist from a hidden brook", "Whispered insults in Lysander's voice", "Whispered insults in Demetrius's voice"],
    warning: "Causes prolonged shouting matches between best friends. Helena will cry. A lot.",
    color: ["#A1A4BA", "#3949AB"],
  },
];

export default function Potions() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const p = POTIONS[active];

  return (
    <View style={styles.container} testID="potions-screen">
      <LinearGradient colors={["#1A0826", "#0D0414", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} testID="potions-back" style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.appName}>Potion Cabinet</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons name="auto-fix" size={20} color="#FFD700" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {/* Carousel selector */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelf}>
            {POTIONS.map((pt, i) => (
              <TouchableOpacity
                key={pt.id}
                onPress={() => setActive(i)}
                style={[styles.bottleWrap, active === i && styles.bottleWrapActive]}
                testID={`potion-${pt.id}`}
              >
                <LinearGradient colors={pt.color} style={styles.bottle}>
                  <MaterialCommunityIcons name="flask" size={28} color="#fff" />
                </LinearGradient>
                <Text style={[styles.bottleName, active === i && { color: "#FFD700" }]} numberOfLines={1}>
                  {pt.shake}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Active potion details */}
          <View style={styles.detailWrap}>
            <Text style={styles.potionShake}>{p.shake}</Text>
            <Text style={styles.potionName}>{p.name}</Text>

            <LinearGradient colors={p.color} style={styles.heroBottle}>
              <MaterialCommunityIcons name="flask" size={72} color="rgba(255,255,255,0.95)" />
              <View style={styles.heroGlow} />
            </LinearGradient>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Effect</Text>
              <Text style={styles.body}>{p.effect}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Ingredients</Text>
              {p.ingredients.map((ing, i) => (
                <View key={i} style={styles.ingRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.ingText}>{ing}</Text>
                </View>
              ))}
            </View>

            <View style={styles.warningBox}>
              <Ionicons name="warning" size={18} color="#FFC107" />
              <Text style={styles.warningText}>{p.warning}</Text>
            </View>

            <TouchableOpacity style={styles.brewBtn} testID="brew-btn">
              <MaterialCommunityIcons name="auto-fix" size={18} color="#05050A" />
              <Text style={styles.brewText}>Brew One Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14, paddingBottom: 8 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.05)" },
  appName: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 18 },
  shelf: { paddingHorizontal: 16, gap: 12, paddingVertical: 6 },
  bottleWrap: { alignItems: "center", width: 76 },
  bottleWrapActive: { transform: [{ scale: 1.08 }] },
  bottle: { width: 60, height: 80, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  bottleName: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 10, textAlign: "center" },
  detailWrap: { paddingHorizontal: 22, paddingTop: 12 },
  potionShake: { color: "#FFD700", fontFamily: "Outfit_600SemiBold", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" },
  potionName: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 28, marginTop: 2 },
  heroBottle: { width: 160, height: 200, borderRadius: 28, alignSelf: "center", marginVertical: 20, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  heroGlow: { position: "absolute", top: -30, left: -30, right: -30, bottom: -30, backgroundColor: "rgba(255,255,255,0.05)" },
  section: { marginTop: 16 },
  sectionLabel: { color: "#FFD700", fontFamily: "Outfit_600SemiBold", fontSize: 11, letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 6 },
  body: { color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 14.5, lineHeight: 22 },
  ingRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 },
  bullet: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#B388FF" },
  ingText: { color: "#F4F4F6", fontFamily: "Outfit_400Regular", fontSize: 13, flex: 1 },
  warningBox: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: 18, padding: 14, borderRadius: 14, backgroundColor: "rgba(255,193,7,0.08)", borderWidth: 1, borderColor: "rgba(255,193,7,0.25)" },
  warningText: { flex: 1, color: "#FFC107", fontFamily: "Outfit_500Medium", fontSize: 12.5, lineHeight: 18 },
  brewBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 22, paddingVertical: 14, borderRadius: 14, backgroundColor: "#FFD700" },
  brewText: { color: "#05050A", fontFamily: "Outfit_600SemiBold", fontSize: 14, letterSpacing: 0.5 },
});
