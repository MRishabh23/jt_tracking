
function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
  
    // Options for formatting
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
  
    // Format the date
    const formattedDate: string = date.toLocaleDateString('en-GB', options);
  
    return formattedDate;
  }

export default formatDate;