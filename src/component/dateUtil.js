// dateUtils.js
export const formatDate = (dateString) => {
    if (!/^\d{8}$/.test(dateString)) {
      return dateString;
    }
  
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const year = dateString.substring(0, 4);
    const monthIndex = parseInt(dateString.substring(4, 6), 10) - 1;
    const day = dateString.substring(6, 8);
  
    const monthAbbreviation = months[monthIndex];
  
    const formattedDate = `${day} ${monthAbbreviation} ${year}`;
  
    return formattedDate;
  };

  

  export const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  
  