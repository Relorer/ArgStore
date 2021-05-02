using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Rating : BaseEntity 
    {
        public Rating()
        {
            this.Marks = new HashSet<Mark>();
        }

        public virtual ICollection<Mark> Marks { get; set; }
    }
}
