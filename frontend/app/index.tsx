import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// On wide web (phone frame mode), clamp width to phone width so icons size correctly
function usePhoneWidth() {
  const { width } = useWindowDimensions();
  if (Platform.OS === "web" && width >= 700) return 390;
  return width;
}

const WALLPAPER =
  "https://images.unsplash.com/photo-1763667109206-8c221106a682?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZW5jaGFudGVkJTIwZm9yZXN0JTIwbW9vbnxlbnwwfHx8fDE3Nzg1MTcyNDR8MA&ixlib=rb-4.1.0&q=85";

type AppDef = {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: [string, string];
  route?: string;
};

const APPS: AppDef[] = [
  {
    id: "spotify",
    label: "Spotify",
    icon: <Ionicons name="musical-notes" size={32} color="#fff" />,
    gradient: ["#3949AB", "#B388FF"],
    route: "/spotify",
  },
  {
    id: "spark",
    label: "Spark",
    icon: <Ionicons name="flame" size={32} color="#fff" />,
    gradient: ["#FF5252", "#FF4081"],
    route: "/dating",
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Ionicons name="chatbubble" size={30} color="#fff" />,
    gradient: ["#00E676", "#00B0FF"],
    route: "/messages",
  },
  {
    id: "notes",
    label: "Mischief",
    icon: <MaterialCommunityIcons name="notebook" size={30} color="#fff" />,
    gradient: ["#FFC107", "#FFA000"],
    route: "/notes",
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Ionicons name="camera" size={30} color="#fff" />,
    gradient: ["#151726", "#3949AB"],
    route: "/camera",
  },
  {
    id: "weather",
    label: "Weather",
    icon: <MaterialCommunityIcons name="weather-night" size={32} color="#fff" />,
    gradient: ["#1A1226", "#3949AB"],
    route: "/weather",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: <Ionicons name="calendar" size={30} color="#fff" />,
    gradient: ["#FF5252", "#FFC107"],
    route: "/calendar",
  },
  {
    id: "potions",
    label: "Potions",
    icon: <MaterialCommunityIcons name="flask" size={32} color="#fff" />,
    gradient: ["#B388FF", "#FF4081"],
    route: "/potions",
  },
];

const DOCK_APPS: AppDef[] = [
  {
    id: "dock-phone",
    label: "Phone",
    icon: <Ionicons name="call" size={28} color="#fff" />,
    gradient: ["#00E676", "#00B0FF"],
    route: "/phone",
  },
  {
    id: "dock-spark",
    label: "Spark",
    icon: <Ionicons name="flame" size={28} color="#fff" />,
    gradient: ["#FF5252", "#FF4081"],
    route: "/dating",
  },
  {
    id: "dock-spotify",
    label: "Spotify",
    icon: <Ionicons name="musical-notes" size={28} color="#fff" />,
    gradient: ["#3949AB", "#B388FF"],
    route: "/spotify",
  },
  {
    id: "dock-safari",
    label: "Compass",
    icon: <FontAwesome5 name="compass" size={26} color="#fff" />,
    gradient: ["#FFC107", "#FF5252"],
    route: "/compass",
  },
];

function AppIcon({ app, size }: { app: AppDef; size: number }) {
  const router = useRouter();
  const onPress = () => {
    if (app.route) router.push(app.route as any);
  };
  return (
    <TouchableOpacity
      style={[styles.appWrap, { width: size }]}
      onPress={onPress}
      activeOpacity={0.7}
      testID={`app-icon-${app.id}`}
    >
      <LinearGradient
        colors={app.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.appIcon,
          { width: size, height: size, borderRadius: size * 0.26 },
        ]}
      >
        {app.icon}
      </LinearGradient>
      <Text style={styles.appLabel} numberOfLines={1}>
        {app.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function Home() {
  const router = useRouter();
  const [now, setNow] = useState(new Date());
  const phoneW = usePhoneWidth();
  const iconSize = (phoneW - 96) / 4;
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <View style={styles.container} testID="home-screen">
      <ImageBackground source={{ uri: WALLPAPER }} style={StyleSheet.absoluteFillObject} resizeMode="cover">
        <LinearGradient
          colors={["rgba(5,5,10,0.35)", "rgba(5,5,10,0.55)", "rgba(5,5,10,0.85)"]}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Status bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>{time}</Text>
          <View style={styles.statusRight}>
            <Ionicons name="moon" size={14} color="#FFD700" />
            <Ionicons name="wifi" size={15} color="#F4F4F6" />
            <MaterialCommunityIcons name="battery-80" size={18} color="#F4F4F6" />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {/* Big time + date */}
          <View style={styles.timeBlock}>
            <Text style={styles.dateLabel}>Midsummer&apos;s Eve · Athenian Woods</Text>
            <Text style={styles.bigTime}>{time}</Text>
            <View style={styles.moonRow}>
              <MaterialCommunityIcons name="moon-waning-crescent" size={16} color="#FFD700" />
              <Text style={styles.moonText}>Full Moon · Fairies astir</Text>
            </View>
          </View>

          {/* Quote widget */}
          <View style={styles.widgetWrap} testID="quote-widget">
            <BlurView intensity={50} tint="dark" style={styles.widget}>
              <View style={styles.widgetHeader}>
                <MaterialCommunityIcons name="auto-fix" size={14} color="#FFD700" />
                <Text style={styles.widgetLabel}>Quote of the Night</Text>
              </View>
              <Text style={styles.widgetQuote}>
                &ldquo;Lord, what fools these mortals be!&rdquo;
              </Text>
              <Text style={styles.widgetAuthor}>— Robin Goodfellow</Text>
            </BlurView>
          </View>

          {/* App grid */}
          <View style={styles.grid}>
            {APPS.map((app) => (
              <AppIcon key={app.id} app={app} size={iconSize} />
            ))}
          </View>

          <View style={{ flex: 1 }} />

          {/* Dock */}
          <View style={styles.dockWrap}>
            <BlurView intensity={80} tint="dark" style={styles.dock} testID="dock">
              {DOCK_APPS.map((app) => (
                <View key={app.id} style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => app.route && router.push(app.route as any)}
                    activeOpacity={0.7}
                    testID={`dock-${app.id}`}
                  >
                    <LinearGradient
                      colors={app.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.dockIcon}
                    >
                      {app.icon}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </BlurView>
            <View style={styles.homeIndicator} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  statusBar: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    color: "#F4F4F6",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 15,
  },
  statusRight: { flexDirection: "row", gap: 6, alignItems: "center" },
  timeBlock: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
  },
  dateLabel: {
    color: "#FFD700",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  bigTime: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 72,
    lineHeight: 80,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  moonRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  moonText: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 13,
  },
  widgetWrap: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 28,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.15)",
  },
  widget: {
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  widgetHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  widgetLabel: {
    color: "#FFD700",
    fontFamily: "Outfit_500Medium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  widgetQuote: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_600SemiBold",
    fontSize: 22,
    lineHeight: 30,
  },
  widgetAuthor: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 13,
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    rowGap: 22,
    justifyContent: "space-between",
  },
  appWrap: { alignItems: "center" },
  appIcon: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  appLabel: {
    color: "#F4F4F6",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
    marginTop: 6,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  dockWrap: { paddingHorizontal: 12, paddingBottom: 6, marginTop: 16 },
  dock: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  dockIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  homeIndicator: {
    width: 120,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignSelf: "center",
    marginTop: 10,
  },
});
