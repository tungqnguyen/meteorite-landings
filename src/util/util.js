const util = {
  //check if user input is year or recclass
   isYear(input) {
    try {
      const date = Date.parse(input);
      if(isNaN(date)) throw new Error();
      return true;
    } catch (error) {
      return false;
    }
  },
  //extract geoJSON Points and remove any undefined data since some meteorites don't have geolocation property
  extractGeoJSON(data) {
    let result = data;
    result = data.map(el => {
      return el.geolocation;
    }).filter(el => el !== undefined && el !== null)
    return result;
  }
}

export default util;
