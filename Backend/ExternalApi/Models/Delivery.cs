using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class Delivery
    {
        [Key]
        public int Id { get; set; }
        public string Type { get; set; }
        public int Cost { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public Site Site { get; set; }
    }
}
