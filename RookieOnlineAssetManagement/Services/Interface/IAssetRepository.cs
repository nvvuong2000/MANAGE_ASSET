using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Asset;
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

        public Task<bool> DeleteAsset(string id);

        public Task<Asset> PutAsset(AssetCreateRequest request);

        public List<StateList> StateAssetList();

    }
}
