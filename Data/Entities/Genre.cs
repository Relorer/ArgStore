using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Genre : BaseEntity
    {
        public Genre()
        {
            this.Games = new HashSet<Game>();
        }

        public string Name { get; set; }
        public virtual ICollection<Game> Games{ get; set; }
    }
}
