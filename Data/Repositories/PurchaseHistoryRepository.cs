using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Interfaces;
using Data.Context;
using System.Data.Entity;
using System.Linq;

namespace Data.Repositories
{
    public class PurchaseHistoryRepository : IBaseRepository<PurchaseHistory>
    {
        private BaseContext context;

        public PurchaseHistoryRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            PurchaseHistory purchaseHistory = context.PurchaseHistory.Find(studentID);
            context.PurchaseHistory.Remove(purchaseHistory);
        }

        public PurchaseHistory GetItemByID(int id)
        {
            return context.PurchaseHistory.Find(id);
        }

        public IEnumerable<PurchaseHistory> GetItems()
        {
            return context.PurchaseHistory.ToList();
        }

        public void InsertItem(PurchaseHistory purchaseHistory)
        {
            context.PurchaseHistory.Add(purchaseHistory);
        }

        public void UpdateItem(PurchaseHistory student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
