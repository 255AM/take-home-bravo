//had to instantiate a global variable to define and access from different scopes

var row

//initialize tables| defining column titless and pointing to dataSet as data source

function buildTable(){
    $(document).ready(function(){
        var table = $('#example').DataTable( {
            dom: 'frtipB',
            buttons: {
                buttons: [
                    {
                        text: 'Add Data',
                        action: function ( e, dt, node, config ) {
                            $('#DescModalAdd').modal("show");
                            console.log('gttgtgt');
                        }
                    }
                ]
            },
            
            select: true,
            data: dataSet,
            columns: [
                { title: "Name"},
                { title: "Position" },
                { title: "Office" },
                { title: "Extn." },
                { title: "Start date" },
                { title: "Salary" },
                {
                    sortable: false,
                    "render": function ( data, type, full, meta ) {
                        return '<a id='+meta.row+' class="btn btn-primary btn-sm edit" role="button">Edit</a> <a id='+meta.row+' class="btn btn-danger btn-sm remove" role="button">Delete</a>';
                    }
                },
               
            ]
        } );
        //fx to delete row
        $('#example').on('click', '.remove', function () {
            var table = $('#example').DataTable();
            table
                .row($(this).parents('tr'))
                .remove()
            .draw();
            });
        //fx to populate edit form with current data
        $('#example tbody').on('click', '.edit', function () {
            var table = $('#example').DataTable();
            var elements = document.getElementById("#edit-form").elements;
            let valsa = table.row( $(this).parents('tr') ).data()
            let rowIndex = (table.row( $(this).parents('tr') )[0]);
            console.log('notme' + rowIndex);
            console.log("me!" + $(this).attr('id'));
            row = $(this).attr('id')
            

            for (var i = 0; i<6 ; i++) {
                elements[i].value = valsa[i] 
            }
        })
    });

    $('#example').on('click', 'dt-button', function () {
        $('#DescModalAdd').modal("show");
        console.log('gttgtgt');
    });
    $('#example').on('click', '.edit', function () {
        $('#DescModalEdit').modal("show");
    });

        
}
//initial table build on load
buildTable()
function resetTable(){
    //Destroy and rebuild the Datatable after source data changes|| I think there is a built in method to do this, for future reference
    $('#example').DataTable().clear().destroy();
    buildTable()
}
//listen for add button to add data to table
document.getElementById("add-row").addEventListener("click", function(){
    addData()
})

function addData() {
    let inputArray = [];
    var elements = document.getElementById("#add-form").elements;
    for (var i = 0; i<6 ; i++) {
        inputArray.push(elements[i].value)
    }
    dataSet.push(inputArray)
    resetTable()
    $('#DescModalAdd').modal("hide");
};

function editData(row){
    var table = $('#example').DataTable();
    
    table.row(row).data([$("#name1").val(), $("#position1").val(),$("#office1").val(), $("#extn1").val(),$("#start-date1").val(), $("#salary1").val()]);
    $('#DescModalEdit').modal("hide");
    
}

document.getElementById("edit-data").addEventListener("click", function(){
    
    editData(row)
})
   
