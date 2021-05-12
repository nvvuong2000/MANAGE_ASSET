using EnumsNET;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Services.Interface;
using RookieShop.Backend.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieShop.Backend.Services.Implement
{

    public class AssetRepository : IAssetRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _repoUser;
        public AssetRepository(ApplicationDbContext context, IUserService repoUser)
        {
            _dbContext = context;
            _repoUser = repoUser;
        }

        public async Task<Asset> AddAsset(Asset newAsset)
        {
            // Add New Asset
            var preFix = _dbContext.Categories.Where(x => x.Id == newAsset.CategoryId).Select(x => x.Prefix).FirstOrDefault();
            
            var number = _dbContext.Assets.Where(x => x.AssetName.Contains(preFix)).ToList().Count() + 1;

            var userCurrentId = _repoUser.GetIdUserLogin();
            
            string location = _dbContext.Users.Where(x => x.Id.Equals(int.Parse(userCurrentId))).Select(x => x.Location).FirstOrDefault();
            
            char x = '0';
            
            newAsset = new Asset()
            {

                Id = preFix + number.ToString().PadLeft(6, x),
                AssetName = newAsset.AssetName,
                CategoryId = newAsset.CategoryId,
                InstalledDate = Convert.ToDateTime(DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss")),
                Specification = newAsset.Specification,
                StateAsset = newAsset.StateAsset,
                Location = location,
            };
            _dbContext.Assets.Add(newAsset);
            _dbContext.SaveChanges();
            return newAsset;
        }

        public async Task<AssetDetailsNotIncludeHistory> AssetDetails(string id)
        {
            // Get Asset Id Details Not History
            var AssetDetails = await _dbContext.Assets.Where(x => x.Id.Equals(id)).Select(x => new AssetDetailsNotIncludeHistory
            {
                AssetCode = x.Id,
                AssetName = x.AssetName,
                CategoryName = _dbContext.Categories.Where(s => s.Id == x.CategoryId).Select(ca => ca.CategoryName).FirstOrDefault(),
                StateAsset = ((StateAsset)x.StateAsset),
                Specification = x.Specification,
                CategoryId = x.CategoryId,
                InstalledDate = x.InstalledDate,

            }).FirstOrDefaultAsync();

            return AssetDetails;

        }

        public async Task<AssetDetails> AssetDetailsHistory(string id)
        {
            //Get Asset Id Details

            var AssetDetails = await _dbContext.Assets.Where(x => x.Id.Equals(id)).Select(x => new AssetDetails
            {
                AssetCode = x.Id,

                AssetName = x.AssetName,

                CategoryName = _dbContext.Categories.Where(s => s.Id == x.CategoryId).Select(ca => ca.CategoryName).FirstOrDefault(),

                StateName = ((StateAsset)x.StateAsset).AsString(EnumFormat.Description),

                Specification = x.Specification,

                Location = "HCM",

                InstalledDate = x.InstalledDate,

                Date = _dbContext.Returnings.Include(x => x.Assignment).Include(x => x.Assignment.Asset).Where(x => x.Assignment.AssetId.Equals(id)).Select(x => x.Assignment.AssignedDate).ToList(),

                ReturnedDate = _dbContext.Returnings.Include(x => x.Assignment).Include(x => x.Assignment.Asset).Where(x => x.Assignment.AssetId.Equals(id)).Select(x => x.ReturnedDate).ToList(),

                AssignedTo = _dbContext.Returnings.Include(x => x.Assignment).Include(x => x.Assignment.Borrower).Where(x => x.Assignment.AssetId.Equals(id)).Select(x => x.Assignment.Borrower.UserName).ToList(),

                AssignedBy = _dbContext.Returnings.Include(x => x.Assignment).Include(x => x.Assignment.Lender).Where(x => x.Assignment.AssetId.Equals(id)).Select(x => x.Assignment.Lender.UserName).ToList(),


            }).FirstOrDefaultAsync();
            return AssetDetails;
        }

        public async Task<List<AssetsListViewModel>> GetAssetList()
        {
            // Get Asset List

            var AssetList = _dbContext.Assets.Where(x => x.InstalledDate <= DateTime.Now).Select(x => new AssetsListViewModel
            {
                AssetCode = x.Id,
                AssetName = x.AssetName,
                CategoryName = _dbContext.Categories.Where(s => s.Id == x.CategoryId).Select(ca => ca.CategoryName).FirstOrDefault(),
                StateName = ((StateAsset)x.StateAsset).AsString(EnumFormat.Description),
                StateId = ((StateAsset)x.StateAsset),
            }).ToList();
            return AssetList;
        }
    }
}
