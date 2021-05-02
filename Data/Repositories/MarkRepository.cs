﻿using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Context;
using Data.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class MarkRepository : IBaseRepository<Mark>
    {
        private BaseContext context;

        public MarkRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(string studentID)
        {
            Mark mark = context.Mark.Find(studentID);
            context.Mark.Remove(mark);
        }

        public async Task<Mark> GetItemByID(string id)
        {
            return await context.Mark.FindAsync(id);
        }

        public async Task<IEnumerable<Mark>> GetItems()
        {
            return await context.Mark.ToListAsync();
        }

        public async Task<Mark> InsertItem(Mark mark)
        {
            return (await context.Mark.AddAsync(mark)).Entity;
        }

        public void UpdateItem(Mark student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
