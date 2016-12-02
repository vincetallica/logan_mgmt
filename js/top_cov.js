var chart = c3.generate({
    data: {
        x: 'date',
        xFormat : '%Y-%m-%d', //default %Y-%m-%d
        columns: [
            ['date', '2016-08-28'],
            ['flac', 0.6]
        ],
        axes: {
          flac: 'y'
        }
        
    },
    axis: {
        x: {
          type : 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          },
          label: { 
            text: "Date",
            position: 'outer-center'
          }
        },
        y: {
          max: 1,
          min: 0,
          padding: {
            top:0,
            bottom: 0
          },
          label: {
            text: "Test Pass %",
            position: 'outer-middle'
          },
          tick: {
            format: d3.format('%,')
          }
        }
    }
});

