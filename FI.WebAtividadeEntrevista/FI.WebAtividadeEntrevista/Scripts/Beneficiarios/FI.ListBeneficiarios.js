
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
        
        $("#bd-beneficiarios").html("");

        if (beneficiarios.length > 0) {            

            for (var i = 0; i < beneficiarios.length; i++) {

                AddLinhaBeneficiario(beneficiarios[i].CPF, beneficiarios[i].Nome, beneficiarios[i].Id)
            }
        }
        
    }
    else {
        $("#bd-beneficiarios").html("<tr><td>Sem dados a carregar</td><td></td><td></td></tr>");
    };

}

function AddLinhaBeneficiario(CPF, NOME, ID) {

    var linha = document.createElement("tr");

    if (ID == 0) {
        linha.setAttribute("id", CPF);
        linha.setAttribute("class", "novo");
    }
    else {
        linha.setAttribute("id", ID);
    }

    var _cpf = document.createElement("td");
    _cpf.appendChild(document.createTextNode(CPF));
    linha.appendChild(_cpf);

    var _nome = document.createElement("td");
    _nome.appendChild(document.createTextNode(NOME));
    linha.appendChild(_nome);

    var acoes = document.createElement("td");
    var excluir = document.createElement("button");
    excluir.setAttribute("class", "btn btn-sm btn-primary");
    excluir.setAttribute("onclick", 'ExcBeneficiario(' + ID + ', "' + CPF + '")');
    excluir.textContent = "Excluir";

    var alterar = document.createElement("button");
    alterar.setAttribute("class", "btn btn-sm btn-primary mr-3");
    alterar.setAttribute("style", "margin-right: 5px");
    alterar.setAttribute("onclick", 'AltBeneficiario(' + ID + ', "' + CPF + '")');
    alterar.textContent = "Alterar";


    acoes.appendChild(alterar);
    acoes.appendChild(excluir);
    linha.appendChild(acoes);

    $("#bd-beneficiarios").append(linha);
}