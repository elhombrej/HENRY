let URL = "http://localhost:5000/amigos";

let showFriends = function(){

    $("#lista").empty();

    $.get(`${URL}`,function(friends){

        friends.forEach(elemento => {

            $("#lista").append(`<li id = "${elemento.id}"> ${elemento.name} <button onclick = deleteFriend(${elemento.id})>Eliminar</button> </li>`);
            
        });
    });

}
$('#boton').click(showFriends);

$("#search").click(function(){

    let id = $("#input").val();

    $.get(`${URL}/${id}`, function(friend){

        console.log(friend);

        if (friend){


            $("#amigo").text(`${friend.name} ${friend.age} ${friend.email}`);

            $("#input").val("");
        
        }else{

            console.log("el amigo no existe")

            $("#amigo").text(`no hay un amigo con el id ${id}`)
        }

    })
})

$('#delete').click(function(){

    let id = $('#inputDelete').val();

    $.ajax
})

let deleteFriend = function(idCruz){

    let id;

    if(typeof idCruz === "number"){

        id = idCruz;
    
    } else {

        id = $('#inputDelete').val();
    }

    let friend;
    
    if (id){

        $.get(`${URL}/${id}`,function(data){

            friend = data;
        });

        $.ajax(

            {url: `${URL}/${id}`,
            
            type: 'DELETE',

            success: function(){

                if (friend){
                $('#success').text(`Tu amigo ${friend.name} fue borrado con exito!`);

                $(`#inputDelete`).val("");

                showFriends();

                } else {$('#success').text('No existe ese ID');

                showFriends();

            }
            }
    });

    } else {

        $('#success').text('Ingrese un ID valido');
    };
};

$('#delete').click(deleteFriend);