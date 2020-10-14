export const convertDataToChartsJsFormat = (
  data,
  labels,
  primaryKey,
  secondaryKeys
) => {
  const transformed = [];

  secondaryKeys.forEach((key) => {
    let seriesLabel = labels[key];
    let seriesValues = [];

    data.forEach((obj) => {
      seriesValues.push(obj[key]);
    });

    transformed.push({ label: seriesLabel, data: seriesValues });
  });
  return transformed;
};

export const filterArrayOfObjects = (
  arr,
  filterStart = null,
  filterEnd = null
) => {
  return arr.filter((obj) => {
    if (filterStart && filterEnd) {
      return obj.date >= filterStart && obj.date <= filterEnd;
    } else if (filterStart) {
      return obj.date >= filterStart;
    } else if (filterEnd) {
      return obj.date <= filterEnd;
    } else {
      return obj;
    }
  });
};

export const filterDatasets = (
  arr,
  includeCases,
  includeDeaths,
  includeRecovered
) => {
  const temp = [];
  arr.forEach((obj) => {
    const updatedObj = {
      ...(includeCases === true && { cases: obj.cases }),
      ...(includeDeaths === true && { deaths: obj.deaths }),
      ...(includeRecovered === true && { recovered: obj.recovered }),
      date: obj.date,
    };
    temp.push(updatedObj);
  });
  return temp;
};

export const formatChartLabels = (data, key) => {
  let arr = [];
  data.forEach((obj) => {
    arr.push(new Date(obj[key]));
  });
  return arr;
};
