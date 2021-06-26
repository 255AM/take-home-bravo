//initialize tables| defining column titless and pointing to dataSet as data source
function buildTable(){
    $(document).ready(function(){
        $('#example').DataTable( {
            dom: 'frtipB',
            buttons: {
                buttons: [
                    {
                        text: 'Alert',
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
                    "data": null,
                    "defaultContent": '<button class="edit">Edit</button> <button class="remove">Delete</button>'
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
};


