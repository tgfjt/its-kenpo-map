const extend = require('extend');

module.exports = (state, emitter) => {
  state.search = extend(
    {
      center: { lat: 35.646683, lng: 139.701795 },
      filters: [
        {
          value: 0,
          checked: false,
          label: '基本健診'
        },
        {
          value: 1,
          checked: false,
          label: '健保指定ドック'
        },
        {
          value: 2,
          checked: false,
          label: '1日人間ドック'
        },
        {
          value: 3,
          checked: false,
          label: '2日人間ドック'
        },
        {
          value: 4,
          checked: false,
          label: '脳ドック'
        },
        {
          value: 5,
          checked: false,
          label: '大腸内視鏡検査'
        },
        {
          value: 6,
          checked: false,
          label: '健診車'
        },
        {
          value: 7,
          checked: false,
          label: '特定保健指導'
        }
      ],
      zoom: 14,
      markers: [],
      markersLength: 0,
      map: null
    },
    state.search
  );

  emitter.on('changeFilter', params => {
    state.search.filters.find(f => f.value === params.value).checked =
      params.checked;

    if (
      state.search.filters.every(f => f.checked) ||
      state.search.filters.every(f => !f.checked)
    ) {
      state.search.markersLength = state.search.markers.length;
      emitter.emit('render')
      return state.search.markers.forEach((marker, i) =>
        marker.setVisible(true)
      );
    }
    state.search.markers.forEach((marker, i) => marker.setVisible(false));
    const values = state.search.filters
      .filter(f => f.checked)
      .map(f => f.value);

    const result = state.search.markers
      .filter((marker, i) => {
        return values.every(value => state.search.list[i].screening[value]);
      })
    state.search.markersLength = result.length;
    result.forEach(marker => marker.setVisible(true));
    emitter.emit('render')
  });

  emitter.on('DOMContentLoaded', () => {
    state.search.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: state.search.center.lat,
        lng: state.search.center.lng
      },
      zoom: state.search.zoom
    });

    new google.maps.Marker({
      position: new google.maps.LatLng(
        state.search.center.lat,
        state.search.center.lng
      ),
      map: state.search.map,
      animation: google.maps.Animation.DROP,
      icon: {
        url:
          'https://img.cowcamo.jp/assets/cowcamo/ico-camopin-6ece977997eeb5956e15d862f8c3aabc222ae65efb4e85e4e51c8a60a687556d.png',
        scaledSize: new google.maps.Size(41, 62)
      }
    });

    fetch('./data/list.json').then(res => res.json()).then(list => {
      state.search.list = list;
      state.search.markersLength = list.length;
      emitter.emit('render');
      state.search.markers = list.map(l => {
        const infowindow = new google.maps.InfoWindow({
          content: `<a href="${l.url}" target="_blank">${l.name}</a>`
        });
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(l.latlng.lat, l.latlng.lng),
          map: state.search.map
        });

        marker.addListener('click', () => {
          infowindow.open(state.search.map, marker);
        });
        return marker;
      });
    });
  });

  return state;
};
