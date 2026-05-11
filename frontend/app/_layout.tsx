import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from "@expo-google-fonts/outfit";
import { View, ActivityIndicator, StyleSheet, useWindowDimensions, Platform, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Phone frame dimensions (iPhone 14 Pro–ish proportions)
const PHONE_W = 390;
const PHONE_H = 844;
const BEZEL = 12;
const BORDER_RADIUS = 54;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  // On mobile (or narrow web), render full-bleed
  const showFrame = Platform.OS === "web" && width >= 700;

  if (!showFrame) {
    return <View style={{ flex: 1 }}>{children}</View>;
  }

  // Scale phone to fit viewport
  const maxH = height - 60;
  const maxW = Math.min(width - 60, 500);
  const scale = Math.min(maxH / PHONE_H, maxW / PHONE_W, 1);
  const scaledW = PHONE_W * scale;
  const scaledH = PHONE_H * scale;
  const bezel = BEZEL * scale;
  const radius = BORDER_RADIUS * scale;

  return (
    <View style={styles.outer} testID="phone-frame-outer">
      {/* Ambient background */}
      <LinearGradient
        colors={["#1A0B2E", "#0A0414", "#000"]}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Floating fairy-light particles */}
      <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
        {[...Array(18)].map((_, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: 4,
              backgroundColor: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#B388FF" : "#00E676",
              opacity: 0.35,
            }}
          />
        ))}
      </View>

      {/* Branding header */}
      <View style={styles.branding}>
        <MaterialCommunityIcons name="auto-fix" size={16} color="#FFD700" />
        <Text style={styles.brandText}>Puck&apos;s Phone · Midsummer&apos;s Eve</Text>
      </View>

      {/* Phone */}
      <View
        style={[
          styles.phone,
          {
            width: scaledW + bezel * 2,
            height: scaledH + bezel * 2,
            borderRadius: radius + bezel,
            padding: bezel,
          },
        ]}
        testID="phone-frame"
      >
        {/* Side buttons */}
        <View style={[styles.buttonLeft, { top: scaledH * 0.18, height: scaledH * 0.06, width: bezel / 2 + 1, left: -bezel / 4 }]} />
        <View style={[styles.buttonLeft, { top: scaledH * 0.28, height: scaledH * 0.09, width: bezel / 2 + 1, left: -bezel / 4 }]} />
        <View style={[styles.buttonLeft, { top: scaledH * 0.4, height: scaledH * 0.09, width: bezel / 2 + 1, left: -bezel / 4 }]} />
        <View style={[styles.buttonRight, { top: scaledH * 0.25, height: scaledH * 0.12, width: bezel / 2 + 1, right: -bezel / 4 }]} />

        {/* Screen */}
        <View
          style={{
            width: scaledW,
            height: scaledH,
            borderRadius: radius,
            overflow: "hidden",
            backgroundColor: "#05050A",
          }}
        >
          {/* Dynamic Island */}
          <View
            pointerEvents="none"
            style={{
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
            }}
          />
          {children}
        </View>
      </View>

      <Text style={styles.hint}>
        <Ionicons name="information-circle-outline" size={12} color="#A1A4BA" /> Tap apps to explore · Use the back arrow in each app to return home
      </Text>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: "#05050A", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#FFD700" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <PhoneFrame>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#05050A" },
            animation: "fade",
          }}
        />
      </PhoneFrame>
    </>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0414",
  },
  branding: {
    position: "absolute",
    top: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.2)",
  },
  brandText: {
    color: "#FFD700",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  phone: {
    backgroundColor: "#0a0a0f",
    borderWidth: 1.5,
    borderColor: "#2a2a35",
    shadowColor: "#B388FF",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 30,
  },
  buttonLeft: {
    position: "absolute",
    backgroundColor: "#2a2a35",
    borderRadius: 2,
  },
  buttonRight: {
    position: "absolute",
    backgroundColor: "#2a2a35",
    borderRadius: 2,
  },
  hint: {
    position: "absolute",
    bottom: 24,
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 11,
  },
});
