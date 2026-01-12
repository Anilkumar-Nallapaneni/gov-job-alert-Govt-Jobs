import { StateInfo } from '../types/StateInfoTypes';

const stateInfoData: StateInfo[] = [
  {
    id: "IN-DL",
    name: "Delhi",
    capital: "New Delhi",
    largestCity: "New Delhi",
    population: "20.6 million (2021)",
    area: "1,484 km²",
    languages: ["Hindi", "English", "Punjabi", "Urdu"],
    description: "Delhi, India's capital territory, is a massive metropolitan area in the country's north. Delhi is a city with a historic legacy, where ancient and modern India collide. It houses India's government institutions and is an important commercial hub.",
    famousFor: [
      "Red Fort",
      "Qutub Minar",
      "India Gate",
      "Political Capital",
      "Street Food",
      "Historical Architecture"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/1200px-IN-DL.svg.png",
    wikiUrl: "https://en.wikipedia.org/wiki/Delhi"
  },
  {
    id: "IN-MH",
    name: "Maharashtra",
    capital: "Mumbai",
    largestCity: "Mumbai",
    population: "123 million (2021)",
    area: "307,713 km²",
    languages: ["Marathi", "Hindi", "English"],
    description: "Maharashtra is a state in western India with Mumbai as its capital. It's India's second-most populous state and third-largest by area. The state has a rich cultural heritage and is a major economic powerhouse of India.",
    famousFor: [
      "Bollywood",
      "Financial Capital of India",
      "Ajanta & Ellora Caves",
      "Industrial Development",
      "Ganesh Festival",
      "Coastal Beaches"
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/IN-MH.svg/1200px-IN-MH.svg.png",
    wikiUrl: "https://en.wikipedia.org/wiki/Maharashtra"
  }
  // Add more states following the same pattern
];

export default stateInfoData;