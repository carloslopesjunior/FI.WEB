
IF OBJECT_ID('FI_SP_AltBeneficiario','P') IS NOT NULL
DROP PROCEDURE FI_SP_AltBeneficiario

GO

CREATE PROC FI_SP_AltBeneficiario
    @NOME          VARCHAR (50) ,
	@Id            BIGINT,
	@CPF		   VARCHAR(15)
AS
BEGIN
	UPDATE BENEFICIARIOS 
	SET 
		NOME = @NOME, 		
		CPF  = @CPF
	WHERE Id = @Id
END