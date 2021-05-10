using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    /// <summary>
    /// Интерфейс репозитория
    /// </summary>
    /// <typeparam name="item">Модель данных</typeparam>
    public interface IBaseRepository<item>
    {
        Task<IEnumerable<item>> GetItems();
        Task<item> GetItemByID(string id);
        Task<item> InsertItem(item item);
        void DeleteItem(string id);
        void UpdateItem(item item);
    }
}
