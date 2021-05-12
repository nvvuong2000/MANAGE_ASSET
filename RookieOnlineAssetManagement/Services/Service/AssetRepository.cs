using EnumsNET;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Asset;
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
            var preFix = await _dbContext.Categories.Where(x => x.Id == newAsset.CategoryId).Select(x => x.Prefix).FirstOrDefaultAsync();

            var number = _dbContext.Assets.Where(x => x.Id.Contains(preFix)).ToList().Count() + 1;

            var userCurrentId = _repoUser.GetIdUserLogin();

            string location = await _dbContext.Users.Where(x => x.Id.Equals(int.Parse(userCurrentId))).Select(x => x.Location).FirstOrDefaultAsync();

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
                Location = x.Location,
               

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

                Location = x.Location,

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
            var userId = _repoUser.GetIdUserLogin();
            var location = _dbContext.Users.Where(x=>x.Id.Equals(int.Parse(userId))).Select(x=>x.Location).FirstOrDefault();
            var AssetList = await _dbContext.Assets.Where(x=>x.Location.Equals(location)).Select(x => new AssetsListViewModel
            {
                AssetCode = x.Id,
                AssetName = x.AssetName,
                CategoryName = _dbContext.Categories.Where(s => s.Id == x.CategoryId).Select(ca => ca.CategoryName).FirstOrDefault(),
                StateName = ((StateAsset)x.StateAsset).AsString(EnumFormat.Description),
                StateId = ((StateAsset)x.StateAsset),
                Location = x.Location,
            }).ToListAsync();
            return AssetList;
        }

        

        public async Task<bool> DeleteAsset(string id)
        {
            var getAssetByAssign = await _dbContext.Assignments
                .Where(a => a.AssetId == id)
                .ToListAsync();

            if (getAssetByAssign.Count == 0)
            {
                var asset = await _dbContext.Assets.FirstOrDefaultAsync(a => a.Id == id);
                _dbContext.Assets.Remove(asset);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Asset> PutAsset(AssetCreateRequest request)
        {
            var asset = await _dbContext.Assets.FindAsync(request.Id);

            if (asset == null)
                return null;
            asset.AssetName = request.AssetName;
            asset.Specification = request.Specification;
            asset.InstalledDate = request.InstalledDate;
            asset.StateAsset = (StateAsset)request.StateAsset;

            await _dbContext.SaveChangesAsync();
            return asset;
        }

        public List<StateList> StateAssetList()
        {
            List<StateList> list = new List<StateList>();
            for (int i = 0; i < Enum.GetNames(typeof(StateAsset)).Length; i++)
            {
                list.Add(new StateList
                {
                    key = i,
                    name = ((StateAsset)i).AsString(EnumFormat.Description)
                });
            }
            return list;
        }
    }
}
