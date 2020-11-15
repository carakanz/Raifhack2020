using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public enum Status
    {
        AwaitingPayment,
        SuccessPayment,
        FailPayment,
    }
    public class Order
    {
        public int Id { get; set; }
        public Site Site { get; set; }
        public int Amount { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DateTime { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }

    }
}
