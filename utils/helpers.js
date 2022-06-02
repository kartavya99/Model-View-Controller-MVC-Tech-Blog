module.exports = {
  format_date: (currentDate) => {
    // Format date as MM/DD/YYYY
    // return `${
    //   new Date().getMonth() + 1
    // }/${new Date().getDate()}/${new Date().getFullYear()}`;

    const currentDates = new Date(currentDate);

    return currentDates.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};
