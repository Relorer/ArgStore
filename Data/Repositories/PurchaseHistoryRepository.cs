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
    public class PurchaseHistoryRepository : IBaseRepository<PurchaseHistory>
    {
        private BaseContext context;

        public PurchaseHistoryRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string studentID)
        {
            PurchaseHistory purchaseHistory = context.PurchaseHistory.Find(studentID);
            purchaseHistory.IsDeleted = true;
            UpdateItem(purchaseHistory);
        }

        public async Task<PurchaseHistory> GetItemByID(string id)
        {
            return await context.PurchaseHistory.FindAsync(id);
        }

        public async Task<IEnumerable<PurchaseHistory>> GetItems()
        {
            return await context.PurchaseHistory.Where(a => !a.IsDeleted).ToListAsync();
        }

        public async Task<PurchaseHistory> InsertItem(PurchaseHistory purchaseHistory)
        {
            return (await context.PurchaseHistory.AddAsync(purchaseHistory)).Entity;
        }

        public void UpdateItem(PurchaseHistory student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
