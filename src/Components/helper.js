// This function is for capitalizing the first letter of each word in the title
export function capitalizeTitle(title) {
  if (title) {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return "";
  }
}

// This function is for capitalizing only the first letter of the first word in the description along with a period and no whitespace.
export const capitalizeDescription = (desc) => {
  if (typeof desc !== "string" || desc === undefined) {
    console.error("Invalid description:", desc);
    throw new Error("Invalid description: " + desc);
  }

  // Remove existing punctuation at the end
  // This basically looks for one or more occurrences of '.', ',', ';', '!', or '?' at the end of the string
  // and use replace to replace it with an empty string
  const sanitizedDesc = desc.replace(/[.,;!?]+$/, "");

  const words = sanitizedDesc.split(" ");
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const restOfDescription = words.slice(1).join(" ").toLowerCase();

  // Add a period at the end unless there's an exclamation mark or it's an empty string
  const formattedDescription = restOfDescription.endsWith("!")
    ? restOfDescription
    : restOfDescription.length > 0
    ? `${restOfDescription}.`
    : "";

  return `${firstWord} ${formattedDescription}`;
};
