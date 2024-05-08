
$(document).ready(function () {

   
})

async function carregaBeneficiarios(cpf) {

    var beneficiario = await $.ajax({
                                url: urlBeneficiarioList,
                                data: {
                                    "CPF": cpf,
                                    "jtSorting": "Nome"
                                },
                                method: "POST",
                                error:
                                    function (r) {
                                        if (r.status == 400)
                                            ModalBeneficiario("Ocorreu um erro", r.responseJSON);
                                        else if (r.status == 500)
                                            ModalBeneficiario("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                                    },
                                success:
                                    function (r) {
                                        beneficiario = r;
                                    }
    });

    if (beneficiario.Result == "OK") {

        
        var beneficiarios = beneficiario.Records;
        
        

        if (beneficiarios.length > 0) {

            $("#bd-beneficiarios").html("");

            for (var i = 0; i < beneficiarios.length; i++) {

                var linha = document.createElement("tr");

                var cpf = document.createElement("td");
                cpf.appendChild(document.createTextNode(beneficiarios[i].CPF));
                linha.appendChild(cpf);

                var nome = document.createElement("td");
                nome.appendChild(document.createTextNode(beneficiarios[i].Nome));
                linha.appendChild(nome);

                var acoes = document.createElement("td");
                var excluir = document.createElement("button");
                excluir.setAttribute("class", "btn btn-sm btn-primary");
                excluir.setAttribute("onclick", "ExcBeneficiario(" + beneficiarios[i].Id + ")");
                excluir.textContent  = "Excluir";

                var alterar = document.createElement("button");
                alterar.setAttribute("class", "btn btn-sm btn-primary mr-3");
                alterar.setAttribute("style", "margin-right: 5px");
                alterar.setAttribute("onclick", "AltBeneficiario(" + beneficiarios[i].Id + ")");
                alterar.textContent  = "Alterar";
                

                acoes.appendChild(alterar);
                acoes.appendChild(excluir);
                linha.appendChild(acoes);

                $("#bd-beneficiarios").append(linha);
            }
        }
        


    }
    else {
        $("#bd-beneficiarios").html("<tr><td>Sem dados a carregar</td><td></td><td></td></tr>");
    };

}