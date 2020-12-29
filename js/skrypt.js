document.addEventListener("DOMContentLoaded", function() {


// ---------- CHART ----------
// async function chartIt() {
// const data = await getData();
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: data.xLabels,
//         datasets: [{
//             label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
//             data: data.yTemps,
//             fill: false,
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,

//         }]
//     }
// });
// }
// async function getData() {
//     const xLabels = [];
//     const yTemps = [];
//     const response = await fetch('ZonAnn.Ts+dSST.csv');
//     const text = await response.text();

//     const table = text.split('\n').slice(1);
//     console.log(table);
//     table.forEach(function(row) {
//         const columns = row.split(',');
//         const year = columns[0];
//         xLabels.push(year);
//         console.log(year);
//         const temp = columns[1];
//         yTemps.push(parseFloat(temp)+14);
//     })
//     return {xLabels, yTemps};
// }
// chartIt();

    // button = document.querySelector("button");

    // ---------- NBP API ----------
    // fetch('http://api.nbp.pl/api/exchangerates/rates/a/usd/')
    // .then(res => res.json())
    // .then(data => {
    //     document.querySelector('h1').innerText = `${data.currency} wynosi dziś ${data.rates[0].mid} ${data.code}.`;
    // })
    // function random(a,b) {
    //     return Math.floor(Math.random()*(b-a+1)+a);
    // }

    // ---------- RANDOM COLOR ----------
    // function randomColor() {
    //     const letters = "0123456789abcdef";
    //     let color = "#";
    //     for (i=0; i<6; i++) {
    //         color+= letters[Math.floor(Math.random()*16)];
    //     }
    //     return color;
    // }
    // ---------- RAINBOW.JPG ----------
    // async function getData(url) {
    //     const response = await fetch(url);
    //     const blob = await response.blob(); 
    //     document.querySelector('#rainbow').src = URL.createObjectURL(blob);
    // }
    // getData('rainbow.jpg').catch(error => console.log('error!'))
    
    //---------- FETCH TXT ----------
    

    // https://data.europa.eu/euodp/pl/data/dataset/covid-19-coronavirus-data
    // async function getInfo() {
    //     const response = await fetch('covid-test.csv');
    //     const text = await response.text();
    //     const table = text.split('\n').slice(1);
    //     console.log(table);
    // }
    // getInfo().catch(error => console.log(error));
    


    // const mymap = L.map('issMap').setView([0, 0], 1);

    // const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // const tiles = L.tileLayer(tileUrl, {attribution});
    // tiles.addTo(mymap);

    // const myIcon = L.icon({
    //     iconUrl: 'plane-icon.png',
    //     iconSize: [30, 30],
    //     iconAnchor: [15, 15],
    // });
    // const marker = L.marker([0, 0], {icon: myIcon}).addTo(mymap);
    // let firstTime = true;
    // async function getData() {
        
    //     const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    //     const json = await response.json();
    //     const {latitude, longitude} = json;
    //     if (firstTime) {
    //         marker.setLatLng([latitude, longitude]).addTo(mymap);
    //         firsTime = false;
    //     }
    //     mymap.setView([latitude, longitude], 2);
    //     document.querySelector('#latitude').textContent = latitude.toFixed(2);
    //     document.querySelector('#longitude').textContent = longitude.toFixed(2);
    // }
    // getData();
    // setInterval(getData,1000);

// query selectors

    const input1 = document.querySelector('#input1');
    const input2 = document.querySelector('#input2');
    const curr1 = document.querySelector('#curr1');
    const curr2 = document.querySelector('#curr2');
    const button = document.querySelector('.hero-unit__button');
    const tableA = document.querySelector('#tableA');
    const ssSingleSelected = document.querySelector('.ss-single-selected');
    const ssContent = document.querySelector('.ss-list');
    // getCodeIndex('a');
    // getCodeIndex('b');
    // createTable('a');

    curr1.addEventListener('change', function() {

    });

// form event handlers

    input1.addEventListener("input", function(e) {
        if (input1.value !== "") {convert();} else {input2.value = ""}
    });
    curr1.addEventListener("change", function(e) {
        console.log('curr1:' + curr1.value);
        if (input1.value !== "") {convert()} else {input2.value = ""}
        
    });
    curr2.addEventListener("change", function(e) {
        console.log('curr2:' + curr2.value);
        if (input1.value !== "") {convert()} else {input2.value = ""}
    });
    button.addEventListener('click', function(e) {
        let curr1_temp = curr1.value;
        let curr2_temp = curr2.value;
        select.set(curr2_temp);
        select1.set(curr1_temp);
    });

    async function convert() {
        if(curr1.value === "PLN" && curr2.value !== "PLN") {
            let curr = await getCurrency(curr2.value);
            input2.value = (input1.value / curr).toFixed(2);
        } else if (curr1.value !== "PLN" && curr2.value === "PLN") {
            let curr = await getCurrency(curr1.value);
            input2.value = (input1.value * curr).toFixed(2);
        } else if (curr1.value !== "PLN" && curr2.value !== "PLN") {
            let curr_1 = await getCurrency(curr1.value);
            let curr_2 = await getCurrency(curr2.value);
            input2.value = ((input1.value * curr_1) / curr_2).toFixed(2)
        }
    }

    // async function getCodeIndex(table) {
    //     let response = await fetch('https://api.nbp.pl/api/exchangerates/tables/'+table+'/');
    //     let json = await response.json();
    //     let rates = json[0].rates;
    //     rates.forEach(element => {
    //         curr1.innerHTML += `<option value="${element.code}">${element.code}</option>`;
    //         curr2.innerHTML += `<option value="${element.code}">${element.code}</option>`;
    //     });
    // }

    async function getCurrency(currency) {
        
        let response = await fetch('https://api.nbp.pl/api/exchangerates/rates/a/'+currency+'/');
        if (response.status != 200) {
            response = await fetch('https://api.nbp.pl/api/exchangerates/rates/b/'+currency+'/');
            let json = await response.json();
            return json.rates[0].mid;
        }
        let json = await response.json();
        
        return json.rates[0].mid;
      }

      

      async function createTable(table) {
          let response = await fetch(`http://api.nbp.pl/api/exchangerates/tables/${table}/`);
          let response1 = await fetch(`http://api.nbp.pl/api/exchangerates/tables/${table}/last/2/`);

          let json = await response.json();
          let json1 = await response1.json();
          
          //print title
          let tableType = json[0].table;
          let effectiveDate = json[0].effectiveDate;
          tableA.previousElementSibling.innerHTML = `Tabela <em>${tableType}</em> z dnia <em>${effectiveDate}</em>`;

          let rates = json[0].rates;
          let lastRates = json1[0].rates;

          tableA.innerHTML += `<tr class="tr__title"><th>Nazwa waluty</th><th>Kod waluty</th><th>Kurs średni</th><th>Zmiana</th><th>Wykres</th></tr>`;
          for (i=0; i<rates.length; i++) {
              let el = rates[i];
              let change = el.mid - lastRates[i].mid;
            tableA.innerHTML += `<tr>\n<td>${el.currency}</td>\n<td>${el.code}</td>\n<td>${el.mid}</td>\n<td>${printArrow(change)}</td>\n<td><a href="" data-currency="${el.code}">zobacz wykres</a></td>\n</tr>`;
          }
        //   rates.forEach(function(el) {
        //       console.log(el);
        //       tableA.innerHTML += `<tr>\n<td>${el.currency}</td>\n<td>${el.code}</td>\n<td>${el.mid}</td>\n<td>${el.mid}${printArrow()}</td>\n<td><a href="" data-currency="${el.code}">zobacz wykres</a></td>\n</tr>`;
        //   })
      }
      
      // SLIM SELECT js

      const select = new SlimSelect({
        select: '.ajax',
        valuesUseText: false
      });
      const select1 = new SlimSelect({
        select: '.ajax1',
        valuesUseText: false
      });
      
      let data =[];
      data.push({innerHTML: '<img width="30" height="30" src="flags/pln.svg"></img> <div><div>PLN</div><br><div class="currency">Złoty polski</div></div>', text: 'PLN', value: 'PLN', currency: 'Złoty polski'});
      fetch('https://api.nbp.pl/api/exchangerates/tables/a/')
        .then(res => res.json())
        .then(json => {
          let rates = json[0].rates;
          rates.forEach(el => {
            console.log(el.code);
            if (el.code == 'ZAR') {el.currency = 'rand południowoafrykański'} else {
              if (el.code == 'XCD' ) return;
            }
            
            data.push({innerHTML: '<img width="30" height="30" src="flags/'+el.code.toLowerCase()+'.svg"></img> <div><div>'+ el.code +'</div><br><div class="currency">'+ el.currency+ '</div></div>', text: el.code, value: el.code, currency: el.mid});
          });
          
        })
        .then(
          fetch('https://api.nbp.pl/api/exchangerates/tables/b/')
          .then(res => res.json())
          .then(json => {
            let rates = json[0].rates;
            rates.forEach(el => {
              data.push({innerHTML: '<img width="30" height="30" src="flags/'+el.code+'.svg"></img> <div><div>'+ el.code +'</div><br><div class="currency">'+ el.currency+ '</div></div>', text: el.code, value: el.code, currency: el.mid});
            });
            select.setData(data);
            select1.setData(data);
            select.set('PLN');
            select1.set('EUR');
          })
        )
    
    
});
