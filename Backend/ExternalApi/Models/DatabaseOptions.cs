using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExternalApi.Models
{
    public class DatabaseOptions : IDatabaseOptions
    {
        public string PostgreSqlConnection { get; set; }
        public string MongoDBConnection { get; set; }
        public string MongoDBName { get; set; }
    }

    public interface IDatabaseOptions
    {
        string PostgreSqlConnection { get; set; }
        string MongoDBConnection { get; set; }
        string MongoDBName { get; set; }
    }
}
