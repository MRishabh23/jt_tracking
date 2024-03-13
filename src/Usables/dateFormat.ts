function getDayWithSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatDate(inputDate: string): string {
  // Create a Date object from the input date string
  if (inputDate !== "") {
    if (!inputDate.includes(" ")) {
      inputDate = inputDate.slice(0, 10) + " " + inputDate.slice(10);
    }

    const date = new Date(inputDate);

    // Extract day, month, and year
    const day = date.getDate();
    const year = date.getFullYear();

    // Options for formatting
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    // Format the time part using the specified options and locale 'en-GB'
    const timePart: string = date.toLocaleTimeString("en-GB", options);

    // Format the date part with a suffix for the day
    const formattedDate: string = `${getDayWithSuffix(
      day
    )} ${new Intl.DateTimeFormat("en-GB", { month: "short" }).format(
      date
    )} ${year}, ${timePart}`;

    // Return the formatted date string
    return formattedDate;
  } else return "";
}

export default formatDate;
