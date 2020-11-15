﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public int Cost { get; set; }
        public Product Product { get; set; }
        public Order Order { get; set; }
    }
}
