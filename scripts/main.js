    //variable that grabs row data
    var row
    //initial building of table
    buildTable()

    // defining fx that builds table
    function buildTable(){
        $(document).ready(function () {
            var table = $('#example').DataTable({
                //sets table height
                scrollY: '75vh',
                scrollCollapse: true,
                paging: true,
                //order of dom render (length, filter(search), table, button, pagination)
                dom: 'lftBp',
                //instantiate buttons
                buttons: 
                [
                    {
                        //adding class names to use bootstrap styling
                        className: 'btn btn-primary add-button',
                        text: 'Create New',
                        action: function ( e, dt, node, config ) {
                            $('#DescModalAdd').modal("show");
                        },
                        //removing default class name to avoid default styling of dtbutton
                        init: function(api, node, config) {
                            $(node).removeClass('dt-button')
                            }
                    },
                ],
                columnDefs: 
                    [ 
                        {
                            //identifies which col is affected
                            targets:3,
                            "render" : function (data, type, row) 
                            {
                                //translate date from zulu to local
                                return new Date(data).toLocaleDateString()
                            },
                        },
                        { 
                            //dt built in method of centering cell text on selected cols
                            className: "dt-body-center", targets: [4,3,2,5] 
                        },
                        { 
                            //build in to center header text
                            className: "dt-head-center", targets: "_all" 
                        } ,
                        {
                            //fixed width on a couple of rows
                            "width": "40%", "targets": 1  
                        },
                        { 
                            "width": "6.5%", "targets": 5 
                        }
                        
                    ],
                
                //tell dt where to get the data from, also define header titles
                columns: 
                    [
                        {
                            "title": "Title" , "data": "title" 
                        },
                        {
                            "title": "Summary" ,"data": "summary" 
                        },
                        {
                            "title": "Origin" , "data": "newsSite" 
                        },
                        {
                            "title": "Published" , "data": "publishedAt"
                        },
                        {
                            "title": "Image" , "data": "imageUrl",
                            //tell dt to add html in order to display image instead of diplay link
                            "render": function(data, type, row) {
                            return '<img src="'+data+'"width="200"  />';
                            }
                        },
                        {
                            //render buttons for edit and delete||send row id with them using meata.row
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
                row = $(this).attr('id')
                //row data holds all data from api call, not just visible. Have to identify which data to bind fro each form element
                elements[0].value = valsa.title
                elements[1].value = valsa.summary
                elements[2].value = valsa.newsSite
                elements[3].value = valsa.publishedAt
                elements[4].value = valsa.imageUrl
            })

            //listen for add-row click to show addata form modal
            $('#example').on('click', 'dt-button', function () {
                $('#DescModalAdd').modal("show");
                console.log('gttgtgt');
            });
            //"" "" "" edit form modal
            $('#example').on('click', '.edit', function () {
                $('#DescModalEdit').modal("show");
            });

            //for loop not currently used, iterate only once
            for (var index = 1; index < 2; index++) {
                $.ajax({
                    //article return limit in url
                    url: 'https://api.spaceflightnewsapi.net/v3/articles?_limit=151',
                    dataType: 'json',
                    success: function (json) {
                        //this data is sent the columns area (row 65) to define data to bind|| draw is a refresh
                        table.rows.add(json).draw();
                    }
                });
            }
            
        });
    }
    //in future, refactor to call and render accordingly from edit and add buttons
    
    
    //listen for add button to add data to table
    document.getElementById("add-row").addEventListener("click", function(){
        editData(row='z')
    })
    
    //refactored edit/add into a single fx
    function addEditData(row){
        let form
        //if sent here from add modal, row will equal z triggering add portion, if sent from edit modal rowid will be valid triggering edit portion
        row == 'z'?
        form = document.getElementById("#add-form").elements
        :
        form = document.getElementById("#edit-form").elements

        var table = $('#example').DataTable();
        
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

        row == 'z' ?
        (table.row.add(newData).draw(),
        document.forms["#add-form"].reset(),
        $('#DescModalAdd').modal("hide"))
        :
        (table.row( row ).data( newData ).draw(),
        $('#DescModalEdit').modal("hide"))
    }

    document.getElementById("edit-data").addEventListener("click", function(){
        editData(row)
    })
   
