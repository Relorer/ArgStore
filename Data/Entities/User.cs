using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data.Entities
{
    public class User : IdentityUser
    {
        public User()
        {
            this.Marks = new HashSet<Mark>();
            this.Comments = new HashSet<Comment>();
        }

        public string Login { get; set; }
        public string Password { get; set; }

        public Basket Basket { get; set; }
        public virtual ICollection<Mark> Marks { get; set; }
        public virtual ICollection<Comment> Comments{ get; set; }
    }
}
