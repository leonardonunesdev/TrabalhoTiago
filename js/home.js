$(function(){
    $('#txtMusicTimer').mask("00:00:00");
    $('#txtMusicTimer').val("00:00:10");

    $('#txtMusicTimer').datetimepicker({
        pickDate: false
    });

    $('#txtMusicTimer').focus(function(){
        $('.bootstrap-datetimepicker-widget').css("display","block");
    });

    $('#txtMusicTimer').blur(function(){
        $('.bootstrap-datetimepicker-widget').css("display","none");
    })

    $("#btnStart").click(function(){
        startCont($('#txtMusicTimer').val());
    })

    $("#btnDesmute").click(function(){
        $.ajax({
            url: '/desmute',
            type: 'GET'
            }).done(function(res) {
                if (res.success) {
                    console.log('Audio desligado.');
                } else {
                    console.log('Erro ao deligar o audio.');
                }
            });
    })
}) 

function startCont(inputValue){
    if(inputValue != "00:00:00"){
        var data = new Date("01/01/1995 " + inputValue);// Utiliza a função Date para pegar o tempo atual no contador
        var horario = "";// Armazena o resultado da hora em toda recursividade

        var horas = data.getHours();// Variável que controla as horas
        var minutos = data.getMinutes();// Variável que controla os minutos
        var segundos = data.getSeconds();// Variável que controla os segundos

        if(segundos == 0){
            minutos --;
            segundos = 59;
        }else{
            segundos --;
        }

        if(horas != 0){
            if(minutos == 0){
                horas --;
                minutos = 59;
                segundos = 59;
            }
        }

        if(horas < 10){
            horas = "0" + horas;
        }

        if(minutos < 10){
            minutos = "0" + minutos;
        }

        if(segundos < 10){
            segundos = "0" + segundos;
        }

        horario = horas + ":" + minutos + ":" + segundos;
        $("#txtMusicTimer").val(horario);
        setTimeout(function (){startCont(horario)}, 1000);
    }else{
        $.ajax({
            url: '/mute',
            type: 'GET'
            }).done(function(res) {
                if (res.success) {
                    console.log('Audio desligado.');
                } else {
                    console.log('Erro ao deligar o audio.');
                }
            });
    }
}