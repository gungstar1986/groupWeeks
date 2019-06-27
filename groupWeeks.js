groupWeeks([
  { date: "2019-04-24", count: 5 },
  { date: "2019-04-23", count: 5 },
  { date: "2019-04-18", count: 11 },
  { date: "2019-04-08", count: 10 },
  { date: "2019-05-02", count: 1 },
  { date: "2019-05-08", count: 1 },
  { date: "2019-04-01", count: 3 },
  { date: "2019-04-10", count: 23 },
  { date: "2019-04-19", count: 10 },
  { date: "2019-04-07", count: 3 },
  { date: "2019-05-12", count: 3 },
  { date: "2019-04-22", count: 5 },
  { date: "2019-04-04", count: 2 },
  { date: "2019-05-08", count: 1 }
]);


function groupWeeks(data) {
  // Sort Array
  const dataArr = data.sort(
    (a, b) =>
      Number(a.date.replace(/-/g, "")) - Number(b.date.replace(/-/g, ""))
  );

  // Search first Monday
  const monday = value => {
    for (let i = 0; i < 7; i++) {
      const date = new Date(value.date);
      date.setDate(date.getDate() - i);
      let mon = date;
      if (mon.toString().includes("Mon")) {
        const year = mon.getFullYear().toString();
        const month = mon.getMonth().toString().length === 1 ? 0 + (mon.getMonth() + 1).toString() : (mon.getMonth() + 1).toString();
        const newDate = mon.getDate().toString().length === 1 ? 0 + mon.getDate().toString() : mon.getDate().toString(); 
        return `${year}-${month}-${newDate}`;    
      }
    }
  };

  // Search in accumulator
  let searchIndex;
  const search = (value, monday) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i].weekStart === monday) {
        searchIndex = i;
        return true;
      }
    }
  };

  // Rebuild DATA Array
  const dateArray = dataArr.reduce((acc, curr) => {
    if (new Date(curr.date).getDay() === 1) {
      acc.push({
        weekStart: curr.date,
        count: curr.count,
        index: 1
      });
    } else {
      if (acc.length === 0)
        acc.push({
          weekStart: monday(curr),
          count: curr.count,
          index: 1
        });
      else {
        if (search(acc, monday(curr))) {
          acc[searchIndex].count = acc[searchIndex].count + curr.count;
          acc[searchIndex].index = acc[searchIndex].index + 1;
        } else {
          acc.push({
            weekStart: monday(curr),
            count: curr.count,
            index: 1
          });
        }
      }
    }
    return acc;
  }, []);

  // Rebiuld DATA array via "Count"
  const weekGroup = dateArray.map(a => {
    if (a.count !== 0)
      return {
        weekStart: a.weekStart,
        count: (Math.round((a.count / a.index) * 100) / 100).toFixed(2)
      };
  });

  // console.log(weekGroup)
  return weekGroup
}

// const expectedOutput = [
//     { weekStart: '2019-04-01', count: '2.67' },
//     { weekStart: '2019-04-08', count: '16.50' },
//     { weekStart: '2019-04-15', count: '10.50' },
//     { weekStart: '2019-04-22', count: '5.00' },
//     { weekStart: '2019-04-29', count: '1.00' },
//     { weekStart: '2019-05-06', count: '1.67' },
//   ];
