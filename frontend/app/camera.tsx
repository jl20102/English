import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FOREST = "https://images.unsplash.com/photo-1763667109206-8c221106a682?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZW5jaGFudGVkJTIwZm9yZXN0JTIwbW9vbnxlbnwwfHx8fDE3Nzg1MTcyNDR8MA&ixlib=rb-4.1.0&q=85";

export default function Camera() {
  const router = useRouter();
  return (
    <View style={styles.container} testID="camera-screen">
      <ImageBackground source={{ uri: FOREST }} style={StyleSheet.absoluteFillObject} resizeMode="cover">
        <LinearGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]} style={StyleSheet.absoluteFillObject} />
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} testID="camera-back">
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.flashWrap}>
            <Ionicons name="flash" size={16} color="#FFD700" />
            <Text style={styles.flashText}>FAIRY FLASH</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.crosshair}>
          <View style={styles.targetBox} />
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.filters}>
          {[
            { id: "donkey", label: "Donkey Head", icon: "head-question" as const },
            { id: "fairy", label: "Fairy Wings", icon: "auto-fix" as const, active: true },
            { id: "moon", label: "Moonlight", icon: "moon-waning-crescent" as const },
            { id: "spell", label: "Spell Cast", icon: "flask" as const },
          ].map((f) => (
            <TouchableOpacity key={f.id} style={[styles.filter, f.active && styles.filterActive]} testID={`filter-${f.id}`}>
              <MaterialCommunityIcons name={f.icon} size={18} color={f.active ? "#05050A" : "#fff"} />
              <Text style={[styles.filterText, f.active && { color: "#05050A" }]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.gallery} testID="camera-gallery">
            <MaterialCommunityIcons name="image-multiple" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity testID="camera-shutter">
            <View style={styles.shutterOuter}>
              <View style={styles.shutterInner} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gallery}>
            <Ionicons name="camera-reverse" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <BlurView intensity={40} tint="dark" style={styles.caption}>
          <Text style={styles.captionText}>
            &ldquo;If we shadows have offended...&rdquo; — capture the moment before they remember.
          </Text>
        </BlurView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 10 },
  iconBtn: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  flashWrap: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(255,215,0,0.15)", borderWidth: 1, borderColor: "rgba(255,215,0,0.3)" },
  flashText: { color: "#FFD700", fontFamily: "Outfit_600SemiBold", fontSize: 10, letterSpacing: 1.5 },
  crosshair: { flex: 1, alignItems: "center", justifyContent: "center" },
  targetBox: { width: 200, height: 200, borderWidth: 2, borderColor: "rgba(255,215,0,0.5)", borderRadius: 12, borderStyle: "dashed" },
  filters: { flexDirection: "row", paddingHorizontal: 12, gap: 8, marginBottom: 18, flexWrap: "wrap", justifyContent: "center" },
  filter: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  filterActive: { backgroundColor: "#FFD700", borderColor: "#FFD700" },
  filterText: { color: "#fff", fontFamily: "Outfit_500Medium", fontSize: 11 },
  bottomBar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingHorizontal: 24, paddingBottom: 14 },
  gallery: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  shutterOuter: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: "#fff", alignItems: "center", justifyContent: "center" },
  shutterInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#fff" },
  caption: { marginHorizontal: 16, marginBottom: 10, padding: 12, borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  captionText: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 13, fontStyle: "italic", textAlign: "center" },
});
