﻿using Data.Context;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class GameRepository : IBaseRepository<Game>
    {
        private BaseContext context;

        public GameRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string studentID)
        {
            Game game = context.Game.Find(studentID);
            context.Game.Remove(game);
        }

        public async Task<Game> GetItemByID(string id)
        {
            return await context.Game.FindAsync(id);
        }

        public async Task<IEnumerable<Game>> GetItems()
        {
            return await context.Game.Include(p => p.Comments).ToListAsync();
        }


        public async Task<Game> InsertItem(Game game)
        {
            return (await context.Game.AddAsync(game)).Entity;
        }

        public void UpdateItem(Game game)
        {
            context.Entry(game).State = EntityState.Modified;
        }
    }
}
