using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Interfaces;
using Data.Context;
using System.Linq;
using System.Data.Entity;

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

        public PurchasedGame GetItemByID(int id)
        {
            return context.PurchasedGame.Find(id);
        }

        public IEnumerable<PurchasedGame> GetItems()
        {
            return context.PurchasedGame.ToList();
        }

        public void InsertItem(PurchasedGame purchasedGame)
        {
            context.PurchasedGame.Add(purchasedGame);
        }

        public void UpdateItem(PurchasedGame student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
