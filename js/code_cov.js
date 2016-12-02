var oTable = document.getElementById('cT');
var rowLength = oTable.rows.length;
var array_date = [];
var flac_stack = [];
var last5_stack = [];
var numberPattern = /\d+/g;
for (i=0; i<rowLength; i++) {
    var oCells = oTable.rows.item(i).cells;
    var cellLength = oCells.length;
    //console.log(oCells);
    for (var j=0; j<cellLength; j++) {
      var global_val = oCells.item(j).innerHTML;
      var subNum = global_val.match(numberPattern);
      if (j==0) {
        // Grab the Dates
        if (subNum != null && global_val != "Date") {
          array_date.push(global_val);
        }
      }
      else if (j==1) {//BASIC VALUES 
        if (subNum != null && subNum.length>1) {
          flac_stack.push(subNum[subNum.length-1]/100);
        } else {
          flac_stack.push(0);
        }
      }
      else if (j==2) { //RANDOM Values
        if (subNum != null && subNum.length>1) {
          last5_stack.push(subNum[subNum.length-1]/100);
        } else {
          last5_stack.push(0);
        }
      }
  }
}
array_date.reverse();
flac_stack.reverse();
last5_stack.reverse();
array_date.unshift('Date');
flac_stack.unshift('Flac');
last5_stack.unshift('Last 5 Runs');

 //Disply information:
console.log("dates logged", array_date.length);
console.log("basic num", flac_stack.length);
console.log("random num", last5_stack.length);
for (var j=0;j<array_date.length;j++) {
  console.log(array_date[j]);
}

var chart = c3.generate({
    data: {
        x: 'Date',
        xFormat : '%m/%d/%Y', //default %Y-%m-%d
        columns: [
            array_date,
            flac_stack,
            last5_stack
        ],
        axes: {
          flac: 'y',
          last_5_runs: 'y2'
        }
        
    },
    axis: {
        x: {
          type : 'timeseries',
          tick: {
            format: '%m/%d/%Y'
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
            text: "Coverage %",
            position: 'outer-middle'
          },
          tick: {
            format: d3.format('%,')
          }
        },
        y2: {
           max: 1,
           min: 0,
           padding: {
             top:0,
             bottom: 0
           },
           label: {
             text: "Coverage %",
             position: 'outer-middle'
           },
           tick: {
             format: d3.format('%,')
           }
         }
    }
});

