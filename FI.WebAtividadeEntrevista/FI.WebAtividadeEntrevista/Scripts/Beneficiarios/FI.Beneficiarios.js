$(document).ready(function () {

    $("#beneficiarios").on("click", function (e) {


        $.ajax({
            url: "/Beneficiario/index",
            method: "GET",            
            error:
                function (r) {
                    if (r.status == 400)
                        ModalBeneficiario("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalBeneficiario("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalBeneficiario("Beneficiários", r)
                }
        });

    });

    

});

function incluirBene() {

    $.ajax({
            url: "/beneficiario/Incluir",
            data: {
                "CPF": $("#CPFbn").val(),
                "NOME": $("#Nomebn").val(),
                "IDCLIENTE": obj.Id
            },
            method: "POST",
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");

                    
                },
            success:
                function (r) {
                    carregaBeneficiarios(obj.CPF)
                    $("#CPFbn").val(''),
                    $("#Nomebn").val('')
                }
        });
}

function ModalBeneficiario(titulo, texto) {
    var texto = '<div class="modal-dialog">                                                                                 ' +
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
        '  </div><!-- /.modal-dialog -->                                                                                    ' ;
    $("#modalBene").html("");
    $('#modalBene').append(texto);
    $('#modalBene').modal('show');

    var cpf = $('#formCadastro #CPF').val();

    carregaBeneficiarios(cpf);
}

