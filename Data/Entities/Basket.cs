using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Basket : BaseEntity
    {
        public ICollection<Game> Games { get; set; }
        public virtual User User { get; set; }
    }
}
