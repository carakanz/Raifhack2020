using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class BuyRequest
    {
        public string Name { get; set; }
        [Phone]
        public string Phone { get; set; }
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateTime { get; set; }
        public int[] Products { get; set; }
    }
}
