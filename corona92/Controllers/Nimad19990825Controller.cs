using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using corona92.Models;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace corona92.Controllers
{
   
    public class Nimad19990825Controller : Controller
    {
        private IHostingEnvironment _env;
        public Nimad19990825Controller(IHostingEnvironment env)
        {
            _env = env;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            /*if (file == null || file.Length == 0)
                return Content("file not selected");
             String temp = Directory.GetCurrentDirectory();
                  var path = Path.Combine(
                              "~","images",
                              file.FileName);
                  if (!Directory.Exists("~/images"))
                 {
                    Directory.CreateDirectory("~/images");
                }
                using (var stream = new FileStream(path, FileMode.Create))
               {
                 await file.CopyToAsync(stream);
             }*/
            CRUD.updateDB(file);
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> UploadResources(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return Content("file not selected");
            var webRoot = _env.WebRootPath;
             var path = Path.Combine(
                               webRoot,"images",
                              file.FileName);
            if (!Directory.Exists(webRoot))
                 {
                    Directory.CreateDirectory(webRoot);
                  }
                using (var stream = new FileStream(path, FileMode.Create))
               {
                 await file.CopyToAsync(stream);
             }
            //CRUD.updateDB(file);
            return RedirectToAction("Index");
        }
        public ActionResult updateToDatabase()
        {
           // CRUD.updateDB();
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> UploadNews(IFormFile file)
        {
            CRUD.updateNews(file);
            return RedirectToAction("Index");
        }
    }
}
