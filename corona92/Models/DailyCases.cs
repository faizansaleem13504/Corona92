using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace corona92.Models
{
    public class DailyCases
    {
        public String province;
        public String city;
        public float longitude;
        public float latitude;
        public int confirmed;
        public int active;
        public int closed;
        public int deaths;
        public int recovered;
        public DateTime date;
    }
}
