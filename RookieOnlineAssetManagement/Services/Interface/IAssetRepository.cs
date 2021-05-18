using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Models.Asset;
using RookieOnlineAssetManagement.Models.Paged;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieShop.Backend.Services.Interface
{
    public interface IAssetRepository
    {
        public Task<Asset> AddAsset(AssetCreateRequest newAsset);

        public Task<AssetDetailsNotIncludeHistory> AssetDetails(string id);

        public Task<AssetDetails> AssetDetailsHistory(string id);

        public Task<List<AssetsListViewModel>> GetAssetList();

        public Task<bool> DeleteAsset(string id);

        //public Task<List<AssetsListViewModel>> MutilSearchAsset(MultipleFilter mul);
        public Task<PagedList<AssetsListViewModel>> MutilSearchAsset1(PagedRepository pagedRepository, MultipleFilter mul);
        public Task<Asset> PutAsset(AssetCreateRequest request);

        public List<StateList> StateAssetList();

    }
}