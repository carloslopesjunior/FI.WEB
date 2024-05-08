﻿
IF OBJECT_ID('FI_SP_ConsBeneficiario') IS NOT NULL
DROP PROCEDURE FI_SP_ConsBeneficiario

GO

CREATE PROC FI_SP_ConsBeneficiario
	@ID BIGINT,
	@IDCLIENTE BIGINT
AS
BEGIN
	IF(ISNULL(@ID,0) = 0)
		SELECT NOME, CPF FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE = @IDCLIENTE
	ELSE
		SELECT NOME, CPF FROM BENEFICIARIOS WITH(NOLOCK) WHERE ID = @ID AND IDCLIENTE = @IDCLIENTE
END