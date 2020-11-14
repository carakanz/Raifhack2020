using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }

        public int SiteId { get; set; }
        public ICollection<Product> Products { get; set; }

    }
}
