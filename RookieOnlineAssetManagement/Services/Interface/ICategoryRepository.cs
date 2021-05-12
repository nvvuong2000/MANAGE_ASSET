using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Services.Interface
{
    public interface ICaTegoryRepository
    {
        public int AddCategory(CategoryRequestModel model);
        public Task<List<Category>> GetCategoryList();
    }
}
