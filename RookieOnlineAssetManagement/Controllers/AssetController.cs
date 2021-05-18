using EnumsNET;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Asset;
using RookieOnlineAssetManagement.Models.Paged;
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

        public AssetController(IAssetRepository repo)
        {
            _repo = repo;

        }

        // GET: AssetController/GetAssetList
        [HttpGet]
        public async Task<ActionResult> GetAssetList()
        {
            var result = await _repo.GetAssetList();

            return Ok(result);
        }

        // GET: AssetController/Details/5
        [HttpGet("history")]
        public async Task<ActionResult> DetailsWithHistory(string id)
        {
            var result = await _repo.AssetDetailsHistory(id);

            return Ok(result);
        }

        [HttpGet("details")]
        // GET: AssetController/Details/5
        public async Task<ActionResult> Details(string id)
        {
            var result = await _repo.AssetDetails(id);

            return Ok(result);
        }

        // POST: AssetController/Create
        [HttpPost]
        public async Task<ActionResult> Create(AssetCreateRequest newAsset)
        {
            try
            {

                var result = await _repo.AddAsset(newAsset);
                return Ok(result);
            }
            catch
            {
                return View();
            }
        }




        // DELETE: AssetController/DeleteAsset
        [HttpGet("id")]
        public async Task<ActionResult> DeleteAsset(string id)
        {
            var result = await _repo.DeleteAsset(id);

            if (result == true)
                return Ok(); //Status code: 200
            return NoContent();//Status code: 204
        }


        // PUT: AssetController/PutAsset
        [HttpPut]
        public async Task<ActionResult> PutAsset(AssetCreateRequest request)
        {
            var result = await _repo.PutAsset(request);

            if (result == null)
                return NotFound();
            return Ok(result);
        }
        //[HttpPost("mutil-search")]
        //public async Task<ActionResult> MutilSearchAsset(MultipleFilter mul)
        //{
        //    //State and category checked All
        //    if (mul.states[0].Equals(-1) && mul.categories[0].Equals(-1))
        //    {
        //        var result = await _repo.GetAssetList();

        //        return Ok(result);
        //    }
        //    var resultSearch = await _repo.MutilSearchAsset(mul);
        //    return Ok(resultSearch);
        //}
        [HttpPost("mutil-search1")]
        public async Task<ActionResult> MutilSearchAsset1([FromQuery] PagedRepository pagedReposiory, MultipleFilter mul)
        {
            //State and category checked All
           
            var resultSearch = await _repo.MutilSearchAsset1(pagedReposiory, mul);
            Pagination(resultSearch);
            return Ok(resultSearch);

            }
         [HttpGet("getState")]
        public ActionResult<StateList> StateList()
        {
            var list = _repo.StateAssetList();

            return Ok(list);


        }
        [HttpGet("page")]
        public void Pagination(PagedList<AssetsListViewModel> result)
        {
            var metadata = new
            {
                result.TotalCount,
                result.PageSize,
                result.CurrentPage,
                result.TotalPages,
                result.HasNext,
                result.HasPrevious,
            };
            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));
        }
    }
}