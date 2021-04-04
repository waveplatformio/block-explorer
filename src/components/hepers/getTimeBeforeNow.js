const getTimeAfterDate = (date) => {
  const now = new Date();
  let time = Math.abs(now.getTime() - date);
  // calculate (and subtract) whole days
  var days = Math.floor(time / 86400);
  time -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(time / 3600) % 24;
  time -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(time / 60) % 60;
  time -= minutes * 60;

  // what's left is seconds
  var seconds = time % 60; // in theory the modulus is not required
  // console.log(seconds, "s", minutes, "m", hours, "h", days, "d");
  if (days) {
    return days + " days ago";
  }
  if (hours) {
    return hours + " hours ago";
  }
  if (minutes) {
    return minutes + " mins ago";
  }
  if (seconds) {
    return seconds + " sec ago";
  }
};

export default getTimeAfterDate;
