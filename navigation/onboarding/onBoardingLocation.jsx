import React, { useState } from "react";
import GradientBackground from "./gradientBackground";
import { ChatArea, InputField } from "./chatBot";

export default function OnBoardingLocation({ route, navigation }) {
  const [location, setLocation] = useState("");
  const userName = route.params.userName || "(ei nimeä)";

  const chatTexts = [
    { text: `Hauska tutustua ${userName}` },
    { text: "Kertoisitko seuraavaksi miltä alueelta etsit töitä?" }
  ];

  const onContinuePress = () => {
    let data = route.params;
    data.location = location;
    console.log("Tähänastiset tiedot: ", data);
    navigation.navigate("OnBoardingJobType", data);
  };

  return (
    <GradientBackground>
      <ChatArea chatTexts={ chatTexts } />
      <InputField
        placehonder={"Sijainti..."}
        inputFunc={setLocation}
        inputValue={location}
        hasGeolocation={true}
        buttonFunc={() => {
          onContinuePress();
        }}
      />

    </GradientBackground>
  );
}
