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

// This function is for capitalizing only the first letter of the first word in the description
export function capitalizeDescription(desc) {
  if (!desc) {
    return "";
  }
  // Remove existing punctuation at the end
  // This basically looks for one or more occurences of '.', ',', ';', '!', or '?' at the end of the string
  // and use replace to replace it with an empty string to make it more human readable.
  const sanitizedDesc = desc.replace(/[.,;!?]+$/, "");

  const words = sanitizedDesc.split(" ");
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const restOfDescription = words.slice(1).join(" ").toLowerCase();

  // Add a period at the end unless there's an exclamation mark
  const formattedDescription = restOfDescription.endsWith("!")
    ? restOfDescription
    : `${restOfDescription}.`;

  return `${firstWord} ${formattedDescription}`;
}
