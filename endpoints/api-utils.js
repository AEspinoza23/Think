import utils from '~/endpoints/queryHelper';
const mapBaseUrl = 'https://nominatim.openstreetmap.org';
export default {
  places: {
    search: (filter) =>
      `${mapBaseUrl}/search${utils.buildQueryString({
        ...filter,
        polygon_geojson: 1,
        format: 'jsonv2'
      })}`
  }
};
