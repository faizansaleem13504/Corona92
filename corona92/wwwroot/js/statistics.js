renderStackedBarPlot = function (ctx, totalCases, recoveredCases, deathCount) {

    var max = 0;
    for (let i = 0; i < totalCases.length; i++) {
        if (totalCases[i] + recoveredCases[i] + deathCount[i] > max)
            max = totalCases[i] + recoveredCases[i] + deathCount[i];
    }

    max += max / 10;

    console.log(max);

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'AJK', 'Gilgit Baltistan', 'Islamabad'],
            datasets: [{
                label: "Total",
                type: "bar",
                stack: "Base",
                backgroundColor: "#FA9F42",
                data: totalCases,
            }, {
                label: "Recovered",
                type: "bar",
                stack: "Base",
                backgroundColor: "#2B4162",
                data: recoveredCases,
            }, {
                label: "Deaths",
                type: "bar",
                stack: "Base",
                backgroundColor: "#721817",
                data: deathCount,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Corona Total-Recovery-Death Analysis (Province wise)',
                fontSize: 30,
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        maxRotation: 0,
                        minRotation: 0
                    },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        suggestedMax: max,
                    }
                }]
            },
        }
    });
}
renderCoronaRatePlotProvinces = function (ctx, datesOfCases, punjab, sindh, kpk, balochistan, ajk, gb, islamabad) {
    var maxDiff = 0;

    for (let i = 1; i < punjab.length; i++) {
        //punjab[i] += punjab[i - 1];

        //Code for Extra Y-Axis Padding
        if (punjab[i] - punjab[i - 1] > maxDiff)
            maxDiff = punjab[i] - punjab[i - 1];
    }

    //setting the y-axis max point
    var max = punjab[punjab.length - 1];
    max += maxDiff;

    for (let i = 1; i < sindh.length; i++) {
        //sindh[i] += sindh[i - 1];

        //Code for Extra Y-Axis Padding
        if (sindh[i] - sindh[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = sindh[i] - sindh[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (sindh[sindh.length - 1] > max) {
        max = sindh[sindh.length - 1];
        max += maxDiff;
    }

    for (let i = 1; i < kpk.length; i++) {
        //kpk[i] += kpk[i - 1];

        //Code for Extra Y-Axis Padding
        if (kpk[i] - kpk[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = kpk[i] - kpk[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (kpk[kpk.length - 1] > max) {
        max = kpk[kpk.length - 1];
        max += maxDiff;
    }

    //setting the y-axis max point
    for (let i = 1; i < balochistan.length; i++) {
        //balochistan[i] += balochistan[i - 1];

        //Code for Extra Y-Axis Padding
        if (balochistan[i] - balochistan[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = balochistan[i] - balochistan[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (balochistan[balochistan.length - 1] > max) {
        max = balochistan[balochistan.length - 1];
        max += maxDiff;
    }

    for (let i = 1; i < ajk.length; i++) {
        //ajk[i] += ajk[i - 1];

        //Code for Extra Y-Axis Padding
        if (ajk[i] - ajk[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = ajk[i] - sindh[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (ajk[ajk.length - 1] > max) {
        max = ajk[ajk.length - 1];
        max += maxDiff;
    }

    for (let i = 1; i < gb.length; i++) {
        //gb[i] += gb[i - 1];

        //Code for Extra Y-Axis Padding
        if (gb[i] - gb[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = gb[i] - gb[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (gb[gb.length - 1] > max) {
        max = gb[gb.length - 1];
        max += maxDiff;
    }

    for (let i = 1; i < islamabad.length; i++) {
        //islamabad[i] += islamabad[i - 1];

        //Code for Extra Y-Axis Padding
        if (islamabad[i] - islamabad[i - 1] > maxDiff) {
            max = max - maxDiff;
            maxDiff = islamabad[i] - islamabad[i - 1];
            max = max + maxDiff;
        }
    }

    //setting the y-axis max point
    if (islamabad[islamabad.length - 1] > max) {
        max = islamabad[islamabad.length - 1];
        max += maxDiff;
    }

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datesOfCases,
            datasets: [
                {
                    label: 'Punjab',
                    backgroundColor: 'rgb(0,107,56,0)',
                    borderColor: 'rgb(0,107,56,1)',
                    data: punjab,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Sindh',
                    backgroundColor: 'rgb(214,73,51,0)',
                    borderColor: 'rgb(214,73,51,1)',
                    data: sindh,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Khyber Pakhtunkhwa',
                    backgroundColor: 'rgb(113,73,85,0)',
                    borderColor: 'rgb(113,73,85,1)',
                    data: kpk,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Balochistan',
                    backgroundColor: 'rgb(253,231,76,0)',
                    borderColor: 'rgb(253,231,76,1)',
                    data: balochistan,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Azad Jammu & Kashmir',
                    backgroundColor: 'rgb(24,54,66,0)',
                    borderColor: 'rgb(24,54,66,1)',
                    data: ajk,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Gilgit Baltistan',
                    backgroundColor: 'rgb(255,16,31,0)',
                    borderColor: 'rgb(255,16,31,1)',
                    data: gb,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
                {
                    label: 'Islamabad',
                    backgroundColor: 'rgb(221,114,48,0)',
                    borderColor: 'rgb(221,114,48,1)',
                    data: islamabad,
                    lineTension: 0,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                },
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Corona Spread Rate (Province wise)',
                fontSize: 30,
            },
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMax: max,
                    }
                }]
            }
        }
    });
}
function showStackedBarPlot(data) {
   
    var ctx = document.getElementById("StackedBarPlot").getContext('2d');
    var dates = ['26 March', '27 March', '28 March', '29 March', '30 March', '31 March'];
    var cases = [50, 20, 23, 45, 15, 16];
    var recovered = [5, 02, 5, 4, 7, 6];
    var deaths = [5, 2, 3, 5, 1, 6];
    //punjab, sindh, kpk, balochisatan, ajk, gb, islamabad
    //actual,
    //sindh = 0, punjab = 1, KPK = 2, ISL = 3, GB = 4, Balochistan = 5, AJK = 6, Pakistan = 7
    var cases1 = [data[1]["confirmed"], data[0]["confirmed"], data[2]["confirmed"], data[5]["confirmed"], data[6]["confirmed"], data[4]["confirmed"], data[3]["confirmed"]];
    var recovered1 = [data[1]["recovered"], data[0]["recovered"], data[2]["recovered"], data[5]["recovered"], data[6]["recovered"], data[4]["recovered"], data[3]["recovered"]];
    var deaths1 = [data[1]["deaths"], data[0]["deaths"], data[2]["deaths"], data[5]["deaths"], data[6]["deaths"], data[4]["deaths"], data[3]["deaths"]];

    //var cases1 = Array();
    //for (var d in data) {
    //    cases1.add(data[d]["confirmed"]);
    //    recovered1.add();
    //    deaths1.add();

    //}

    renderStackedBarPlot(ctx, cases1, recovered1, deaths1);
}
function showCoronaRatePlotProvinces(data) {
    var ctx = document.getElementById("CoronaRatePlotProvinces").getContext('2d');
    var dates = ['26 March', '27 March', '28 March', '29 March', '30 March', '31 March', '1 April', '2 April', '3 April', '4 April', '5 April', '6 April', '7 April', '8 April', '9 April'];
    var casesInPunjab = [5, 02, 23, 45, 15, 45, 15, 50, 31, 50, 3, 02, 23, 54, 90];
    var casesInSindh = [1, 02, 13, 5, 15, 60, 31, 36, 45, 45, 15, 50, 31, 36, 45];
    var casesInKPK = [7, 02, 3, 45, 15, 45, 15, 50, 31, 3, 02, 23, 54, 90, 30];
    var casesInBalochistan = [3, 02, 23, 15, 31, 31, 36, 45, 36, 45, 31, 36, 4, 15, 50];
    var casesInAJK = [17, 02, 23, 45, 15, 45, 15, 45, 15, 50, 31, 50, 31, 70, 100];
    var casesInGB = [3, 02, 23, 5, 5, 5, 15, 20, 11, 16, 3, 02, 23, 24, 15];
    var casesInIslambad = [1, 02, 3, 4, 15, 16, 25, 15, 12, 16, 15, 20, 15, 16, 25];

    var dates1 = Array();
    var casesInPunjab1 = Array();
    var casesInSindh1 = Array();
    var casesInKPK1 = Array();
    var casesInBalochistan1 = Array();
    var casesInAJK1 = Array();
    var casesInGB1 = Array();
    var casesInIslambad1 = Array();
        //sindh = 0, punjab = 1, KPK = 2, ISL = 3, GB = 4, Balochistan = 5, AJK = 6, Pakistan = 7
    var i;
    for (i = 0; i < data.length; i = i + 8) {
        dates1.push(data[i + 0]["date"]);
        casesInSindh1.push(data[i + 0]["confirmed"]);
        casesInPunjab1.push(data[i + 1]["confirmed"]);
        casesInKPK1.push(data[i + 2]["confirmed"]);
        casesInIslambad1.push(data[i + 3]["confirmed"]);
        casesInGB1.push(data[i + 4]["confirmed"]);
        casesInBalochistan1.push(data[i + 5]["confirmed"]);
        casesInAJK1.push(data[i + 6]["confirmed"]);
    }
    //renderCoronaRatePlotProvinces(ctx, dates, casesInPunjab, casesInSindh, casesInKPK, casesInBalochistan, casesInAJK, casesInGB, casesInIslambad);
    renderCoronaRatePlotProvinces(ctx, dates1, casesInPunjab1, casesInSindh1, casesInKPK1, casesInBalochistan1, casesInAJK1, casesInGB1, casesInIslambad1);
    setStatisticsGraphs();
}

function setStatisticsGraphs() {
    try {
        if (deviceType() == "Mobile") {
            document.getElementById("myChart").height = 450;
            //document.getElementById("myChart2").width = "300px";
            document.getElementById("myChart2").height = 600;
        }
        else {
            alert("windows");
        }
    }
    catch (err) {

    }
}