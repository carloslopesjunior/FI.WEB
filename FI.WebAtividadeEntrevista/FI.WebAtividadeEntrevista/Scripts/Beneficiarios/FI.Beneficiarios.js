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



function ModalBeneficiario(titulo, texto) {
    
    
    var cpf = $('#formCadastro #CPF').val();

    const linhas = $("#bd-beneficiarios").children("tr")

    if (linhas.length <= 0) {

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
            '  </div><!-- /.modal-dialog -->                                                                                    ';
        $("#modalBene").html("");
        $('#modalBene').append(texto);


        carregaBeneficiarios(cpf);

    } 

    $('#modalBene').modal('show');
    
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D+/g, ''); // Remove caracteres não numéricos
    if (cpf === '') return false; // CPF vazio é inválido

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true; // CPF válido
}