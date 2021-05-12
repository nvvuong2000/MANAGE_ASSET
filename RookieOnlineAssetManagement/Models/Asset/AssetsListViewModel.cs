using RookieOnlineAssetManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Models
{
    public class AssetsListViewModel
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string CategoryName { get; set; }
        public string StateName { get; set; }
        public string Location { get; set; }
        public StateAsset StateId { get; set; }

    }
}
