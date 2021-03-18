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

        public void DeleteItem(int studentID)
        {
            PurchasedGame purchasedGame = context.PurchasedGame.Find(studentID);
            context.PurchasedGame.Remove(purchasedGame);
        }

        public async Task<PurchasedGame> GetItemByID(int id)
        {
            return await context.PurchasedGame.FindAsync(id);
        }

        public async Task<IEnumerable<PurchasedGame>> GetItems()
        {
            return await context.PurchasedGame.ToListAsync();
        }

        public async Task<PurchasedGame> InsertItem(PurchasedGame purchasedGame)
        {
            return (await context.PurchasedGame.AddAsync(purchasedGame)).Entity;
        }

        public void UpdateItem(PurchasedGame student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
