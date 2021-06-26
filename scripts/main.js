//initialize tables| defining column titless and pointing to dataSet as data source
function buildTable(){
    $(document).ready(function(){
        $('#example').DataTable( {
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
        $('#example').on('click', '.remove', function () {
            var table = $('#example').DataTable();
            table
                .row($(this).parents('tr'))
                .remove()
            .draw();
            });
            $('#example tbody').on('click', '.edit', function () {
                var table = $('#example').DataTable();

                var elements = document.getElementById("#edit-form").elements;
                let valsa = table.row( $(this).parents('tr') ).data()
                    
                for (var i = 0; i<5 ; i++) {
                    elements[i].value = valsa[i] 
                }
            })
    });
        $('#example').on('click', '.edit', function () {
            $('#DescModalEdit').modal("show");
        });

        $('#example').on('click', '.add', function () {
            $('#DescModalAdd').modal("show");
            console.log('gttgtgt');
        });
}
//initial table build on load
buildTable()
function resetTable(){
    //Destroy and rebuild the Datatable after source data changes
    $('#example').DataTable().clear().destroy();
    buildTable()
}
//listen for add button to add data to table
document.getElementById("add-row").addEventListener("click", saveArticle);

function saveArticle () {
    dataSet.push([ "toe toe Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ])
    console.log('here');
    resetTable()
    console.log(dataSet);
};



  