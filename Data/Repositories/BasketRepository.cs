using Data.Entities;
using Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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

        public async Task<Basket> GetItemByID(int id)
        {
            return await context.Basket.FindAsync(id);
        }

        public async Task<IEnumerable<Basket>> GetItems()
        {
            return await context.Basket.ToListAsync();
        }

        public async Task<Basket> InsertItem(Basket basket)
        {
            return (await context.Basket.AddAsync(basket)).Entity;
        }

        public void UpdateItem(Basket student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
