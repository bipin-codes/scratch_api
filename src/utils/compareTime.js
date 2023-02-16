const compareTime = (time1, time2) => {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);
  if (hours1 < hours2) {
    return -1;
  } else if (hours1 > hours2) {
    return 1;
  }

  if (minutes1 < minutes2) {
    return -1;
  } else if (minutes1 > minutes2) {
    return 1;
  }

  return 0;
};

module.exports = { compareTime };
