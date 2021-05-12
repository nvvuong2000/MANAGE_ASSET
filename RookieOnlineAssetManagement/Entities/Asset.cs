using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Entities
{
    public class Asset
    {
        public string Id { get; set; }
        public int CategoryId { get; set; }
        public string AssetName { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public Category Category { get; set; }
        public StateAsset StateAsset { get; set; }
        public string Location { get; set; }


    }
    public enum StateAsset
    {
        [Description("Available")]
        Available = 0,
        [Description("Not Available")]
        NotAvailable = 1,
        [Description("Waiting for recycling")]
        Waitingforrecycling = 2,
        [Description("Recycled")]
        Recycled = 3,
          [Description("Assigned")]
        Assigned = 4
    }
}
