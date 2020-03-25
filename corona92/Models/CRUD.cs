using System;
using System.IO;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace corona92.Models
{
    public static class CRUD
    {
        public static string connectionString = " Data Source = 43.255.152.25;Database=covid92; Integrated Security = False; User ID = corona92;Password=Faizan1!; Connect Timeout = 15; Encrypt=False;Packet Size = 4096";
        public static List<covidCase> getCases()
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();
            SqlCommand cmd;

            try
            {
                cmd = new SqlCommand("SELECT * FROM covidCase", con);
                cmd.CommandType = System.Data.CommandType.Text;

                SqlDataReader rdr = cmd.ExecuteReader();

                List<covidCase> list = new List<covidCase>();
                while (rdr.Read())
                {
                    covidCase cases = new covidCase();

                    cases.province = rdr["province"].ToString();
                    cases.city = rdr["city"].ToString();
                    cases.latitude = float.Parse(rdr["lat"].ToString());
                    cases.longitude = float.Parse(rdr["lng"].ToString());
                    cases.confirmed = int.Parse(rdr["confirmed"].ToString());
                    cases.deaths = int.Parse(rdr["deaths"].ToString());
                    cases.recovered = int.Parse(rdr["recovered"].ToString());
                    list.Add(cases);
                }
                rdr.Close();
                con.Close();

                return list;
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error" + ex.Message.ToString());
                return null;

            }
        }
        public static List<news> getNews()
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();
            SqlCommand cmd;

            try
            {
                cmd = new SqlCommand("SELECT * FROM newsTab", con);
                cmd.CommandType = System.Data.CommandType.Text;

                SqlDataReader rdr = cmd.ExecuteReader();

                List<news> list = new List<news>();
                while (rdr.Read())
                {
                    news cases = new news();

                    cases.id = rdr["id"].ToString();
                    cases.newsText = rdr["news"].ToString();
                    cases.date = rdr["date"].ToString();
                    list.Add(cases);
                }
                rdr.Close();
                con.Close();

                return list;
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error" + ex.Message.ToString());
                return null;

            }
        }


       
        public static void updateDB(IFormFile file)
        {
            String province, city;
            float lat, lng;
            int confirmed, deaths, recovered;
            var csvTable = new DataTable();
            var result = new StringBuilder();
            String line;
            String[] values;
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    SqlConnection con = new SqlConnection(connectionString);
                    con.Open();
                    SqlCommand cmd = new SqlCommand("Delete From covidCase", con);
                    cmd.ExecuteNonQuery();
                    line = reader.ReadLine();
                    while (reader.Peek() >= 0)
                    {
                        line = reader.ReadLine();
                        values = line.Split(',');
                       
                            province = values[0].ToString();
                            city = values[1].ToString();
                            lat = float.Parse(values[2].ToString());
                            lng = float.Parse(values[3].ToString());
                            confirmed = int.Parse(values[4].ToString());
                            deaths = int.Parse(values[5].ToString());
                            recovered = int.Parse(values[6].ToString());
                            cmd = new SqlCommand("insert into covidCase values('" + province + "','"
                        + city + "','" + lat.ToString() + "','" + lng.ToString() +
                        "','" + confirmed.ToString() + "','" + deaths.ToString() + "','" + recovered.ToString() + "')", con);
                            cmd.ExecuteNonQuery();

                        // result.AppendLine(reader.ReadLine());

                        // cmd = new SqlCommand("UPDATE [dbo].[covidCase] SET [confirmed]  "= Integer., [deaths]  = value2,[recovered] WHERE [province] AND [city] condition; ", con);
                        // cmd.CommandType = System.Data.CommandType.Text;

                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error" + ex.Message.ToString());
            }
            /*
            //  using (var csvReader = new CsvReader(new StreamReader(System.IO.File.OpenRead(@"D:\CSVFolder\CSVFile.csv")), true))
            //  {
            //      csvTable.Load(csvReader);
            // }
             String province, city;
             float lat, lng;
             int confirmed, deaths, recovered;
             try
             {
                 var reader = new StreamReader(File.OpenRead("~/images/data.csv"));
                 bool initFlag = false;
                 SqlConnection con = new SqlConnection(connectionString);
                 con.Open();
                 SqlCommand cmd = new SqlCommand("Delete From covidCase", con);
                 cmd.ExecuteNonQuery();

                 while (!reader.EndOfStream)
                 {
                     var line = reader.ReadLine();
                     var values = line.Split(',');
                     if (initFlag)
                     {
                         province = values[0].ToString();
                         city = values[1].ToString();
                         lat = float.Parse(values[2].ToString());
                         lng = float.Parse(values[3].ToString());
                         confirmed = int.Parse(values[4].ToString());
                         deaths = int.Parse(values[5].ToString());
                         recovered = int.Parse(values[6].ToString());
                         cmd = new SqlCommand("insert into covidCase values('" + province + "','"
                     + city + "','" + lat.ToString() + "','" + lng.ToString() +
                     "','" + confirmed.ToString() + "','" + deaths.ToString() + "','" + recovered.ToString() + "')", con);
                         cmd.ExecuteNonQuery();

                     }
                     else
                         initFlag = true;
                 }
             }
             catch (SqlException ex)
             {
                 Console.WriteLine("SQL Error" + ex.Message.ToString());
             }*/

        }
        public static List<HospitalData> getHospitalData()
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();
            SqlCommand cmd;

            try
            {
                cmd = new SqlCommand("SELECT * FROM hospitalData", con);
                cmd.CommandType = System.Data.CommandType.Text;

                SqlDataReader rdr = cmd.ExecuteReader();

                List<HospitalData> list = new List<HospitalData>();
                while (rdr.Read())
                {
                    HospitalData hdata = new HospitalData();

                    hdata.name = rdr["name"].ToString();
                    hdata.province = rdr["province"].ToString();
                    hdata.city = rdr["city"].ToString();
                    hdata.address = rdr["address"].ToString();
                    hdata.latitude = float.Parse(rdr["lat"].ToString());
                    hdata.longitude = float.Parse(rdr["lng"].ToString());
                    list.Add(hdata);
                }
                rdr.Close();
                con.Close();

                return list;
            }

            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error" + ex.Message.ToString());
                return null;

            }
        }
        public static void updateNews(IFormFile file)
        {
            String id;
            String news, date;

            var csvTable = new DataTable();
            var result = new StringBuilder();
            String line;
            String[] values;
            int count = 0;
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                    SqlConnection con = new SqlConnection(connectionString);
                    con.Open();
                    SqlCommand cmd = new SqlCommand("Delete From newsTab", con);
                    cmd.ExecuteNonQuery();
                    line = reader.ReadLine();
                    while (reader.Peek() >= 0)
                    {
                        line = reader.ReadLine();
                        values = line.Split('\t');
                        if (values.Length == 3)
                        {
                            id = values[0].ToString();
                            news = values[1].ToString();
                            date = values[2].ToString();
                            if (news.Contains("'"))
                            {
                                news = news.Replace("'", "''");

                            }
                            cmd = new SqlCommand("insert into newsTab values('" + id + "','"
                          + news + "','" + date + "')", con);
                            cmd.ExecuteNonQuery();
                            count++;
                            if (count == 15)
                                break;
                        }
                        // result.AppendLine(reader.ReadLine());

                        // cmd = new SqlCommand("UPDATE [dbo].[covidCase] SET [confirmed]  "= Integer., [deaths]  = value2,[recovered] WHERE [province] AND [city] condition; ", con);
                        // cmd.CommandType = System.Data.CommandType.Text;

                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("SQL Error" + ex.Message.ToString());
            }

        }

    }
}
