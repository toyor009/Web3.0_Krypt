export const logError = (error, message = "error") => {
  console.log(`>>>${message}<<<`, error);
};

export const shortenAddress = (address) =>
  `${address.slice(0, 5)}....${address.slice(address.length - 4)}`;

export const fetchGif = async (keyword) => {
  try {
    const API_KEY = import.meta.env.VITE_GIPHY_API;
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
        .split(" ")
        .join("")}&limit=1`
    );

    const { data } = await response.json();

    return (
      data[0]?.images?.downsized_medium?.url ||
      "https://viralchop.com/wp-content/uploads/2018/03/ethereum-smart-contract-technology.gif"
    );
  } catch (error) {
    logError("error fetching gif", error);
    return "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
  }
};
