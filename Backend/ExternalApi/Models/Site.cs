using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class Site
    {
        [Key]
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public ICollection<Delivery> Deliveries { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
