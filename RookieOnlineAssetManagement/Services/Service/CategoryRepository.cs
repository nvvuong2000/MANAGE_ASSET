using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;


namespace RookieOnlineAssetManagement.Services.Implement
{
    public class CategoryRepository : ICaTegoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryRepository(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public  int AddCategory(CategoryRequestModel model)
        {
            if (_dbContext.Categories.FirstOrDefault(x => x.CategoryName == model.CategoryName.Trim()) != null)
            {
                return 0;
            }
            else if (_dbContext.Categories.FirstOrDefault(x => x.Prefix == model.Prefix.Trim()) != null)
            {
                return 1;
            }
            else
            {
                var newCategory = new Category
                {
                    CategoryName = model.CategoryName,
                    Prefix = model.Prefix,
                };
                var result = _dbContext.Categories.Add(newCategory);
                _dbContext.SaveChanges();
                return 2;

            }
        }


        public  async Task<List<Category>> GetCategoryList()
        {
            var result = _dbContext.Categories.ToList();
            
            return result;
        }
    }
}
