import { Joke, JokeSchema } from "@/constants/schemas";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  SplashScreen.preventAutoHideAsync();

  const [joke, setJoke] = useState<Joke | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJoke() {
      try {
        const res = await fetch(
          "https://official-joke-api.appspot.com/random_joke"
        );
        const data = await res.json();

        if (data.type === "error") {
          throw new Error(data.message);
        } else {
          const parsedData = JokeSchema.parse(data);
          setJoke(parsedData);
        }
      } catch (e) {
        console.log(e);
        setErrorMessage(`Oops... something went wrong fetching your joke.`);
      }
    }

    fetchJoke();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (joke || errorMessage) SplashScreen.hide();
  }, [joke, errorMessage]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {errorMessage && (
        <Text style={[styles.textCard, styles.error]}>{errorMessage}</Text>
      )}
      {joke && (
        <>
          <Text style={styles.textCard}>{joke.setup}</Text>
          <Text style={styles.textCard}>{joke.punchline}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    margin: 20,
  },
  textCard: {
    width: "100%",
    fontSize: 18,
    fontWeight: "500",
    backgroundColor: "#ffffff",
    padding: 20,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 15,
    boxShadow: "6px 6px 2px 1px #7EBDC2",
  },
  error: {
    boxShadow: "6px 6px 2px 1px #BB4430",
  },
});
