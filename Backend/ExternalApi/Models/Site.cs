using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class Site
    {
        [Key]
        public int Id { get; set; }
        [Index]
        public string Slug { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public ICollection<Delivery> Deliveries { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
