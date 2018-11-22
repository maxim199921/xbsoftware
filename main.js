"use strict";

class Map {
    constructor(data) {
        this.data = data;
    }

    getCountryDirection(x) {
        switch (x) {
            case 'n':
                return this.data.reduce((previousValue, currentItem) => { // север(n)
                    return previousValue.latitude > currentItem.latitude ? previousValue : currentItem;
                }).name;
            case 's':
                return this.data.reduce((previousValue, currentItem) => { // юг(s)
                    return previousValue.latitude < currentItem.latitude ? previousValue : currentItem;
                }).name;
            case 'w':
                return this.data.reduce((previousValue, currentItem) => { //запад(w)
                    return previousValue.longitude > currentItem.longitude ? previousValue : currentItem;
                }).name;
            case 'e':
                return this.data.reduce((previousValue, currentItem) => { //восток(e)
                    return previousValue.longitude < currentItem.longitude ? previousValue : currentItem
                }).name;
            default:
                console.log(`error`);
        }
    }

    getClosestCountry(latitude, longitude) {
        let index = 0;
        let i = 0;
        let absoluteSum = 1000;
        do {
            let currentAbsoluteSum = Math.abs(+this.data[i].latitude - latitude) + Math.abs(+this.data[i].longitude - longitude);
            if (absoluteSum > currentAbsoluteSum) {
                index = i;
                absoluteSum = currentAbsoluteSum;
            }
            i++;

        } while (i < this.data.length);

        return this.data[index].name;
    }

    getAllCity() {
        let arr = [];
        for (let i = 0; i < this.data.length; i++) {
            arr.push(this.data[i].name.replace(/(\D*?), /g, ''))
        }
        let uniqueArray = arr.filter((item, pos) => {
            return arr.indexOf(item) === pos;
        });
        this.allnameCity = uniqueArray.join(' ');
        return this.allnameCity;
    }
}

let data = [
    {name: 'Nashville, TN', latitude: 36.17, longitude: -86.78},
    {name: 'New York, NY', latitude: 40.71, longitude: -74.00},
    {name: 'Atlanta, GA', latitude: 33.75, longitude: -84.39},
    {name: 'Denver, CO', latitude: 39.74, longitude: -104.98},
    {name: 'Seattle, WA', latitude: 47.61, longitude: -122.33},
    {name: 'Los Angeles, CA', latitude: 34.05, longitude: -118.24},
    {name: 'Memphis, TN', latitude: 35.15, longitude: -90.05}
];

const map = new Map(data);

document.getElementById('n').addEventListener('click', (evt) => {
    alert(map.getCountryDirection('n'));
});
document.getElementById('s').addEventListener('click', (evt) => {
    alert(map.getCountryDirection('s'));
});
document.getElementById('w').addEventListener('click', (evt) => {
    alert(map.getCountryDirection('w'));
});
document.getElementById('e').addEventListener('click', (evt) => {
    alert(map.getCountryDirection('e'));
});
document.getElementById('postForm').addEventListener('click', (evt) => {
    evt.preventDefault();
    let latitude = document.getElementById('latitude');
    let longitude = document.getElementById('longitude');
    if (!latitude.value || !longitude.value) {
        alert('введите долготу и широту')
    } else {
        alert(map.getClosestCountry(latitude.value, longitude.value));
    }
});
document.getElementById('allCity').addEventListener('click', (evt) => {
    alert(map.getAllCity());
});

