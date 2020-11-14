using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class BuyResponse
    {
        public string PublicId { get; set; }
        public int Amount { get; set; }
        public int OrderId { get; set; }
    }
}
