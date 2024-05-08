using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            long ID = 0;

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                string msg = "";

                if (!bo.validaCPF(model.CPF))
                {
                    msg = "CPF INVÁLIDO";
                }
                else if (bo.VerificarExistencia(model.CPF, ID, model.IdCliente))
                {
                    msg = "CPF já cadastrado";
                }
                

                if (!string.IsNullOrEmpty(msg))
                {
                    Response.StatusCode = 400;
                    return Json(msg);
                }
                else
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        
                        Nome = model.Nome,
                        CPF = model.CPF,
                        IdCliente = model.IdCliente

                    });

                    return Json("Cadastro efetuado com sucesso");
                }


            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                string msg = "";

                if (!bo.validaCPF(model.CPF))
                {
                    msg = "CPF INVÁLIDO";
                }
                else if (bo.VerificarExistencia(model.CPF, model.Id, model.IdCliente))
                {
                    msg = "CPF já cadastrado";
                }



                if (!string.IsNullOrEmpty(msg))
                {
                    Response.StatusCode = 400;
                    return Json(msg);
                }
                else
                {
                    bo.Alterar(new Beneficiario()
                    {
                        Id = model.Id,                        
                        Nome = model.Nome,
                        CPF = model.CPF
                    });

                    return Json("Cadastro alterado com sucesso");
                }


            }
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();                    
            
            try
            {
                bo.Excluir(id);
                return Json("Cadastro excluido com sucesso");
            }
            catch (Exception)
            {

                Response.StatusCode = 400;
                return Json("Falha na exclusão do beneficiário");

            }

            
        }

        [HttpPost]
        public JsonResult BeneficiarioList(string cpf, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');

                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), cpf, out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

    }
}
