export default function Strings(param, index) {
  const data = {
    "1X2": ["Home Win", "Draw", "Away Win"],
    "Double Chance Halftime": [
      "Home Win / Draw",
      "Home / Away",
      "Draw / Away Win",
    ],
    "Double Chance": ["Home Win / Draw", "Home / Away", "Draw / Away Win"],
    "Asian Handicap": ["Home - 1", "Away - 1"],
    "Under/Over": ["Under 2.5", "Over 2.5"],
    "Both Teams To Score": ["Yes", "No"],
    "Both Teams To Score 1st Half": ["Yes", "No"],
  };

  return data[param][index];
}
