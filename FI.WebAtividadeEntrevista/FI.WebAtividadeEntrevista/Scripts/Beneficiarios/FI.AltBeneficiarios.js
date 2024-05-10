function AltBeneficiario(id, cpf) {

    if (id == 0) {
        id = cpf;
    }

    var linha = $("#" + id).children();

    $("#CPFbn").val(linha.eq(0).text());
    $("#Nomebn").val(linha.eq(1).text());

    var btn = document.getElementById("InclBn"); 
    btn.setAttribute("onclick", 'altLinha(' + id + ')');
    btn.textContent = "Alterar";

}

async function ExcBeneficiario(id, cpf){

    if (id==0) {
        $("#" + cpf).remove();
    }
    else {
        var beneficiario = await $.ajax({
            url: "/Beneficiario/Excluir",
            data: {
                "ID": id
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

                    ModalDialog("Sucesso!", r);

                }
        });

        carregaBeneficiarios(obj.CPF);
    }
    
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function incluirBene() {

    var existe = false
    var cpf = $("#CPFbn").val()
    var nome = $("#Nomebn").val()

    $("#bd-beneficiarios").children("tr").each(function () {
        $(this).children("td").each(function () {

            if ($(this).text() == cpf) {
                existe = true;
            }

        });
    });

    if (existe) {
        ModalDialog("Atenção", "CPF já cadastrado");
    }
    else if (!validarCPF(cpf)) {
        ModalDialog("Atenção", "CPF inválido");
    }
    else {
        AddLinhaBeneficiario(cpf, nome, 0);
    }

    $("#CPFbn").val("");
    $("#Nomebn").val("");
    
}


function altLinha(id) {

    var linha = $("#" + id).children();

    linha.eq(0).text($("#CPFbn").val());
    linha.eq(1).text($("#Nomebn").val());

    var btn = document.getElementById("InclBn"); 
    btn.setAttribute("onclick", 'incluirBene()');
    btn.textContent = "Incluir";

}

async function salvaBeneficiario(IDCLIENTE) {

    var url  = "";
    var cpf  = "";
    var nome = "";
    var id = "";
    var status = "";

    var objeto = $("#bd-beneficiarios");
    var linhas = objeto.children();

    for (var i = 0; i < linhas.length; i++) {

        //alert(linhas.eq(i).children("td").eq(0).text());

        if (linhas.eq(i).hasClass('novo')) {

            url = "/beneficiario/Incluir"
            id = 0;
        }
        else {

            url = "/beneficiario/Alterar";
            id = linhas.eq(i).attr("id");
        }

        cpf = linhas.eq(i).children("td").eq(0).text();
        nome = linhas.eq(i).children("td").eq(1).text();

          await $.ajax({
                url: url,
                data: {
                    "CPF": cpf,
                    "NOME": nome,
                    "IDCLIENTE": IDCLIENTE,
                    "ID": id
                },
                method: "POST",
                error:
                    function (r) {
                        if (r.status == 400) {
                            status = r.responseJSON;
                        
                        }
                        else if (r.status == 500) {
                            status = "Ocorreu um erro interno no servidor.";
                        
                        }
                    },
                success:
                    function (r) {
                        $("#bd-beneficiarios").html("");
                        status = "sucesso";
                   

                    }
            });

    }
    
    return status
}