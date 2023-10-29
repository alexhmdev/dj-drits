import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import TextInput from "./components/TextInput";

const inference = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

function App() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [musicURL, setMusicURL] = useState("");
  const [imageURL, setImageURL] = useState("");

  const generateMusicAndCover = async () => {
    try {
      if (!description) return setError("Please enter a description");
      setLoading(true);
      const music = await inference.textToSpeech({
        model: "facebook/musicgen-small",
        inputs: description,
      });
      const cover = await inference.textToImage({
        model: "stabilityai/stable-diffusion-2",
        inputs: `An album cover for: ${description}`,
      });
      setLoading(false);
      const songUrl = URL.createObjectURL(music);
      const coverUrl = URL.createObjectURL(cover);
      setMusicURL(songUrl);
      setImageURL(coverUrl);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong, please try again later");
      console.log(err);
    }
  };

  const handleChageIntput = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-synthwave  text-white">
      <main className="flex max-w-4xl flex-col items-center gap-4 p-4">
        <h1 className="background-animate bg-gradient-to-r from-primary via-indigo-600 to-pink-700 bg-clip-text text-7xl font-extrabold text-transparent shadow-lg md:text-8xl">
          DJ Drits
        </h1>
        <p className="font-semibold shadow-lg">
          I'm DJ Drits, I can generate music and album covers for you.
        </p>
        <TextInput onChange={handleChageIntput} />
        {loading ? (
          <p className="text-2xl">Generating music...</p>
        ) : (
          <button
            onClick={generateMusicAndCover}
            className="rounded-lg bg-gradient-to-r from-primary  via-purple-400  via-30% to-tertiary to-70% px-4 py-2 font-bold transition-all duration-300 ease-in-out hover:scale-110 hover:from-10% hover:via-60% hover:to-90%"
          >
            START MIX
          </button>
        )}
        {imageURL ? <img src={imageURL} alt="cover" className="w-64" /> : null}
        {musicURL ? (
          <audio
            src={musicURL}
            controls
            className="mt-4"
            style={{ width: "300px" }}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
