using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Interfaces
{
    public interface IBaseRepository<item>
    {
        IEnumerable<item> GetItems();
        item GetItemByID(int studentId);
        void InsertItem(item student);
        void DeleteItem(int studentID);
        void UpdateItem(item student);
    }
}
