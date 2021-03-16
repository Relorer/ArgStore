using System;
using System.Collections.Generic;
using System.Text;
using Data.Entities;
using Data.Context;
using Data.Interfaces;
using System.Linq;
using System.Data.Entity;

namespace Data.Repositories
{
    public class MarkRepository : IBaseRepository<Mark>
    {
        private BaseContext context;

        public MarkRepository(BaseContext context)
        {
            this.context = context;
        }

        public void DeleteItem(int studentID)
        {
            Mark mark = context.Mark.Find(studentID);
            context.Mark.Remove(mark);
        }

        public Mark GetItemByID(int id)
        {
            return context.Mark.Find(id);
        }

        public IEnumerable<Mark> GetItems()
        {
            return context.Mark.ToList();
        }

        public void InsertItem(Mark mark)
        {
            context.Mark.Add(mark);
        }

        public void UpdateItem(Mark student)
        {
            context.Entry(student).State = EntityState.Modified;
        }
    }
}
