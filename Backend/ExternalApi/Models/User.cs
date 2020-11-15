using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class User
    {
        //"000003333328007-33328007"
        [Key]
        public int Id { get; set; }
        public string PublicId { get; set; }
        public ICollection<Site> Sites { get; set; }
    }
}
