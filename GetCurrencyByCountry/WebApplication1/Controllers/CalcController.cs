using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CalcController : Controller
    {
        // GET: Calc
        [HttpGet]
        public ActionResult Sum()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetResult(SumModels model)
        {
            localhost1.Service newservice = new localhost1.Service();
            //  char sign = '+';
            model.result = newservice.Calc(model.firstNumber, model.secondNumber,model.sign);
          
            model.IsSuccess = true;
            return Json(model);
        }


        public ActionResult Result(SumModels summodel)
        {
            return View(summodel);
        }

    }
}