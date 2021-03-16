using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Entities
{
    public class Comment : BaseEntity
    {
        public string Text { get; set; }
        public virtual User User { get; set; }
        public virtual Game Game { get; set; }
    }
}
