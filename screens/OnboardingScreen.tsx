import { View, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = ({ onComplete }) => {
  const navigation = useNavigation();

  const handleDone = () => {
    onComplete();
    navigation.replace("Main"); // Ensure "Main" is a defined route
  };

  const handleSkip = () => {
    onComplete();
    navigation.replace("Main"); // Ensure "Main" is a defined route
  };

  return (
    <Onboarding
      onSkip={handleSkip}
      onDone={handleDone}
      pages={[
        {
          title: "Welcome",
          subtitle: "Get started with our app",
          backgroundColor: "#fff",
          image: (
            <View>
              <Image
                source={require("../assets/images/on1.jpg")}
                style={{ width: 72, height: 72, resizeMode: "contain" }}
              />
            </View>
          ),
        },
        {
          title: "Home",
          subtitle: "Get started with our app",
          backgroundColor: "#fff",
          image: (
            <View>
              <Image
                source={require("../assets/images/on2.jpg")}
                style={{ width: 72, height: 72, resizeMode: "contain" }}
              />
            </View>
          ),
        },
        {
          title: "Start",
          subtitle: "Get started with our app",
          backgroundColor: "#fff",
          image: (
            <View>
              <Image
                source={require("../assets/images/on3.jpg")}
                style={{ width: 72, height: 72, resizeMode: "contain" }}
              />
            </View>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
