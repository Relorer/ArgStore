using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Rating : BaseEntity 
    {
        public ICollection<Mark> Marks { get; set; }
    }
}
