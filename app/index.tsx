import TextCard from "@/components/TextCard";
import { Joke, JokeListSchema } from "@/constants/schemas";
import { Ionicons } from "@expo/vector-icons";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  SplashScreen.preventAutoHideAsync();

  const insets = useSafeAreaInsets();
  const [jokes, setJokes] = useState<Joke[] | null>(null);
  const [currentJokeIndex, setCurrentJokeIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJoke() {
      try {
        const res = await fetch(
          "https://official-joke-api.appspot.com/jokes/general/ten"
        );
        const data = await res.json();

        if (data.type === "error") {
          throw new Error(data.message);
        } else {
          const parsedData = JokeListSchema.parse(data);
          setJokes(parsedData);
        }
      } catch (e) {
        console.log(e);
        setErrorMessage(`Oops... something went wrong fetching your joke.`);
      }
    }

    fetchJoke();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (jokes || errorMessage) SplashScreen.hide();
  }, [jokes, errorMessage]);

  const handleNext = useCallback(() => {
    if (jokes && currentJokeIndex < jokes?.length - 1)
      setCurrentJokeIndex((prevInd) => prevInd + 1);
  }, [currentJokeIndex, jokes]);

  const JokeCard = useCallback(({ joke }: { joke: Joke }) => {
    return (
      <>
        <TextCard text={joke.setup} />
        <TextCard text={joke.punchline} animatedTimeout={4000} />
      </>
    );
  }, []);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {errorMessage && <TextCard text={errorMessage} type="error" />}
      {jokes && <JokeCard joke={jokes[currentJokeIndex]} />}
      <TouchableOpacity
        hitSlop={20}
        style={{
          position: "absolute",
          bottom: insets.bottom,
          right: insets.right,
        }}
      >
        <Ionicons
          name="arrow-forward-circle"
          size={40}
          color="#FFA737"
          onPress={handleNext}
        />
      </TouchableOpacity>
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
});
