export const getMondayWeek = function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getPreviousMonday = function getPreviousMonday()
{
    var d = new Date();
    // set to Monday of this week
    d.setDate(d.getDate() - (d.getDay() + 6) % 7);
    // set to previous Monday
    d.setDate(d.getDate() - 7);
    // create new date of day before
    var monday = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return monday
}

export const firstDayInPreviousMonth = function firstDayInPreviousMonth(yourDate) {
  return new Date(yourDate.getFullYear(), yourDate.getMonth() - 1, 1);
}

export const getTotalDateInMonth = function getTotalDateInMonth  () {
  var dt = new Date();
  var month = dt.getMonth();
  var year = dt.getFullYear();
  let daysInMonth = new Date(year, month, 0).getDate();
  return daysInMonth
}

export const getAllStartEndDayInRangeTime = function x (totalDay, firstDateInRange) {
    let i = 0;
    let arrDate = []
    arrDate.push(firstDateInRange) //monday first

    function getNextDay(firstDateInRange) {
      var day = new Date(firstDateInRange);
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      arrDate.push(nextDay)
      i++
      return nextDay;
    }
    function getAllDayInRange(firstDateInRange) {
      while (i < totalDay) {
        getAllDayInRange(getNextDay(firstDateInRange));
      }
    }

    getAllDayInRange(firstDateInRange)

    let arrStartEndAllDay = []
    arrDate.forEach(ele => {
      arrStartEndAllDay.push({
        day : ele.getDate(),
        name : ele.toString().split(' ')[0],
        start : new Date (ele.setHours(0,0,0,0)).toISOString(),
        end : new Date (ele.setHours(23,59,59)).toISOString()
      })
    })
    return arrStartEndAllDay
}