﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        [Required]
        public Basket Basket { get; set; }
        public ICollection<Mark> Marks { get; set; }
        public ICollection<Comment> Comments{ get; set; }
    }
}
