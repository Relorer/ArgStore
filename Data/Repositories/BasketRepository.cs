using Data.Entities;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Data.Context;
using System.Linq;
using System.Data.Entity;

namespace Data.Repositories
{
    public class BasketRepository : IBaseRepository<Basket>
    {
        private BaseContext context;

        public BasketRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Basket basket = context.Basket.Find(studentID);
            context.Basket.Remove(basket);
        }

        public Basket GetItemByID(int id)
        {
            return context.Basket.Find(id);
        }

        public IEnumerable<Basket> GetItems()
        {
            return context.Basket.ToList();
        }

        public void InsertItem(Basket basket)
        {
            context.Basket.Add(basket);
        }

        public void UpdateItem(Basket student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
