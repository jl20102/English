import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from "@expo-google-fonts/outfit";
import {
  View, ActivityIndicator, StyleSheet, useWindowDimensions, Platform, Text,
  Animated, TouchableOpacity, Easing, Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

const PHONE_W = 390;
const PHONE_H = 844;
const BEZEL = 12;
const BORDER_RADIUS = 54;

function BootSplash({ onDone }: { onDone: () => void }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 900, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
      ]),
      Animated.timing(glow, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.delay(500),
      Animated.timing(fade, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => onDone());
  }, [fade, scale, glow, onDone]);

  return (
    <Animated.View style={[styles.boot, { opacity: fade }]}>
      <LinearGradient colors={["#0D0E1A", "#05050A"]} style={StyleSheet.absoluteFillObject} />
      <Animated.View style={{ transform: [{ scale }], alignItems: "center" }}>
        <View style={styles.bootLogo}>
          <MaterialCommunityIcons name="auto-fix" size={48} color="#FFD700" />
        </View>
        <Animated.Text style={[styles.bootTitle, { opacity: glow }]}>Puck OS</Animated.Text>
        <Animated.Text style={[styles.bootSub, { opacity: glow }]}>Midsummer&apos;s Eve · v16.16</Animated.Text>
      </Animated.View>
      <View style={styles.bootDots}>
        <ActivityIndicator size="small" color="#FFD700" />
      </View>
    </Animated.View>
  );
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slideHint = useRef(new Animated.Value(0)).current;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    const t = setInterval(() => setNow(new Date()), 30000);
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideHint, { toValue: -10, duration: 900, useNativeDriver: true }),
        Animated.timing(slideHint, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
    return () => clearInterval(t);
  }, [fade, slideHint]);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: fade, zIndex: 998 }]} testID="lock-screen">
      <LinearGradient colors={["#000", "#0A0414", "#1A0B2E"]} style={StyleSheet.absoluteFillObject} />
      {/* Particles */}
      {[...Array(24)].map((_, i) => (
        <View key={i} style={{
          position: "absolute",
          top: `${(i * 41) % 100}%`,
          left: `${(i * 29) % 100}%`,
          width: 2 + (i % 3),
          height: 2 + (i % 3),
          borderRadius: 3,
          backgroundColor: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#B388FF" : "#00E676",
          opacity: 0.5,
        }} />
      ))}
      <View style={styles.lockContent}>
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Ionicons name="lock-closed" size={18} color="#FFD700" />
          <Text style={styles.lockDate}>Friday, June 21 · Midsummer&apos;s Eve</Text>
          <Text style={styles.lockTime}>{time}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={14} color="#B388FF" />
            <Text style={styles.lockSub}>Full Moon · Fairies astir</Text>
          </View>
        </View>

        <View style={styles.notifBox}>
          <View style={styles.notifIcon}>
            <Ionicons name="chatbubble" size={14} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifTitle}>Oberon</Text>
            <Text style={styles.notifBody} numberOfLines={1}>PUCK. The herb. Now.</Text>
          </View>
          <Text style={styles.notifTime}>now</Text>
        </View>

        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onUnlock} testID="unlock-btn" activeOpacity={0.7}>
          <Animated.View style={[styles.unlockHint, { transform: [{ translateY: slideHint }] }]}>
            <Ionicons name="chevron-up" size={24} color="#FFD700" />
            <Text style={styles.unlockText}>Tap or swipe up to unlock</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const showFrame = Platform.OS === "web" && width >= 700;

  const [booted, setBooted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [volumeHud, setVolumeHud] = useState<null | "up" | "down">(null);

  const showVolume = (dir: "up" | "down") => {
    setVolumeHud(dir);
    setTimeout(() => setVolumeHud(null), 1200);
  };

  const inner = (
    <>
      {!booted && <BootSplash onDone={() => setBooted(true)} />}
      {booted && children}
      {booted && locked && <LockScreen onUnlock={() => setLocked(false)} />}
      {volumeHud && (
        <View style={styles.volumeHud} pointerEvents="none">
          <Ionicons name={volumeHud === "up" ? "volume-high" : "volume-low"} size={18} color="#FFD700" />
          <View style={styles.volumeBar}>
            <View style={[styles.volumeFill, { width: volumeHud === "up" ? "85%" : "25%" }]} />
          </View>
        </View>
      )}
    </>
  );

  if (!showFrame) {
    return <View style={{ flex: 1 }}>{inner}</View>;
  }

  const maxH = height - 60;
  const maxW = Math.min(width - 60, 500);
  const scale = Math.min(maxH / PHONE_H, maxW / PHONE_W, 1);
  const scaledW = PHONE_W * scale;
  const scaledH = PHONE_H * scale;
  const bezel = BEZEL * scale;
  const radius = BORDER_RADIUS * scale;

  return (
    <View style={styles.outer}>
      <LinearGradient colors={["#1A0B2E", "#0A0414", "#000"]} style={StyleSheet.absoluteFillObject} />
      <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
        {[...Array(18)].map((_, i) => (
          <View key={i} style={{
            position: "absolute",
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            borderRadius: 4,
            backgroundColor: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#B388FF" : "#00E676",
            opacity: 0.35,
          }} />
        ))}
      </View>

      <View style={styles.branding}>
        <MaterialCommunityIcons name="auto-fix" size={16} color="#FFD700" />
        <Text style={styles.brandText}>Puck&apos;s Phone · Midsummer&apos;s Eve</Text>
      </View>

      <View style={[styles.phone, {
        width: scaledW + bezel * 2,
        height: scaledH + bezel * 2,
        borderRadius: radius + bezel,
        padding: bezel,
      }]}>
        {/* Clickable side buttons */}
        <Pressable
          onPress={() => showVolume("up")}
          style={[styles.sideBtn, { top: scaledH * 0.18, height: scaledH * 0.06, width: bezel + 4, left: -bezel / 2 }]}
          testID="btn-volume-up"
        />
        <Pressable
          onPress={() => showVolume("down")}
          style={[styles.sideBtn, { top: scaledH * 0.28, height: scaledH * 0.09, width: bezel + 4, left: -bezel / 2 }]}
          testID="btn-volume-down"
        />
        <Pressable
          onPress={() => booted && setLocked((l) => !l)}
          style={[styles.sideBtn, { top: scaledH * 0.25, height: scaledH * 0.12, width: bezel + 4, right: -bezel / 2 }]}
          testID="btn-power"
        />

        <View style={{
          width: scaledW, height: scaledH, borderRadius: radius,
          overflow: "hidden", backgroundColor: "#05050A",
        }}>
          {/* Dynamic island */}
          <View pointerEvents="none" style={{
            position: "absolute",
            top: 8 * scale,
            alignSelf: "center",
            left: "50%",
            transform: [{ translateX: -50 * scale }],
            width: 100 * scale,
            height: 28 * scale,
            borderRadius: 18 * scale,
            backgroundColor: "#000",
            zIndex: 999,
          }} />
          {inner}
        </View>
      </View>

      <Text style={styles.hint}>
        <Ionicons name="information-circle-outline" size={12} color="#A1A4BA" />
        {"  "}Tap apps to explore · Press right side button to lock · Volume buttons on left
      </Text>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold,
    Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#05050A", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color="#FFD700" />
    </View>;
  }

  return (
    <>
      <StatusBar style="light" />
      <PhoneFrame>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#05050A" },
          animation: "fade",
        }} />
      </PhoneFrame>
    </>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0A0414" },
  branding: {
    position: "absolute", top: 24, flexDirection: "row", alignItems: "center", gap: 8,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,215,0,0.2)",
  },
  brandText: { color: "#FFD700", fontFamily: "Outfit_500Medium", fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase" },
  phone: {
    backgroundColor: "#0a0a0f", borderWidth: 1.5, borderColor: "#2a2a35",
    shadowColor: "#B388FF", shadowOffset: { width: 0, height: 30 }, shadowOpacity: 0.4, shadowRadius: 60, elevation: 30,
  },
  sideBtn: { position: "absolute", backgroundColor: "#2a2a35", borderRadius: 3, zIndex: 1000 },
  hint: { position: "absolute", bottom: 18, color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 11 },
  boot: {
    ...(StyleSheet.absoluteFillObject as object),
    alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  bootLogo: {
    width: 96, height: 96, borderRadius: 28,
    backgroundColor: "rgba(255,215,0,0.08)", borderWidth: 1, borderColor: "rgba(255,215,0,0.3)",
    alignItems: "center", justifyContent: "center", marginBottom: 22,
  },
  bootTitle: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 40, letterSpacing: 2 },
  bootSub: { color: "#FFD700", fontFamily: "Outfit_500Medium", fontSize: 12, letterSpacing: 2, marginTop: 6, textTransform: "uppercase" },
  bootDots: { position: "absolute", bottom: 80 },
  lockContent: { flex: 1, paddingHorizontal: 28, paddingVertical: 60 },
  lockDate: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 13, marginTop: 10 },
  lockTime: { color: "#F4F4F6", fontFamily: "PlayfairDisplay_700Bold", fontSize: 84, lineHeight: 92, marginTop: 6 },
  lockSub: { color: "#B388FF", fontFamily: "Outfit_400Regular", fontSize: 12 },
  notifBox: {
    flexDirection: "row", alignItems: "center", gap: 10, marginTop: 30,
    padding: 12, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  notifIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#3949AB", alignItems: "center", justifyContent: "center" },
  notifTitle: { color: "#F4F4F6", fontFamily: "Outfit_600SemiBold", fontSize: 13 },
  notifBody: { color: "#A1A4BA", fontFamily: "Outfit_400Regular", fontSize: 12, marginTop: 1 },
  notifTime: { color: "#5D6076", fontFamily: "Outfit_400Regular", fontSize: 10 },
  unlockHint: { alignItems: "center", gap: 2, paddingVertical: 16 },
  unlockText: { color: "#A1A4BA", fontFamily: "Outfit_500Medium", fontSize: 12 },
  volumeHud: {
    position: "absolute", top: 80, alignSelf: "center", left: "20%", right: "20%",
    flexDirection: "row", alignItems: "center", gap: 10,
    padding: 10, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.85)",
    borderWidth: 1, borderColor: "rgba(255,215,0,0.3)", zIndex: 997,
  },
  volumeBar: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 2 },
  volumeFill: { height: 4, backgroundColor: "#FFD700", borderRadius: 2 },
});
