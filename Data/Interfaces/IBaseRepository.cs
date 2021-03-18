using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IBaseRepository<item>
    {
        Task<IEnumerable<item>> GetItems();
        Task<item> GetItemByID(int id);
        Task<item> InsertItem(item item);
        void DeleteItem(int id);
        void UpdateItem(item item);
    }
}
