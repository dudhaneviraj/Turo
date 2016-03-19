$( "#target" ).click(function() {
    $.ajax({
           type: "GET",
           crossDomain: true,
           url: "/requests?location="+document.getElementById("location").value+"&startdate="+document.getElementById("startdate").value+"&enddate="+document.getElementById("enddate").value+"&pickup="+document.getElementById("pickup").value+"&dropoff="+document.getElementById("dropoff").value,
           success: function(data){
               var obj=JSON.parse(data);
               if(obj.Errors.hasOwnProperty('Error'))
               {
                    alert(obj.Errors.Error.ErrorMessage)
                    return;
               }
                createDatatable(obj.Result)
                createMetaDataTable(obj.MetaData.CarMetaData.CarTypes)
           }
    });

});

function createMetaDataTable(cartypes)
{
    document.getElementById("mdata").innerHTML="";
    $('#mdata').append("<H3>&nbsp;&nbsp;&nbsp;Car Metadata</H3>");
    var body = document.getElementById("mdata");
    var tbl = document.createElement('table');
    tbl.classList.add("table");
    tbl.classList.add("table-striped");
    tbl.classList.add("table-hover");
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    tr.setAttribute("class","success")
    for(var key in cartypes[0]) {
           var th=document.createElement('th');
           th.appendChild(document.createTextNode(key))
           tr.appendChild(th)
      }
    thead.appendChild(tr)
    tbl.appendChild(thead)
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < cartypes.length; i++) {
        var tr = document.createElement('tr');
            tr.setAttribute("class","active")
        for(var key in cartypes[i]) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(cartypes[i][key]))
            tr.appendChild(td);
        }
            tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}


function createDatatable(result)
{
    document.getElementById("data").innerHTML="";
    $('#data').append("<H2>&nbsp;&nbsp;&nbsp;Car Data</H2>");
    var body = document.getElementById("data");
    var tbl = document.createElement('table');
    tbl.classList.add("table");
    tbl.classList.add("table-striped");
    tbl.classList.add("table-hover");
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    tr.setAttribute("class","success")
    for(var key in result[0]) {
        if(key=="ResultId")
            continue;
        var th=document.createElement('th');
        th.appendChild(document.createTextNode(key))
        tr.appendChild(th)
    }
    thead.appendChild(tr)
    tbl.appendChild(thead)
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute("class","active")
        for(var key in result[i]) {
            if(key=="ResultId")
                continue;
            var td = document.createElement('td');
            if(key=="DeepLink")
            {
                var link=document.createElement('a');
                link.setAttribute("href",result[i][key]);
                link.innerHTML="Link";
                td.appendChild(link);
            }
            else
                td.appendChild(document.createTextNode(result[i][key]))
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}
$( "input" ).change(function() {
    if(document.getElementById("location").value=="" || document.getElementById("startdate").value =="" || document.getElementById("enddate").value=="" || document.getElementById("pickup").value=="" || document.getElementById("dropoff").value=="" )
    {
        document.getElementById("target").disabled = true;
    }else
        document.getElementById("target").disabled = false;

});

$( document ).ready(function() {
        if(document.getElementById("location").value=="" || document.getElementById("startdate").value =="" || document.getElementById("enddate").value=="" || document.getElementById("pickup").value=="" || document.getElementById("dropoff").value=="" )        document.getElementById("target").disabled = true;
});

$(document).keypress(function(e) {
    if(e.which == 13)
        document.getElementById("target").click();
});
