function convertToTitleCase(inputString: string): string {
    return inputString
      .toLowerCase() // Convert the whole string to lowercase
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase()); // Capitalize the first letter of each word
  }


  export default convertToTitleCase;