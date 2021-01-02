const CaseElement = document.querySelector("#case");
const TcaseElement = document.querySelector("#tcase");
const RecoveryElement = document.querySelector("#recovery");
const TrecoveryElement = document.querySelector("#trecovery");
const DeathElement = document.querySelector("#death");
const TdeathElement = document.querySelector("#tdeath");
const Update1Element = document.querySelector("#updated1");
const Update2Element = document.querySelector("#updated2");
const Update3Element = document.querySelector("#updated3");

const SearchElement = document.querySelector("#search-input");
const FlagElement = document.querySelector("#country-flag");

let GlobalFlag = "./assets/global.jpg";

// Brave Error Fix
ethereum.autoRefreshOnNetworkChange = false;

// Default Onload Fetched Data
if (SearchElement.value == "") {
  let api = `https://disease.sh/v3/covid-19/all`;
  let fetchRes = fetch(api);
  fetchRes
    .then(data => data.json())
    .then(d => {
      // console.log(d);
      flag = GlobalFlag;
      // xcountryName = "Global";

      Updated = d.updated;

      Case = d.todayCases;
      tCase = d.cases;

      Recover = d.todayRecovered;
      tRecover = d.recovered;

      Death = d.todayDeaths;
      tDeath = d.deaths;
    })
    .then(() => {
      display();
    });
}
// else {
// Manual Onsearch Fetched Data
SearchElement.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(SearchElement.value);
  }
}

function getResults(country) {
  if (country != "") {
    let xapi = `https://disease.sh/v3/covid-19/countries/${country}`;
    let fetchCountry = fetch(xapi);
    fetchCountry
      .then(xdata => {
        if (xdata.ok) {
          return xdata.json();
        } else {
          alert("Invalid Country Name or Code");
          SearchElement.value = "";
        }
      })
      .then(xd => {
        console.log(xd);

        flag = xd.countryInfo.flag;
        countryName = xd.country;

        Updated = xd.updated;

        Case = xd.todayCases;
        tCase = xd.cases;

        Recover = xd.todayRecovered;
        tRecover = xd.recovered;

        Death = xd.todayDeaths;
        tDeath = xd.deaths;
      })
      .then(() => {
        display();
        countryChart();
      });
  } else {
    alert("Please Search a Country Name or Country Code.");
  }
}
// }

const countryChart = () => {
  document.getElementById("countryChart").style.display = "block";
  let country = countryName;
  console.log(country);

  let apixx = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;

  let graphdata = fetch(apixx)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var dates = Object.keys(data.timeline.cases);
      // console.log(dates);

      var gcases = Object.values(data.timeline.cases);
      // console.log(gcases);

      var gdeaths = Object.values(data.timeline.deaths);

      var grecovered = Object.values(data.timeline.recovered);

      let countryChart;
      if (countryChart) {
        countryChart.destroy();
      }

      var ctx = document.getElementById("countryChart").getContext("2d");
      countryChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Total Cases",
              data: gcases,
              fill: true,
              borderColor: "#ffff00",
              backgroundColor: "rgba(255, 255, 0, 0.4)",
              borderWidth: 2,
            },
            {
              label: "Total Recovered",
              data: grecovered,
              fill: true,
              borderColor: "#008000",
              backgroundColor: "rgba(0, 128, 0, 0.5)",
              borderWidth: 2,
            },
            {
              label: "Total Deaths",
              data: gdeaths,
              fill: true,
              borderColor: "#ff0000",
              backgroundColor: "rgba(255, 0, 0, 0.6)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: "Country Chart",
            fontColor: "black",
            fontSize: 20,
          },

          legend: {
            display: true,
            labels: {
              padding: 100,
            },
          },
          tooltips: {
            mode: "nearest",
            intersect: false,

            titleAlign: "center",
            bodyAlign: "center",
            footerAlign: "center",
            bodySpacing: 10,
            titleMarginBottom: 10,
            xPadding: 90,
            displayColors: false,
          },

          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  padding: 20,
                },
                ticks: {
                  maxRotation: 50,
                  minRotation: 50,
                  padding: 10,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                scaleSteps: 10,
                scaleLabel: {
                  display: true,
                  padding: 30,
                },
                ticks: {
                  display: true,
                  autoSkip: false,
                  padding: 20,
                  suggestedMin: 0,
                  callback: function (value, index, values) {
                    return numeral(value).format("0a");
                  },
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    });
};

const display = () => {
  var date = new Date(Updated).toLocaleString();

  CaseElement.innerHTML = " + " + numeral(Case).format("0,0");
  TcaseElement.innerHTML = "Total : " + numeral(tCase).format("0,0");
  RecoveryElement.innerHTML = " + " + numeral(Recover).format("0,0");
  TrecoveryElement.innerHTML = "Total : " + numeral(tRecover).format("0,0");
  DeathElement.innerHTML = " + " + numeral(Death).format("0,0");
  TdeathElement.innerHTML = "Total : " + numeral(tDeath).format("0,0");
  Update1Element.innerHTML = "Updated on : " + date;
  Update2Element.innerHTML = "Updated on : " + date;
  Update3Element.innerHTML = "Updated on : " + date;
  FlagElement.innerHTML = `<img src="${flag}" class="country-flag" alt="Country-Flag"/>`;
};
