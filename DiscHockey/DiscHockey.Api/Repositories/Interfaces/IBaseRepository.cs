namespace DiscHockey.Api.Repositories.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<TEntity?> AddAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        Task<TEntity?> FindByIdAsync(Guid id);
        Task<IEnumerable<TEntity?>> GetAllAsync();
        Task<bool> SaveChangesAsync();
    }
}
