import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_W = width - 32;

const PUCK_AVATAR =
  "https://images.unsplash.com/photo-1745957014356-a1e867ea303b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZWxmJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc4NTE3MjUxfDA&ixlib=rb-4.1.0&q=85";

type Profile = {
  id: string;
  name: string;
  tag: string;
  age: string;
  location: string;
  image: string;
  bio: string;
  interests: string[];
  looking: string;
  matchPercent: number;
  matchLabel: string;
  redFlag?: string;
};

const PUCK: Profile = {
  id: "puck",
  name: "Robin Goodfellow",
  tag: "Puck",
  age: "Ageless",
  location: "Athenian Wood · 0.5 mi away",
  image: PUCK_AVATAR,
  bio:
    "Hobgoblin by trade, professional chaos-coordinator by passion. I work at night for King Oberon. My job includes running errands, making love potions, and exchanging heads (don't ask about that). " +
    "Swipe right if you can enjoy a good joke, handle being in a forest at night, and think that a human with a donkey's head is interesting. " +
    "\"I'll go around the whole world in just forty minutes to get you breakfast.\" Mortals tolerated; fairies preferred.",
  interests: ["Shape-shifting", "Practical Jokes", "Love Potions", "Moonlit Flights", "Mischief", "Iambic Pentameter"],
  looking: "Someone who can keep up. Short-term enchantments okay.",
  matchPercent: 99,
  matchLabel: "Cosmic Match",
};

const MATCHES: Profile[] = [
  {
    id: "titania",
    name: "Titania",
    tag: "Fairy Queen",
    age: "Eternal",
    location: "A bank where the wild thyme blows",
    image:
      "https://images.pexels.com/photos/7244094/pexels-photo-7244094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    bio:
      "Queen of the Fairies. Devoted to my Indian boy. Currently unfriendly with my husband (it's complicated). " +
      "I once slept next to a donkey — I'd prefer not to discuss it.",
    interests: ["Botany", "Diadems", "Royalty", "Lullabies"],
    looking: "Drama. Allegedly.",
    matchPercent: 97,
    matchLabel: "Royally Compatible",
    redFlag: "Married. To your boss.",
  },
  {
    id: "helena",
    name: "Helena",
    tag: "Mortal of Athens",
    age: "22",
    location: "Athens · just outside the wood",
    image:
      "https://images.unsplash.com/photo-1738276569587-f77e2cf58940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxmYW50YXN5JTIwZWxmJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc4NTE3MjUxfDA&ixlib=rb-4.1.0&q=85",
    bio:
      "Tall, hopeless romantic, chasing a man who keeps telling me to leave him alone. " +
      "Recently the unexpected target of TWO people at once (your fault, I'm told). " +
      "You owe me a massive apology, an explanation for this disaster, and probably a very large drink.",
    interests: ["Devotion", "Long Walks", "Friendship Drama", "Self-Deprecation"],
    looking: "Demetrius. Literally just Demetrius.",
    matchPercent: 14,
    matchLabel: "Chaotic Pairing",
    redFlag: "Mortal. Also: you cursed her, remember?",
  },
];

export default function Dating() {
  const router = useRouter();
  const [view, setView] = useState<"profile" | "matches">("profile");

  return (
    <View style={styles.container} testID="dating-screen">
      <LinearGradient
        colors={["#1A0810", "#05050A"]}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} testID="dating-back" style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#F4F4F6" />
          </TouchableOpacity>
          <View style={styles.brandWrap}>
            <Ionicons name="flame" size={18} color="#FFC107" />
            <Text style={styles.brand}>Spark</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options" size={20} color="#F4F4F6" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, view === "profile" && styles.tabActive]}
            onPress={() => setView("profile")}
            testID="tab-profile"
          >
            <Text style={[styles.tabText, view === "profile" && styles.tabTextActive]}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, view === "matches" && styles.tabActive]}
            onPress={() => setView("matches")}
            testID="tab-matches"
          >
            <Text style={[styles.tabText, view === "matches" && styles.tabTextActive]}>
              Matches ({MATCHES.length})
            </Text>
          </TouchableOpacity>
        </View>

        {view === "profile" ? <ProfileCard profile={PUCK} isMe /> : <MatchesView />}
      </SafeAreaView>
    </View>
  );
}

function ProfileCard({ profile, isMe }: { profile: Profile; isMe?: boolean }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.cardWrap}>
        <Image source={{ uri: profile.image }} style={styles.cardImg} />
        <LinearGradient
          colors={["transparent", "rgba(5,5,10,0.3)", "rgba(5,5,10,0.95)"]}
          style={styles.cardGradient}
        />
        {/* Match badge */}
        <View style={styles.matchBadge}>
          <LinearGradient
            colors={["#FFC107", "#FF5252"]}
            style={styles.matchBadgeInner}
          >
            <MaterialCommunityIcons name="auto-fix" size={12} color="#fff" />
            <Text style={styles.matchBadgeText}>{profile.matchPercent}% {profile.matchLabel}</Text>
          </LinearGradient>
        </View>

        {/* Bottom info overlay */}
        <View style={styles.cardInfo}>
          <BlurView intensity={40} tint="dark" style={styles.cardInfoBlur}>
            <View style={styles.nameRow}>
              <Text style={styles.cardName}>{profile.name}</Text>
              <Text style={styles.cardAge}>· {profile.age}</Text>
              <View style={styles.verified}>
                <Ionicons name="checkmark-circle" size={16} color="#00E676" />
              </View>
            </View>
            <Text style={styles.cardTag}>{profile.tag}</Text>
            <View style={styles.locRow}>
              <Ionicons name="location-outline" size={13} color="#A1A4BA" />
              <Text style={styles.locText}>{profile.location}</Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Bio section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>About</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Interests</Text>
        <View style={styles.chipRow}>
          {profile.interests.map((i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>{i}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Looking for */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Looking For</Text>
        <View style={styles.lookingBox}>
          <MaterialCommunityIcons name="heart-pulse" size={18} color="#FF4081" />
          <Text style={styles.lookingText}>{profile.looking}</Text>
        </View>
      </View>

      {profile.redFlag && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Red Flag</Text>
          <View style={styles.flagBox}>
            <Ionicons name="warning" size={16} color="#FFC107" />
            <Text style={styles.flagText}>{profile.redFlag}</Text>
          </View>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.actionPass]} testID="action-pass">
          <Ionicons name="close" size={28} color="#FF5252" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionStar]} testID="action-super">
          <FontAwesome5 name="star" size={20} color="#00B0FF" solid />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionLike]} testID="action-like">
          <Ionicons name="heart" size={28} color="#00E676" />
        </TouchableOpacity>
      </View>

      {isMe && (
        <Text style={styles.footerNote}>
          {"Profile is live · "}
          <Text style={{ color: "#FFD700" }}>{"4,201"}</Text>
          {" fairies viewed this week"}
        </Text>
      )}
    </ScrollView>
  );
}

function MatchesView() {
  const [active, setActive] = useState(0);
  const m = MATCHES[active];
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.matchTabs}>
        {MATCHES.map((mm, i) => (
          <TouchableOpacity
            key={mm.id}
            onPress={() => setActive(i)}
            style={[styles.matchTab, active === i && styles.matchTabActive]}
            testID={`match-tab-${mm.id}`}
          >
            <Image source={{ uri: mm.image }} style={styles.matchTabImg} />
            <Text style={[styles.matchTabText, active === i && { color: "#FFD700" }]}>{mm.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ProfileCard profile={m} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05050A" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  brandWrap: { flexDirection: "row", alignItems: "center", gap: 4 },
  brand: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 4,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
  },
  tabActive: { backgroundColor: "rgba(255,193,7,0.15)", borderWidth: 1, borderColor: "#FFC107" },
  tabText: {
    color: "#A1A4BA",
    fontFamily: "Outfit_500Medium",
    fontSize: 13,
  },
  tabTextActive: { color: "#FFD700" },
  cardWrap: {
    width: CARD_W,
    height: CARD_W * 1.25,
    alignSelf: "center",
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#151726",
    marginTop: 8,
  },
  cardImg: { width: "100%", height: "100%" },
  cardGradient: { ...StyleSheet.absoluteFillObject as object },
  matchBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 999,
    overflow: "hidden",
  },
  matchBadgeInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  matchBadgeText: {
    color: "#fff",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 11,
  },
  cardInfo: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardInfoBlur: {
    padding: 14,
    backgroundColor: "rgba(5,5,10,0.4)",
  },
  nameRow: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
  cardName: {
    color: "#F4F4F6",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 26,
  },
  cardAge: {
    color: "#F4F4F6",
    fontFamily: "Outfit_400Regular",
    fontSize: 20,
    marginBottom: 3,
  },
  verified: { marginLeft: "auto", marginBottom: 4 },
  cardTag: {
    color: "#FFD700",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginTop: 2,
  },
  locRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  locText: {
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 12,
  },
  section: { paddingHorizontal: 20, marginTop: 22 },
  sectionLabel: {
    color: "#FFD700",
    fontFamily: "Outfit_600SemiBold",
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  bio: {
    color: "#F4F4F6",
    fontFamily: "Outfit_400Regular",
    fontSize: 14.5,
    lineHeight: 22,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(179,136,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(179,136,255,0.3)",
  },
  chipText: {
    color: "#B388FF",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
  },
  lookingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,64,129,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,64,129,0.25)",
  },
  lookingText: {
    color: "#F4F4F6",
    fontFamily: "Outfit_500Medium",
    fontSize: 14,
    flex: 1,
  },
  flagBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,193,7,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,193,7,0.25)",
  },
  flagText: {
    color: "#FFC107",
    fontFamily: "Outfit_500Medium",
    fontSize: 13,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 28,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1.5,
  },
  actionPass: { borderColor: "rgba(255,82,82,0.5)" },
  actionStar: { width: 48, height: 48, borderRadius: 24, borderColor: "rgba(0,176,255,0.5)" },
  actionLike: { borderColor: "rgba(0,230,118,0.5)" },
  footerNote: {
    textAlign: "center",
    color: "#A1A4BA",
    fontFamily: "Outfit_400Regular",
    fontSize: 12,
    marginTop: 20,
  },
  matchTabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 6,
  },
  matchTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  matchTabActive: {
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  matchTabImg: { width: 26, height: 26, borderRadius: 13 },
  matchTabText: {
    color: "#A1A4BA",
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
  },
});
