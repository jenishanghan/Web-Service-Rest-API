using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CountryController : Controller
    {
        [HttpGet]
        public ActionResult Country()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetCountry(CountryModels model)
        {
            country.net.webservicex.www.country newservice = new country.net.webservicex.www.country();
           
            if(model.countryName != null && model.countryName != "")
            {
                model.currencyName = newservice.GetCurrencyByCountry(model.countryName);
                model.IsSuccess = true;
            }
            return Json(model);
        }

        public ActionResult Result(CountryModels model)
        {
            return View(model);
        }
    }
}