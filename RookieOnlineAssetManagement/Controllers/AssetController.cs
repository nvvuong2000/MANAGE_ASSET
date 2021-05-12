using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Services.Interface;
using RookieShop.Backend.Services.Interface;
using System;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class AssetController : Controller
    {


        private readonly IAssetRepository _repo;
 
        public AssetController(IAssetRepository repo, IUserService repoUser)
        {
            _repo = repo;

        }

        // GET: AssetController/GetAssetList
        [HttpGet]
        public async Task<ActionResult<AssetDetailsNotIncludeHistory>> GetAssetList()
        {
            var result = await _repo.GetAssetList();

            return Ok(result);
        }

        // GET: AssetController/Details/5
        [HttpGet("history")]
        public async Task<ActionResult<AssetDetailsNotIncludeHistory>> DetailsWithHistory(string id)
        {
            var result = await _repo.AssetDetailsHistory(id);

            return Ok(result);
        }
        [HttpPost("details")]
        // GET: AssetController/Details/5
        public async Task<ActionResult<AssetDetails>> Details(string id)
        {
            var result = await _repo.AssetDetails(id);
            
            return Ok(result);
        }

      

        // POST: AssetController/Create
        [HttpPost]
        public ActionResult Create(Asset newAsset)
        {
            try
            {
                var result = _repo.AddAsset(newAsset);
                return Ok(result);
            }
            catch
            {
                return View();
            }
        }

        
    }
}
