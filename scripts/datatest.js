var row


buildTable()
function buildTable(){
    $(document).ready(function () {
        
            var table = $('#example').DataTable({
                paging: true,
                dom: 'lftBp',
                buttons: [
                    {
                        text: 'Add Data',
                        action: function ( e, dt, node, config ) {
                            $('#DescModalAdd').modal("show");
                            console.log('gttgtgt');
                        },
                        dom: 'frtipB',
                    },
                    
                ],
            
            
            
                columns: [
                    { "title": "Title" , "data": "title" },
                    
                    {"title": "Summary" ,"data": "summary" },
                    {"title": "Origin" , "data": "newsSite" },
                    {"title": "Published" , "data": "publishedAt" },
                    {"title": "Image" , "data": "imageUrl",
                    "render": function(data, type, row) {
                        return '<img src="'+data+'"height="100"  />';
                    }
                    },
                    {
                        sortable: false,
                        "render": function ( data, type, full, meta ) {
                            return '<a id='+meta.row+' class="btn btn-primary btn-sm edit" role="button">Edit</a> <a id='+meta.row+' class="btn btn-danger btn-sm remove" role="button">Delete</a>';
                        }
                    },
                ]
            });

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
            let valsa = table.row( $(this).parents('tr') ).data(); 
            let rowIndex = (table.row( $(this).parents('tr') )[0]);
            console.log('notme' + rowIndex);
            console.log("me!" + $(this).attr('id'));
            row = $(this).attr('id')

            elements[0].value = valsa.title
            elements[1].value = valsa.summary
            elements[2].value = valsa.newsSite
            elements[3].value = valsa.publishedAt
            elements[4].value = valsa.imageUrl

            
            // for (var i = 0; i<6 ; i++) {
            //     //console.log(valsa[i]);
            //     //elements[i].value = valsa[i] 
            // }
        })

        $('#example').on('click', 'dt-button', function () {
            $('#DescModalAdd').modal("show");
            console.log('gttgtgt');
        });
        $('#example').on('click', '.edit', function () {
            $('#DescModalEdit').modal("show");
        });

            for (var index = 1; index < 2; index++) {
                $.ajax({
                    url: 'https://api.spaceflightnewsapi.net/v3/articles?_limit=20',
                    dataType: 'json',
                    success: function (json) {
                        console.log(json);
                        table.rows.add(json).draw();
                    }
                });
            }
        
    });
}


function resetTable(){
    //Destroy and rebuild the Datatable after source data changes|| I think there is a built in method to do this, for future reference
    $('#example').DataTable().clear().destroy();
    buildTable()
}
//listen for add button to add data to table
document.getElementById("add-row").addEventListener("click", function(){
    Add()
})


    

     function Add(){
        var table = $('#example').DataTable();
        let form = document.getElementById("#add-form").elements;
        let title = form[0].value
        let summary = form[1].value
        let origin = form[2].value
        let date = form[3].value
        let image = form[4].value
 
        table.row.add( {
                "title":      title,
                "summary":   summary,
                "newsSite":    origin,
                "publishedAt": date,
                "imageUrl":     image,
                
            } ).draw();
            $('#DescModalAdd').modal("hide");
}
    
    


function editData(row){

    var table = $('#example').DataTable();
        let form = document.getElementById("#edit-form").elements;
        let title = form[0].value
        let summary = form[1].value
        let origin = form[2].value
        let date = form[3].value
        let image = form[4].value

    

        let newData = {
                "title":      title,
                "summary":   summary,
                "newsSite":    origin,
                "publishedAt": date,
                "imageUrl":     image,
                }
        table.row( row ).data( newData ).draw();
                

                
    $('#DescModalEdit').modal("hide");
    
}

document.getElementById("edit-data").addEventListener("click", function(){
    
    editData(row)
})
   
