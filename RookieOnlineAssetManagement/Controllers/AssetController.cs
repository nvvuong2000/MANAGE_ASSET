using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Asset;
using RookieOnlineAssetManagement.Services.Interface;
using RookieShop.Backend.Services.Interface;
using System;
using System.Collections.Generic;
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

        [HttpGet("details")]
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


        // POST: AssetController/SearchAsset
        [HttpPost("find")]
        public async Task<ActionResult<List<AssetsListViewModel>>> SearchAsset(string findString)
        {
            var result = await _repo.SearchAsset(findString);

            if (result == null)
                return NoContent();
            return Ok(result);
        }

        // DELETE: AssetController/DeleteAsset
        [HttpDelete]
        public async Task<ActionResult> DeleteAsset(string id)
        {
            var result = await _repo.DeleteAsset(id);

            if (result == true)
                return Ok(); //Status code: 200
            return NoContent();//Status code: 204
        }


        // PUT: AssetController/PutAsset
        [HttpPut]
        public async Task<ActionResult<Asset>> PutAsset(AssetCreateRequest request)
        {
            var result = await _repo.PutAsset(request);

            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
