$(document).ready(function(){

    $.getJSON("/divyansh/fetchallstates",function(data){
     
        data.map((item)=>{
            $('#sourcestate').append($('<option>').text(item.statename).val(item.stateid));
            $('#destinationstate').append($('<option>').text(item.statename).val(item.stateid))
        })
        $('#sourcestate').formSelect();
        $('#destinationstate').formSelect();
    })
    $("#sourcestate").change(function(){
        $('#sourcecity').empty()
        $('#sourcecity').append($('<option disabled selected>').text('choose your city'))
        $.getJSON("/divyansh/fetchallcity",{stateid:$('#sourcestate').val()},function(data){
     
            data.map((item)=>{
                $('#sourcecity').append($('<option>').text(item.cityname).val(item.cityid))
            })
            $('#sourcecity').formSelect();
        })
    })
        $("#destinationstate").change(function(){
            $('#destinationcity').empty()
            $('#destinationcity').append($('<option disabled selected>').text('choose your city'))
            $.getJSON("/divyansh/fetchallcity",{stateid:$('#destinationstate').val()},function(data){
         
                data.map((item)=>{
                    $('#destinationcity').append($('<option>').text(item.cityname).val(item.cityid))
                })
                $('#destinationcity').formSelect();
            })
            
        })
        
    })
