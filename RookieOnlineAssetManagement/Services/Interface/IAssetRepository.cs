using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieShop.Backend.Services.Interface
{
    public interface IAssetRepository
    {
        public Task<Asset> AddAsset(Asset newAsset);

        public Task<AssetDetailsNotIncludeHistory> AssetDetails(string id);
        
        public Task<AssetDetails> AssetDetailsHistory(string id);

        public Task<List<AssetsListViewModel>> GetAssetList();




    }
}
