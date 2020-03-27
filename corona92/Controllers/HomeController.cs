using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using corona92.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System.IO;

namespace corona92.Controllers
{
    public class HomeController : Controller
    {
        private IHostingEnvironment _env;
        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }
        public IActionResult Index()
        {
            var path = Path.Combine(_env.WebRootPath, "images", "news.tsv");
            ViewBag.news = CRUD.getNews();

            var ajson = JsonConvert.SerializeObject(CRUD.getHospitalData());
            ViewBag.hospitalData = ajson;
            return View(CRUD.getCases());
        }
        public IActionResult Response()
        {
            ViewBag.image1 = @"~/images/image1.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.image2 = @"~/images/image2.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.image3 = @"~/images/image3.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.image4 = @"~/images/image4.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.image5 = @"~/images/image5.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.image6 = @"~/images/image6.jpeg?" + DateTime.Now.ToString("HHmmsskkk");

            return View();
        }
        public IActionResult Awareness()
        {
            return View();
        }
        public IActionResult Analysis()
        {

            ViewBag.userEngage = @"~/images/userEngage.jpeg?"+DateTime.Now.ToString("HHmmsskkk");
            ViewBag.twitter = @"~/images/twitter.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.satisfaction = @"~/images/satisfaction.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.relatives = @"~/images/relatives.jpeg?" + DateTime.Now.ToString("HHmmsskkk");

            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
    
}
