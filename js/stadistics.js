var totalVotosHechos = 0;

var votosPersonajes = JSON.parse(localStorage.getItem("votosPersonajes"));
var votosComics = JSON.parse(localStorage.getItem("votosComics"));

var pie = document.getElementById("grafico1");
var pie2 = document.getElementById("grafico2");

$(document).ready(function () {
    $('#pie').click(function () {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChartPersonajes);
        google.charts.setOnLoadCallback(drawChartComics);
        function drawChartPersonajes() {
            var arrayEsta = [
                ["Nombre", "Votos"]
            ];
            votosPersonajes.forEach(function (e) {
                arrayEsta.push([e.nombre, e.votosTotal]);
            });
            var data = google.visualization.arrayToDataTable(arrayEsta);

            var options = {
                title: 'Personajes más votados',
                is3D: true,
            };
            var chart = new google.visualization.PieChart(pie);
            chart.draw(data, options);
        }

        function drawChartComics() {
            var arrayEsta2 = [
                ["Nombre", "Votos"]
            ];
            votosComics.forEach(function (e) {
                arrayEsta2.push([e.nombre, e.votosTotal]);
            });
            var data2 = google.visualization.arrayToDataTable(arrayEsta2);

            var options2 = {
                title: 'Comics más votados',
                is3D: true,
            };
            var chart2 = new google.visualization.PieChart(pie2);
            chart2.draw(data2, options2);
        }
    });

    $('#donut').click(function () {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChartPersonajes);
        google.charts.setOnLoadCallback(drawChartComics);
        function drawChartPersonajes() {
            var arrayEsta = [
                ["Nombre", "Votos"]
            ];
            votosPersonajes.forEach(function (e) {
                arrayEsta.push([e.nombre, e.votosTotal]);
            });
            var data = google.visualization.arrayToDataTable(arrayEsta);

            var options = {
                title: 'Personajes más votados',
                pieHole: 0.4,
            };
            var chart = new google.visualization.PieChart(pie);
            chart.draw(data, options);
        }

        function drawChartComics() {
            var arrayEsta2 = [
                ["Nombre", "Votos"]
            ];
            votosComics.forEach(function (e) {
                arrayEsta2.push([e.nombre, e.votosTotal]);
            });
            var data2 = google.visualization.arrayToDataTable(arrayEsta2);

            var options2 = {
                title: 'Comics más votados',
                pieHole: 0.4,
            };
            var chart2 = new google.visualization.PieChart(pie2);
            chart2.draw(data2, options2);
        }
    });

    $('#colum').click(function () {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChartPersonajes);
        google.charts.setOnLoadCallback(drawChartComics);
        function drawChartPersonajes() {
            var arrayEsta = [
                ["Nombre", "Votos"]
            ];
            votosPersonajes.forEach(function (e) {
                arrayEsta.push([e.nombre, e.votosTotal]);
            });
            var data = google.visualization.arrayToDataTable(arrayEsta);
            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "integer",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "Personajes mas votados.",
                width: 500,
                height: 400,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.PieChart(pie);
            chart.draw(data, options);
        }

        function drawChartComics() {
            var arrayEsta2 = [
                ["Nombre", "Votos"]
            ];
            votosComics.forEach(function (e) {
                arrayEsta2.push([e.nombre, e.votosTotal]);
            });
            var data2 = google.visualization.arrayToDataTable(arrayEsta2);
            var view2 = new google.visualization.DataView(data2);
            view2.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "integer",
                    role: "annotation"
                },
                2]);

            var options2 = {
                title: "Personajes mas votados.",
                width: 500,
                height: 400,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
            };
            var chart2 = new google.visualization.PieChart(pie2);
            chart2.draw(data2, options2);
        }
    });
});

/*function totalVotos() {
    if (votos != null) {
        votos.forEach(element => {
            totalVotosHechos += element.votosTotal;
        });
    }
    console.log(totalVotosHechos);
}*/
