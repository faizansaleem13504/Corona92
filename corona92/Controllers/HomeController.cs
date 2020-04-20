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
            //return RedirectToAction("Statistics", "Home");
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
        public IActionResult Statistics()
        {
            List<DailyCases> casesToday = null;
            List<DailyCases> newCases= null;
            DailyCases today = new DailyCases();
            DailyCases newYesterday = new DailyCases();
            List<DailyCases> yesterdaycases = new List<DailyCases>();
            List<DailyCases> todaycases = new List<DailyCases>();
            List<DailyCases> twoDaysBefore = new List<DailyCases>();
            List<DailyCases> dailyCasesList = CRUD.getDailyData();
            twoDaysBefore = dailyCasesList.GetRange(dailyCasesList.Count() - 24, 8);
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
                today.active=Math.Abs(today.active);
                newYesterday = new DailyCases();
                newYesterday.province = yesterdaycases[7].province;
                newYesterday.city = yesterdaycases[7].city;
                newYesterday.latitude = yesterdaycases[7].latitude;
                newYesterday.longitude = yesterdaycases[7].longitude;
                newYesterday.confirmed = yesterdaycases[7].confirmed - twoDaysBefore[7].confirmed;
                newYesterday.active = yesterdaycases[7].active - twoDaysBefore[7].active;
                newYesterday.closed = yesterdaycases[7].closed - twoDaysBefore[7].closed;
                newYesterday.deaths = yesterdaycases[7].deaths - twoDaysBefore[7].deaths;
                newYesterday.recovered = yesterdaycases[7].recovered - twoDaysBefore[7].recovered;                
            
            DailyCases percentage = new DailyCases();
            double confirmedCasesPercentage = (((double)today.confirmed / (double)newYesterday.confirmed)  )*100;
            double activeCasesPercentage = (((double)(today.active/ (double)newYesterday.active) ))*100;
            double closedCasesPercentage = ((double)today.closed / (double)newYesterday.closed )*100;
            double deathsCasesPercentage = ((double)today.deaths / (double)newYesterday.deaths ) * 100;
            double recoveredCasesPercentage = ((double)today.recovered / (double)newYesterday.recovered  ) * 100;
            percentage.confirmed = Math.Abs((int)confirmedCasesPercentage);
            percentage.closed = Math.Abs((int)closedCasesPercentage);
            percentage.active = Math.Abs(((int)activeCasesPercentage));
            percentage.deaths = Math.Abs((int)deathsCasesPercentage);
            percentage.recovered = Math.Abs((int)recoveredCasesPercentage);
            //set falg to show increase or decrese
            DailyCases increase = new DailyCases(); increase.confirmed = 0;increase.active = 0;increase.closed = 0;
            increase.deaths = 0; increase.recovered = 0;
            if (today.confirmed > newYesterday.confirmed)
                increase.confirmed = 1;
            if (today.active > newYesterday.active)
                increase.active = 1;
            else
                today.active = newYesterday.active - today.active;
            if (today.closed > newYesterday.closed)
                increase.closed = 1;
            if (today.deaths > newYesterday.deaths)
                increase.deaths = 1;
            if (today.recovered > newYesterday.recovered)
                increase.recovered = 1;
            //todaycases = list.ge
            ViewBag.increase = increase;
            ViewBag.percent = percentage;
            ViewBag.newCases = newCases;
            ViewBag.casesToday = casesToday;
            ViewBag.casesToday1 = JsonConvert.SerializeObject(casesToday);
            ViewBag.dailyCasesList = dailyCasesList;
            ViewBag.dailyCasesList1 = JsonConvert.SerializeObject(dailyCasesList);
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
