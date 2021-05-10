using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Interfaces;
using Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class PurchasedGameRepository : IBaseRepository<PurchasedGame>
    {
        private BaseContext context;

        public PurchasedGameRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string id)
        {
            PurchasedGame purchasedGame = context.PurchasedGame.Find(id);
            purchasedGame.IsDeleted = true;
            UpdateItem(purchasedGame);
        }

        public async Task<PurchasedGame> GetItemByID(string id)
        {
            return await context.PurchasedGame.FindAsync(id);
        }

        public async Task<IEnumerable<PurchasedGame>> GetItems()
        {
            return await context.PurchasedGame.Where(a => !a.IsDeleted).ToListAsync();
        }

        public async Task<PurchasedGame> InsertItem(PurchasedGame purchasedGame)
        {
            return (await context.PurchasedGame.AddAsync(purchasedGame)).Entity;
        }

        public void UpdateItem(PurchasedGame item)
        {
            context.Entry(item).State = EntityState.Modified;
        }
    }
}
