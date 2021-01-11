let api2 = `https://disease.sh/v3/covid-19/historical/all?lastdays=50`;
let graphdata = fetch(api2)
  .then(response => response.json())
  .then(data => {
    var dates = Object.keys(data.cases);
    // console.log(dates);

    var gcases = Object.values(data.cases);
    // console.log(gcases);

    var gdeaths = Object.values(data.deaths);

    var grecovered = Object.values(data.recovered);

    // Graph Render
    let mainChart;
    if (mainChart) {
      mainChart.destroy();
    }
    // window.onload = drawChart;
    // function drawChart({ dates, gcases, gdeaths, grecovered }) {
    var ctx = document.getElementById("mainChart").getContext("2d");
    mainChart = new Chart(ctx, {
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
          text: "Global Chart",
          fontColor: "black",
          fontSize: 20,
        },

        legend: {
          display: true,
          // align: "left",
          // fullWidth: true,
          labels: {
            // fontColor: "rgb(255, 99, 132)",
            padding: 100,
          },
          // padding: 100,
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
        // hover: {
        //   mode: "index",
        //   // intersect: false,
        // },

        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                padding: 20,
                // labelString: "Date",
              },
              ticks: {
                maxRotation: 50,
                minRotation: 50,
                padding: 10,
              },
              gridLines: {
                display: false,
                // drawBorder: false //maybe set this as well
              },
            },
          ],
          yAxes: [
            {
              scaleSteps: 10,
              scaleLabel: {
                display: true,
                padding: 30,

                // labelString: "value",
              },
              ticks: {
                display: true,
                autoSkip: false,
                padding: 20,
                suggestedMin: 0,
                callback: function (value, index, values) {
                  return numeral(value).format("0a");
                },
                // callback: function (gcases) {
                //   return gcases / 1000000 + "M";
                // },
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    });
    // }
  });
