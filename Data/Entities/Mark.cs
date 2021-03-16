using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Mark : BaseEntity
    {
        public string Value { get; set; }
        public virtual User User { get; set; }
        public virtual Rating Rating { get; set; }
    }
}
