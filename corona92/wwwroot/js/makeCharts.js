var sliceColors = [];
sliceColors[0] = 'rgb(128,0,0,0.2)';
sliceColors[1] = 'rgb(220,20,60,0.2)';
sliceColors[2] = 'rgb(255,0,0,0.2)';
sliceColors[3] = 'rgb(205,92,92,0.2)';
sliceColors[4] = 'rgb(233,150,122,0.2)';
sliceColors[5] = 'rgb(255,69,0,0.2)';
sliceColors[6] = 'rgb(255,140,0,0.2)';
sliceColors[7] = 'rgb(255,215,0,0.2)';
sliceColors[8] = 'rgb(218,165,32,0.2)';
sliceColors[9] = 'rgb(238,232,170,0.2)';
sliceColors[10] = 'rgb(128,128,0,0.2)';
sliceColors[11] = 'rgb(154,205,50,0.2)';
sliceColors[12] = 'rgb(124,252,0,0.2)';
sliceColors[13] = 'rgb(0,100,0,0.2)';
sliceColors[14] = 'rgb(50,205,50,0.2)';
sliceColors[15] = 'rgb(143,188,143,0.2)';
sliceColors[16] = 'rgb(102,205,170,0.2)';
sliceColors[17] = 'rgb(47,79,79,0.2)';
sliceColors[18] = 'rgb(0,255,255,0.2)';
sliceColors[19] = 'rgb(224,255,255,0.2)';
sliceColors[20] = 'rgb(0,206,209,0.2)';
sliceColors[21] = 'rgb(175,238,238,0.2)';
sliceColors[22] = 'rgb(95,158,160,0.2)';
sliceColors[23] = 'rgb(100,149,237,0.2)';
sliceColors[24] = 'rgb(173,216,230,0.2)';
sliceColors[25] = 'rgb(25,25,112,0.2)';
sliceColors[26] = 'rgb(138,43,226,0.2)';
sliceColors[27] = 'rgb(72,61,139,0.2)';
sliceColors[28] = 'rgb(147,112,219,0.2)';
sliceColors[29] = 'rgb(186,85,211,0.2)';
sliceColors[30] = 'rgb(255,0,255,0.2)';
sliceColors[31] = 'rgb(199,21,133,0.2)';
sliceColors[32] = 'rgb(255,105,180,0.2)';
sliceColors[33] = 'rgb(255,228,196,0.2)';
sliceColors[34] = 'rgb(139,69,19,0.2)';
sliceColors[35] = 'rgb(244,164,96,0.2)';
sliceColors[36] = 'rgb(188,143,143,0.2)';
sliceColors[37] = 'rgb(112,128,144,0.2)';

var sliceBorderColors = [];
sliceBorderColors[0] = 'rgb(128,0,0,1)';
sliceBorderColors[1] = 'rgb(220,20,60,1)';
sliceBorderColors[2] = 'rgb(255,0,0,1)';
sliceBorderColors[3] = 'rgb(205,92,92,1)';
sliceBorderColors[4] = 'rgb(233,150,122,1)';
sliceBorderColors[5] = 'rgb(255,69,0,1)';
sliceBorderColors[6] = 'rgb(255,140,0,1)';
sliceBorderColors[7] = 'rgb(255,215,0,1)';
sliceBorderColors[8] = 'rgb(218,165,32,1)';
sliceBorderColors[9] = 'rgb(238,232,170,1)';
sliceBorderColors[10] = 'rgb(128,128,0,1)';
sliceBorderColors[11] = 'rgb(154,205,50,1)';
sliceBorderColors[12] = 'rgb(124,252,0,1)';
sliceBorderColors[13] = 'rgb(0,100,0,1)';
sliceBorderColors[14] = 'rgb(50,205,50,1)';
sliceBorderColors[15] = 'rgb(143,188,143,1)';
sliceBorderColors[16] = 'rgb(102,205,170,1)';
sliceBorderColors[17] = 'rgb(47,79,79,1)';
sliceBorderColors[18] = 'rgb(0,255,255,1)';
sliceBorderColors[19] = 'rgb(224,255,255,1)';
sliceBorderColors[20] = 'rgb(0,206,209,1)';
sliceBorderColors[21] = 'rgb(175,238,238,1)';
sliceBorderColors[22] = 'rgb(95,158,160,1)';
sliceBorderColors[23] = 'rgb(100,149,237,1)';
sliceBorderColors[24] = 'rgb(173,216,230,1)';
sliceBorderColors[25] = 'rgb(25,25,112,1)';
sliceBorderColors[26] = 'rgb(138,43,226,1)';
sliceBorderColors[27] = 'rgb(72,61,139,1)';
sliceBorderColors[28] = 'rgb(147,112,219,1)';
sliceBorderColors[29] = 'rgb(186,85,211,1)';
sliceBorderColors[30] = 'rgb(255,0,255,1)';
sliceBorderColors[31] = 'rgb(199,21,133,1)';
sliceBorderColors[32] = 'rgb(255,105,180,1)';
sliceBorderColors[33] = 'rgb(255,228,196,1)';
sliceBorderColors[34] = 'rgb(139,69,19,1)';
sliceBorderColors[35] = 'rgb(244,164,96,1)';
sliceBorderColors[36] = 'rgb(188,143,143,1)';
sliceBorderColors[37] = 'rgb(112,128,144,1)';


renderIndividualProvince = function (ctx, chartLabels, chartValues, provinceName) {    //non-line and non-bar chart

    //There are some differences in attributes for different types of chart. These attributes are for pie chart.
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Count of Cases in Pakistan',
                data: chartValues,
                backgroundColor: sliceColors,
                borderColor: sliceBorderColors,
                borderWidth: 1
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Corona Cases in Cities',
                fontSize: 25,
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'black',
                }
            }
        }
    },
    );
}

renderProvinceChart = function (ctx, chartLabels, chartValues) {    //non-line and non-bar chart

    if (ctx == null)
        return null;
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Count of Cases in Pakistan',
                data: chartValues,
                backgroundColor: [
                    'rgba(255, 99, 71, 0.2)',
                    'rgba(50, 205, 50, 0.2)',
                    'rgba(0, 64, 255, 0.2)',
                    'rgba(218, 165, 32, 0.2)',
                    'rgba(255, 153, 204, 0.2)',
                    'rgba(102, 0, 204, 0.2)',
                    'rgba(255, 128, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 71, 1)',
                    'rgba(50, 205, 50, 1)',
                    'rgba(0, 64, 255, 1)',
                    'rgba(218, 165, 32, 1)',
                    'rgba(255, 153, 204, 1)',
                    'rgba(102, 0, 204, 1)',
                    'rgba(255, 128, 0, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Corona Cases in Pakistan (Province & Other Count)',
                fontSize: 25,
            },
            legend: {
                display: true,
                labels: {
                    fontColor: 'black',
                }
            }
        }
    },
    );
}    
