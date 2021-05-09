using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgStore.Models
{
    public class SettingMarkForGameModel
    {
        public Mark Mark { get; set; }
        public Game Game { get; set; }
    }
}
