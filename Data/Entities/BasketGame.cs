using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class BasketGame : BaseEntity
    {
        public virtual Game Game { get; set; }
    }
}
