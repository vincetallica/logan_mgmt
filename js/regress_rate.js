/*Decipher table*/
var oTable = document.getElementById('rT');
var rowIndex = document.getElementById("ignore").rowIndex;
oTable.deleteRow(rowIndex);

var rowLength = oTable.rows.length;
var array_date = [];
var b_stack = [];
var r_stack = [];
var f_fw_stack = [];
var total_stack = [];
var numberPattern = /\d+/g;//regex pattern to find numbers in html text
for (i=0; i<rowLength; i++) {
    var oCells = oTable.rows.item(i).cells;
    var cellLength = oCells.length;
    console.log(oCells);
    for (var j=0; j<cellLength; j++) {
      var global_val = oCells.item(j).innerHTML;
      var subNum = global_val.match(numberPattern);
      if (j==0) {
        // Grab the Dates
        if (subNum != null || global_val != "Date") {
          array_date.push(global_val);
        }
      }
      else if (j==1) {//BASIC VALUES 
        if (subNum != null && subNum.length>1) {
          b_stack.push(subNum[subNum.length-1]/100);
        } else {
          b_stack.push(0);
        }
      }
      else if (j==2) { //RANDOM Values
        if (subNum != null && subNum.length>1) {
          r_stack.push(subNum[subNum.length-1]/100);
        } else {
          r_stack.push(0);
        }
      }
      else if (j==3) { //NOCPU / FLACFW
        if (subNum != null && subNum.length>1) {
          f_fw_stack.push(subNum[subNum.length-1]/100);
        } else {
          f_fw_stack.push(0);
        }
      }
      else if (j==4) { //TOTAL
        if (subNum != null && subNum.length>1) {
          total_stack.push(subNum[subNum.length-1]/100);
        } else {
          total_stack.push(0);
        }
      } 
    }
}
array_date.reverse();
b_stack.reverse();
r_stack.reverse();
f_fw_stack.reverse();
total_stack.reverse();
array_date.unshift('Date');
b_stack.unshift('Basic');
r_stack.unshift('Random');
f_fw_stack.unshift('Flac FW/NoCPU');
total_stack.unshift('Total');

 //Disply information:
console.log("dates logged", array_date.length);
console.log("basic num", b_stack.length);
console.log("random num", r_stack.length);
console.log("nocpu num", f_fw_stack.length);
console.log("total num", b_stack.length); 
for (i=0;i<array_date.length;i++) {
  console.log(array_date[i]);
}
for (i=0;i<b_stack.length;i++) {
  console.log(b_stack[i]);
}

// DISPLAY GRAPH
var chart = c3.generate({
    data: {
        //url: '../data/test4.csv',
        x: 'Date',
        xFormat : '%m/%d/%Y', //default %Y-%m-%d
        columns: [
            array_date,
            b_stack,
            r_stack,
            f_fw_stack,
            total_stack
            /*d_date,
            ['basic', 0.67, 0.0, 0.83, 1.00, 0.67, 0.70, 0.86, 0.80, 1.0, 1.0, 0.91, 0.82, 0.36, 0.41, 0.0, 0.53, 0.94, 0.71, 0.61, 0.46, 0.55],
            ['random', 0.0, 0.0, 0.0, 0.0,  0.0 ,  0.0 , 0.0, 1.0, 0.0, 0.4, 0.43, 0.0, 0.0, 0.27, 0.38,  0.29, 0.44, 0.13, 0.0,0.0,0.13],
            ['flac_fw', 0.0, 0.0, 1.00, 1.00, 1.00, 1.00, 1.00, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
            ['total', 0.0 , 0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.82, 1.0, 0.88, 0.67, 0.82, 0.41, 0.34, 0.0, 0.45, 0.42, 0.23, 0.15, 0.47, 0.26],
            ['nocpu', 0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0, 0.0, 0.0,   0.7, 0.0, 0.0, 0.80, 0.0, 0.0, 0, 0 ,0]*/
        ],
        axes: {
          basic: 'y',
          flac_fw: 'y2'
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
            text: "Test Pass %",
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
             text: "Test Pass %",
             position: 'outer-middle'
           },
           tick: {
             format: d3.format('%,')
           }
         }
   }
});

