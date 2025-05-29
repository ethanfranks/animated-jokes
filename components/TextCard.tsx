import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function TextCard({
  text,
  animatedTimeout = 1000,
  type,
}: {
  text: string;
  animatedTimeout?: number;
  type?: "error";
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const opacity = useSharedValue(0);

  const handleReveal = useCallback(() => {
    opacity.value = withSpring(1);
    setIsRevealed(true);
  }, [opacity]);

  useEffect(() => {
    if (!isRevealed) setTimeout(handleReveal, animatedTimeout);
  }, [animatedTimeout, handleReveal, isRevealed]);

  return (
    <Animated.View
      style={[styles.container, type === "error" && styles.error, { opacity }]}
      onTouchEnd={handleReveal}
    >
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 15,
    boxShadow: "6px 6px 2px 1px #7EBDC2",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  error: {
    boxShadow: "6px 6px 2px 1px #BB4430",
  },
});
