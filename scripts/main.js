//initialize tables| defining column titless and pointing to dataSet as data source
$(document).ready(function() {
    $('#example').DataTable( {
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    } );
} );

function saveArticle () {
    dataSet.push([ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ])
  };

  saveArticle()