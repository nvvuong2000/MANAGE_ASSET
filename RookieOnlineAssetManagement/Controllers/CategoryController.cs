
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : Controller
    {
        private readonly ICaTegoryRepository _repo;
        public CategoryController(ICaTegoryRepository repo)
        {
            _repo = repo;
        }
        [HttpPost]
        public async Task<ActionResult<MessageModel>> AddCategory(CategoryRequestModel model)
        {
            var messgae = new MessageModel();
            var result =  _repo.AddCategory(model);
            if (result == 0)
            {
                messgae.Message = "Category is already existed. Please enter a different category";
            }
            else if (result == 1)
            {
                messgae.Message = "Prefix is already existed. Please enter a different prefix";

            }
            else
            {
                messgae.Message = "Success";
            }

            return Ok(messgae);
        }
        [HttpGet("/categorylist")]
        public async Task<ActionResult<MessageModel>> GetCategoryList()
        {
            var result = await _repo.GetCategoryList();

            return Ok(result);
        }


    }

  
}
