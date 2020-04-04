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

            //CRUD.getDailyData();
            //return RedirectToAction("Index", "Nimad19990825");
            //return RedirectToAction("stat","Home");
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
        public IActionResult stat()
        {
            List<DailyCases> casesToday = null;
            List<DailyCases> newCases= null;
            DailyCases today = new DailyCases();
            List<DailyCases> yesterdaycases = new List<DailyCases>();
            List<DailyCases> todaycases = new List<DailyCases>();
            List<DailyCases> dailyCasesList = CRUD.getDailyData();
            yesterdaycases = dailyCasesList.GetRange(dailyCasesList.Count() - 16, 8);
            todaycases = dailyCasesList.GetRange(dailyCasesList.Count() - 8, 8);
            casesToday = todaycases;
            newCases = new List<DailyCases>();
            for (int i = 0; i < yesterdaycases.Count; i++)
            {
                today = new DailyCases();
                today.province = yesterdaycases[i].province;
                today.city = yesterdaycases[i].city;
                today.latitude = yesterdaycases[i].latitude;
                today.longitude = yesterdaycases[i].longitude;
                today.confirmed = todaycases[i].confirmed - yesterdaycases[i].confirmed;
                today.active = todaycases[i].active - yesterdaycases[i].active;
                today.closed = todaycases[i].closed - yesterdaycases[i].closed;
                today.deaths = todaycases[i].deaths - yesterdaycases[i].deaths;
                today.recovered = todaycases[i].recovered - yesterdaycases[i].recovered;
                newCases.Add(today);
            }
            //todaycases = list.ge
            ViewBag.newCases = newCases;
            ViewBag.casesToday = casesToday;
            ViewBag.dailyCasesList = dailyCasesList;
            return View();
        }

        public IActionResult Analysis()
        {

            ViewBag.sentiments = @"~/images/sentiment.png?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.movies = @"~/images/movie.gif?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.movies2 = @"~/images/movie2.gif?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.cases = @"~/images/cases.jpeg?" + DateTime.Now.ToString("HHmmsskkk");
            ViewBag.prediction = @"~/images/prediction.jpeg?" + DateTime.Now.ToString("HHmmsskkk");

            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

}
